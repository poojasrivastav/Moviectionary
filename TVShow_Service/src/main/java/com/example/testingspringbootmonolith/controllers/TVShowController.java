package com.example.testingspringbootmonolith.controllers;

import java.util.List;

import com.example.testingspringbootmonolith.models.Tvshow;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.testingspringbootmonolith.repositories.TVShowRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RestController
public class TVShowController {

	@Autowired
	private TVShowRepository tvShowRepository;

	@RequestMapping(value ="/tvShows",method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody  List<Tvshow> getTvShows() {
		try {
			return tvShowRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}

	@RequestMapping(value = "/tvShow", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody Tvshow getTVShow(@RequestParam int showId) throws Exception {
		try {
			return tvShowRepository.findById(showId).get();
		} catch (Exception e) {
			System.out.println("****Exception in getTVShow() " + e.getMessage());
			throw e;
		}

	}

	@RequestMapping(value = "/tvShow", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean createTVShow(@RequestBody Tvshow data) throws Exception {
		try {
			return tvShowRepository.save(data)!=null?true:false;
		} catch (Exception e) {
			System.out.println("****Exception in createTVShow() " + e.getMessage());
			throw e;
		}

	}

	@RequestMapping(value = "/deleteShow", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody boolean delete(@RequestParam int showId) throws Exception {
		try {
			Tvshow temp=tvShowRepository.findById(showId).get();
			tvShowRepository.delete(temp);
			return true;
		} catch (Exception e) {
			System.out.println("Exception in delete() " + e.getMessage());
			return false;
		}
	}
}
