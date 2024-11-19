package com.example.backend.controllers;

import com.example.backend.models.ConsultaModel;
import com.example.backend.services.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @PostMapping("/agendar")
    public ResponseEntity<Map<String, String>> agendarConsulta(@RequestBody ConsultaModel consultaModel) {
        Map<String, String> response = new HashMap<>();
        try {
            consultaService.agendarConsulta(consultaModel);
            response.put("message", "Consulta agendada com sucesso");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("message", "Erro ao agendar consulta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<List<ConsultaModel>> listarConsultas() {
        List<ConsultaModel> consultasList = consultaService.listarConsultas();
        return ResponseEntity.status(HttpStatus.OK).body(consultasList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getConsultaById(@PathVariable UUID id) {
        Optional<ConsultaModel> consultaOptional = consultaService.getConsultaById(id);
        if (consultaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(consultaOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consulta não encontrada");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteConsulta(@PathVariable UUID id) {
        Map<String, String> response = new HashMap<>();
        try {
            consultaService.deletarConsulta(id);
            response.put("message", "Consulta deletada com sucesso");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", "Erro ao deletar consulta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updateConsulta(@PathVariable UUID id, @RequestBody ConsultaModel consultaModel) {
        Map<String, String> response = new HashMap<>();
        try {
            consultaService.atualizarConsulta(id, consultaModel);
            response.put("message", "Consulta atualizada com sucesso");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", "Erro ao atualizar consulta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
