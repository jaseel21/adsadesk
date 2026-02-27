'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentDetail() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id, fetchStudent]);

  const fetchStudent = useCallback(async () => {
    try {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      if (res.ok && data && !data.message) {
        setStudent(data);
        setFormData(data);
      } else {
        console.error('API Error:', data.message);
        router.push('/login');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      router.push('/login');
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('education.')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, education: { ...formData.education, [field]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    const res = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setStudent(await res.json());
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  if (!student) return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link skeleton */}
        <div className="h-4 w-32 rounded-lg bg-slate-200 animate-pulse mb-8" />

        {/* Header row skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="h-9 w-56 rounded-xl bg-slate-200 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-28 rounded-lg bg-slate-100 animate-pulse" />
            <div className="h-9 w-20 rounded-lg bg-slate-100 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main card skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="h-6 w-44 rounded-lg bg-slate-200 animate-pulse" />
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3.5 w-24 rounded bg-slate-100 animate-pulse" />
                    <div className="h-5 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
                  </div>
                ))}
                <div className="col-span-full space-y-1.5">
                  <div className="h-3.5 w-28 rounded bg-slate-100 animate-pulse" />
                  <div className="h-16 w-full rounded-lg bg-slate-100 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Family card skeleton */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="h-6 w-36 rounded-lg bg-slate-200 animate-pulse" />
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3.5 w-24 rounded bg-slate-100 animate-pulse" />
                    <div className="h-5 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar card skeleton */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-fit">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="h-6 w-28 rounded-lg bg-slate-200 animate-pulse" />
            </div>
            <div className="p-6 space-y-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-24 rounded bg-slate-100 animate-pulse" />
                  <div className="h-5 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'moved': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const status = student.status?.toLowerCase() || '';

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors mb-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 transform group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
              Back to Students
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              {student.name}
              {!editing && student.status && (
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getStatusColor(student.status)}`}>
                  {student.status.toUpperCase()}
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {!editing ? (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-red-100 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setEditing(false); setFormData(student); }}
                  className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  Student Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailField
                    label="Admission Number"
                    name="admissionNumber"
                    value={student.admissionNumber}
                    editValue={formData.admissionNumber}
                    editing={editing}
                    onChange={handleChange}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>}
                  />
                  <DetailField
                    label="Full Name"
                    name="name"
                    value={student.name}
                    editValue={formData.name}
                    editing={editing}
                    onChange={handleChange}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                  />
                  <DetailField
                    label="Place"
                    name="place"
                    value={student.place}
                    editValue={formData.place}
                    editing={editing}
                    onChange={handleChange}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>}
                  />
                  <DetailField
                    label="Phone"
                    name="phone"
                    value={student.phone}
                    editValue={formData.phone}
                    editing={editing}
                    onChange={handleChange}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
                  />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-500">Academic Status</label>
                    {editing ? (
                      <select name="status" value={formData.status} onChange={handleChange} className="block w-full py-2 px-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm">
                        <option value="active">Active</option>
                        <option value="Moved">Moved</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      <p className="font-semibold text-slate-900 flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'active' ? 'bg-green-500' : status === 'moved' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                        {student.status}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-500">Resident Address</label>
                  {editing ? (
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="block w-full py-2 px-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm resize-none" />
                  ) : (
                    <p className="font-medium text-slate-900 leading-relaxed">{student.address}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  Family Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailField
                    label="Father's Name"
                    name="fatherName"
                    value={student.fatherName}
                    editValue={formData.fatherName}
                    editing={editing}
                    onChange={handleChange}
                  />
                  <DetailField
                    label="Father's Phone"
                    name="fatherPhone"
                    value={student.fatherPhone}
                    editValue={formData.fatherPhone}
                    editing={editing}
                    onChange={handleChange}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                  Education
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <DetailField
                  label="Academic Year"
                  name="education.year"
                  value={student.education?.year}
                  editValue={formData.education?.year}
                  editing={editing}
                  onChange={handleChange}
                />
                <DetailField
                  label="University / Institution"
                  name="education.university"
                  value={student.education?.university}
                  editValue={formData.education?.university}
                  editing={editing}
                  onChange={handleChange}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => !deleting && setShowDeleteModal(false)}
          />

          {/* Modal panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900 mb-1">Delete Student?</h2>
            <p className="text-sm text-slate-500 mb-1">You are about to permanently delete</p>
            <p className="text-base font-bold text-slate-800 mb-5">&ldquo;{student.name}&rdquo;</p>

            {/* Warning banner */}
            <div className="w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-2 text-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <p className="text-xs font-medium text-red-600">This action is irreversible. All data for this student will be permanently erased.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting...
                  </>
                ) : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ label, name, value, editValue, editing, onChange, icon }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-500">{label}</label>
      {editing ? (
        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              {icon}
            </div>
          )}
          <input
            name={name}
            value={editValue || ''}
            onChange={onChange}
            className={`block w-full ${icon ? 'pl-9' : 'px-3'} py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm`}
          />
        </div>
      ) : (
        <p className="font-semibold text-slate-900 flex items-center gap-2">
          {icon && <span className="text-slate-400">{icon}</span>}
          {value || 'N/A'}
        </p>
      )}
    </div>
  );
}

