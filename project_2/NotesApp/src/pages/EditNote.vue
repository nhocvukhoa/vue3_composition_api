<template>
  <div class="edit-note">
    <div class="card">
      <div class="card-body">
        <h1>Edit Note </h1>
        <div class="form-group">
          <label for="" class="text-white">Text</label>
          <textarea v-model="note.text" name="text" id="text" cols="30" rows="10" class="form-control"></textarea>
          <span v-if="errors.text" class="text-error">{{ errors.text[0] }}</span>
        </div>
        <div class="form-group">
          <label for="" class="text-white">Order by</label>
          <select v-model="note.order_by" name="sort" id="sort" class="form-control">
            <option v-for="item in notesOrderBy" :key="item.id" :value="item.order_by">
              {{ item.order_by }}
            </option>
          </select>
        </div>
        <div class="action">
          <button @click="updateNote(id)" class="update">Update</button>
          <button @click="goHome" class="back">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-note {
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
        .update, .back {
          padding: 10px 20px;
          font-size: 20px;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .update {
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
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const note = reactive({
  text: '',
  order_by: 1
})
const notesOrderBy = ref([])
const errors = ref('')

const getNoteEdit = async() => {
  await axios
    .get(`http://127.0.0.1:8000/api/notes/edit/${route.params.id}`)
    .then((response) => {
      note.text = response.data.data.text;
      note.order_by = response.data.data.order_by;
      notesOrderBy.value = response.data.notesOrderBy
      console.log(notesOrderBy.value)
    })
    .catch((error) => {
      console.log(error.response);
    })
}

const updateNote = async(id) => {
  await axios
    .put(`http://127.0.0.1:8000/api/notes/${id}`, note)
    .then((response) => {
      if (response.status == 200) {
        router.push({ name: 'home' })
      }
      console.log(typeof(note.order_by))
    })
    .catch((error) => {
      errors.value = error.response.data.errors
    })
}

const goHome = () => {
  router.push({ name: 'home' })
}

getNoteEdit()
</script>