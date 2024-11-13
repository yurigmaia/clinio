document.getElementById('cadastroMedicoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const especialidade = document.getElementById('especialidade').value;

    const medico = { nome, especialidade };

    fetch('http://localhost:8080/api/medicos/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medico)
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Erro ao cadastrar médico');
    })
    .then(data => {
        alert('Médico cadastrado com sucesso!');
        document.getElementById('cadastroMedicoForm').reset();
    })
    .catch(error => {
        alert(error.message);
    });
});
