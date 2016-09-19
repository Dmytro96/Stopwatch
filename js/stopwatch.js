'use strict';

require('../css/common.css');

let arrow = document.getElementById('arrow');
let arrowMinute = document.getElementById('arrowMinute');
var output = document.getElementById('output');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');
var splitBtn = document.getElementById('split');

var watch = new Stopwatch();

function start () {
  watch.start();
  toggleBtn.textContent = 'Pause';
}

function stop () {
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
  var time = 0;
  var interval;
  var offset;
  var degreesSecond;
  var degreesMinute;
  var arr = [];
  var vendors = [
    'MozTransform',
    'webkitTransform',
    'OTransform',
    'MsTransform',
    'transform'
  ];

  function showDegrees (element, degrees) {
    for (var browser of vendors) {
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
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function pad (num, size) {
    var s = '000' + num;
    return s.substr(s.length - size);
  }

  function timeFormatter (timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();
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
      } else {
        arr.pop();
        arr.push(timeFormatter(time));
      }
      output.innerHTML = arr.join('');
    }
  };
}
