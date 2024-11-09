package com.example.backend.controllers;

import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByCpf(usuario.getCpf()).isPresent() || usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro: Usuário já existe");
        }
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf(usuario.getCpf());
        if (usuarioOpt.isPresent() && usuarioOpt.get().getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.ok("Login bem-sucedido");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }
}
