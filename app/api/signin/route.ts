import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../../lib/data";
import * as z from "zod";
import { userSignInSchema } from "@/lib/validators/user";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid or missing JSON" }, { status: 400 });
  }

  const parsed = userSignInSchema.safeParse(body);
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json({ errors: tree }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await db.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, email: user.email, time: Date.now() },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" }
    );

    const response = NextResponse.json({ user });
    response.cookies.set("TRAX_ACCESS_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  }

  return NextResponse.json({ error: "Email or password is wrong" }, { status: 401 });
}
