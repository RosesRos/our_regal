
// Set default country user

function setUserCountry(userCountryName, userCountryCode) {
    const trigger = document.querySelector('.select__trigger-country span');
    const options = document.querySelectorAll('.select__options-option-country');
    const hiddenInput = document.getElementById('country');

    trigger.textContent = userCountryName;
    //trigger.dataset.value = userCountryCode;
    hiddenInput.value = userCountryCode;

    options.forEach(option => {
        if(option.dataset.value === userCountryCode) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
} 

function getGeoInfo() {
    fetch('https://pro.ip-api.com/json/?key=Ztj8LTz5LqZvnmD')
        .then(response => response.json())
        .then(data => {
            //document.getElementById('country').value = data.countryCode;
            document.getElementById('city').value = data.city;
            document.getElementById('address').value = data.as;
            document.getElementById('zip').value = data.zip;
            document.getElementById('registration_ip').value = data.query;
            const userCountryCode = data.countryCode;
            const userCountry = data.country;
            setUserCountry(userCountry, userCountryCode);
        })
        .catch(err => console.error(err));
}

// Country list

function getCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countires => {
            const optionsContainer = document.querySelector('.select__options');
            countires.forEach(country => {
                const option = document.createElement('li');
                option.classList.add('select__options-option-country');
                option.textContent = country.name.common;
                option.dataset.value = country.cca2;
                optionsContainer.appendChild(option);
            });
        })
        .catch(err => console.error(err));
}

// Currency select

document.querySelector('.currency-select').addEventListener('click', function() {
    document.querySelector('.select__options-currency').classList.toggle('show');
    document.querySelector('.select__trigger-currency').classList.toggle('show');
    document.querySelector('.select__trigger-currency .select__trigger-icon').classList.toggle('show');
}); 

for (const option of document.querySelectorAll(".select__options-option-currency")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.select__options-option-currency.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select__trigger-currency span').textContent = this.textContent;

            document.getElementById('currency').value = this.dataset.value;
        }
    })
}

// Country select

function showSelect() {
    const optionsCountry = document.querySelector('.select__options-country');
    const triggerCountry = document.querySelector('.select__trigger-country');
    const triggerIcon = document.querySelector('.select__trigger-country .select__trigger-icon');

    optionsCountry.classList.toggle('show');
    triggerCountry.classList.toggle('show');
    triggerIcon.classList.toggle('show');
}

document.querySelector('.country-select').addEventListener('click', function(event) {
    showSelect();
    event.stopPropagation();
});

document.querySelector('.select__options-country').addEventListener('click', function(event) {
    if (event.target.classList.contains('select__options-option-country')) {
        const selectedCountryName = event.target.textContent;
        const selectedCountryCode = event.target.dataset.value;

        setUserCountry(selectedCountryName, selectedCountryCode); 
        showSelect();

        event.stopPropagation();
    }
});

document.addEventListener('click', function(event) {
    const isClickInside = document.querySelector('.country-select').contains(event.target);
    if (!isClickInside) {
        const optionsCountry = document.querySelector('.select__options-country');
        if (optionsCountry.classList.contains('show')) {
            showSelect();
        }
    }
});

// Search

