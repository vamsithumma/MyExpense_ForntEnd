import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function isAuthenticated(){
    const token = Cookies.get('auth');
    return token? true: false;
}
