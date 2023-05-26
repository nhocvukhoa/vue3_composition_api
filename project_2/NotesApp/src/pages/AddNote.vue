<template>
  <div class="add-note">
    <div class="card">
      <div class="card-body">
        <h1>Add Note</h1>
        <textarea v-model="notes.text" name="text" id="text" cols="30" rows="10"></textarea>
        <div class="action">
          <button class="create" @click="createNote">Create</button>
          <button class="back" @click="goHome">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-note {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .card {
    width: 750px;
    border-radius: 10px;
    padding: 30px;
    background-color: blueviolet;
    .card-body {
      display: flex;
      text-align: center;
      justify-content: center;
      flex-direction: column;
      .action {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        .create {
          padding: 10px 20px;
          font-size: 20px;
          background-color: green;
          border: none;
          color: #fff;
          cursor: pointer;
          margin-top: 10px;
          margin-right: 10px;
        }
        .back {
          padding: 10px 20px;
          font-size: 20px;
          background-color: red;
          border: none;
          color: #fff;
          cursor: pointer;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const notes = reactive({
  text: ''
})

const createNote = () => {
  axios.post('http://127.0.0.1:8000/api/notes/create', notes)
  .then((response) => {
      console.log(response.data.data)
      router.push({ name: 'home' })
  })
}

const goHome = () => {
  router.push({ name: 'home' })
}
</script>