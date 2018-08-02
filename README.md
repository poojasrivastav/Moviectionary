SEC_Project4- “Moviectionary”

A clear problem statement:-
Developing a Proof of Concept and Working Model for a website which is one stop shop for movies and TV-shows. When user visit this website he/she can get all the information about movie and tv-shows like actors, directors, IMDB rating etc.


Technical requirements:-
Java
SpringBoot
Docker
React


Instructions:-
Navigate to Movie_Service & TVShow_Service 
-idea build.gradle
 -docker-compose up

Navigate to Frontend
-git clone
-npm install
-npm start

Note: Make sure you have done docker-compose down for other open projects. Sometimes it create conflicts which is like port:8080 or port :5432 is already allocated.


Brief about my app Moviectionary:-
-Moviectionary app has 2 database(“pgdev” for movie service and tvshows for tv-show service).
-I have used external OMDB API.


Fun facts about my app Moviectionary:-
-Dashboard shows you total number of movies and tv-shows.
-User can see all the movies and tv-shows present in the database.
-User can add the new movie or tv-show by clicking on add button.
-If user add Youtube-id of movie or tv-show in the Add/Edit form then user would be able to see that youtube video on the respective detail on the main page.
for e.g- youtube-id for "Game of Thrones" trailer is gcTkNV5Vg1E
or, youtube-id for "Avatar" movie trailer  is 6ziBFh3V1aM
Add YOUTUBE_ID and watch vedio on "Moviectionary" :)
-User can edit the movie or tv show detail.
-User can delete the movie or tv-show.

