import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postRechargeWallet } from '../services/wallet';

export const Recharger = () => {
  const [phone, setPhone] = useState('');
  const [document, setDocumentNumber] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateFields = () => {
    if (!/^\d{10}$/.test(phone)) return 'El número de teléfono debe tener 10 dígitos.';
    if (!/^\w{6,12}$/.test(document)) return 'El número de documento debe tener entre 6 y 12 caracteres.';
    if (amount <= 0) return 'Ingrese un monto válido mayor a 0.';
    return null;
  };

  const handleRecharge = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    try {
      await postRechargeWallet({ phone, document, amount });
      alert(`Se han recargado $${amount} a tu billetera.`);
      setPhone('');
      setDocumentNumber('');
      setAmount(0);
    } catch (err: any) {
      setError(err.data.error);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Recargar Saldo
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack spacing={2}>
          <TextField
            label="Número de Teléfono"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            label="Número de Documento"
            type="text"
            value={document}
            onChange={(e) => setDocumentNumber(e.target.value)}
            fullWidth
          />
          <TextField
            label="Monto a Recargar"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRecharge}>
            Recargar
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/')}>
            Volver
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Recharger;
