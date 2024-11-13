package com.example.backend.repositories;

import com.example.backend.models.ConvenioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConvenioRepository extends JpaRepository<ConvenioModel, UUID> {
}
