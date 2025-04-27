import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseLogin } from './hooks/useLogin';
import { Box, TextField } from '@mui/material';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = UseLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = await login(username, password);
      localStorage.setItem('token', token);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('something wrong happened');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        type="text"
        label="Username"
        value={username}
        variant="filled"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="filled"
        required
      />
      <div>
        <button type="submit">Login</button>
      </div>
      {error && <p>{error}</p>}
    </Box>
  );
};
