<script setup>
import  {useMovies}  from "~/composable/useMovies";
const MovieStore = useMovies();

const filter = ref("all");
const {movies,  inTheatersMovies, isLoading} = MovieStore;
onMounted(() => {
  MovieStore.getMovies();
});
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
    <!-- loading state -->
     <div v-show="isLoading" >
       <h1>loading...</h1>
     </div>
      <UEmpty
      v-show="isEmpty"
      :avatar="{
        src: 'https://github.com/nuxt.png',
      }"
      title="No Movies found"
      description="It looks like you haven't added any Movies. Add one to get started."
    />
    <!-- filter  -->
        <div 
        v-if="filter === 'inTheatersMovies'"
        >

      <h1 class="text-center text-2xl mb-1">Movies In Theater</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
         <div
        v-for="movie in inTheatersMovies"
        :key="movie.id"
       
      >
        <MovieCard :movie="movie" />
      </div>
      </div>
     
    </div>
   
  
    <!-- movies grid -->
    <div
     v-if="filter === 'all'"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    >
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        class="h-full"
      />
    </div>
  </div>
</template>
