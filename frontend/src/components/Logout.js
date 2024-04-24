import axios from "axios"
import { toast } from "react-toastify"
import { useContext } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"
import { SERVER_URL } from '../constants';

const Logout = () => {
    axios.get(SERVER_URL + '/logout', {withCredentials: true})
        .then((res) => {
            if(res.status == 200)
            {
               toast.success(res.data.message) 
            }
        })
        .catch((e)=>{
            console.log(e)
            toast.error('Couldn\'t Logout')
        })
}

export default Logout
