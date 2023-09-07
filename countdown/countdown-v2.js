export default class Countdown {
    constructor(element) {
        this.element = element;
        this.targetDate = new Date( this.element.getAttribute( 'data-target-date' ) );
        this.intervalID = null;
    }

    calculateTimeLeft() {
        const now = new Date().getTime();
        const timeDifference = this.targetDate - now;
        const totalMinutes = Math.floor( timeDifference / (1000 * 60) );
        const seconds = Math.floor( (timeDifference % (1000 * 60)) / 1000 );

        return {
            totalMinutes,
            seconds,
        };
    }

    updateElement() {
        const { totalMinutes, seconds } = this.calculateTimeLeft();

        if ( totalMinutes <= 0 && seconds <= 0 ) {
            clearInterval( this.intervalID );
            this.element.innerHTML = '';
            return;
        }

        const formattedSeconds = seconds.toString().padStart( 2, '0' );
        this.element.innerHTML = `${ totalMinutes }:${ formattedSeconds }`;
    }

    start() {
        this.updateElement();
        this.intervalID = setInterval( () => this.updateElement(), 1000 );
    }
}

