import { Alert } from '@mui/material';

export const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
