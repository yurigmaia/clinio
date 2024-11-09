document.getElementById('cpf').addEventListener('input', function(e) {
    let cpf = e.target.value;
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço

    e.target.value = cpf;

    // Valida o CPF e exibe a mensagem de erro se for inválido
    const cpfError = document.getElementById('cpf-error');
    if (!isValidCPF(cpf)) {
        cpfError.style.display = 'inline';
    } else {
        cpfError.style.display = 'none';
    }
});

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!isValidCPF(cpf)) {
        alert('CPF inválido');
        return;
    }

    const user = { nome, cpf, email, password };

    fetch('http://localhost:8080/api/usuarios/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
