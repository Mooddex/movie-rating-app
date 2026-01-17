<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import {useMovies} from "~/composable/useMovies";

const MovieStore = useMovies();
const isSubmitting = ref(false)

const toast = useToast();
const genreOptions = ['Drama','Action','Comedy','Horror']
const open = ref(false)
const props = defineProps<{
  movie: {
    id: number,
    name: string;
    description: string;
    image: string;
    rating: number;
    genres: [];
    inTheaters: boolean;
  };
}>();
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
  
  name: props.movie.name ,
  description:props.movie.description ,
  image:props.movie.image ,
  rating: props.movie.rating ,
  inTheaters: props.movie.inTheaters  ,
  genres: props.movie.genres || [] ,
});

 async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isSubmitting.value) return;
    isSubmitting.value = true;
  try {
    await MovieStore.editMovie({ id: props.movie?.id,...event.data });
  console.log(event.data);
  toast.add({
    title: "Success",
    description: `${event.data.name} has been Edited.`,
    color: "success",
  });
   open.value = false
   
  } catch (error) {
    console.log(error);
    toast.add({
    title: "Error",
    description: `${event.data.name} has failed to Edited.`,
    color: "error",
  });
    
  } finally{
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Add New Movie" >
    <UButton
      icon="i-fa-solid:pen"
      class="bg-gray-300 hover:bg-gray-500 rounded-full p-2 cursor-pointer"
    />
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

   

    <UButton type="submit" :loading="isSubmitting" :disabled="isSubmitting"> 
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
       </UButton>
  </UForm>
  </template>
  </UModal>
</template>
