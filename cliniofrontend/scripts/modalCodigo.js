document.addEventListener('DOMContentLoaded', function() {
    const proximaConsultaTableBody = document.getElementById('proximaConsultaTable').getElementsByTagName('tbody')[0];
    const modal = document.getElementById('codigoModal');
    const btn = document.getElementById('download-qrcode-btn');
    const span = document.getElementsByClassName('close-exclusivo')[0];
    const codigoConsultaDiv = document.getElementById('codigoConsulta');
    let proximaConsultaCodigo = null; // Variável para armazenar o código da próxima consulta

    function mostrarProximaConsulta() {
        fetch('http://localhost:8080/api/consultas/proxima')
            .then(response => response.json())
            .then(proximaConsulta => {
                console.log('Resposta da API:', proximaConsulta); // Log da resposta da API
                if (proximaConsulta && proximaConsulta.codigo) {
                    const row = proximaConsultaTableBody.insertRow();
                    row.insertCell(0).innerText = proximaConsulta.medico;
                    row.insertCell(1).innerText = proximaConsulta.paciente;
                    row.insertCell(2).innerText = proximaConsulta.dia;
                    row.insertCell(3).innerText = proximaConsulta.horario;
                    row.insertCell(4).innerText = proximaConsulta.especialidade;
                    proximaConsultaCodigo = proximaConsulta.codigo; // Armazena o código da próxima consulta
                    console.log("Código da próxima consulta:", proximaConsultaCodigo);
                } else {
                    console.log('Não foi possível encontrar a próxima consulta ou o código está vazio.');
                    const row = proximaConsultaTableBody.insertRow();
                    const cell = row.insertCell(0);
                    cell.colSpan = 5;
                    cell.innerText = 'Não há próximas consultas.';
                }
            })
            .catch(error => console.error('Erro ao carregar consultas:', error));
    }

    btn.onclick = function() {
        if (proximaConsultaCodigo) {
            codigoConsultaDiv.textContent = proximaConsultaCodigo;
            modal.style.display = 'block';
        } else {
            alert('Não há código disponível para exibir.');
            console.log("proximaConsultaCodigo está vazio");
        }
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    mostrarProximaConsulta();
});
