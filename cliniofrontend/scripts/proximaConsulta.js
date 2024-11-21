document.addEventListener('DOMContentLoaded', function() {
    const proximaConsultaTableBody = document.getElementById('proximaConsultaTable').getElementsByTagName('tbody')[0];

    function mostrarProximaConsulta() {
        fetch('http://localhost:8080/api/consultas')
            .then(response => response.json())
            .then(data => {
                const agora = new Date();
                let proximaConsulta = null;

                data.forEach(consulta => {
                    const consultaDataHora = new Date(`${consulta.dia}T${consulta.horario}`);
                    if (consultaDataHora > agora) {
                        if (proximaConsulta === null || consultaDataHora < new Date(`${proximaConsulta.dia}T${proximaConsulta.horario}`)) {
                            proximaConsulta = consulta;
                        }
                    }
                });

                if (proximaConsulta) {
                    const row = proximaConsultaTableBody.insertRow();
                    row.insertCell(0).innerText = proximaConsulta.medico;
                    row.insertCell(1).innerText = proximaConsulta.paciente;
                    row.insertCell(2).innerText = proximaConsulta.dia;
                    row.insertCell(3).innerText = proximaConsulta.horario;
                    row.insertCell(4).innerText = proximaConsulta.especialidade;
                } else {
                    const row = proximaConsultaTableBody.insertRow();
                    const cell = row.insertCell(0);
                    cell.colSpan = 5;
                    cell.innerText = 'Não há próximas consultas.';
                }
            })
            .catch(error => console.error('Erro ao carregar consultas:', error));
    }

    mostrarProximaConsulta();
});
