import { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { postRegister } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/errorAlert';

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    document: '',
    phone: '',
    name: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (
    field: 'showPassword' | 'showConfirmPassword'
  ) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleRegister = async () => {
    try {
      if (!form.name) {
        setError('Nombre es requerido');
        return;
      }

      if (!form.email) {
        setError('Email es requerido');
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        setError('Email no es válido');
        return;
      }
      if (!form.document) {
        setError('Documento es requerido');
        return;
      }
      if (!form.phone) {
        setError('Teléfono es requerido');
        return;
      }
      if (!form.password) {
        setError('Contraseña es requerida');
        return;
      }
      if (form.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      await postRegister({
        email: form.email,
        password: form.password,
        name: form.name,
        document: form.document,
        phone: form.phone,
      });
        navigate('/login');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };


  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Registro
        </Typography>
        <ErrorAlert error={error} />
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          margin="normal"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          margin="normal"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Documento (DNI)"
          variant="outlined"
          margin="normal"
          name="document"
          value={form.document}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          margin="normal"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type={form.showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          name="password"
          value={form.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility('showPassword')}
                >
                  {form.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          type={form.showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    togglePasswordVisibility('showConfirmPassword')
                  }
                >
                  {form.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Registrarse
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/login')}
        >
          Iniciar Sesión
        </Button>
      </CardContent>
    </Card>
  );
}

export default Register;
