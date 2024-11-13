package com.example.backend.services;

import com.example.backend.models.TipoConsultaModel;
import com.example.backend.repositories.TipoConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Arrays;

@Service
public class TipoConsultaService {

    @Autowired
    private TipoConsultaRepository tipoConsultaRepository;

    @PostConstruct
    public void initTiposConsulta() {
        // Verificar se os tipos de consulta já existem
        if (tipoConsultaRepository.count() == 0) {
            // Adicionar tipos de consulta
            TipoConsultaModel tipo1 = new TipoConsultaModel();
            tipo1.setNome("Online");
            TipoConsultaModel tipo2 = new TipoConsultaModel();
            tipo2.setNome("Presencial");

            tipoConsultaRepository.saveAll(Arrays.asList(tipo1, tipo2));
        }
    }
}
