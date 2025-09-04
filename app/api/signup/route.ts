import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {db} from '../../../lib/data'

export async function POST(req:Request){
  const salt = bcrypt.genSaltSync()
  const body = await req.json()
  const {firstName,lastName,email,password,} = body
  let user
  try{
user = await db.user.create({
  data:{
    firstName,
    lastName,
    email,
    password:bcrypt.hashSync(password,salt)

  },

})
  }catch(e){
console.log('Error creating user:',e)
return NextResponse.json({error:'User already exists'},{status:401})
  }

  const token = jwt.sign({
    email:user,
    id:user.id,
    time:Date.now()
  },
  'hellow',
  {expiresIn:'8h'})
  const response = NextResponse.json(user)
  response.headers.set('Set-Cookie',`TRAX_ACCESS_TOKEN=${token}; HttpOnly;Path=/;
  Max-Age=${8*60*60}; SameSite= Lax;${process.env.NODE_ENV ==='production'? 'Secure':''}`)
  return response
}