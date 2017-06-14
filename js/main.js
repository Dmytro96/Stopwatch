import '../css/common.css';
import Stopwatch from "./stopwatch";
const
    toggleBtn = document.getElementById('toggle'),
    resetBtn = document.getElementById('reset'),
    splitBtn = document.getElementById('split');

const watch = new Stopwatch();

const
  start = () => {
      watch.start();
      toggleBtn.textContent = 'Pause';
  },
  stop = () => {
      watch.stop();
      toggleBtn.textContent = 'Start';
  };

toggleBtn.addEventListener('click', () => watch.isOn ? stop() : start());
resetBtn.addEventListener('click', () => watch.reset());
splitBtn.addEventListener('click', () => watch.split());
