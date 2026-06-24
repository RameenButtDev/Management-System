'use client';
const STATUS = {
  Active:{bg:'#dcfce7',color:'#15803d'},
  Inactive:{bg:'#f1f5f9',color:'#475569'},
  Graduated:{bg:'#ede9fe',color:'#6d28d9'},
  Suspended:{bg:'#fee2e2',color:'#dc2626'},
};
export default function StudentTable({ students, onEdit, onDelete }) {
  if (!students?.length) return (
    <div style={{textAlign:'center', padding:'60px 20px', color:'#94a3b8'}}>
      <div style={{fontSize:'52px', marginBottom:'12px'}}>🎓</div>
      <div style={{fontSize:'16px', fontWeight:'600', color:'#64748b'}}>No students found</div>
      <div style={{fontSize:'13px', marginTop:'6px'}}>Add a new student to get started</div>
    </div>
  );
  const thStyle = {padding:'12px 16px', textAlign:'left', fontWeight:'600', color:'#64748b', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.05em', background:'#f8fafc'};
  const tdStyle = {padding:'14px 16px', borderBottom:'1px solid #f1f5f9', color:'#334155', fontSize:'13px'};
  return (
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            {['Student','Roll No.','Department','Semester','CGPA','Status','Actions'].map(h=>(
              <th key={h} style={{...thStyle, textAlign:h==='Actions'?'center':'left'}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(s=>(
            <tr key={s._id} style={{transition:'background 0.15s'}}
              onMouseEnter={e=>{Array.from(e.currentTarget.cells).forEach(c=>c.style.background='#f8fafc')}}
              onMouseLeave={e=>{Array.from(e.currentTarget.cells).forEach(c=>c.style.background='')}}>
              <td style={tdStyle}>
                <div style={{fontWeight:'600', color:'#0f172a'}}>{s.name}</div>
                <div style={{fontSize:'11px', color:'#94a3b8', marginTop:'2px'}}>{s.email}</div>
              </td>
              <td style={tdStyle}><span style={{fontFamily:'monospace', fontSize:'11px', background:'#f1f5f9', padding:'3px 8px', borderRadius:'6px'}}>{s.rollNumber}</span></td>
              <td style={tdStyle}>{s.department}</td>
              <td style={{...tdStyle, textAlign:'center'}}>{s.semester}</td>
              <td style={tdStyle}><span style={{fontWeight:'700', color:s.cgpa>=3.5?'#16a34a':s.cgpa>=2.5?'#2563eb':'#d97706'}}>{s.cgpa?.toFixed(2)||'—'}</span></td>
              <td style={tdStyle}><span style={{...STATUS[s.status], padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'600'}}>{s.status}</span></td>
              <td style={{...tdStyle, textAlign:'center'}}>
                <div style={{display:'flex', gap:'6px', justifyContent:'center'}}>
                  <button onClick={()=>onEdit(s)} style={{background:'#eff6ff', color:'#2563eb', border:'none', padding:'6px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer'}}>Edit</button>
                  <button onClick={()=>onDelete(s._id, s.name)} style={{background:'#fef2f2', color:'#dc2626', border:'none', padding:'6px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer'}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}