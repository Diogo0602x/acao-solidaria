import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Paper,
} from '@mui/material'
import { useAuth } from '@/auth/AuthProvider'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import StoreIcon from '@mui/icons-material/Store'
import { fundraisingCreated } from '@/modules/fundraising/service'
import { formatCurrency, formatNumber } from '@/commons'

const FundraisingsCreated: React.FC = () => {
  const { user } = useAuth()
  const [fundraisings, setFundraisings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFundraisings = async () => {
      try {
        const response = await fundraisingCreated(user._id)
        setFundraisings(response.data)
      } catch (error) {
        console.error('Erro ao buscar as rifas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFundraisings()
  }, [user._id])

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
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {fundraisings.map((fundraising) => (
        <Grid item key={fundraising._id} xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'secondar',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
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
                  <StoreIcon color="primary" sx={{ marginRight: 1 }} />
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
                  <EventAvailableIcon color="success" sx={{ marginRight: 1 }} />
                  <Box>
                    <Typography variant="body2">Quantidade Vendida</Typography>
                    <Typography variant="body1" color="green">
                      {formatNumber(fundraising.quantitySold)}
                    </Typography>
                  </Box>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{ display: 'flex', padding: 2, alignItems: 'center' }}
                >
                  <AttachMoneyIcon color="primary" sx={{ marginRight: 1 }} />
                  <Box>
                    <Typography variant="body2">Preço</Typography>
                    <Typography variant="body1">
                      {formatCurrency(fundraising.price)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export { FundraisingsCreated }
