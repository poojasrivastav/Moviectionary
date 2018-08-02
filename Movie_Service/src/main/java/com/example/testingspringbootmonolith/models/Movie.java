package com.example.testingspringbootmonolith.models;

import lombok.*;
import javax.persistence.*;
import java.util.*;

//import org.hibernate.annotations.GenericGenerator;
//import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter

@Entity @Table(name = "movie")
public class Movie {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MOVIE_ID")
	private int movieId;

	@Column(name = "MOVIE_NAME")
	private String movieName;

	@Column(name = "RELEASE_DATE")
	private Date releaseDate;

	@Column(name = "CERTIFICATE")
	private String certificate;

	@Column(name = "IMAGE_URL")
	private String imgUrl;

	@Column(name = "WIKI_URL")
	private String wikiUrl;

	@Column(name = " ACTORS")
	private String actors;

	@Column(name = "DIRECTOR")
	private String director;

	@Column(name = "YOUTUBE_ID")
	private String youtubeId;

}