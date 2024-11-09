export function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
            initPageScripts(page);
        });
}

export function initPageScripts(page) {
    if (page === 'login') {
        initLogin();
    } else if (page === 'cadastro') {
        initCadastro();
    }
}

function initLogin() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const cpf = document.getElementById('cpf').value;
        const password = document.getElementById('password').value;

        const user = { cpf, password };

        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Erro ao fazer login');
        })
        .then(message => {
            document.getElementById('message').innerText = message;
        })
        .catch(error => {
            document.getElementById('message').innerText = error.message;
        });
    });
}

function initCadastro() {
    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = { nome, cpf, email, password };

        fetch('http://localhost:8080/api/usuarios/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Erro ao cadastrar usuário');
        })
        .then(message => {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        })
        .catch(error => {
            alert(error.message);
        });
    });
}
