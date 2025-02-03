import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { postConfirmPurchase, postCreatePurchase } from '../services/wallet';
import { useNavigate } from 'react-router-dom';

export function PurchaseForm() {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePurchase = async () => {
    try {
      if (!amount || parseFloat(amount) <= 0) {
        setErrorMessage('Por favor, ingresa un monto válido.');
        setError(true);
        return;
      }
      await postCreatePurchase(parseFloat(amount));
      setStep(2);
      setError(false);
      setErrorMessage('');
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.data.error);
    }
  };

  const handleConfirmCode = async () => {
    try {
      if (!code || code.length !== 6) {
        setErrorMessage('Por favor, ingresa un código válido.');
        setError(true);
        return;
      }
      await postConfirmPurchase(code);
      alert('✅ Compra realizada con éxito.');
      navigate('/transactions');
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.data.error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 400 }}
      >
        {step === 1 ? (
          <>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              Realizar Compra
            </Typography>

            {error && (
              <Stack mt={2} mb={4}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <Stack spacing={2}>
              <TextField
                label="Monto"
                type="number"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePurchase}
                fullWidth
              >
                Comprar
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => navigate('/transactions')}
                fullWidth
              >
                cancelar
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              Confirmar Código
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
              Se ha enviado un código de 6 dígitos a tu correo.
            </Typography>
            {error && (
              <Stack mt={2} mb={4}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <Stack spacing={2}>
              <TextField
                label="Código de Confirmación"
                type="text"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                inputProps={{ maxLength: 6 }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleConfirmCode}
                fullWidth
              >
                Verificar Código
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default PurchaseForm;
