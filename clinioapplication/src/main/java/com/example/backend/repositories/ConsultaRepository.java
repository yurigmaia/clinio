package com.example.backend.repositories;

import com.example.backend.models.ConsultaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConsultaRepository extends JpaRepository<ConsultaModel, UUID> {
    Optional<ConsultaModel> findByDiaAndHorario(LocalDate dia, LocalTime horario);
}
