package com.example.testingspringbootmonolith.repositories;

import com.example.testingspringbootmonolith.models.Tvshow;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TVShowRepository extends CrudRepository<Tvshow, Integer> {
    @Query("SELECT t FROM Tvshow t ")
    List<Tvshow> findAll();
}