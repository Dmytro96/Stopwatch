'use strict';

require('../css/common.css');

const arrow = document.getElementById('arrow');
const arrowMinute = document.getElementById('arrowMinute');
const output = document.getElementById('output');
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');
const splitBtn = document.getElementById('split');

let watch = new Stopwatch();

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

function Stopwatch () {
  let time = 0;
  let interval;
  let offset;
  let degreesSecond;
  let degreesMinute;
  let arr = [];

  const vendors = [
    'MozTransform',
    'webkitTransform',
    'OTransform',
    'MsTransform',
    'transform'
  ];

  function showDegrees (element, degrees) {
    for (let browser of vendors) {
      element.style[browser] = 'rotate(' + (degrees - 90) + 'deg)';
    }
  }

  function update () {
    if (this.isOn) {
      time += delta();
      degreesSecond = time / 60 * 360 / 1000;
      showDegrees(arrow, degreesSecond);
      degreesMinute = degreesSecond / 60;
      showDegrees(arrowMinute, degreesMinute);
    }
  }

  function delta () {
    let now = Date.now();
    let timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function pad (num, size) {
    let s = '000' + num;
    return s.substr(s.length - size);
  }

  function timeFormatter (timeInMilliseconds) {
    let time = new Date(timeInMilliseconds);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    let milliseconds = time.getMilliseconds().toString();
    return pad(minutes, 2) + ' : ' + pad(seconds, 2) + ' . ' + pad(milliseconds, 3);
  }

  this.isOn = false;

  this.start = function () {
    if (!this.isOn) {
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      this.isOn = true;
    }
  };

  this.stop = function () {
    if (this.isOn) {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };

  this.reset = function () {
    time = 0;
    stop();
    showDegrees(arrow, 0);
    showDegrees(arrowMinute, 0);
    output.textContent = '';
    arr = [];
    update.bind(this);
  };

  this.split = function () {
    if (time !== 0) {
      if (arr.length < 5) {
        arr.push(timeFormatter(time) + '<br/>');
      } else {p
        arr.pop();
        arr.push(timeFormatter(time));
      }
      output.innerHTML = arr.join('');
    }
  };
}
let pow = function () {
  return 8;
}

exports.pow = pow;

console.log(pow());
