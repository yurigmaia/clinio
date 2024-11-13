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
        carregarConsultorios(); // Carregar consultórios quando o modal abrir
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
        // Implementação do logout (por exemplo, limpeza de tokens, redirecionamento)
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
        const status = document.getElementById('status').value;
        const observacoes = document.getElementById('observacoes').value;
        const tipoConsulta = document.getElementById('tipoConsulta').value;
        const especialidade = document.getElementById('especialidade').value;
        const valorConsulta = parseFloat(document.getElementById('valorConsulta').value);

        const consulta = {
            medico,
            paciente,
            dia,
            horario,
            status,
            observacoes,
            tipoConsulta,
            especialidade,
            valorConsulta
        };

        fetch('http://localhost:8080/api/consultas/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Erro ao agendar consulta');
        })
        .then(message => {
            alert('Consulta agendada com sucesso!');
            generateQRCode(consulta); // Gerar QR Code após agendar a consulta
            closeModal(); // Fechar o modal após agendar a consulta
        })
        .catch(error => {
            alert(error.message);
        });
    });

    // Função para carregar consultórios
    function carregarConsultorios() {
        fetch('http://localhost:8080/api/clinicas')
            .then(response => response.json())
            .then(data => {
                const consultorioSelect = document.getElementById('consultorio');
                const localInput = document.getElementById('local');

                consultorioSelect.innerHTML = '';
                data.forEach(consultorio => {
                    const option = document.createElement('option');
                    option.value = consultorio.id;
                    option.text = consultorio.nome;
                    consultorioSelect.appendChild(option);
                });

                // Setar o local automaticamente ao selecionar um consultório
                consultorioSelect.addEventListener('change', function() {
                    const consultorioSelecionado = data.find(consultorio => consultorio.id == this.value);
                    localInput.value = consultorioSelecionado.endereco;
                });

                // Setar o local inicialmente
                if (data.length > 0) {
                    localInput.value = data[0].endereco;
                }
            })
            .catch(error => console.error('Erro ao carregar consultórios:', error));
    }

    // Função para carregar médicos
    function carregarMedicos() {
        fetch('http://localhost:8080/api/medicos')
            .then(response => response.json())
            .then(data => {
                const medicoSelect = document.getElementById('medico');

                medicoSelect.innerHTML = '';
                data.forEach(medico => {
                    const option = document.createElement('option');
                    option.value = medico.id;
                    option.text = `${medico.nome} - ${medico.especialidade}`;
                    medicoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar médicos:', error));
    }

    // Função para gerar QR Code
    function generateQRCode(consulta) {
        const qrData = JSON.stringify(consulta);
        const qrCodeContainer = document.createElement('div');
        qrCodeContainer.id = 'qrCodeContainer';
        document.body.appendChild(qrCodeContainer);

        QRCode.toCanvas(document.getElementById('qrCodeContainer'), qrData, function (error) {
            if (error) console.error(error);
            console.log('QR Code gerado com sucesso!');
        });
    }
});
