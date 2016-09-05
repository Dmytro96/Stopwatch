// var time = new Date();
// function appendZero(func) {
//   if (func.toString().length == 2) {
//     var timeRez = func;
//   } else {
//     var timeRez = '0' + func;
//   }
//
//   return timeRez;
// }
//
// document.getElementById('clock').innerHTML =
//                                         appendZero(time.getHours()) + ':' +
//                                         appendZero(time.getMinutes()) + ':' +
//                                         appendZero(time.getSeconds());

// var myTime = setInterval(function () { time(); }, 1000);

function time() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  document.getElementById('clock').innerHTML = time;
}

function startStopwatch() {
  var myTimer = setInterval(function () { start(); }, 1000);
}

var degrees = -90;
function start() {
  degrees += 6;
  $('#arrow').css({ WebkitTransform: 'rotate(' + degrees + 'deg)' });
}

function pause() {
  var stop = 1;
}
