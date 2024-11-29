// Abrir o modal
var modal = document.getElementById("pacienteModal");
var btn = document.getElementById("configuracoesBtn"); // Botão "Configurações"
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Lidar com a submissão do formulário
document.getElementById("pacienteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var endereco = document.getElementById("endereco").value;
    console.log("Informações do paciente atualizadas:", { nome, email, telefone, endereco });
    modal.style.display = "none";
});

// Lidar com a deleção da conta
document.getElementById("deletarContaBtn").addEventListener("click", function() {
    if (confirm("Tem certeza que deseja deletar a conta?")) {
        console.log("Conta deletada");
        modal.style.display = "none";
    }
});
