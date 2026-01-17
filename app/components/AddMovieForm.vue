<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import {useMovies} from "~/composable/useMovies";

const MovieStore = useMovies();

const toast = useToast();
const genreOptions = ['Drama','Action','Comedy','Horror']
const open = ref(false)

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  image: z.url("Image must be a valid URL"),
  rating: z.number().min(0).max(5),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  inTheaters: z.boolean(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: '',
  description: '',
  image: '',
  rating: 0,
  inTheaters: false,
  genres: [],
});

 async function  onSubmit(event: FormSubmitEvent<Schema>) {
  const movie = event.data
   try { await MovieStore.addMovie(movie);
  console.log(event.data);
  toast.add({
    title: "Success",
    description: `${event.data.name} has been Added.`,
    color: "success",
  });
   open.value = false
   }catch(error){
    console.log(error);
    toast.add({
      title: "Error",
      description: `Failed to add movie.`,
      color: "error",
    });
   }
   }
</script>

<template>
  <UModal v-model:open="open" title="Add New Movie" >
    <UiBtn title="ADD Movie" @click="open=true" />
  <template #body >
  <UForm :schema="schema" :state="state" class="space-y-4 w-full " @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" class="w-full" />
    </UFormField>
    <UFormField label="Description" name="description">
      <UInput v-model="state.description"  class="w-full" />
    </UFormField>
    <UFormField label="Image" name="image">
      <UInput v-model="state.image"  class="w-full" />
    </UFormField>
    <UFormField label="Ratings" name="rating">
      <UInput v-model="state.rating" type="number" class="w-full" />
    </UFormField>
    <UFormField label="Genre" name="genres">
      <USelect 
      v-model="state.genres"
      :items="genreOptions"
      multiple
       class="w-full"
      />
    </UFormField>
    <UFormField label="In the Theaters" name="inTheaters" class="flex items-center gap-3">
      <UCheckbox v-model="state.inTheaters" />
    </UFormField>

   

    <UButton type="submit"> Submit </UButton>
  </UForm>
  </template>
  </UModal>
</template>
