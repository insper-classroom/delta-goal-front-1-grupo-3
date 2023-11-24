import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = cookies.get('token');

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return children;
}