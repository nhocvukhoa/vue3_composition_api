<template>
  <div class="favorite-page">
    <h3>Total: {{ totalfavorite }}</h3>
    <div class="row">
      <div v-for="item in favorite.data" :key="item.id" class="col-lg-4 col-xl-3 col-sm-6">
        <div class="favorite-content" :style="{ backgroundColor: item.note.background_color }">
          <p>{{ item.note.text }}</p>
          <div class="action">
            <button class="delete" @click="destroy(item.id)">Delete</button>
          </div>
        </div>
        <p>{{ item.daysSinceCreation }}</p>
      </div>
    </div>

    <Bootstrap4Pagination style="justify-content: center;" :data="favorite"
      @pagination-change-page="getFavorite" />
  </div>
</template>

<style lang="scss" scoped>
.favorite-page {
  width: 100%;
  margin: 10px 0 10px 0;

  .favorite-content {
    width: 100%;
    height: 250px;
    position: relative;
    background-color: rgb(237, 182, 44);
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-wrap: break-word;

    p {
      font-size: 15px;
    }

    .action {
      display: flex;
      justify-content: end;
      padding-top: 10px;
      border-top: 1px solid black;

      .delete {
        border: none;
        padding: 10px 20px;
        cursor: pointer;
      }

      .delete {
        background-color: #c82333;
      }
    }
  }
}
</style>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { Bootstrap4Pagination } from "laravel-vue-pagination";

const router = useRouter();

const favorite = ref([]);
const totalfavorite = ref();

const getFavorite = async (page = 1) => {
  await axios
    .get(
      `http://127.0.0.1:8000/api/favorite?page=${page}`
    )
    .then((response) => {
      favorite.value = response.data.data;
      totalfavorite.value = response.data.data.total;
      
      const items = response.data.data;

      const currentDate = new Date();
    
      items.data.forEach((item) => {
        const createdAtDate = new Date(item.note.created_at);
        const timeDiff = Math.abs(currentDate.getTime() - createdAtDate.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        item.daysSinceCreation = daysDiff;
      })
    })
    .catch((error) => {
      console.log(error);
    });
};

getFavorite();

const destroy = async (id) => {
  if (confirm("Are you sure you want to destroy note favorite ?")) {
    await axios
      .delete(`http://127.0.0.1:8000/api/favorite/${id}`)
      .then((response) => {
        if (response.status == 200) {
          getFavorite();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}
</script>
