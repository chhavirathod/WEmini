import axios from "axios"
import { toast } from "react-toastify"
import { useContext } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    axios.get('https://venturecrowd-server.vercel.app/logout', {withCredentials: true})
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
