<script setup>
import { useMovieStore } from "@/store/MovieStore";
import EditMovieForm from "../EditMovieForm.vue";

const props = defineProps(["movie"]);

const toast = useToast();
const MovieStore = useMovieStore();
const rating = ref(props.movie.rating);

const updateRating = async (newRating) => {
  rating.value = newRating;

  await MovieStore.editMovie({ ...props.movie, rating: newRating });
};
const handleDelete = (id) => {
  toast.add({
    title: "Confirmation",
    description: "Are you sure you want to delete this movie?",
    actions: [
      {
        label: "Yes",
        color: "primary",
        onClick: async() => {
        await MovieStore.deleteMovie(id);   
          return toast.add({ title: "Delete Request succeeded" });
        },
      },
      {
        label: "no",
        color: "warning",
      },
    ],
  });
};
</script>

<template>
  <div class="relative flex flex-col h-full rounded-2xl overflow-hidden flex-1">
    <NuxtImg
      :src="movie.image"
      :alt="movie.name"
      class="bg-transparent w-full object-cover h-90"
    />
    <div class="absolute top-3 right-3 text-yellow-500">
      <div class="relative text-5xl">
        <UIcon name="i-iconamoon:star-fill" />
        <span
          class="absolute inset-0 flex items-center justify-center text-lg font-bold text-white"
        >
          {{ movie.rating }}
        </span>
      </div>
    </div>

    <div class="bg-white text-black p-4 flex flex-col flex-1 space-y-3">
      <h1 class="text-2xl font-medium">{{ movie.name }}</h1>

      <div class="flex gap-2 flex-wrap">
        <p
          v-for="gener in movie.genres"
          :key="gener"
          class="px-3 w-fit bg-indigo-500 text-white rounded-full"
        >
          {{ gener }}
        </p>
      </div>

      <p class="text-gray-700 flex-1">{{ movie.description }}</p>

      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          rating: ({{ movie.rating }}/5)
          <NuxtRating
            :read-only="false"
            :rating-step="0.5"
            :rating-value="movie.rating"
            @rating-selected="updateRating"
          />
        </div>
        <div class="mt-auto space-x-3">
          <!-- edit -->
          <EditMovieForm :movie="movie" />
          <!-- delete -->
          <UButton
            icon="i-heroicons:trash-solid"
            class="bg-gray-300 hover:bg-gray-500 rounded-full p-2 cursor-pointer"
            @click="handleDelete(movie.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
