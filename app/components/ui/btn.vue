<script setup>
  defineProps({
title:{
    type: String,
}
})
</script>

<template>
   <button 
   class="bg-bgBtn text-white hover:bg-bgBtn/30 p-2 text-sm rounded-md cursor-pointer">
            {{ title }}
        </button>
</template>
