package com.example.backend.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.ConsultaModel;

@Repository
public interface ConsultaRepository extends JpaRepository<ConsultaModel, UUID> {
    boolean existsByMedicoAndDiaAndHorario(String medico, LocalDate dia, LocalTime horario);
    boolean existsByPacienteAndDiaAndHorario(String paciente, LocalDate dia, LocalTime horario);
}
