package com.example.testingspringbootmonolith;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//this is the entry point for spring booting the movie application. Compiler/Docker/JVM will scan for which all controller files we have implemented
//it will register all the URL entry points. you can see in the logs
public class MovieApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieApplication.class, args);
	}
}
