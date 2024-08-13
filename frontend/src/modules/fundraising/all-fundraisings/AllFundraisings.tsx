import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material'
import { useAuth } from '@/auth/AuthProvider'
import {
  generatePurchaseFundraising,
  getAllFundraisings,
} from '@/modules/fundraising/service'
import { formatCurrency, formatNumber } from '@/commons'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ChurchIcon from '@mui/icons-material/Church'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Fundraising } from '@/modules/fundraising/types'
import { PaymentModal } from '@/modules/fundraising/all-fundraisings/PaymentModal'
import { removeFormatCpfCnpj } from '@/modules/fundraising/commons'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
  },
}

const AllFundraisings: React.FC = () => {
  const { user } = useAuth()
  const [fundraisings, setFundraisings] = useState<Fundraising[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [amount, setAmount] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [pixCopiaECola, setPixCopiaECola] = useState('')

  useEffect(() => {
    const fetchFundraisings = async () => {
      try {
        const response = await getAllFundraisings()
        setFundraisings(response.data)
      } catch (error) {
        console.error('Erro ao buscar as ações:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFundraisings()
  }, [])

  const handlePurchase = async (fundraising: any) => {
    const totalPrice = (fundraising.price * quantity).toFixed(2)
    const chavePix = removeFormatCpfCnpj(
      fundraisings[0].pixKeyCnpj || fundraisings[0].pixKeyCpf,
    )

    if (fundraising && user) {
      const data = {
        calendario: {
          expiracao: 3600,
        },
        devedor: {
          cpf: user.cpf,
          nome: user.name,
        },
        valor: {
          original: totalPrice,
        },
        chave: chavePix,
      }

      try {
        const response = await generatePurchaseFundraising(data)

        if (response.status === 200 && response.data) {
          setQrCodeUrl(response.data.pixCopiaECola)
          setPixCopiaECola(response.data.pixCopiaECola)
          setModalOpen(true)
        } else {
          alert('Erro ao gerar a cobrança. Tente novamente.')
        }
      } catch (error) {
        console.error('Erro ao realizar a compra:', error)
        alert('Erro ao realizar a compra. Tente novamente.')
      }
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      display="block"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      style={{
        backgroundImage: "url('/bg-home.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '5rem',
      }}
    >
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        autoPlay={false}
        arrows={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {fundraisings.map((fundraising) => (
          <Box
            key={fundraising._id}
            p={2}
            display="flex"
            justifyContent="center"
          >
            <Card
              sx={{
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                width: 400,
              }}
            >
              <CardContent sx={{ flexGrow: 2 }}>
                <Typography variant="subtitle2" component="div" align="left">
                  Criado por: {fundraising.user.name}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  align="center"
                  gutterBottom
                >
                  {fundraising.name}
                </Typography>
                <CardMedia
                  component="img"
                  height="200"
                  image={fundraising.imageUrl}
                  alt={fundraising.name}
                  sx={{ objectFit: 'cover', marginBottom: 2 }}
                />
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                  <Paper
                    variant="outlined"
                    sx={{ display: 'flex', padding: 2, alignItems: 'center' }}
                  >
                    <ChurchIcon color="action" sx={{ marginRight: 1 }} />
                    <Box>
                      <Typography variant="body2">Quantidade Total</Typography>
                      <Typography variant="body1">
                        {formatNumber(fundraising.quantityAvailable)} /{' '}
                        {formatNumber(fundraising.quantity)}
                      </Typography>
                    </Box>
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{ display: 'flex', padding: 2, alignItems: 'center' }}
                  >
                    <FavoriteIcon color="action" sx={{ marginRight: 1 }} />
                    <Box>
                      <Typography variant="body2">
                        Quantidade Vendida
                      </Typography>
                      <Typography variant="body1" color="green">
                        {formatNumber(fundraising.quantitySold)}
                      </Typography>
                    </Box>
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{ display: 'flex', padding: 2, alignItems: 'center' }}
                  >
                    <AttachMoneyIcon color="action" sx={{ marginRight: 1 }} />
                    <Box>
                      <Typography variant="body2">Preço</Typography>
                      <Typography variant="body1">
                        {formatCurrency(fundraising.price)}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                  gap={2}
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - amount))}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value, 10)))
                    }
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    sx={{ width: 60 }}
                  />
                  <IconButton onClick={() => setQuantity(quantity + amount)}>
                    <AddIcon />
                  </IconButton>
                  <Select
                    value={amount}
                    onChange={(e) =>
                      setAmount(parseInt(e.target.value as string, 10))
                    }
                    sx={{ marginLeft: 2 }}
                  >
                    <MenuItem value={1}>1 em 1</MenuItem>
                    <MenuItem value={10}>10 em 10</MenuItem>
                    <MenuItem value={50}>50 em 50</MenuItem>
                    <MenuItem value={100}>100 em 100</MenuItem>
                  </Select>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handlePurchase(fundraising)}
                  sx={{ mt: 2, backgroundColor: '#12be46' }}
                >
                  COMPRAR
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>

      <PaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        pixCopiaECola={pixCopiaECola}
        qrCodeUrl={qrCodeUrl}
      />
    </Box>
  )
}

export { AllFundraisings }
