document.addEventListener('DOMContentLoaded', function() {
    const proximaConsultaTableBody = document.getElementById('upcomingConsultasTable').getElementsByTagName('tbody')[0];

    function mostrarProximasConsultas() {
        fetch('http://localhost:8080/api/consultas')
            .then(response => response.json())
            .then(data => {
                const agora = new Date();
                const proximasConsultas = [];

                data.forEach(consulta => {
                    const consultaDataHora = new Date(`${consulta.dia}T${consulta.horario}`);
                    if (consultaDataHora > agora) {
                        proximasConsultas.push(consulta);
                    }
                });

                proximasConsultas.sort((a, b) => new Date(`${a.dia}T${a.horario}`) - new Date(`${b.dia}T${b.horario}`));

                proximaConsultaTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

                if (proximasConsultas.length > 0) {
                    proximasConsultas.forEach(consulta => {
                        const row = proximaConsultaTableBody.insertRow();
                        row.insertCell(0).innerText = consulta.medico;
                        row.insertCell(1).innerText = consulta.paciente;
                        row.insertCell(2).innerText = consulta.dia;
                        row.insertCell(3).innerText = consulta.horario;
                        row.insertCell(4).innerText = consulta.especialidade;
                    });
                } else {
                    const row = proximaConsultaTableBody.insertRow();
                    const cell = row.insertCell(0);
                    cell.colSpan = 5;
                    cell.innerText = 'Não há próximas consultas.';
                }
            })
            .catch(error => console.error('Erro ao carregar consultas:', error));
    }

    mostrarProximasConsultas();
});
