document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('pacienteModal');
    const openModalBtn = document.getElementById('configuracoesBtn');
    const closeBtn = modal.querySelector('.close');
    const deletarContaBtn = document.getElementById('deletarContaBtn');

    openModalBtn.onclick = function() {
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Função para deletar a conta do usuário
    deletarContaBtn.addEventListener('click', function() {
        if (confirm("Tem certeza que deseja deletar a conta?")) {
            const cpf = '12345678900';
            
            fetch(`http://localhost:8080/api/auth/deletar/${cpf}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    modal.style.display = 'none';
                    // Redirecionar para a página de login ou outra ação necessária após a deleção
                    window.location.href = '/cliniofrontend/pages/login.html';
                } else {
                    alert('Erro ao deletar conta: resposta inesperada do servidor.');
                }
            })
            .catch(error => {
                alert('Erro ao deletar conta: ' + error.message);
            });
        }
    });
});
