import React, { useContext, useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from '../assets';
import {LockIcon} from '../assets';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import Register from './Register'
import Login from './Login'
import { UserContext } from "../App";


export default function App(props) {

  const {state , dispatch} = useContext(UserContext);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [formType , setFormType] = useState("formType")
  const [ loginForm , setLoginForm ] = useState({
    email: "",
    pwd: ""
  })
  const [ registerForm , setRegisterForm ] = useState({
    name:"",
    email: "",
    pwd: "",
    cpwd:""
  })

  useEffect(() =>{
    setFormType(props.formType);
  },[])


   //validation
  function validateEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleLoginChange = (fieldname, e) => {
    setLoginForm({...loginForm , [fieldname]: e.target.value})
  }

  const handleRegisterChange = (fieldname, e) => {
    setRegisterForm({...registerForm , [fieldname]: e.target.value})
  }
  


  const registerSubmitHandler = () => {
    //validation
    if(!validateEmail(registerForm.email)){
      toast.error("Invalid Email");
    }
    if(!registerForm.email || !registerForm.pwd || !registerForm.name || !registerForm.cpwd){
      toast.error("Please enter all the fields");
    }

    //post request
    axios.post('http://localhost:5000/register' , registerForm)
      .then((res) => {
        if(res.status === 201){
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        if( err.response.status === 401 ){
          toast.error(err.response.data.message);
        }
      })
      props.handleClick();
      setFormType(props.formType);
  }

  const loginSubmitHandler = () => {
    //validation
    if(!validateEmail(loginForm.email)){
      toast.error("Invalid Email");
    }
    if(!loginForm.email || !loginForm.pwd){
      toast.error("Please Enter all the fields");
    }

    //post request
    axios.post('http://localhost:5000/login' , loginForm ,{withCredentials:true , credentials: "include"})
      .then((res) => {
        if(res.status === 200){
          dispatch({type: "USER" , payload: true})
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        if( err.response.status === 401 || err.response.status === 500 ){
          toast.error(err.response.data.message);
        }
      })
      props.handleClick()
      setFormType(props.formType);
  }

  return (
    <>
      <Button 
        onPress={onOpen} 
        className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[48px] px-4 rounded-[10px] bg-[#1dc071]"
        >
        {props.formType}
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        className="pt-2"
      >
        <ModalContent>
          {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-4xl text-semibold">{formType}</ModalHeader>
              <ModalBody>
                {formType === "Login" ? 
                  <Login handleChange={handleLoginChange} onClose={onClose} setFormType={setFormType} /> : 
                  <Register handleChange={handleRegisterChange} onClose={onClose} setFormType={setFormType} />
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} onClick={()=>{setFormType(props.formType);}}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    if(formType === "Login")
                      loginSubmitHandler()
                    else if(formType === "Register")
                      registerSubmitHandler()
                  }} 
                  onPress={onClose} 
                  className="bg-[#1dc071]"
                  >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}