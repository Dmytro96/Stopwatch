require('../css/common.css');

var arrow = document.getElementById('arrow');
var arrowMinute = document.getElementById('arrowMinute');
var output = document.getElementById('output');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');
var splitBtn = document.getElementById('split');

var stopwatch = require('./stopwatch.js');

var watch = new stopwatch.Stopwatch(arrow, arrowMinute, output);

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
