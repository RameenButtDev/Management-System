'use client';
import { useState, useEffect } from 'react';

const DEPARTMENTS = ['Computer Science','Physics','Mathematics','Chemistry','Biology','Engineering','Other'];
const STATUSES = ['Active','Inactive','Graduated','Suspended'];
const EMPTY = { name:'', rollNumber:'', email:'', phone:'', department:'', semester:'', cgpa:'', status:'Active', address:'' };

export default function StudentModal({ isOpen, onClose, onSubmit, student, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(student ? {...EMPTY,...student} : EMPTY);
    setErrors({});
  }, [student, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.rollNumber.trim()) e.rollNumber = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.department) e.department = 'Required';
    if (!form.semester) e.semester = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setForm(p => ({...p, [name]:value}));
    if (errors[name]) setErrors(p => ({...p, [name]:''}));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  if (!isOpen) return null;

  const overlay = { position:'fixed', inset:0, background:'rgba(15,23,42,0.6)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', backdropFilter:'blur(4px)' };
  const modal = { background:'white', borderRadius:'20px', padding:'32px', width:'100%', maxWidth:'580px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 25px 60px rgba(0,0,0,0.2)' };
  const label = { fontSize:'12px', fontWeight:'600', color:'#475569', marginBottom:'5px', display:'block' };
  const input = { width:'100%', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:'#1e293b', outline:'none', background:'#f8fafc', transition:'border 0.2s' };
  const errStyle = { fontSize:'11px', color:'#dc2626', marginTop:'3px' };

  return (
    <div style={overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={modal}>

        {/* Header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'20px', fontWeight:'800', color:'#0f172a'}}>{student ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
            <p style={{fontSize:'12px', color:'#94a3b8', marginTop:'3px'}}>Fill in the details below</p>
          </div>
          <button onClick={onClose} style={{background:'#f1f5f9', border:'none', borderRadius:'10px', width:'36px', height:'36px', fontSize:'18px', cursor:'pointer', color:'#64748b', display:'flex', alignItems:'center', justifyContent:'center'}}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>

            {/* Name */}
            <div>
              <label style={label}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rameen Saddique"
                style={{...input, borderColor: errors.name?'#dc2626':'#e2e8f0'}}
                onFocus={e=>e.target.style.borderColor='#2563eb'}
                onBlur={e=>e.target.style.borderColor=errors.name?'#dc2626':'#e2e8f0'} />
              {errors.name && <p style={errStyle}>{errors.name}</p>}
            </div>

            {/* Roll Number */}
            <div>
              <label style={label}>Roll Number *</label>
              <input name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="e.g. CS-2024-001"
                style={{...input, borderColor: errors.rollNumber?'#dc2626':'#e2e8f0'}}
                onFocus={e=>e.target.style.borderColor='#2563eb'}
                onBlur={e=>e.target.style.borderColor=errors.rollNumber?'#dc2626':'#e2e8f0'} />
              {errors.rollNumber && <p style={errStyle}>{errors.rollNumber}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={label}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@example.com"
                style={{...input, borderColor: errors.email?'#dc2626':'#e2e8f0'}}
                onFocus={e=>e.target.style.borderColor='#2563eb'}
                onBlur={e=>e.target.style.borderColor=errors.email?'#dc2626':'#e2e8f0'} />
              {errors.email && <p style={errStyle}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={label}>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000"
                style={input}
                onFocus={e=>e.target.style.borderColor='#2563eb'}
                onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
            </div>

            {/* Department */}
            <div>
              <label style={label}>Department *</label>
              <select name="department" value={form.department} onChange={handleChange}
                style={{...input, borderColor: errors.department?'#dc2626':'#e2e8f0'}}>
                <option value="">Select Department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <p style={errStyle}>{errors.department}</p>}
            </div>

            {/* Semester */}
            <div>
              <label style={label}>Semester *</label>
              <select name="semester" value={form.semester} onChange={handleChange}
                style={{...input, borderColor: errors.semester?'#dc2626':'#e2e8f0'}}>
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              {errors.semester && <p style={errStyle}>{errors.semester}</p>}
            </div>

            {/* CGPA */}
            <div>
              <label style={label}>CGPA</label>
              <input name="cgpa" type="number" step="0.01" min="0" max="4" value={form.cgpa} onChange={handleChange} placeholder="e.g. 3.50"
                style={input}
                onFocus={e=>e.target.style.borderColor='#2563eb'}
                onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
            </div>

            {/* Status */}
            <div>
              <label style={label}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={input}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Address */}
          <div style={{marginTop:'16px'}}>
            <label style={label}>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Home address..." rows={2}
              style={{...input, resize:'none'}}
              onFocus={e=>e.target.style.borderColor='#2563eb'}
              onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>

          {/* Buttons */}
          <div style={{display:'flex', gap:'10px', marginTop:'24px'}}>
            <button type="submit" disabled={loading}
              style={{flex:1, background:'#2563eb', color:'white', border:'none', borderRadius:'12px', padding:'13px', fontSize:'14px', fontWeight:'700', cursor:'pointer'}}>
              {loading ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
            </button>
            <button type="button" onClick={onClose}
              style={{background:'#f1f5f9', color:'#475569', border:'none', borderRadius:'12px', padding:'13px 24px', fontSize:'14px', fontWeight:'600', cursor:'pointer'}}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}