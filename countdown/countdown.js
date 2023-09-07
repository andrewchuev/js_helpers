(function() {
    function Countdown(element) {
        this.element = element;
        this.targetDate = new Date(this.element.getAttribute('data-target-date'));
        this.intervalID = null; // Для хранения ID setInterval
    }

    Countdown.prototype.calculateTimeLeft = function() {
        const now = new Date().getTime();
        const timeDifference = this.targetDate - now;

        const totalMinutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {
            totalMinutes: totalMinutes,
            seconds: seconds
        };
    }

    Countdown.prototype.updateElement = function() {
        const timeLeft = this.calculateTimeLeft();

        // Проверка на истечение времени
        if(timeLeft.totalMinutes <= 0 && timeLeft.seconds <= 0) {
            clearInterval(this.intervalID);  // Останавливаем таймер
            this.element.innerHTML = "";    // Удаляем сообщение
            return;
        }

        // Форматируем секунды (01 вместо 1, 09 вместо 9)
        const formattedSeconds = timeLeft.seconds.toString().padStart(2, '0');

        this.element.innerHTML = `${timeLeft.totalMinutes}:${formattedSeconds}`;
    }

    Countdown.prototype.start = function() {
        this.updateElement();  // обновляем сразу при старте

        // Запомните ID setInterval, чтобы вы могли его позже остановить
        this.intervalID = setInterval(() => {
            this.updateElement();
        }, 1000);
    }

    // Attach to window to make it globally available
    window.Countdown = Countdown;
})();
