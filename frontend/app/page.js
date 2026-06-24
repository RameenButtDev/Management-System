'use client';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import StudentTable from '../components/StudentTable';
import StudentModal from '../components/StudentModal';
import { studentAPI } from '../lib/api';

const DEPARTMENTS = ['', 'Computer Science', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'Engineering', 'Other'];
const STATUSES = ['', 'Active', 'Inactive', 'Graduated', 'Suspended'];

export default function Home() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [toast, setToast] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: '', department: '', status: '', semester: '' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStudents = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filters };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const res = await studentAPI.getAll(params);
      setStudents(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      showToast('Failed to fetch students', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = async () => {
    try {
      const res = await studentAPI.getStats();
      setStats(res.data.data);
    } catch {}
  };

  useEffect(() => {
    fetchStudents(1);
    fetchStats();
  }, [fetchStudents]);

  const handleSubmit = async (formData) => {
    setModalLoading(true);
    try {
      if (editStudent) {
        await studentAPI.update(editStudent._id, formData);
        showToast('Student updated successfully!');
      } else {
        await studentAPI.create(formData);
        showToast('Student added successfully!');
      }
      setIsModalOpen(false);
      setEditStudent(null);
      fetchStudents(1);
      fetchStats();
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await studentAPI.delete(id);
      showToast('Student deleted!');
      fetchStudents(1);
      fetchStats();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const s = {
    main: { maxWidth:'1200px', margin:'0 auto', padding:'28px 24px', background:'#f1f5f9', minHeight:'100vh' },
    card: { background:'white', borderRadius:'20px', border:'1px solid #e2e8f0', padding:'28px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
    cardHeader: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' },
    cardTitle: { fontSize:'22px', fontWeight:'800', color:'#0f172a' },
    cardSub: { fontSize:'13px', color:'#94a3b8', marginTop:'4px' },
    addBtn: { background:'#2563eb', color:'white', border:'none', borderRadius:'12px', padding:'11px 20px', fontSize:'14px', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' },
    filtersGrid: { display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'10px', marginBottom:'24px' },
    input: { border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:'#1e293b', background:'#f8fafc', outline:'none', width:'100%' },
  };

  return (
    <div style={{background:'#f1f5f9', minHeight:'100vh'}}>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div style={{position:'fixed', top:'20px', right:'20px', zIndex:999, padding:'14px 22px', borderRadius:'12px', color:'white', fontSize:'14px', fontWeight:'600', boxShadow:'0 4px 20px rgba(0,0,0,0.15)', background: toast.type==='error'?'#dc2626':'#16a34a'}}>
          {toast.type === 'success' ? '✅ ' : '❌ '}{toast.message}
        </div>
      )}

      <main style={s.main}>
        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Table Card */}
        <div style={s.card}>
          {/* Header */}
          <div style={s.cardHeader}>
            <div>
              <div style={s.cardTitle}>Students</div>
              <div style={s.cardSub}>{pagination.total} total records</div>
            </div>
            <button style={s.addBtn} onClick={() => { setEditStudent(null); setIsModalOpen(true); }}>
              + Add Student
            </button>
          </div>

          {/* Filters */}
          <div style={s.filtersGrid}>
            <input
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              style={s.input}
              placeholder="🔍  Search name, roll no, email..."
            />
            <select name="department" value={filters.department} onChange={handleFilterChange} style={s.input}>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d || 'All Departments'}</option>)}
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange} style={s.input}>
              {STATUSES.map(s => <option key={s} value={s}>{s || 'All Status'}</option>)}
            </select>
            <select name="semester" value={filters.semester} onChange={handleFilterChange} style={s.input}>
              <option value="">All Semesters</option>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>

          {/* Table */}
          {loading ? (
            <div style={{textAlign:'center', padding:'60px', color:'#94a3b8', fontSize:'16px'}}>
              ⏳ Loading students...
            </div>
          ) : (
            <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div style={{display:'flex', justifyContent:'center', gap:'8px', marginTop:'24px'}}>
              {Array.from({length: pagination.pages}, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => fetchStudents(page)}
                  style={{width:'36px', height:'36px', borderRadius:'10px', border:'1.5px solid', fontSize:'13px', fontWeight:'600', cursor:'pointer',
                    borderColor: pagination.page===page ? '#2563eb' : '#e2e8f0',
                    background: pagination.page===page ? '#2563eb' : 'white',
                    color: pagination.page===page ? 'white' : '#64748b'}}>
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditStudent(null); }}
        onSubmit={handleSubmit}
        student={editStudent}
        loading={modalLoading}
      />
    </div>
  );
}