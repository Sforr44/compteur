let count = 0;
const n = document.getElementById('n');
const p = document.getElementById('p');
const zone = document.getElementById('zone');

try { count = parseInt(localStorage.getItem('compteur')) || 0; } catch (e) {}

function render(animate) {
  n.textContent = count;
  p.style.strokeDashoffset = 597 - 597 * ((count % 10) / 10);
  try { localStorage.setItem('compteur', count); } catch (e) {}
  if (animate) { n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); }
}

zone.addEventListener('pointerdown', (e) => {
  count++;
  render(true);
  if (navigator.vibrate) navigator.vibrate(10);
  const r = document.createElement('span');
  r.className = 'ripple';
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  zone.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

document.getElementById('undo').addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  if (count > 0) count--;
  render(false);
});

document.getElementById('reset').addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  count = 0;
  render(false);
});

render(false);