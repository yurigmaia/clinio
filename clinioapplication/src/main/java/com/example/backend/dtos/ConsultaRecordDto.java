package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ConsultaRecordDto(
        @NotBlank String medico,
        @NotBlank String paciente,
        @NotNull LocalDate dia,
        @NotNull LocalTime horario,
        @NotBlank String status,
        @NotBlank String observacoes,
        @NotBlank String tipoConsulta,
        @NotBlank String especialidade,
        @NotNull Double valorConsulta) {
}
