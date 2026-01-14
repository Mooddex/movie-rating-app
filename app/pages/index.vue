<script setup>

</script>

<template>
    <div>

    
  <div class=" m-9 p-3 flex justify-between whitespace-break-spaces ">
      <div class="flex gap-8">
        <h1>Total Movies : </h1>/ <h1>Average Rating: 3.7 </h1>
      </div>
       <div class="flex justify-end gap-4  ">
       <UiBtn 
       title="Remove Ratings"
       />
        <UiBtn 
       title="Add Movie"
       />
       </div>   
  </div>
  <div class="grid grid-col-3">
   <MovieCard />
  </div>
  </div>
</template>
