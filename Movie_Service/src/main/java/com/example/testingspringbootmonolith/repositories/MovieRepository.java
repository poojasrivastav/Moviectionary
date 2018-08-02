package com.example.testingspringbootmonolith.repositories;

import com.example.testingspringbootmonolith.models.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends CrudRepository<Movie, Integer> {
//    @Query("SELECT t FROM Movie t ORDER BY t.releaseDate ")
    List<Movie> findAll();
}