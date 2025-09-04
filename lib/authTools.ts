import 'server-only'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from './prisma'

const SECRET = process.env.JWT_SECRET
