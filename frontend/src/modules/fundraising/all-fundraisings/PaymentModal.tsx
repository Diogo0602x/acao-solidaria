import React from 'react'
import { Modal, Box, Typography, Button, IconButton } from '@mui/material'
import QRCode from 'qrcode.react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  pixCopiaECola: string
  qrCodeUrl: string
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  pixCopiaECola,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(pixCopiaECola)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Confirme o pagamento lendo o QR code abaixo ou fazendo o Pix através
          da chave copia e cola abaixo:
        </Typography>
        <Box mb={2} display="flex" justifyContent="center">
          <QRCode value={pixCopiaECola} size={256} />
        </Box>
        <Typography
          variant="body1"
          component="p"
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Pix Copia e Cola:
          <IconButton onClick={handleCopy} sx={{ ml: 1 }}>
            <ContentCopyIcon />
          </IconButton>
        </Typography>
        <Box
          sx={{
            wordBreak: 'break-all',
            mb: 2,
            bgcolor: '#f0f0f0',
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" component="p">
            {pixCopiaECola}
          </Typography>
        </Box>
        <Button variant="contained" onClick={onClose}>
          Fechar
        </Button>
      </Box>
    </Modal>
  )
}

export { PaymentModal }
