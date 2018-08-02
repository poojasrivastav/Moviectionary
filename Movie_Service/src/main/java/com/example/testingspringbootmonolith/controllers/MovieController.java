package com.example.testingspringbootmonolith.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.testingspringbootmonolith.models.Movie;
import com.example.testingspringbootmonolith.repositories.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RestController//this is the controller class, this class will expose the apis which we are providing like add, delete, list movies
public class MovieController {

	@Autowired
	private MovieRepository movieRepository;
//http request for service mapping

	@RequestMapping(value ="/movies",method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody  List<Movie> getMoives() {
		try {
			return movieRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}

	@RequestMapping(value = "/movie", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody Movie getMovie(@RequestParam int movieId) throws Exception {
		try {
			return movieRepository.findById(movieId).get();
		} catch (Exception e) {
			System.out.println("Exception in createMovie() " + e.getMessage());
			throw e;
		}

	}

	@RequestMapping(value = "/movie", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean createMovie(@RequestBody Movie data) throws Exception {
		System.out.println("xxxxxxx----xxxxxxxxx");
		try {
			return movieRepository.save(data)!=null?true:false;
		} catch (Exception e) {
			System.out.println("Exception in createMovie() " + e.getMessage());
			throw e;
		}
	}
	@RequestMapping(value = "/deleteMovie", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody boolean delete(@RequestParam int movieId) throws Exception {
		try {
			Movie temp=movieRepository.findById(movieId).get();
			movieRepository.delete(temp);
			return true;
		} catch (Exception e) {
			System.out.println("Exception in delete() " + e.getMessage());
			return false;
		}
	}
}
