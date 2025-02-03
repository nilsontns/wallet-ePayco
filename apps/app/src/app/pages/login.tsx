import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import {
    postLogin,
} from "../services/auth";
import sessionManager from "../utils/SessionManager";
import { useAuthentication } from "../services/auth/provider";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../components/errorAlert";


export function Login() {
  const { setUser } = useAuthentication();
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    try  {
        if (!email) {
            setError("Email es requerido");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Email no es válido");
            return;
        }
        if (!password) {
            setError("Contraseña es requerida");
            return;
        }
       const resp = await postLogin({ email, password })
       setUser(resp.user);
       sessionManager.login({
        token: resp.token,
        user_id: resp.user._id,
       });
       navigate("/transactions");
    } catch (error: any) {
        setError(error.data.error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <ErrorAlert error={error} />
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Ingresar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/register")}
        >
          Registrarme
        </Button>
      </CardContent>
    </Card>
  );
}

export default Login;
