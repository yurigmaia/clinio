package com.example.backend.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Clinica;
import com.example.backend.models.Usuario;
import com.example.backend.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOGGER = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthService authService;

    @PostMapping("/login/usuario")
    public ResponseEntity<Map<String, String>> loginUsuario(@RequestBody Map<String, String> loginRequest) {
        String cpf = loginRequest.get("cpf");
        String password = loginRequest.get("password");
        boolean autenticado = authService.autenticarUsuario(cpf, password);
        Map<String, String> response = new HashMap<>();
        if (autenticado) {
            response.put("message", "Login bem-sucedido");
            return ResponseEntity.ok(response);
        }
        response.put("message", "CPF ou senha inválidos");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PostMapping("/login/clinica")
    public ResponseEntity<Map<String, String>> loginClinica(@RequestBody Map<String, String> loginRequest) {
        String cnpj = loginRequest.get("cnpj");
        String password = loginRequest.get("password");
        boolean autenticado = authService.autenticarClinica(cnpj, password);
        Map<String, String> response = new HashMap<>();
        if (autenticado) {
            response.put("message", "Login bem-sucedido");
            return ResponseEntity.ok(response);
        }
        response.put("message", "CNPJ ou senha inválidos");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PostMapping("/cadastro/usuario")
    public ResponseEntity<Map<String, String>> cadastrarUsuario(@RequestBody Usuario usuario) {
        authService.salvarUsuario(usuario);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cadastro de usuário realizado com sucesso");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cadastro/clinica")
    public ResponseEntity<Map<String, String>> cadastrarClinica(@RequestBody Clinica clinica) {
        Map<String, String> response = new HashMap<>();
        try {
            authService.salvarClinica(clinica);
            response.put("message", "Cadastro de clínica realizado com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/usuario/existe/{cpf}")
    public ResponseEntity<Map<String, Boolean>> usuarioExiste(@PathVariable String cpf) {
        boolean existe = authService.usuarioExiste(cpf);
        Map<String, Boolean> response = new HashMap<>();
        response.put("existe", existe);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/clinica/existe/{cnpj}")
    public ResponseEntity<Map<String, Boolean>> clinicaExiste(@PathVariable String cnpj) {
        boolean existe = authService.clinicaExiste(cnpj);
        Map<String, Boolean> response = new HashMap<>();
        response.put("existe", existe);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deletar/{cpf}")
    public ResponseEntity<Map<String, String>> deletarUsuario(@PathVariable String cpf) {
        Map<String, String> response = new HashMap<>();
        try {
            authService.deletarUsuario(cpf); // chama o serviço de autenticação para deletar o usuário
            LOGGER.info("Conta do usuário deletada com sucesso: " + cpf);
            response.put("message", "Conta deletada com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOGGER.severe("Erro ao deletar conta do usuário: " + e.getMessage());
            response.put("message", "Erro ao deletar conta do usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
