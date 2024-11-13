document.getElementById('cpf').addEventListener('input', function(e) {
    let cpf = e.target.value;
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço

    e.target.value = cpf;

    // Valida o CPF e exibe a mensagem de erro se for inválido
    const cpfError = document.getElementById('cpf-error');
    if (cpf.length === 14 && !isValidCPF(cpf)) {
        cpfError.style.display = 'inline';
    } else {
        cpfError.style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;

    if (!isValidCPF(cpf)) {
        alert('CPF inválido');
        return;
    }

    const user = { cpf, password };

    fetch('http://localhost:8080/api/auth/login/usuario', { // Corrigir URL aqui
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Erro ao fazer login');
    })
    .then(data => {
        const messageElement = document.getElementById('message');
        if (data.message === 'Login bem-sucedido') {
            window.location.href = '/cliniofrontend/pages/home.html'; // Redireciona para a tela home
        } else {
            messageElement.innerText = data.message; // Exibe a mensagem de erro
            messageElement.style.color = 'red'; // Define a cor da mensagem de erro como vermelha
        }
    })
    .catch(error => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = error.message;
            messageElement.style.color = 'red'; // Define a cor da mensagem de erro como vermelha
        } else {
            alert(error.message);
        }
    });
});

// Função de validação de CPF
function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    return resto === parseInt(cpf.charAt(10));
}
