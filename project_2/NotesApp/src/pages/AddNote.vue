<template>
  <div class="add-note">
    <div class="card">
      <div class="card-body">
        <h1>Add Note</h1>
        <CKEditorCustom v-model="notes.editorData" />
        <span v-if="errors.text" class="text-error">{{ errors.text[0] }}</span>
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
      justify-content: center;
      flex-direction: column;
      textarea {
        font-size: 20px;
      }
      h1 {
        text-align: center;
      }
      .text-error {
        color: #fff;
        margin-top: 5px;
      }
      .action {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        .create, .back {
          padding: 10px 20px;
          font-size: 20px;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .create {
          background-color: #218838;
          margin-top: 10px;
          margin-right: 10px;
        }
        .back {
          background-color: #C82333;
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
import CKEditorCustom from '../components/CKEditorCustom.vue';
import toastr from "toastr";

const router = useRouter()
const notes = reactive({
  editorData: '',
  background_color: ''
})
const errors = ref('')

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

const createNote = () => {
  axios.post('http://127.0.0.1:8000/api/notes', {
    text: notes.editorData,
    background_color: getRandomColor()
  })
  .then((response) => {
      console.log(response.data.data)
      router.push({ name: 'home' })
      toastr.success(response.data.message, 'Notification Sent');
  })
  .catch((error) => {
    errors.value = error.response.data.errors
  })
}

const goHome = () => {
  router.push({ name: 'home' })
}
</script>
