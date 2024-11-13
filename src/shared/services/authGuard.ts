import { cookieService } from './cookie.service';
import { useNavigate } from 'react-router-dom';

const AuthGuard= () => {
    const token = cookieService.get('authToken');
    const navigate = useNavigate();


    return token ?? navigate('/login');
};

export default AuthGuard;
