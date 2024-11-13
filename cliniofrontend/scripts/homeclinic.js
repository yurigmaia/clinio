document.addEventListener('DOMContentLoaded', function() {
    const openMedicoModalBtn = document.getElementById('openMedicoModalBtn');
    const medicoModal = document.getElementById('medicoModal');
    const closeBtn = medicoModal.getElementsByClassName('close')[0];
    const cadastroMedicoForm = document.getElementById('cadastroMedicoForm');
    const consultasTableBody = document.getElementById('consultasTable').getElementsByTagName('tbody')[0];
    const logoutBtn = document.querySelector('.btn.logout');

    // Abrir Modal de Cadastro de Médico
    openMedicoModalBtn.addEventListener('click', function() {
        medicoModal.style.display = 'block';
    });

    // Fechar Modal de Cadastro de Médico
    closeBtn.addEventListener('click', function() {
        medicoModal.style.display = 'none';
    });

    // Fechar Modal de Cadastro de Médico ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target == medicoModal) {
            medicoModal.style.display = 'none';
        }
    });

    // Submissão do Formulário de Cadastro de Médico
    cadastroMedicoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nomeMedico').value;
        const especialidade = document.getElementById('especialidadeMedico').value;

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
            cadastroMedicoForm.reset();
            medicoModal.style.display = 'none';
        })
        .catch(error => {
            alert(error.message);
        });
    });

    // Carregar Consultas Agendadas
    function carregarConsultas() {
        fetch('http://localhost:8080/api/consultas')
            .then(response => response.json())
            .then(data => {
                consultasTableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novas linhas
                data.forEach(consulta => {
                    const row = consultasTableBody.insertRow();
                    row.insertCell(0).textContent = consulta.medico;
                    row.insertCell(1).textContent = consulta.paciente;
                    row.insertCell(2).textContent = consulta.dia;
                    row.insertCell(3).textContent = consulta.horario;
                    row.insertCell(4).textContent = consulta.especialidade;
                });
            })
            .catch(error => console.error('Erro ao carregar consultas:', error));
    }

    // Função para o botão Sair
    function handleLogout() {
        // Implementação do logout (por exemplo, limpeza de tokens, redirecionamento)
        window.location.href = '/cliniofrontend/pages/login.html';
    }

    // Adicionar evento de clique para o botão de logout
    logoutBtn.addEventListener('click', handleLogout);

    // Chamar a função ao carregar a página
    carregarConsultas();
});
