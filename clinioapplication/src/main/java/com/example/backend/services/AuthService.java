package com.example.backend.services;

import com.example.backend.models.Usuario;
import com.example.backend.models.Clinica;
import com.example.backend.repositories.UsuarioRepository;
import com.example.backend.repositories.ClinicaRepository;
import com.example.backend.utils.CPFUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClinicaRepository clinicaRepository;

    // Autenticação para usuários (pacientes)
    public boolean autenticarUsuario(String cpf, String password) {
        if (!CPFUtils.isValidCPF(cpf)) {
            return false; // CPF inválido
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf(cpf);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return usuario.getPassword().equals(password);
        }
        return false;
    }

    // Verificação de existência de usuário
    public boolean usuarioExiste(String cpf) {
        return usuarioRepository.findByCpf(cpf).isPresent();
    }

    // Autenticação para clínicas
    public boolean autenticarClinica(String cnpj, String password) {
        Optional<Clinica> clinicaOpt = clinicaRepository.findByCnpj(cnpj);
        if (clinicaOpt.isPresent()) {
            Clinica clinica = clinicaOpt.get();
            return clinica.getPassword().equals(password);
        }
        return false;
    }

    // Verificação de existência de clínica
    public boolean clinicaExiste(String cnpj) {
        return clinicaRepository.findByCnpj(cnpj).isPresent();
    }

    // Método para salvar novo usuário sem criptografia de senha
    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Método para salvar nova clínica com verificação de CNPJ
    public Clinica salvarClinica(Clinica clinica) throws Exception {
        if (clinicaExiste(clinica.getCnpj())) {
            throw new Exception("CNPJ já cadastrado");
        }
        return clinicaRepository.save(clinica);
    }
}
