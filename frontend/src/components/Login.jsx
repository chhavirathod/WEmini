import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from '../assets';
import {LockIcon} from '../assets';

function Login({handleChange , onClose, setFormType}) {
  return (
    <>
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
    <div className="flex py-2 px-1 justify-between">
        <Checkbox
        classNames={{
            label: "text-xs md:text-sm",
        }}
        >
        Remember me
        </Checkbox>
        <Link className='text-xs md:text-sm' color="primary" href="#" onPress={()=>setFormType("Register")}>
        Dont have an account?
        </Link>
    </div>
    </>
  )
}

export default Login