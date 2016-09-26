import '../css/common.css';
import _ from 'lodash';

  export default class Stopwatch  {
    
    constructor(arrow, arrowMinute, output) {

      this.arrowd = arrow;
      this.arrowMinuted = arrowMinute;
      this.outputed = output;

      this.timer = 0;
      this.interval;
      this.offset;
      this.degreesSecond;
      this.degreesMinute;
      this.arr = [];
      this.vendors = [
        'MozTransform',
        'webkitTransform',
        'OTransform',
        'MsTransform',
        'transform'
      ];
      this.isOn = false;
    }

    showDegrees(element, degrees)  {
      _.each(this.vendors, browser => element.style[browser] = 'rotate(' + (degrees - 90) + 'deg)');
    }
   
    update() {
      if (this.isOn) {
        this.timer += this.delta();
        this.degreesSecond = this.timer / 60 * 360 / 1000;
        this.showDegrees(this.arrowd, this.degreesSecond);
        this.degreesMinute = this.degreesSecond / 60;
        this.showDegrees(this.arrowMinuted, this.degreesMinute);
      }
    }

    delta() {
      let now = Date.now();
      let timePassed = now - this.offset;
      this.offset = now;
      return timePassed;
    }

    static pad(num, size) {
      let s = '000' + num;
      return s.substr(s.length - size);
    }

    timeFormatter (timeInMilliseconds) {
      let asTime = new Date(timeInMilliseconds);
      let minutes = asTime.getMinutes().toString();
      let seconds = asTime.getSeconds().toString();
      let milliseconds = asTime.getMilliseconds().toString();
      return Stopwatch.pad(minutes, 2) + ' : ' + Stopwatch.pad(seconds, 2) + ' . ' + Stopwatch.pad(milliseconds, 3);
    }

    start() {
      if (!this.isOn) {
        setInterval(this.update(), 10);
        this.update();
        setInterval(undefined, 10)
        this.offset = Date.now();
        this.isOn = true;
      }
    };

    stop() {
      if (this.isOn) {
        clearInterval(this.interval);
        this.interval = null;
        this.isOn = false;
      }
    };

    reset() {
      this.timer = 0;
      stop();
      this.showDegrees(this.arrowd, 0);
      this.showDegrees(this.arrowMinuted, 0);
      this.outputed.textContent = '';
      this.arr = [];
    };

    split() {
      if (this.timer !== 0) {
        if (this.arr.length < 5) {
          this.arr.push(this.timeFormatter(this.timer) + '<br/>');
        } else {
          this.arr.pop();
          this.arr.push(this.timeFormatter(this.timer));
        }
        this.outputed.innerHTML = this.arr.join('');
      }
    };
  };




























