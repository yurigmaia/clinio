package com.example.backend.repositories;

import com.example.backend.models.Clinica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClinicaRepository extends JpaRepository<Clinica, Long> {
    Optional<Clinica> findByCnpj(String cnpj);
    Optional<Clinica> findByEmail(String email);
}
