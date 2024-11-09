package com.example.backend.controllers;

import com.example.backend.dtos.ConsultaRecordDto;
import com.example.backend.models.ConsultaModel;
import com.example.backend.repositories.ConsultaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class ConsultaController {

    @Autowired
    ConsultaRepository consultaRepository;

        @PostMapping("/consultas")
        public ResponseEntity<ConsultaModel> saveConsulta(@RequestBody @Valid ConsultaRecordDto consultaRecordDto){
            var consultaModel = new ConsultaModel();
            BeanUtils.copyProperties(consultaRecordDto, consultaModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(consultaRepository.save(consultaModel));
        }

        @GetMapping("/consultas")
        public ResponseEntity<List<ConsultaModel>> getAllConsultas(){
            List<ConsultaModel> consultasList = consultaRepository.findAll();
            if(!consultasList.isEmpty()){
                for(ConsultaModel consulta : consultasList){
                    UUID id = consulta.getIdConsulta();
                    consulta.add(linkTo(methodOn(ConsultaController.class).getOneConsulta(id)).withSelfRel());
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(consultasList);
        }

        @GetMapping("/consultas/{id}")
        public ResponseEntity<Object> getOneConsulta(@PathVariable(value = "id") UUID id){
            Optional<ConsultaModel> consulta0 = consultaRepository.findById(id);
            if(consulta0.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consulta não encontrada");
            }
            consulta0.get().add(linkTo(methodOn(ConsultaController.class).getAllConsultas()).withRel("Lista de Consultas"));
            return ResponseEntity.status(HttpStatus.OK).body(consulta0.get());
        }
        @PutMapping("/consultas/{id}")
        public ResponseEntity<Object> updateConsulta(@PathVariable(value = "id") UUID id,
                                                     @RequestBody ConsultaRecordDto consultaRecordDto){
            Optional<ConsultaModel> consulta0 = consultaRepository.findById(id);
            if(consulta0.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consulta não encontrada");
            }
            var consultaModel = new ConsultaModel();
            BeanUtils.copyProperties(consultaRecordDto, consultaModel);
            return ResponseEntity.status(HttpStatus.OK).body(consultaRepository.save(consultaModel));
        }
        @DeleteMapping("/consultas/{id}")
        public ResponseEntity<Object> deleteConsulta(@PathVariable(value = "id") UUID id){
            Optional<ConsultaModel> consulta0 = consultaRepository.findById(id);
            if(consulta0.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Consulta não encontrada");
            }
            consultaRepository.delete(consulta0.get());
            return ResponseEntity.status(HttpStatus.OK).body("Consulta deletada com sucesso");
        }
}