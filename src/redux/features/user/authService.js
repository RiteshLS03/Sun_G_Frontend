import axios from 'axios'
import {base_url} from '../../api/base_url';

const register = async(userData)=>{
    const response = await axios.post(`${base_url}user/register`, userData)
    // const response = await axios.post("", userData)
    if(response.data){
        return response.data
        console.log(response.data);
    }
}

const authService= {
    register,
}

export default authService