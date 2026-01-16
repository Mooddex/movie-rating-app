<script setup>
import * as z from "zod";

const isOpen = ref(false);
const name = ref("");
const description = ref("");
const image = ref("");
const rating = ref(0);
const genre = ref("");
const inTheaters = ref("");

function handleSubmit() {
    

  isOpen.value = false;
}

const schema = z.object({
  name: z.string("Invaild Name must be a string"),
  description: z.string(""),
  image: z.url("must be a URL"),
  rating: z.number("must be a number"),
  genre: z.string(""),
  inTheaters: z.boolean("please chose true or false"),
});
</script>
<template>
  <UModal v-model:open="isOpen" title="Contact Form">
    <UButton label="Open Form" color="neutral" variant="subtle" />

    <template>
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-3">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label for="name">Description</label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            name="name"
            class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label for="name">Image</label>
          <input
            id="image"
            v-model="image"
            type="text"
            name="image"
            class="w-full border active:border-blue-700 border-gray-400 shadow-2xl rounded-lg bg-black"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label for="name">Genres</label>
          <select
            id="genre"
            v-model="genre"
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
            v-model="inTheaters"
            type="checkbox"
            name="inTheaters"
          />

          <label for="inTheaters">In Theaters</label>
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
