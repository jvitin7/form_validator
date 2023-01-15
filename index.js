function validadeName(name) {
    if(!name.match(/^[^0-9_]+$|\s{1,}/)) {
        const error = new Error('Nome Inválido');
        error.input = 'name';
        throw error;
    }
}

function validateEmail(email) {
    if(!email.match(/\w{2,}@[a-zA-z]{2,}\.[a-zA-Z]{2,}/)) {
        const error = new Error('Email inválido');
        error.input = 'email';
        throw error;
    }
}

function validatePassword(password) {
    if(
        password.length < 8 ||
        !password.match(/[a-z]/) ||
        !password.match(/[A-Z]/) ||
        !password.match(/[0-9]/) ||
        !password.match(/[^a-zA-Z0-9\s]/)
    ) {
        const error = new Error('Senha inválida');
        error.input = 'password';
        throw error;
    }
}

function resetFormStyles() {
    Object.entries(userData).forEach(([key, value]) => {
        value.classList.remove('success', 'error');
        document.querySelector(`#${key}-error`).textContent = '';
    });
}

const userData = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    password: document.querySelector('#password')
};

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    resetFormStyles();

    try {
        validadeName(userData.name.value)
        userData.name.classList.add('success');
        validateEmail(userData.email.value);
        userData.email.classList.add('success');
        validatePassword(userData.password.value);
        userData.password.classList.add('success');
    } catch (error) {
        userData[error.input].classList.add('error');
        document.querySelector(`#${error.input}-error`).textContent = error.message;
    }
});