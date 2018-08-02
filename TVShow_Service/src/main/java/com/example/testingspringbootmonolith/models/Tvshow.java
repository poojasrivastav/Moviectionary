package com.example.testingspringbootmonolith.models;

import lombok.*;
import javax.persistence.*;
import java.util.*;

//import org.hibernate.annotations.GenericGenerator;
//import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter

@Entity @Table(name = "tvshow")
public class Tvshow {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SHOW_ID")
	private int showId;

	@Column(name = "SHOW_NAME")
	private String showName;

	@Column(name = "RELEASE_YEAR")
	private String releaseYear;

	@Column(name = "GENRE")
	private String genre;

	@Column(name = "IMAGE_URL")
	private String imgUrl;

	@Column(name = "WIKI_URL")
	private String wikiUrl;

	@Column(name = " STARS")
	private String stars;

	@Column(name = "YOUTUBE_ID")
	private String youtubeId;

}