import Dashboard from "views/Dashboard/Dashboard";
import Movies from "views/Movies/Movies";
import Movie from "views/Movies/Movie/Movie";
import TVShows from "views/TVShows/TVShows";
import TVShow from "views/TVShows/Show/TVShow";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/movies",
    name: "Movies",
    icon: "pe-7s-film",
    component: Movies,
  },
  {
    path: "/tvShows",
    name: "TV Shows",
    icon: "pe-7s-album",
    component: TVShows,
  },
  {
    path: "/addMovie",
    name: "Add/Edit Movie",
    icon: "pe-7s-note2",
    hidden:true,
    component: Movie
  },
  {
    path: "/addSHow",
    name: "Add/Edit TV Show",
    icon: "pe-7s-note2",
    hidden:true,
    component: TVShow
  }
 
 ,
    { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
