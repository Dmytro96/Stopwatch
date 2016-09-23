
const arrow = document.getElementById('arrow');
const arrowMinute = document.getElementById('arrowMinute');
const output = document.getElementById('output');
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');
const splitBtn = document.getElementById('split');

import Stopwatch from './stopwatchES6';
let watch = new Stopwatch(arrow, arrowMinute, output);


function start () {
  watch.start();
  toggleBtn.textContent = 'Pause';
}

function stop() {
  watch.stop();
  toggleBtn.textContent = 'Start';
}

toggleBtn.addEventListener('click', function () {
  (watch.isOn) ? stop() : start();
});

resetBtn.addEventListener('click', function () {
  watch.reset();
});

splitBtn.addEventListener('click', function () {
  watch.split()
});