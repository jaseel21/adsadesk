import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Student from '../../../models/Student';
import { getToken, verifyToken } from '../../../lib/auth';



async function getAuthUser(req) {
  const token = getToken();
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req) {
  await dbConnect();
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const id = searchParams.get('id');


  try {
    if (id) {
      const student = await Student.findById(id);
      if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
      return NextResponse.json(student);
    }


    let query = {};
    if (q) {
      query = {
        $or: [
          { admissionNumber: { $regex: q, $options: 'i' } },
          { name: { $regex: q, $options: 'i' } },
          { place: { $regex: q, $options: 'i' } },
          { address: { $regex: q, $options: 'i' } },
          { phone: { $regex: q, $options: 'i' } },
          { fatherName: { $regex: q, $options: 'i' } },
          { fatherPhone: { $regex: q, $options: 'i' } },
          { 'education.year': { $regex: q, $options: 'i' } },
          { 'education.university': { $regex: q, $options: 'i' } },
        ],
      };
    }

    const students = await Student.find(query).sort({ admissionNumber: 1 });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const student = await Student.create(body);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}