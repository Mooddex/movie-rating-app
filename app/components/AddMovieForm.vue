<script setup>
import * as z from "zod";
import { useMovieStore } from "~/store/MovieStore";
const toast = useToast();
const MovieStore = useMovieStore();
const isOpen = ref(false);
const form = reactive({
 name : (""),
 description : ("No Description"),
 image : (""),
 rating : (0),
 genres : [],
 inTheaters : (false)
})


const handleSubmit = async()=> {
    const newMovie = movieSchema.safeParse(form)
    if(newMovie.success){
       await MovieStore.addMovie(newMovie.data);
      toast.add({description:`${form.name} Has Been Added Successfully`});
    }else{console.log(newMovie.error)
      toast.add({title:'Error', description:`${newMovie.error}`})
    }

  isOpen.value = false;
}

const movieSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  image: z.url("Image must be a valid URL"),
  rating: z.number().min(0).max(5),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  inTheaters: z.boolean(),
});
</script>
<template>
  <UModal v-model:open="isOpen" title="Add Movie">
    <UiBtn title="Add Movie"   />

    <template #body>
      <form  @submit.prevent="handleSubmit" >
        <div class="space-y-3">

        <div class="flex flex-col gap-3 ">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black p-1"
            required="true"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label for="name">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            type="text"
            name="name"
            class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black"
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
            required="true"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label for="name">Genres</label>
          <select
            id="genre"
            v-model="form.genres"
            type="select"
            name="genre"
            multiple
            class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg p-3 bg-black"
          >
            <option value="action">Action</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
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
