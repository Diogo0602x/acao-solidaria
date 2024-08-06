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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { fundraisingBought } from '@/modules/fundraising/service'
import { formatCurrency, formatNumber } from '@/commons'

const FundraisingsBought: React.FC = () => {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fundraisingBought(user._id)
        setPurchases(response.data)
      } catch (error) {
        console.error('Erro ao buscar as compras:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
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
      {purchases.map((purchase) => (
        <Grid item key={purchase._id} xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                component="div"
                align="center"
                gutterBottom
              >
                {purchase.fundraising.name}
              </Typography>
              <CardMedia
                component="img"
                height="200"
                image={purchase.fundraising.imageUrl}
                alt={purchase.fundraising.name}
                sx={{ objectFit: 'cover', marginBottom: 2 }}
              />
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <Paper
                  variant="outlined"
                  sx={{ display: 'flex', padding: 2, alignItems: 'center' }}
                >
                  <ShoppingCartIcon color="action" sx={{ marginRight: 1 }} />
                  <Box>
                    <Typography variant="body2">Quantidade Comprada</Typography>
                    <Typography variant="body1">
                      {formatNumber(purchase.quantity)}
                    </Typography>
                  </Box>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{ display: 'flex', padding: 2, alignItems: 'center' }}
                >
                  <AttachMoneyIcon color="warning" sx={{ marginRight: 1 }} />
                  <Box>
                    <Typography variant="body2">Preço Comprado/Un</Typography>
                    <Typography variant="body1">
                      {formatCurrency(purchase.pricePurchased)}
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

export { FundraisingsBought }
