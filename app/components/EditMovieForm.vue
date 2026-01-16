<script setup>
import * as z from "zod";
import { useMovieStore } from "~/store/MovieStore";

const props =defineProps(["movie"]);

const MovieStore = useMovieStore();
const isOpen = ref(false);
const form = reactive({
  id:props.movie.id,
  name: props.movie?.name,
  description: props.movie?.description,
  image: props.movie?.image,
  rating: props.movie?.rating,
  genres: props.movie?.genres,
  inTheaters: props.movie?.inTheaters,
});

function handleSubmit() {
  console.log(form)
  const movie = movieSchema.safeParse(form);
  if (movie.success) {
    MovieStore.editMovie(movie.data);
  } else {
    console.log(movie.error);
  }

  isOpen.value = false;
}

const movieSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description is too short"),
  image: z.url("Image must be a valid URL"),
  rating: z.number().min(0).max(5),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  inTheaters: z.boolean(),
});
</script>
<template>
  <UModal v-model:open="isOpen" title="Add Movie">
    <UButton
      icon="i-fa-solid:pen"
      class="bg-gray-300 hover:bg-gray-500 rounded-full p-2 cursor-pointer"
    />

    <template #body>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-3">
          <div class="flex flex-col gap-3">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black p-1"
              required
            />
          </div>
          <div class="flex flex-col gap-3">
            <label for="name">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              type="text"
              name="name"
              class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black p-1"
            />
          </div>
          <div class="flex flex-col gap-3">
            <label for="name">Image</label>
            <input
              id="image"
              v-model="form.image"
              type="text"
              name="image"
              class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg p-1 bg-black"
              required
            />
          </div>
          <div class="flex flex-col gap-3">
            <label for="name">Genres</label>
            <select
              id="genre"
              v-model="form.genres"
              type="select"
              name="genre"
              multiple="4"
              class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg p-3 bg-black"
            >
              <option value="action">Action</option>
              <option value="crime">Crime</option>
              <option value="drama">Drama</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
            </select>
          </div>
          <div class="space-x-1">
            <input
              id="inTheaters"
              v-model="form.inTheaters"
              type="checkbox"
              name="inTheaters"
            />

            <label for="inTheaters">In Theaters</label>
          </div>
        </div>
      </form>
    </template>

    <template #footer="{ close }">
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="close"
      />
      <UButton label="Submit" @click="handleSubmit" />
    </template>
  </UModal>
</template>
