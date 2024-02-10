import { Box } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { RegisterClientForm } from './RegisterClientForm';
import { RegisterLawyerForm } from './RegisterLawyerForm';

export const RegisterForm = () => {
  const { userType } = useParams();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {userType === 'client' && <RegisterClientForm />}
      {userType === 'lawyer' && <RegisterLawyerForm />}
    </Box>
  );
};
