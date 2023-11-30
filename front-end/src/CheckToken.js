import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();

const CheckToken = async () => {
    try {
      const token = cookies.get('token');
  
      if (token) {
        const response = await axios.post('https://sprint-deltago-5179309dcfcb.herokuapp.com/verificar-login', { "token":token
        }, { headers: { "Authorization": `Bearer ${token}` } });
  
        if (response.status === 200) {
          console.log('Token válido. Autorizado');
          return true;
        } else {
          console.log('Falha na autenticação:', response.data.message);
          return false;
        }
      } else {
        console.log('Token não encontrado');
        return false;
      }
    } catch (error) {
      console.error('Erro durante a verificação de autenticação:', error);
      return false;
    }
  };
  
export default CheckToken;