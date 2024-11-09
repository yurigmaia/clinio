package com.example.backend.services;

import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepository;
import com.example.backend.utils.CPFUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean autenticar(String cpf, String password) {
        if (!CPFUtils.isValidCPF(cpf)) {
            return false; // CPF inválido
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf(cpf);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return usuario.getPassword().equals(password); // Nunca armazene senhas em texto simples em produção!
        }
        return false;
    }

    public boolean usuarioExiste(String cpf) {
        return usuarioRepository.findByCpf(cpf).isPresent();
    }
}
