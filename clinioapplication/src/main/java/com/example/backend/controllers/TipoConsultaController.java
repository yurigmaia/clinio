package com.example.backend.controllers;

import com.example.backend.models.TipoConsultaModel;
import com.example.backend.repositories.TipoConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tiposconsulta")
public class TipoConsultaController {

    @Autowired
    private TipoConsultaRepository tipoConsultaRepository;

    @GetMapping
    public ResponseEntity<List<TipoConsultaModel>> listarTiposConsulta() {
        List<TipoConsultaModel> tiposConsulta = tipoConsultaRepository.findAll();
        return ResponseEntity.ok(tiposConsulta);
    }
}
