package com.example.backend.controllers;

import com.example.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, String> response = new HashMap<>();
        boolean usuarioExiste = authService.usuarioExiste(loginRequest.getCpf());

        if (!usuarioExiste) {
            response.put("message", "O CPF não existe");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        boolean autenticado = authService.autenticar(loginRequest.getCpf(), loginRequest.getPassword());

        if (autenticado) {
            response.put("message", "Login bem-sucedido");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Senha incorreta");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

class LoginRequest {
    private String cpf;
    private String password;

    // Getters e Setters
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
