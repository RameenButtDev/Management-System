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
      <div style={{fontSize:'48px', marginBottom:'12px'}}>🎓</div>
      <div style={{fontSize:'15px', fontWeight:'600', color:'#64748b'}}>No students found</div>
      <div style={{fontSize:'13px', marginTop:'6px'}}>Add a new student to get started</div>
    </div>
  );

  return (
    <>
      {/* Mobile Cards */}
      <div style={{display:'none'}} className="mobile-cards">
        {students.map(s => (
          <div key={s._id} style={{border:'1px solid #e2e8f0', borderRadius:'12px', padding:'16px', marginBottom:'10px', background:'white'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px'}}>
              <div>
                <div style={{fontWeight:'700', fontSize:'14px', color:'#0f172a'}}>{s.name}</div>
                <div style={{fontSize:'11px', color:'#94a3b8', marginTop:'2px'}}>{s.email}</div>
              </div>
              <span style={{...STATUS[s.status], padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'600'}}>{s.status}</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', fontSize:'12px', color:'#64748b', marginBottom:'12px'}}>
              <div><span style={{fontWeight:'600'}}>Roll: </span>{s.rollNumber}</div>
              <div><span style={{fontWeight:'600'}}>Dept: </span>{s.department}</div>
              <div><span style={{fontWeight:'600'}}>Semester: </span>{s.semester}</div>
              <div><span style={{fontWeight:'600'}}>CGPA: </span><span style={{color:s.cgpa>=3.5?'#16a34a':s.cgpa>=2.5?'#2563eb':'#d97706', fontWeight:'700'}}>{s.cgpa?.toFixed(2)||'—'}</span></div>
            </div>
            <div style={{display:'flex', gap:'8px'}}>
              <button onClick={()=>onEdit(s)} style={{flex:1, background:'#eff6ff', color:'#2563eb', border:'none', padding:'8px', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer'}}>Edit</button>
              <button onClick={()=>onDelete(s._id, s.name)} style={{flex:1, background:'#fef2f2', color:'#dc2626', border:'none', padding:'8px', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="desktop-table" style={{overflowX:'auto'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
          <thead>
            <tr style={{background:'#f8fafc'}}>
              {['Student','Roll No.','Department','Sem','CGPA','Status','Actions'].map(h=>(
                <th key={h} style={{padding:'12px 16px', textAlign:'left', fontWeight:'600', color:'#64748b', fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.05em'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(s=>(
              <tr key={s._id}>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9'}}>
                  <div style={{fontWeight:'600', color:'#0f172a'}}>{s.name}</div>
                  <div style={{fontSize:'11px', color:'#94a3b8'}}>{s.email}</div>
                </td>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9', fontFamily:'monospace', fontSize:'11px', color:'#64748b'}}>{s.rollNumber}</td>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9', color:'#334155'}}>{s.department}</td>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9', color:'#334155', textAlign:'center'}}>{s.semester}</td>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9'}}>
                  <span style={{fontWeight:'700', color:s.cgpa>=3.5?'#16a34a':s.cgpa>=2.5?'#2563eb':'#d97706'}}>{s.cgpa?.toFixed(2)||'—'}</span>
                </td>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9'}}>
                  <span style={{...STATUS[s.status], padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'600'}}>{s.status}</span>
                </td>
                <td style={{padding:'14px 16px', borderBottom:'1px solid #f1f5f9'}}>
                  <div style={{display:'flex', gap:'6px'}}>
                    <button onClick={()=>onEdit(s)} style={{background:'#eff6ff', color:'#2563eb', border:'none', padding:'6px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer'}}>Edit</button>
                    <button onClick={()=>onDelete(s._id, s.name)} style={{background:'#fef2f2', color:'#dc2626', border:'none', padding:'6px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer'}}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}