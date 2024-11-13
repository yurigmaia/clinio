document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const consultaForm = document.getElementById('consultaForm');
    const logoutBtn = document.querySelector('.btn.logout');

    // Definir para inicialmente esconder o modal
    modal.style.display = 'none'; // Certifique-se de que o modal está inicialmente escondido

    // Função para abrir o modal
    function openModal() {
        modal.style.display = 'flex';
        carregarMedicos(); // Carregar médicos quando o modal abrir
        carregarTiposConsulta(); // Carregar tipos de consulta quando o modal abrir
        carregarConvenios(); // Carregar convênios quando o modal abrir
        carregarHorarios(); // Carregar horários quando o modal abrir
    }

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Abrir Modal ao clicar no botão
    openModalBtn.addEventListener('click', openModal);

    // Fechar Modal ao clicar no botão de fechar
    closeBtn.addEventListener('click', closeModal);

    // Fechar Modal ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Função de logout
    function handleLogout() {
        window.location.href = '/cliniofrontend/pages/login.html';
    }

    // Adicionar evento de clique para o botão de logout
    logoutBtn.addEventListener('click', handleLogout);

    // Submissão do formulário
    consultaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const medico = document.getElementById('medico').value;
        const paciente = document.getElementById('paciente').value;
        const dia = document.getElementById('dia').value;
        const horario = document.getElementById('horario').value;
        const observacoes = document.getElementById('observacoes').value;
        const tipoConsulta = document.getElementById('tipoConsulta').value;
        const convenio = document.getElementById('convenio').value;
        const idConvenio = document.getElementById('idConvenio').value;

        const consulta = { medico, paciente, dia, horario, observacoes, tipoConsulta, convenio, idConvenio };

        fetch('http://localhost:8080/api/consultas/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Erro ao agendar consulta');
        })
        .then(data => {
            alert('Consulta agendada com sucesso!');
            consultaForm.reset();
            modal.style.display = 'none';
        })
        .catch(error => {
            alert(error.message);
        });
    });

    // Função para carregar médicos
    function carregarMedicos() {
        fetch('http://localhost:8080/api/medicos')
            .then(response => response.json())
            .then(data => {
                const medicoSelect = document.getElementById('medico');
                medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
                data.forEach(medico => {
                    const option = document.createElement('option');
                    option.value = medico.id;
                    option.textContent = medico.nome;
                    medicoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar médicos:', error));
    }

    // Função para carregar tipos de consulta
    function carregarTiposConsulta() {
        fetch('http://localhost:8080/api/tiposconsulta')
            .then(response => response.json())
            .then(data => {
                const tipoConsultaSelect = document.getElementById('tipoConsulta');
                tipoConsultaSelect.innerHTML = '<option value="">Selecione um tipo de consulta</option>';
                data.forEach(tipo => {
                    const option = document.createElement('option');
                    option.value = tipo.id;
                    option.textContent = tipo.nome;
                    tipoConsultaSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar tipos de consulta:', error));
    }

    // Função para carregar convênios
    function carregarConvenios() {
        fetch('http://localhost:8080/api/convenios')
            .then(response => response.json())
            .then(data => {
                const convenioSelect = document.getElementById('convenio');
                convenioSelect.innerHTML = '<option value="">Selecione um convênio</option>';
                data.forEach(convenio => {
                    const option = document.createElement('option');
                    option.value = convenio.id;
                    option.textContent = convenio.nome;
                    convenioSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar convênios:', error));
    }

    // Função para carregar horários
    function carregarHorarios() {
        const horarioSelect = document.getElementById('horario');
        horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
        for (let hour = 8; hour <= 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const option = document.createElement('option');
                option.value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                option.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                horarioSelect.appendChild(option);
            }
        }
    }

    // Função para carregar consultas agendadas
    function carregarConsultas() {
        fetch('http://localhost:8080/api/consultas')
            .then(response => response.json())
            .then(data => {
                const consultasTableBody = document.getElementById('consultasTable').getElementsByTagName('tbody')[0];
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

    // Chamar a função ao carregar a página
    carregarConsultas();
});
