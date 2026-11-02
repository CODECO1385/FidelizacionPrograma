// Demo con datos estáticos. Cambia estos valores para personalizar.
const DATA = { points: 450, goal: 1000 };

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.append(t); setTimeout(() => t.remove(), 2600);
}

function modal(title, text, actions) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="overlay"><div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
    <h3>${title}</h3><p>${text}</p><div class="row"></div></div></div>`;
  const row = $('.row', root);
  actions.forEach(a => {
    const b = document.createElement('button');
    b.className = 'btn' + (a.ghost ? ' ghost' : ''); b.textContent = a.label;
    b.onclick = () => { root.innerHTML = ''; a.run && a.run(); };
    row.append(b);
  });
  $('.overlay', root).onclick = e => { if (e.target.classList.contains('overlay')) root.innerHTML = ''; };
  $('button', row).focus();
}

// Lo siguiente solo aplica a index.html
if ($('#fill')) {
  setTimeout(() => { $('#fill').style.width = (DATA.points / DATA.goal * 100) + '%'; }, 150);

  $('[data-modal="reward"]').onclick = () => modal(
    '$10 de descuento',
    `Tienes ${DATA.points} puntos. Necesitas ${DATA.goal} para canjear esta recompensa; te faltan ${DATA.goal - DATA.points}.`,
    [{ label: 'Canjear', run: () => toast('Aún no tienes puntos suficientes') }, { label: 'Cerrar', ghost: true }]);

  $('#bell').onclick = () => modal('Notificaciones', 'Ganaste +50 puntos en tu última compra.', [{ label: 'Entendido' }]);
  $$('[data-toast]').forEach(b => b.onclick = () => toast(b.dataset.toast));

  const tabText = {
    'Mis recompensas': 'Aquí verás tus recompensas disponibles y canjeadas.',
    'Promociones': 'Aquí verás todas las promociones activas.',
    'Perfil': 'Aquí verás tus datos y tu historial de compras.'
  };
  $$('.tabbar button').forEach(b => b.onclick = () => {
    $$('.tabbar button').forEach(x => x.classList.toggle('on', x === b));
    if (b.dataset.tab !== 'Inicio') modal(b.dataset.tab, tabText[b.dataset.tab] + ' (pantalla de demostración)', [{ label: 'Cerrar' }]);
  });
}
