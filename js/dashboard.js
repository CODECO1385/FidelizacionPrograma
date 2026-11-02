const STATS = [
  ['C', '1,248', 'Clientes registrados', '12%'],
  ['P', '89,430', 'Puntos emitidos', '18%'],
  ['R', '612', 'Recompensas canjeadas', '22%'],
  ['A', '856', 'Clientes activos', '9%']
];
const POPULAR = [['$10 de descuento', 45], ['Bebida gratis', 35], ['Postre gratis', 20]];
const ACTIVITY = [
  ['Alan', 'Compra registrada', '+50', 'Completado'],
  ['María', 'Compra registrada', '+100', 'Completado'],
  ['Carlos', 'Canje de recompensa', '-1,000', 'Canjeado'],
  ['Sofía', 'Compra registrada', '+50', 'Completado']
];
const GROWTH = { labels: ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'], data: [580, 670, 850, 950, 1050, 1248] };

$('#stats').innerHTML = STATS.map(s => `<div class="panel stat"><div class="ic">${s[0]}</div><b>${s[1]}</b><span>${s[2]}</span><em class="up" style="font-style:normal">↑ ${s[3]}</em></div>`).join('');
$('#popular').innerHTML = POPULAR.map(p => `<div class="pop"><div><span>${p[0]}</span><b>${p[1]}%</b></div><div class="track"><i style="width:${p[1]}%"></i></div></div>`).join('');
$('#activity').innerHTML = ACTIVITY.map(a => `<tr><td>${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td><td><span class="tag ${a[3] === 'Canjeado' ? 'red' : ''}">${a[3]}</span></td></tr>`).join('');

if (window.Chart) new Chart($('#chart'), {
  type: 'line',
  data: { labels: GROWTH.labels, datasets: [{ data: GROWTH.data, borderColor: '#E9AE32', backgroundColor: 'rgba(245,204,117,.3)', fill: true, tension: .35, pointBackgroundColor: '#171717' }] },
  options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 1500 } } }
});

const titles = { dashboard: 'Dashboard de Fidelización', clientes: 'Clientes', puntos: 'Puntos y recompensas', promos: 'Promociones', reportes: 'Reportes', config: 'Configuración' };
$$('.nav').forEach(b => b.onclick = () => {
  $$('.nav').forEach(x => x.classList.toggle('on', x === b));
  $$('.sec').forEach(s => s.classList.toggle('hidden', s.id !== 'sec-' + b.dataset.sec));
  $('#title').textContent = titles[b.dataset.sec];
});
$$('[data-toast]').forEach(b => b.onclick = () => toast(b.dataset.toast));
$('#history').onclick = () => modal('Historial de transacciones', ACTIVITY.map(a => `${a[0]}: ${a[1]} (${a[2]})`).join('<br>'), [{ label: 'Cerrar' }]);
