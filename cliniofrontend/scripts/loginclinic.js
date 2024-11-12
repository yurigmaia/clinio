document.getElementById('cnpj').addEventListener('input', function(e) {
    let cnpj = e.target.value;
    cnpj = cnpj.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona o segundo ponto
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Adiciona a barra
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona o traço

    e.target.value = cnpj;

    // Valida o CNPJ e exibe a mensagem de erro se for inválido
    const cnpjError = document.getElementById('cnpj-error');
    if (!isValidCNPJ(cnpj)) {
        cnpjError.style.display = 'inline';
        cnpjError.innerText = 'CNPJ inválido';
    } else {
        cnpjError.style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cnpj = document.getElementById('cnpj').value;
    const password = document.getElementById('password').value;

    if (!isValidCNPJ(cnpj)) {
        alert('CNPJ inválido');
        return;
    }

    const user = { cnpj, password };

    fetch('http://localhost:8080/api/clinicas/login', {
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

// Função de validação de CNPJ
function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ''); // Remove tudo o que não é dígito

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
    }

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === parseInt(digitos.charAt(1));
}
