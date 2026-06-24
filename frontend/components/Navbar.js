'use client';
export default function Navbar() {
  return (
    <nav style={{background:'white', borderBottom:'1px solid #e2e8f0', padding:'0 32px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
      <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
        <div style={{background:'linear-gradient(135deg,#2563eb,#1d4ed8)', color:'white', borderRadius:'12px', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize:'14px'}}>SMS</div>
        <div>
          <div style={{fontWeight:'700', fontSize:'16px', color:'#0f172a'}}>Student Management System</div>
          <div style={{fontSize:'11px', color:'#94a3b8'}}>Manage your students efficiently</div>
        </div>
      </div>
      <div style={{fontSize:'12px', color:'#64748b', background:'#f8fafc', padding:'6px 14px', borderRadius:'20px', border:'1px solid #e2e8f0'}}>Next.js & MongoDB</div>
    </nav>
  );
}