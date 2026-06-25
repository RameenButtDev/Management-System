'use client';
export default function Navbar() {
  return (
    <nav style={{background:'white', borderBottom:'1px solid #e2e8f0', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
      <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
        <div style={{background:'#2563eb', color:'white', borderRadius:'10px', width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize:'13px', flexShrink:0}}>SMS</div>
        <div>
          <div style={{fontWeight:'700', fontSize:'14px', color:'#0f172a'}}>Student Management System</div>
          <div style={{fontSize:'10px', color:'#94a3b8'}}>Manage your students efficiently</div>
        </div>
      </div>
    </nav>
  );
}