document.querySelector('.select__options-search').addEventListener('input', function(e) {
    const searchValue = e.target.value.toLowerCase();
    const options = document.querySelectorAll('.select__options-option-country');

    options.forEach(option => {
        const countryName = option.textContent.toLowerCase();
        if (countryName.includes(searchValue)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
});

document.querySelector('.select__options-search').addEventListener('click', function(e) {
    e.stopPropagation();
});

// Validate email field

function validateEmail(email) {
    return fetch('https://xcourapi.info/api/validate_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email })
    }) .then( response => response.json())
        .then(data => {
            if( data.email ) {
                document.getElementById('email').classList.add('valid');
                document.getElementById('email').classList.remove('invalid');
                return true;
            } else {
                document.getElementById('email').classList.add('invalid');
                document.getElementById('email').classList.remove('valid');
                return false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

// Validate password field

function validatePass(password) {
    return fetch('https://xcourapi.info/api/validate_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "password": password })
    }) .then( response => response.json())
        .then(data => {
            if( data.password ) {
                document.getElementById('password').classList.add('valid');
                document.getElementById('password').classList.remove('invalid');
                return true;
            } else {
                document.getElementById('password').classList.add('invalid');
                document.getElementById('password').classList.remove('valid');
                return false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

// Validate checkbox terms

function validateCheck(check) { 
    return new Promise(resolve => {
        if (check) {
            document.getElementById('check-terms').classList.remove('invalid');
            resolve(true);
        } else {
            document.getElementById('check-terms').classList.add('invalid');
            resolve(false);
        }
    });
}

// Form validation

function checkFormValidation() {
    const emailValidation = validateEmail(document.getElementById('email').value);
    const passwordValidation = validatePass(document.getElementById('password').value);
    const checkTerms = validateCheck(document.getElementById("check-terms").checked);

    Promise.all([emailValidation, passwordValidation, checkTerms]).then(values => {
        const allValid = values.every(value => value === true);
        document.getElementById('btn-next').disabled = !allValid;
    }).catch(error => {
        console.error('Error during validation:', error);
        document.getElementById('btn-next').disabled = true;
    });
}

// Button next

document.getElementById('btn-next').addEventListener('click', function() {
    this.classList.remove('active');
    for (const btns of document.querySelectorAll(".registration__buttons-btn-2")) {
        btns.classList.add('active');
    }
    document.querySelector('.registration__steps-block-1').classList.remove('active');
    document.querySelector('.registration__steps-block-2').classList.add('active');
    document.querySelector('.form-step-title-1').classList.remove('active');
    document.querySelector('.form-step-title-2').classList.add('active');
});

// Button back

document.getElementById('btn-back').addEventListener('click', function() {
    for (const btns of document.querySelectorAll(".registration__buttons-btn-2")) {
        btns.classList.remove('active');
    }
    document.querySelector(".registration__buttons-btn-1").classList.add('active');
    document.querySelector('.registration__steps-block-2').classList.remove('active');
    document.querySelector('.registration__steps-block-1').classList.add('active');
    document.querySelector('.form-step-title-2').classList.remove('active');
    document.querySelector('.form-step-title-1').classList.add('active');
});

document.getElementById('email').addEventListener('change', checkFormValidation);
document.getElementById('password').addEventListener('change', checkFormValidation);
document.getElementById('check-terms').addEventListener('change', checkFormValidation);

document.getElementById('reg-form').addEventListener('submit', function(event) {

    event.preventDefault();

    const geo = new URLSearchParams(window.location.search).get('geo');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,
        currency: document.getElementById('currency').value,
        email: email,
        password: password,
        birthday: "",
        city: document.getElementById('city').value,
        address: document.getElementById('address').value,
        zip: document.getElementById('zip').value,
        registration_ip: document.getElementById('registration_ip').value,
        social: false,
        affid: new URLSearchParams(window.location.search).get('affid'),
        subaff: new URLSearchParams(window.location.search).get('subaff'),
        subaff1: new URLSearchParams(window.location.search).get('subaff1'),
        subaff2: new URLSearchParams(window.location.search).get('subaff2')
    };

    let isValid = true;
    let firstInvalidElement = null;

    const firstFourKeys = Object.keys(formData).slice(0,3);

    for (const key of firstFourKeys) {
        if (formData[key].trim() === '') {
            isValid = false;
            document.getElementById(key).classList.add('invalid');
            if (!firstInvalidElement) {
                firstInvalidElement = document.getElementById(key);
            }
        } else {
            document.getElementById(key).classList.remove('invalid');
            document.getElementById(key).classList.add('valid');
        }
    }

    const loader = document.getElementById('loader');
    loader.style.display = 'flex';

    fetch('https://xcourapi.info/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }) .then( response => response.json()) 
        .then(data => {
            if (data.tokenx && data.auto_token)  {
                const redirectUrl = `https://ucdispx.com/${geo}/?auto_token=${data.auto_token}&tokenx=${data.tokenx}`;
                localStorage.setItem('redirectLink', redirectUrl);
                window.location.href = redirectUrl;
                loader.style.display = 'none';
                document.getElementById('btn-submit').disabled = true;
            } else {
                console.error('Required tokens not found in the response');
            }
        }) 
        .catch((error) => { 
            console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const savedUrl = localStorage.getItem('redirectLink');
    if (savedUrl) {
        window.location.href = savedUrl;
    }
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('affid').value = urlParams.get('affid') || '';
    document.getElementById('subaff').value = urlParams.get('subaff') || '';
    document.getElementById('subaff1').value = urlParams.get('subaff1') || '';
    document.getElementById('subaff2').value = urlParams.get('subaff2') || '';
    getGeoInfo();
    getCountries();
});
