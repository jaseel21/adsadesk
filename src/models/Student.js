import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  place: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  guardianOccupation: { type: String, required: true },
  school: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, enum: ['active', 'Moved', 'completed'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', studentSchema);