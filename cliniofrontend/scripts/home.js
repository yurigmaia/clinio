document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close');
    const consultaForm = document.getElementById('consultaForm');
    const editModal = document.getElementById('editModal');
    const editCloseBtn = editModal.querySelector('.close');
    const editForm = document.getElementById('editForm');
    const consultasTableBody = document.getElementById('consultasTable').getElementsByTagName('tbody')[0];
    const logoutBtn = document.querySelector('.btn.logout');
    const photoUpload = document.getElementById('photo-upload');
    const patientPhoto = document.getElementById('patient-photo');

    let consultaAtualId = null;

    // Definir para inicialmente esconder os modais
    modal.style.display = 'none';
    editModal.style.display = 'none';

    // Função para abrir o modal de agendamento
    function openModal() {
        modal.style.display = 'block';
        carregarMedicos();
        carregarTiposConsulta();
        carregarConvenios();
        carregarHorarios();
    }

    // Função para abrir o modal de edição
    function openEditModal(consulta) {
        editModal.style.display = 'block';
        carregarMedicos(true);
        carregarTiposConsulta(true);
        carregarConvenios(true);
        carregarHorarios(true);

        // Preencher os campos do formulário de edição com os dados da consulta
        document.getElementById('editMedico').value = consulta.medico;
        document.getElementById('editPaciente').value = consulta.paciente;
        document.getElementById('editDia').value = consulta.dia;
        document.getElementById('editHorario').value = consulta.horario;
        document.getElementById('editObservacoes').value = consulta.observacoes;
        document.getElementById('editTipoConsulta').value = consulta.tipoConsulta;
        document.getElementById('editConvenio').value = consulta.convenio;
        document.getElementById('editIdConvenio').value = consulta.idConvenio;

        consultaAtualId = consulta.idConsulta;
    }
    // Função para atualizar as informações do paciente
    function updatePatientInfo() {
        document.getElementById('patient-name').textContent = 'Nome: ' + patientInfo.name;
        document.getElementById('patient-cpf').textContent = 'CPF: ' + patientInfo.cpf;
        document.getElementById('patient-phone').textContent = 'Telefone: ' + patientInfo.phone;
    }
    

    // Função para fechar os modais
    function closeModal() {
        modal.style.display = 'none';
        editModal.style.display = 'none';
    }

    // Abrir modal de agendamento ao clicar no botão
    openModalBtn.addEventListener('click', openModal);

    // Fechar modal de agendamento ao clicar no botão de fechar
    closeBtn.addEventListener('click', closeModal);

    // Fechar modal de edição ao clicar no botão de fechar
    editCloseBtn.addEventListener('click', closeModal);

    // Fechar modais ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target == modal || event.target == editModal) {
            closeModal();
        }
    });

    // Função de logout
    function handleLogout() {
        window.location.href = '/cliniofrontend/pages/login.html';
    }

    // Adicionar evento de clique para o botão de logout
    logoutBtn.addEventListener('click', handleLogout);

    // Submissão do formulário de agendamento
    consultaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const consulta = {
            medico: document.getElementById('medico').value,
            paciente: document.getElementById('paciente').value,
            dia: document.getElementById('dia').value,
            horario: document.getElementById('horario').value,
            observacoes: document.getElementById('observacoes').value,
            tipoConsulta: document.getElementById('tipoConsulta').value,
            convenio: document.getElementById('convenio').value,
            idConvenio: document.getElementById('idConvenio').value
        };

        fetch('http://localhost:8080/api/consultas/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            consultaForm.reset();
            closeModal();
            carregarConsultas();
        })
        .catch(error => {
            alert(error.message);
        });
    });

    // Submissão do formulário de edição
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const consulta = {
            medico: document.getElementById('editMedico').value,
            paciente: document.getElementById('editPaciente').value,
            dia: document.getElementById('editDia').value,
            horario: document.getElementById('editHorario').value,
            observacoes: document.getElementById('editObservacoes').value,
            tipoConsulta: document.getElementById('editTipoConsulta').value,
            convenio: document.getElementById('editConvenio').value,
            idConvenio: document.getElementById('editIdConvenio').value
        };

        fetch(`http://localhost:8080/api/consultas/${consultaAtualId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            editForm.reset();
            closeModal();
            carregarConsultas();
        })
        .catch(error => {
            alert(error.message);
        });
    });

    // Função para deletar consulta
    function deletarConsulta(id) {
        fetch(`http://localhost:8080/api/consultas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            carregarConsultas();
        })
        .catch(error => {
            alert('Erro ao deletar consulta: ' + error.message);
        });
    }

    // Função para carregar médicos
    function carregarMedicos(isEdit = false) {
        fetch('http://localhost:8080/api/medicos')
            .then(response => response.json())
            .then(data => {
                const medicoSelect = isEdit ? document.getElementById('editMedico') : document.getElementById('medico');
                medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
                data.forEach(medico => {
                    const option = document.createElement('option');
                    option.value = medico.nome;
                    option.textContent = medico.nome;
                    medicoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar médicos:', error));
    }

    // Função para carregar tipos de consulta
    function carregarTiposConsulta(isEdit = false) {
        fetch('http://localhost:8080/api/tiposconsulta')
            .then(response => response.json())
            .then(data => {
                const tipoConsultaSelect = isEdit ? document.getElementById('editTipoConsulta') : document.getElementById('tipoConsulta');
                tipoConsultaSelect.innerHTML = '<option value="">Selecione um tipo de consulta</option>';
                data.forEach(tipo => {
                    const option = document.createElement('option');
                    option.value = tipo.nome;
                    option.textContent = tipo.nome;
                    tipoConsultaSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar tipos de consulta:', error));
    }

    // Função para carregar convênios
    function carregarConvenios(isEdit = false) {
        fetch('http://localhost:8080/api/convenios')
            .then(response => response.json())
            .then(data => {
                const convenioSelect = isEdit ? document.getElementById('editConvenio') : document.getElementById('convenio');
                convenioSelect.innerHTML = '<option value="">Selecione um convênio</option>';
                data.forEach(convenio => {
                    const option = document.createElement('option');
                    option.value = convenio.nome;
                    option.textContent = convenio.nome;
                    convenioSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar convênios:', error));
    }

    // Função para carregar horários
    function carregarHorarios(isEdit = false) {
        const horarioSelect = isEdit ? document.getElementById('editHorario') : document.getElementById('horario');
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
                    consultasTableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novas linhas
                    data.forEach(consulta => {
                        const row = consultasTableBody.insertRow();
                        row.insertCell(0).textContent = consulta.medico;
                        row.insertCell(1).textContent = consulta.paciente;
                        row.insertCell(2).textContent = consulta.dia;
                        row.insertCell(3).textContent = consulta.horario;
                        row.insertCell(4).textContent = consulta.especialidade;
                        const actionsCell = row.insertCell(5);
                        
                        // Botão para editar consulta
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Editar';
                        editButton.classList.add('btn', 'green');
                        editButton.addEventListener('click', function() {
                            openEditModal(consulta);
                        });
                        actionsCell.appendChild(editButton);
    
                        // Botão para deletar consulta
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Desmarcar';
                        deleteButton.classList.add('btn', 'red');
                        deleteButton.addEventListener('click', function() {
                            deletarConsulta(consulta.idConsulta);
                        });
                        actionsCell.appendChild(deleteButton);
                    });
                })
                .catch(error => console.error('Erro ao carregar consultas:', error));
        }
    
        // Chamar a função ao carregar a página
        carregarConsultas();
    });
    