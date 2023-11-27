import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from '../assets';
import {LockIcon} from '../assets';
import axios from "axios";
import {NameIcon} from '../assets';
import {ToastContainer, toast} from 'react-toastify';
import Login from "./Login";

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ form , setForm ] = useState({
    name:"",
    email: "",
    pwd: "",
    cpwd:""
  })

   //validation
  function validateEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleChange = (fieldname, e) => {
    setForm({...form , [fieldname]: e.target.value})
  }

  const submitHandler = (e) => {
    //validation
    if(!validateEmail(form.email)){
      toast.error("Invalid Email");
    }
    if(!form.email || !form.pwd || !form.name || !form.cpwd){
      toast.error("Please enter all the fields");
    }

    //post request
    axios.post('http://localhost:5000/register' , form)
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
  }

  return (
    <>
      <Button 
        onPress={onOpen}  
        className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#1dc071]"
        >
        Sign Up
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        // className="px-4 py-2"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl text-semibold">Register</ModalHeader>
              <ModalBody>
              <Input
                  autoFocus
                  endContent={<NameIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  onChange={(e) => {handleChange('name',e)}}
                />

                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => {handleChange('email',e)}}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => {handleChange('pwd',e)}}
                />

                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Confirm Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => {handleChange('cpwd',e)}}
                />

                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#"  size="sm" onPress={onClose} onClick={()=>{return <Login/>}}>
                    Already have an Account?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={submitHandler} onPress={onClose} className="bg-[#1dc071]">
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}