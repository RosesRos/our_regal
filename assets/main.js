// Lang switcher and show pass

window.addEventListener('load', function () {

    document.querySelector('.langs').addEventListener('click', function() {
        document.querySelector('.langs .langs__list').classList.toggle('show');
        document.querySelector('.langs .langs__switcher-icon').classList.toggle('show');
    });

    document.getElementById('toggle-pass').addEventListener('click', function() {
        let inputPass = document.getElementById('password');
        if (inputPass.type === 'password') {
            inputPass.type = 'text';
        } else {
            inputPass.type = 'password';
        }
    });

    document.querySelector('.terms-btn').addEventListener('click', function() {
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('.body').classList.add('hidden');
    });

    document.querySelector('.close-btn').addEventListener('click', function() {
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.body').classList.remove('hidden');
    });

    document.querySelector('.modal').addEventListener('click', function() {
        this.style.display = 'none';
        document.querySelector('.body').classList.remove('hidden');
    });

});

// Jackpot curency

const currencyCount = ({ $introTimer, initCurrency, updateInterval = 1000, upStep = 1 }) => {
    const DECIMAL_LENGTH = 2;
    let initValue = initCurrency;

    function getRandomFloat(min, max, decimals) {
        const str = (Math.random() * (max - min) + min).toFixed(decimals);

        return parseFloat(str);
    }

    function render() {
        let num = $introTimer.innerHTML = initValue.toLocaleString('en', { style: 'currency', currency: 'EUR' });
        localStorage.setItem('currency', num);
    }

    render();

    setInterval(() => {
        initValue += getRandomFloat(1, 10000, DECIMAL_LENGTH);
        render()

    }, updateInterval)
}

const saveEl = localStorage.getItem('currency');
const $introTimer = document.querySelector('.jackpot__timer');

const str = saveEl ? Number(saveEl.slice(1).split(',').join('')) : null;
const initCurrency = saveEl ? str : 91147134.25;
$introTimer && currencyCount({ $introTimer, initCurrency });

// Slider

var swiper = new Swiper(".gallerySwiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 17,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 24,
        }
    }
});