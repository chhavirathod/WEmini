import axios from "axios"
import { toast } from "react-toastify"
import { SERVER_URL } from '../constants';

const Logout = () => {
    axios.get(SERVER_URL + '/logout', {withCredentials: true})
        .then((res) => {
            if(res.status == 200)
            {
               toast.success(res.data.message)
               localStorage.removeItem('jwtoken') 
               window.location.reload()
            }
        })
        .catch((e)=>{
            console.log(e)
            toast.error('Couldn\'t Logout')
        })
}

export default Logout
