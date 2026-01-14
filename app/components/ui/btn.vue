<script setup>
 defineProps({
title:{
    type: String,
    default:' '
},
})
</script>

<template>
   <button 
   class="bg-bgBtn hover:bg-bgBtn/30 p-1 text-sm rounded-md cursor-pointer">
            {{ title }}
        </button>
</template>
