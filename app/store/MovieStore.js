import { defineStore } from "pinia";
import axios from "axios";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    movies: [],
    isLoading: false,
  }
  
),
  getters: {
    totalCount() {
      return this.movies.length;
    },
    isEmpty() {
      return this.totalCount === 0 
    },
    avgRating() {
      if (this.movies.length === 0) {
        return 0;
      }
      const sum = this.movies.reduce((a, c) => {
        return a + c.rating;
      }, 0);
      const Avg = sum / this.movies.length;
      return Math.round(Avg*2)/2
    },
    inTheatersMovies(){
      return this.movies.filter( m => m.inTheaters==='true' || m.inTheaters=== true )
    }
  },
  actions: {
    async getMovies() {
      this.isLoading = true;
      try {
        const api = "http://localhost:2727/movies";
        const res = await axios.get(api);
        this.movies = res.data;
      } catch (error) {
        return error;
      } finally {
        this.isLoading = false;
      }
    },
    async addMovie(newMovie) {
      try {
        const api = "http://localhost:2727/movies";
        const res =await axios.post(api, newMovie);
        this.movies.push(res.data);
      } catch (error) {
        return error;
      }
    },
    async deleteMovie(id) {
      try {
        const api = "http://localhost:2727/movies/";
        await axios.delete(`${api}${id}`);
        this.movies = this.movies.filter((movie) => {
          return movie.id !== id;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editMovie(movie) {
      try {
        const api = "http://localhost:2727/movies/";
        await axios.put(`${api}${movie.id}`, movie);
        await this.getMovies();
      } catch (error) {
        console.log(error);
      }
    },
    async resetRatings() {
      this.movies = this.movies.map((m) => ({ ...m, rating: 0 }));
      try {
        const api = "http://localhost:2727/movies/";
        for (const movie of this.movies) {
          await axios.put(`${api}${movie.id}`, movie);
         
        }
         await this.getMovies();
      } catch (error) {
        console.log(error);
      }
    },
   
  },
});
