package com.example.backend.controllers;

import com.example.backend.models.Clinica;
import com.example.backend.repositories.ClinicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/clinicas")
public class ClinicaController {

    @Autowired
    private ClinicaRepository clinicaRepository;

    // Endpoint para cadastrar uma nova clínica
    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarClinica(@RequestBody Clinica clinica) {
        // Verifica se já existe uma clínica com o mesmo CNPJ ou e-mail
        if (clinicaRepository.findByCnpj(clinica.getCnpj()).isPresent() ||
                clinicaRepository.findByEmail(clinica.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro: Clínica já existe");
        }

        clinicaRepository.save(clinica);
        return ResponseEntity.ok("Clínica cadastrada com sucesso");
    }

    // Endpoint para login da clínica
    @PostMapping("/login")
    public ResponseEntity<String> loginClinica(@RequestBody Clinica clinica) {
        Optional<Clinica> clinicaOpt = clinicaRepository.findByCnpj(clinica.getCnpj());

        // Verifica se o CNPJ e a senha estão corretos
        if (clinicaOpt.isPresent() && clinicaOpt.get().getPassword().equals(clinica.getPassword())) {
            return ResponseEntity.ok("Login bem-sucedido");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }
}
