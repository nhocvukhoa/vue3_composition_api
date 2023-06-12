<template>
  <div class="bin-page">
    <h3>Total: {{ totalBin }}</h3>
    <div 
      v-for="item in bin.data" 
      :key="item.id" 
      class="bin-content"
    >
      <p>{{ item.id }}</p>
      <p>{{ item.text }}</p>
    </div>
  
  <Bootstrap4Pagination
    style="justify-content: center; margin-top: 20px"
    :data="bin"
    @pagination-change-page="getBin"
  />
  </div>
 
</template>

<style lang="scss" scoped>
.bin-page {
  width: 100%;
  margin: 10px 0 10px 0;

  .bin-content {
    width: 100%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { Bootstrap4Pagination } from "laravel-vue-pagination";

const bin = ref([]);
const totalBin= ref();

const getBin = async (page = 1) => {
  await axios
    .get(
      `http://127.0.0.1:8000/api/bin?page=${page}`
    )
    .then((response) => {
      bin.value = response.data.data;
      console.log(response.data.data)
      totalBin.value = response.data.data.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

getBin();
</script>
