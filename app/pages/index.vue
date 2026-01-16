<script setup>
import { useMovieStore } from "@/store/MovieStore";

const filter = ref("all");
const MovieStore = useMovieStore();
MovieStore.getMovies();
const isLoading = computed(() => MovieStore.isLoading);
const isEmpty = computed(() => MovieStore.isEmbty);
</script>

<template>
  <div
    class="max-w-7xl max-h-screen mx-auto p-8 grid justify-items-center gap-3"
  >
    <!-- header -->
    <UiHeader />
    <div class="flex gap-3 lg:ml-auto">
    <UiBtn @click="filter = 'all'" title="All Movies" />
    <UiBtn @click="filter = 'inTheatersMovies'" title="In Theaters" />

    </div>
   
    <!-- filter  -->
    <div v-if="filter==='inTheatersMovies'"
    >
      <h1 class="text-center text-2xl mb-1">Movies In Theater</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
         <div
        v-for="movie in MovieStore.inTheatersMovies"
        :key="movie.id"
       
      >
        <MovieCard :movie="movie" />
      </div>
      </div>
     
    </div>
    <!-- loading state -->
    <div v-if="isLoading">Loading Movies...</div>
    <!-- empty state -->
    <UEmpty
      v-else-if="isEmpty"
      :avatar="{
        src: 'https://github.com/nuxt.png',
      }"
      title="No Movies found"
      description="It looks like you haven't added any Movies. Add one to get started."
    />
    <!-- movies grid -->
    <div
      v-if="filter=== 'all' "
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    >
      <MovieCard
        v-for="movie in MovieStore.movies"
        :key="movie.id"
        :movie="movie"
        class="h-full"
      />
    </div>
  </div>
</template>
