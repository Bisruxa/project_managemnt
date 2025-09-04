'use client'

import  Link  from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode:'signin' | 'register'
}
const registerContent={
linkUrl:'/signin',
linkText:"Already have an account?",
linkActionText:"Log In",
header:"Create a new Account",
subHeader:"Just a few things to get started",
buttonText:"Register"
}
const signinContent={
  linkUrl:'/register',
  linkText:"Don't have an account?",
  linkActionText:"Sign Up",
  header:"Welcome Back",
  subHeader:"Login to your account",
  buttonText:"Sign In"
}
const Auth =({mode}:AuthFormProps)=>{
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [confirmPassword,setConfirmPassword]= useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
    setIsLoading(true)
    const userDate = mode =="register"?{firstName,lastName,email,password,confirmPassword}:{email,password}


  }
return (
  <div className="border rounded-xl shadow-lg flex flex-col justify-center items-center text-gray-900 bg-white/10 px-5 w-[500px]">
 
<div className="">
  {mode==="register"?(
    <div className="flex flex-col justify-center items-center">
  <h2 className="text-2xl font-bold mt-4">{registerContent.header}</h2>
  <small className="mb-4">{registerContent.subHeader}</small>
    
    </div>
    ):(
      <div className="flex flex-col justify-center items-center">
         <h2 className="text-2xl font-bold mt-4">{signinContent.header}</h2>
  <small className="mb-4">{signinContent.subHeader}</small>
      </div>
       
    
    )}

    <form action="" className="flex flex-col gap-2 p-4 ">
      {mode==="register"&&(
      <div className="flex flex-row gap-2">
        <div className="flex flex-col"><label htmlFor="">First Name</label>
      <input type="text" className="border p-2 rounded-full" placeholder="First Name"/></div>
        <div className="flex flex-col"> <label htmlFor="">Last Name</label>
      <input type="text" className="border p-2 rounded-full" placeholder="Last Name"/></div>
       
      
      </div>
      )}

      <label htmlFor="">Email</label>
      <input type="email" className="border p-2 rounded-full "placeholder="Enter your email"/>
      <label htmlFor="">Password</label>
      <input type="password"  className="border p-2 rounded-full"/>
      {
        mode === "register" ? (
          <div className="flex justify-center items-center flex-col">
             <button className="bg-blue-500 text-white p-2 rounded-xl w-full mt-4 hover:bg-blue-600 transition mb-4">
        {registerContent.buttonText}
      </button>
      <p className="flex justify-center gap-1 text-sm">
        {registerContent.linkText} 
         <Link href={registerContent.linkUrl}><span className="text-blue-500 cursor-pointer">{registerContent.linkActionText}</span></Link>
      </p></div>
        ):(
          <div>
             <button className="bg-blue-500 text-white p-2 rounded-xl w-full mt-4 hover:bg-blue-600 transition mb-4">
        {signinContent.buttonText}
      </button>
      <p className="flex justify-center gap-1 text-sm">
        {signinContent.linkText} 
         <Link href={signinContent.linkUrl}><span className="text-blue-500 cursor-pointer">{signinContent.linkActionText}</span></Link>
      </p>
          </div>
        )
      }
     
    </form>
</div>
  
    
    
  </div>
)
}
export default Auth;