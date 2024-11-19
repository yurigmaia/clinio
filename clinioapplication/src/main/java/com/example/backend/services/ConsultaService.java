package com.example.backend.services;

import com.example.backend.models.ConsultaModel;
import com.example.backend.models.Medico;
import com.example.backend.repositories.ConsultaRepository;
import com.example.backend.repositories.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class ConsultaService {

    private final static Logger LOGGER = Logger.getLogger(ConsultaService.class.getName());

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    public void agendarConsulta(ConsultaModel consulta) throws Exception {
        LOGGER.info("Iniciando agendamento de consulta...");

        // Verificação de disponibilidade de horário
        if (consultaRepository.existsByMedicoAndDiaAndHorario(consulta.getMedico(), consulta.getDia(), consulta.getHorario())) {
            LOGGER.warning("Horário já agendado para este médico.");
            throw new Exception("Horário já agendado para este médico");
        }

        if (consultaRepository.existsByPacienteAndDiaAndHorario(consulta.getPaciente(), consulta.getDia(), consulta.getHorario())) {
            LOGGER.warning("Horário já agendado para este paciente.");
            throw new Exception("Horário já agendado para este paciente");
        }

        // Buscar especialidade do médico
        Optional<Medico> medicoOpt = medicoRepository.findByNome(consulta.getMedico());
        if (medicoOpt.isPresent()) {
            consulta.setEspecialidade(medicoOpt.get().getEspecialidade());
            LOGGER.info("Especialidade do médico encontrada: " + medicoOpt.get().getEspecialidade());
        } else {
            LOGGER.warning("Médico não encontrado.");
            throw new Exception("Médico não encontrado");
        }

        consultaRepository.save(consulta);
        LOGGER.info("Consulta agendada com sucesso.");
    }

    public void deletarConsulta(UUID id) throws Exception {
        if (consultaRepository.existsById(id)) {
            consultaRepository.deleteById(id);
        } else {
            throw new Exception("Consulta não encontrada");
        }
    }

    public List<ConsultaModel> listarConsultas() {
        return consultaRepository.findAll();
    }

    public Optional<ConsultaModel> getConsultaById(UUID id) {
        return consultaRepository.findById(id);
    }
    public void atualizarConsulta(UUID id, ConsultaModel consultaAtualizada) throws Exception {
        Optional<ConsultaModel> consultaOptional = consultaRepository.findById(id);
        if (consultaOptional.isPresent()) {
            ConsultaModel consulta = consultaOptional.get();
            consulta.setMedico(consultaAtualizada.getMedico());
            consulta.setPaciente(consultaAtualizada.getPaciente());
            consulta.setDia(consultaAtualizada.getDia());
            consulta.setHorario(consultaAtualizada.getHorario());
            consulta.setObservacoes(consultaAtualizada.getObservacoes());
            consulta.setTipoConsulta(consultaAtualizada.getTipoConsulta());
            consulta.setConvenio(consultaAtualizada.getConvenio());
            consulta.setIdConvenio(consultaAtualizada.getIdConvenio());
            consultaRepository.save(consulta);
        } else {
            throw new Exception("Consulta não encontrada");
        }
    }

}
