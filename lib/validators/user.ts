import {z} from "zod";

export const userSignInSchema = z.object({
  email:z.email("Invalid email address"),
  password:z.string().min(6,"Password must be at least 6 charters long")
})

export const registerSchema = userSignInSchema.extend({
  firstName:z.string().min(2,"first name must be at least 2 charters long"),
  lastName:z.string().min(2,"last name must be at least 2 charters long"),
})