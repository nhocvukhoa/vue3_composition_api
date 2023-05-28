<template>
  <main>
    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="addNote">+</button>
      </header>
      <div class="cards-container">
        <div v-for="note in notes" :key="note.id" class="card" :style="{ backgroundColor: note.background_color }">
          <p class="main-text">{{ note.text }}</p>
          <div class="action">
            <button @click="editNote(note.id)" class="edit">Edit</button>
            <button @click="delNote(note.id)" class="delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  position: relative;

  .container {
    max-width: 1000px;
    padding: 10px;
    margin: 0 auto;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-weight: bold;
        margin-bottom: 25px;
        font-size: 75px;
      }

      button {
        border: none;
        padding: 10px;
        width: 50px;
        height: 50px;
        background-color: rgb(21, 20, 20);
        border-radius: 100%;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }

    .cards-container {
      display: flex;
      flex-wrap: wrap;

      .card {
        width: 225px;
        height: 225px;
        background-color: rgb(237, 182, 44);
        padding: 10px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 20px;
        margin-bottom: 20px;

       .action {
        display: flex;
        justify-content: end;
        padding-top: 10px;
        border-top: 1px solid black;
        .edit, .delete {
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }
        .edit {
          background-color: #0068D7;
          margin-right: 10px;
        }
        .delete {
          background-color: #C82333; 
        }
       }
      }
    }
  }
}
</style>

<script setup>
import axios from 'axios'
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const note = ref("");
const notes = ref([]);
const error = ref("");

const getNotes = async () => {
  await axios
    .get('http://127.0.0.1:8000/api/notes')
    .then((response) => {
      notes.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}

getNotes()

const addNote = () => {
  router.push({ name: 'add-note' })
}

const editNote = (id) => {
  router.push({ name: 'edit-note', params: { id: id} })
}

const delNote = async (id) => {
  if (confirm("Are you sure you want to delete")) {
    await axios
      .delete(`http://127.0.0.1:8000/api/notes/${id}`)
      .then((response) => {
        if (response.status == 200) {
          console.log('Delete note success')
          getNotes()
        }
      }) 
      .catch((error) => {
        console.log(error.response);
      });
  }
}

// const editOrAdd = (param) => {
//   if (param === 'add') {
//     name.value = param
//     showModal.value = true
//   } else if (param === 'edit') {
//     name.value = param
//     showModal.value = true
//   }
// }

// function getRandomColor() {
//   return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
// }

// const addNote = () => {
//   if (note.value.length < 9) {
//     return error.value = "Note needs to be 10 characters or more"
//   }

//   notes.value.push({
//     id: Math.floor(Math.random() * 1000000),
//     text: note.value,
//     date: new Date(),
//     backgroundColor: getRandomColor(),
//   });

//   showModal.value = false;
//   note.value = "";
//   error.value = "";
//   console.log(notes.value);
// };

// const delNote = (noteId) => {
//   if (confirm("Are you sure you want to delete")) {
//     notes.value = notes.value.filter(note => note.id !== noteId)
//   }
//   console.log(notes)
// }
</script>
