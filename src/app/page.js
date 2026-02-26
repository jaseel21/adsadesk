'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, [search, fetchStudents]);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(`/api/students?q=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [search, router]);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Skeleton Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">ADSA Desk</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-28 rounded-lg bg-slate-100 animate-pulse" />
              <div className="h-9 w-20 rounded-lg bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Skeleton header */}
        <div className="mb-10">
          <div className="h-9 w-56 rounded-xl bg-slate-200 animate-pulse mb-2" />
          <div className="h-4 w-80 rounded-lg bg-slate-100 animate-pulse" />
        </div>

        {/* Skeleton search bar */}
        <div className="mb-10 flex gap-4 items-center">
          <div className="h-12 max-w-lg w-full rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-5 w-28 rounded-lg bg-slate-100 animate-pulse ml-auto" />
        </div>

        {/* Skeleton cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="h-1 w-full bg-slate-100" />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 animate-pulse" />
                  <div className="h-5 w-16 rounded-full bg-slate-100 animate-pulse" />
                </div>
                <div className="h-5 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-3.5 w-1/2 rounded-lg bg-slate-100 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-2/3 rounded-lg bg-slate-100 animate-pulse" />
                  <div className="h-3 w-1/2 rounded-lg bg-slate-100 animate-pulse" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header / Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">ADSA Desk</span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                Add Student
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Dash Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Directory</h1>
          <p className="mt-2 text-slate-500 font-medium">Manage and monitor all student profiles and academic statuses.</p>
        </div>

        {/* Search & Actions Bar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full max-w-lg group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <input
              type="text"
              placeholder="Search by student name, place, or ID..."
              className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{students.length}</span> students
            </div>
          </div>
        </div>

        {/* Grid Area */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {students.map((student) => {
              const initials = student.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
              return (
                <Link
                  key={student._id}
                  href={`/students/${student._id}`}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-100/60 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="p-5 flex flex-col flex-1">
                    {/* Header row: avatar + status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
                          {initials}
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${student.status?.toLowerCase() === 'active' ? 'bg-green-500' : student.status?.toLowerCase() === 'moved' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-0.5">
                      {student.name}
                    </h3>

                    {/* Admission number */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 shrink-0"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
                      <span className="text-xs font-semibold text-blue-500 tracking-wide font-mono">
                        {student.admissionNumber || 'No Adm. No.'}
                      </span>
                    </div>

                    {/* Info rows */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-slate-500 text-xs gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        <span className="truncate">{student.place}</span>
                      </div>
                      <div className="flex items-center text-slate-500 text-xs gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <span className="truncate">{student.phone}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0">
                        View profile →
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-blue-600 flex items-center justify-center text-slate-300 group-hover:text-white transition-all duration-300 ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 p-6 rounded-full text-slate-300 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No students found</h3>
            <p className="text-slate-500 text-center max-w-sm">
              We couldn&apos;t find any students matching your search. Try a different term or register a new student.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 shadow-blue-200"
            >
              Add New Student
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}