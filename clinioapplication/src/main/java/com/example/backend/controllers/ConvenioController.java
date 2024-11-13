package com.example.backend.controllers;

import com.example.backend.models.ConvenioModel;
import com.example.backend.repositories.ConvenioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/convenios")
public class ConvenioController {

    @Autowired
    private ConvenioRepository convenioRepository;

    @GetMapping
    public ResponseEntity<List<ConvenioModel>> listarConvenios() {
        List<ConvenioModel> convenios = convenioRepository.findAll();
        return ResponseEntity.ok(convenios);
    }
}
