const
    arrow = document.getElementById('arrow'),
    arrowMinute = document.getElementById('arrowMinute'),
    output = document.getElementById('output');

const
    pad = (num, size) => {
        const s = '000' + num;
        return s.substr(s.length - size);
    },
    timeFormatter = timeInMilliseconds => {
        const
            time = new Date(timeInMilliseconds),
            minutes = time.getMinutes().toString(),
            seconds = time.getSeconds().toString(),
            milliseconds = time.getMilliseconds().toString();
        return pad(minutes, 2) + ' : ' + pad(seconds, 2) + ' . ' + pad(milliseconds, 3);
    };

export default class Stopwatch {
    constructor() {
        this.isOn = false;

        this.time = 0;
        this.interval = 0;
        this.offset = false;
        this.degreesSecond = false;
        this.degreesMinute = false;
        this.arr = [];

        this.vendors = [
            'MozTransform',
            'webkitTransform',
            'OTransform',
            'MsTransform',
            'transform'
        ];
    }
    showDegrees = (element, degrees) => {
        this.vendors.forEach(browser => {
            element.style[browser] = 'rotate(' + (degrees - 90) + 'deg)';
        });
    };

    update = () => {
        if (this.isOn) {
            this.time += this.delta();
            this.degreesSecond = this.time / 60 * 360 / 1000;
            this.showDegrees(arrow, this.degreesSecond);
            this.degreesMinute = this.degreesSecond / 60;
            this.showDegrees(arrowMinute, this.degreesMinute);
        }
    };

    delta = () => {
        const now = Date.now();
        const timePassed = now - this.offset;
        this.offset = now;
        return timePassed;
    };

    start = () => {
        if (!this.isOn) {
            this.interval = setInterval(this.update, 10);
            this.offset = Date.now();
            this.isOn = true;
        }
    };

    stop = () => {
        if (this.isOn) {
            clearInterval(this.interval);
            //this.interval = null;
            this.isOn = false;
        }
    };

    reset = () => {
        this.time = 0;
        this.stop();
        this.showDegrees(arrow, 0);
        this.showDegrees(arrowMinute, 0);
        output.textContent = '';
        this.arr.length = 0;
    };

    split = () => {
        if (this.time !== 0) {
            if (this.arr.length < 5) {
                this.arr.push(timeFormatter(this.time) + '<br/>');
            } else {
                this.arr.pop();
                this.arr.push(timeFormatter(this.time));
            }
            output.innerHTML = this.arr.join('');
        }
    };
}
