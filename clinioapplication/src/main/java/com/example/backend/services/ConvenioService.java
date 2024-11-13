package com.example.backend.services;

import com.example.backend.models.ConvenioModel;
import com.example.backend.repositories.ConvenioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Arrays;

@Service
public class ConvenioService {

    @Autowired
    private ConvenioRepository convenioRepository;

    @PostConstruct
    public void initConvenios() {
        // Verificar se os convênios já existem
        if (convenioRepository.count() == 0) {
            // Adicionar convênios populares no Brasil
            ConvenioModel convenio1 = new ConvenioModel();
            convenio1.setNome("Amil");
            ConvenioModel convenio2 = new ConvenioModel();
            convenio2.setNome("Bradesco Saúde");
            ConvenioModel convenio3 = new ConvenioModel();
            convenio3.setNome("SulAmérica");
            ConvenioModel convenio4 = new ConvenioModel();
            convenio4.setNome("Unimed");

            convenioRepository.saveAll(Arrays.asList(convenio1, convenio2, convenio3, convenio4));
        }
    }
}
