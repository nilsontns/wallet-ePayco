import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Paper,
  Stack,
  IconButton,
  Button,
} from '@mui/material';
import { TransactionStatus } from '@libs/shared';
import {
  Visibility,
  VisibilityOff,
  Refresh,
  Logout,
} from '@mui/icons-material';
import { getListTransactions, getMyBalance } from '../services/wallet';
import SessionManager from '../utils/SessionManager';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../services/auth/provider';
import moment from 'moment';

interface ITransaction {
  id: string;
  amount: number;
  status: string;
  type: string;
  date: string;
}

export function TransactionList() {
  const [transactionData, setTransactionData] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const { user, setUser } = useAuthentication();

  const navigate = useNavigate();

  const fetchBalance = async () => {
    const response = await getMyBalance();
    setBalance(response.balance);
  };

  const fetchTransactions = async () => {
    const response: any = await getListTransactions();
    const dataList = response.transactions.map((transaction: any) => ({
      id: transaction._id,
      amount: transaction.amount,
      status: transaction.status,
      type: transaction.type,
      date: moment(transaction.createdAt).format('YYYY-MM-DD'),
    }));
    setTransactionData(dataList);
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const handleRefreshBalance = () => {
    fetchBalance();
  };

  const handleLogout = () => {
    SessionManager.logout();
    navigate('/');
    setUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="flex-end" mb={3}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          startIcon={<Logout />}
        >
          Cerrar Sesión
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Stack>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Bienvenido, {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {user?.email}
            </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Saldo Disponible:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {showBalance ? `$${balance}` : '****'}
            </Typography>
            <IconButton onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton onClick={handleRefreshBalance}>
              <Refresh />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ mt: 3, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate('/purchase')}
        >
          Realizar Pago
        </Button>
      </Box>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate('/recharger')}
        >
          Recargar Saldo
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
        >
          Historial de Transacciones
        </Typography>
        <Stack spacing={2}>
          {transactionData.map((transaction) => (
            <Card
              key={transaction.id}
              sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ${transaction.amount}
                  </Typography>
                  <Chip
                    label={transaction.status}
                    color={
                      transaction.status === TransactionStatus.COMPLETED
                        ? 'success'
                        : transaction.status === TransactionStatus.PENDING
                        ? 'warning'
                        : 'error'
                    }
                    sx={{ fontWeight: 'bold' }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Tipo: {transaction.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha: {transaction.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default TransactionList;
