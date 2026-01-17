import { ref, computed } from "vue";

export interface Movie {
  id: number;
  name: string;
  description: string;
  rating: number;
  inTheaters: boolean ;
  genres: string[];
}

export const useMovies = () => {
  const movies = ref<Movie[]>([]);
  const isLoading = ref(false);

  const totalCount = computed(() => movies.value.length);
  const isEmpty = computed(() => totalCount.value === 0 ? true : false);

  const avgRating = computed(() => {
    if (movies.value.length === 0) return 0;
    const sum = movies.value.reduce((a, c) => a + c.rating, 0);
    return Math.round((sum / movies.value.length) * 2) / 2;
  });

  const inTheatersMovies = computed(() =>
    movies.value.filter((m) =>  m.inTheaters === true)
  );

  const getMovies = async () => {
    isLoading.value = true;
    try {
      const res = await $fetch<Movie[]>("https://69678aa2bbe157c088b24636.mockapi.io/movies");
      movies.value = res;
    } catch (error) {
      console.error(error);
      
    } finally {
      isLoading.value = false;
    }
  };

  const addMovie = async (newMovie: Omit<Movie, "id">) => {
    try {
      const res = await $fetch<Movie>("https://69678aa2bbe157c088b24636.mockapi.io/movies", {
        method: "POST",
        body: newMovie,
      });
      movies.value.push(res);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (movie: Movie) => {
    try {
      await $fetch(`https://69678aa2bbe157c088b24636.mockapi.io/movies/${movie.id}`, { method: "DELETE" });
      movies.value = movies.value.filter((m) => m.id !== movie.id);
      
    } catch (error) {
      console.error(error);
    }
  };

  const editMovie = async (movie: Movie) => {
    try {
      const res = await $fetch<Movie>(`https://69678aa2bbe157c088b24636.mockapi.io/movies/${movie.id}`, {
        method: "PUT",
        body: movie,
      });
      const index = movies.value.findIndex((m) => m.id === movie.id);
      if (index !== -1) movies.value[index] = res;
      getMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const resetRatings = async () => {
    try {
      for (const movie of movies.value) {
        await editMovie({ ...movie, rating: 0 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    movies,
    isLoading,
    totalCount,
    isEmpty,
    avgRating,
    inTheatersMovies,
    getMovies,
    addMovie,
    deleteMovie,
    editMovie,
    resetRatings,
  };
};
