<script setup>
import {useMovies} from "~/composable/useMovies";

const MovieStore = useMovies();
onMounted(() => {
  MovieStore.getMovies();
});
</script>

<template>
  <div
    class="space-y-3 flex flex-col lg:flex-row w-full justify-between  items-center  ">
    <div class="flex gap-8 justify-start">
      <h1>Total Movies : {{ MovieStore.totalCount }}</h1>
      <span>/</span>
      <h1>Average Rating : {{ MovieStore.avgRating }}</h1>
    </div>
    <div class="flex gap-4 justify-end">
      <UiBtn @click="MovieStore.resetRatings()" title="Remove Ratings" />
      <AddMovieForm />
    </div>
  </div>
</template>
