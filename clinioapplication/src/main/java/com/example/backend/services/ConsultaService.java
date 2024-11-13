package com.example.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.ConsultaModel;
import com.example.backend.repositories.ConsultaRepository;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    public boolean agendarConsulta(ConsultaModel consulta) {
        // Verifica se o horário está disponível
        Optional<ConsultaModel> consultaExistente = consultaRepository.findByDiaAndHorario(consulta.getDia(), consulta.getHorario());
        if (consultaExistente.isPresent()) {
            return false; // Horário já está ocupado
        }

        consultaRepository.save(consulta);
        return true;
    }

    public List<ConsultaModel> listarConsultas() {
        return consultaRepository.findAll();
    }

    public Optional<ConsultaModel> getConsultaById(UUID id) {
        return consultaRepository.findById(id);
    }

    public void deletarConsulta(ConsultaModel consulta) {
        consultaRepository.delete(consulta);
    }

    public ConsultaModel atualizarConsulta(ConsultaModel consulta) {
        return consultaRepository.save(consulta);
    }
}
