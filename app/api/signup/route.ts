import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {db} from '../../../lib/data'
import { registerSchema } from "@/lib/validators/user";
import * as z from 'zod'



export async function POST(req:Request){

  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json(
      { errors: tree },
      { status: 400 }
    );
  }
  const {firstName,lastName,email,password,}= parsed.data
  const existingUser = await db.user.findUnique({
    where:{
      email}
  })
  if(existingUser){
    return NextResponse.json({error:'User already exists'},{status:401})
  }
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password,salt)
    let user;
    try{
user = await db.user.create({
  data:{
    firstName,
    lastName,
    email,
    password:hashedPassword

  },

})
  }catch(e){
console.log('Error creating user:',e)
return NextResponse.json({error:'Erro creatin user'},{status:500})
  }

  const token = jwt.sign({
    email:user.email,
    id:user.id,
    time:Date.now()
  },
  process.env.JWT_SECRET as string,
  {expiresIn:'8h'})
  const response = NextResponse.json(user)
  response.headers.set('Set-Cookie',`TRAX_ACCESS_TOKEN=${token}; HttpOnly;Path=/;
  Max-Age=${8*60*60}; SameSite=Lax;${process.env.NODE_ENV ==='production'? 'Secure':''}`)
  return response
}