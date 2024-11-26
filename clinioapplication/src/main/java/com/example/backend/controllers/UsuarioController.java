package com.example.backend.controllers;

import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private static final Logger LOGGER = Logger.getLogger(UsuarioController.class.getName());

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
    public ResponseEntity<String> loginUsuario(@RequestBody Usuario usuario, HttpSession session) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCpf(usuario.getCpf());
        if (usuarioOpt.isPresent() && usuarioOpt.get().getPassword().equals(usuario.getPassword())) {
            session.setAttribute("cpf", usuario.getCpf()); // Adiciona o CPF à sessão
            return ResponseEntity.ok("Login bem-sucedido");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

    @DeleteMapping("/deletar")
    public ResponseEntity<Map<String, String>> deletarUsuario(HttpSession session) {
        String cpf = (String) session.getAttribute("cpf");

        if (cpf == null) {
            LOGGER.warning("Usuário não autenticado.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuário não autenticado"));
        }

        Map<String, String> response = new HashMap<>();
        try {
            usuarioRepository.deleteByCpf(cpf);
            LOGGER.info("Conta do usuário deletada com sucesso: " + cpf);
            response.put("message", "Conta deletada com sucesso");
            session.invalidate(); // Invalida a sessão após deletar a conta
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOGGER.severe("Erro ao deletar conta do usuário: " + e.getMessage());
            response.put("message", "Erro ao deletar conta do usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
