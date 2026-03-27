import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Student from '../../../../models/Student';
import { getToken, verifyToken } from '../../../../lib/auth';

export async function GET(req, { params }) {
  const { id } = await params;
  await dbConnect();

  try {
    const student = await Student.findById(id);
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  await dbConnect();

  try {
    const body = await req.json();
    const student = await Student.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await dbConnect();

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

