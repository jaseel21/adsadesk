import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

export async function POST(req) {
    await dbConnect();

    try {
        // const { email, password } = await req.json();
        const email="alathoorpadidars@gmail.com"
        const password="adsa@st02"

        // 1. Basic validation 
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // 2. Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // 3. Create the new user
        // Note: The User model's pre('save') hook takes care of hashing the password
        const user = new User({ email, password });
        await user.save();

        // 4. Generate a JWT token for the newly created user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 5. Create the response and set the cookie (similar to your login route)
        const response = NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

        setCookie('token', token, {
            req,
            res: response,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        return response;
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
