require('../css/common.css');

let arrow = document.getElementById('arrow');
var arrowMinute = document.getElementById('arrowMinute');
var output = document.getElementById('output');
let toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');
var splitBtn = document.getElementById('split');

var watch = new Stopwatch(timer);

function start() {
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
  watch.split();
});

function Stopwatch(elem) {
  var time = 0;
  var interval;
  var offset;
  var degreesSecond;
  var degreesMinute;
  var arr = [];
  var vendors = ['MozTransform', 'webkitTransform', 'OTransform', 'MsTransform', 'transform'];

  function showDegrees(element, degrees) {
    vendors.every(function (browser) {
      element.style[browser] = 'rotate(' + degrees + 'deg)';
    });
  }

  function update() {
    if (this.isOn) {
      time += delta();
      degreesSecond = (time / 60 * 360 / 1000) - 90;
      showDegrees(arrow, degreesSecond);
      degreesMinute = (degreesSecond + 90) / 60 - 90;
      showDegrees(arrowMinute, degreesMinute);
    }
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function pad(num, size) {
    var s = '000' + num;
    return s.substr(s.length - size);
  }

  function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();
    return pad(minutes, 2) + ' : ' + pad(seconds, 2) + ' . ' +
           pad(milliseconds, 3);
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
      degreesSecond = -90;
      arrow.style.webkitTransform = 'rotate(' + degreesSecond + 'deg)';
      arrowMinute.style.webkitTransform = 'rotate(' + degreesSecond + 'deg)';
      output.textContent = '';
      arr = [];
      update();
    };

  this.split = function () {
      if (time != 0) {
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
