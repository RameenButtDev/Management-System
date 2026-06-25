'use client';
export default function StatsCards({ stats }) {
  const cards = [
    { label:'Total Students', value:stats?.total||0, icon:'👥', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe' },
    { label:'Active', value:stats?.active||0, icon:'✅', color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0' },
    { label:'Graduated', value:stats?.graduated||0, icon:'🎓', color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe' },
    { label:'Avg CGPA', value:stats?.avgCgpa||'0.00', icon:'📊', color:'#d97706', bg:'#fffbeb', border:'#fde68a' },
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px', marginBottom:'16px'}}>
      {cards.map(c => (
        <div key={c.label} style={{background:c.bg, border:`1px solid ${c.border}`, borderRadius:'14px', padding:'16px'}}>
          <div style={{fontSize:'20px', marginBottom:'8px'}}>{c.icon}</div>
          <div style={{fontSize:'26px', fontWeight:'800', color:c.color}}>{c.value}</div>
          <div style={{fontSize:'11px', color:'#64748b', marginTop:'3px', fontWeight:'500'}}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}