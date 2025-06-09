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
import Header from '../components/header';
import MapComponent from '../components/mapComponet';

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

  const testEvents = [
    {
      id: '1',
      title: 'Cross Championship',
      date: '2024-07-13',
      image: '',
      location: { lat: 10.5000, lng: -66.9167 }, // Parque del Este
    },
    {
      id: '2',
      title: 'Drag Race',
      date: '2024-07-13',
      image: '',
      location: { lat: 10.4926, lng: -66.8499 }, // Autopista Francisco Fajardo
    },
    {
      id: '3',
      title: 'Moto Rally',
      date: '2024-07-14',
      image: '',
      location: { lat: 10.4766, lng: -66.8820 }, // Plaza Venezuela
    },
    {
      id: '4',
      title: 'Desert Baja',
      date: '2024-08-01',
      image: '',
      location: { lat: 10.4680, lng: -66.8032 }, // Petare
    },
    {
      id: '5',
      title: 'City Street Run',
      date: '2024-08-05',
      image: '',
      location: { lat: 10.5061, lng: -66.9146 }, // Altamira
    },
    {
      id: '6',
      title: 'Winter Drift Battle',
      date: '2024-09-01',
      image: '',
      location: { lat: 10.4935, lng: -66.8795 }, // Sabana Grande
    },
    {
      id: '7',
      title: 'Final Grand Prix',
      date: '2024-10-01',
      image: '',
      location: { lat: 10.4780, lng: -66.9100 }, // Chacao
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(testEvents[0].location);
  const [selectedEvent, setSelectedEvent] = useState(testEvents[0]);





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
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Events" showBackArrow={false} />

      <Box
        onClick={() => navigate(`/details-event/${selectedEvent.id}`)}

        sx={{ px: 3, cursor: 'pointer', }}>
        <MapComponent center={selectedEvent.location} />


        <div style={{
          display: 'flex',
          alignItems: 'center',

          justifyContent: 'space-between',
        }}>

          <div>

            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
              {selectedEvent.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Typography>

          </div>


          <Typography
            sx={{
              textAlign: 'right',
              textDecoration: 'underline',
              fontWeight: 500,
              color: 'primary.main',
            }}
          >
            Detalles del evento:
          </Typography>


        </div>




      </Box>




      {/* Listado scrollable */}
      <Box sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>

        {testEvents.map((event) => (
          <Box
            key={event.id}
            display="flex"
            alignItems="center"
            mb={2}
            sx={{ cursor: 'pointer' }}
            onClick={() => setSelectedEvent(event)}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: '#ccc',
                borderRadius: 2,
                mr: 2,
              }}
            />
            <Box>
              <Typography fontWeight="bold">{event.title}</Typography>
              <Typography variant="body2">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* <Stack direction="row" justifyContent="flex-end" mb={3}>
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

      </Paper> */}


    </Box>
  );
}

export default TransactionList;
