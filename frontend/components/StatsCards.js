'use client';
export default function StatsCards({ stats }) {
  const cards = [
    { label:'Total Students', value:stats?.total||0, icon:'👥', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe' },
    { label:'Active Students', value:stats?.active||0, icon:'✅', color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0' },
    { label:'Graduated', value:stats?.graduated||0, icon:'🎓', color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe' },
    { label:'Average CGPA', value:stats?.avgCgpa||'0.00', icon:'📊', color:'#d97706', bg:'#fffbeb', border:'#fde68a' },
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'24px'}}>
      {cards.map(c => (
        <div key={c.label} style={{background:c.bg, border:`1px solid ${c.border}`, borderRadius:'16px', padding:'20px', transition:'transform 0.2s'}}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
          <div style={{fontSize:'24px', marginBottom:'10px'}}>{c.icon}</div>
          <div style={{fontSize:'30px', fontWeight:'800', color:c.color}}>{c.value}</div>
          <div style={{fontSize:'12px', color:'#64748b', marginTop:'4px', fontWeight:'500'}}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}