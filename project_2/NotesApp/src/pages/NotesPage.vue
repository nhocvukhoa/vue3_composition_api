<template>
  <main>
    <div class="container">
      <!-- Begin Header -->
      <div class="row">
        <header>
          <h1>Notes</h1>
          <button @click="addNote">+</button>
        </header>
      </div>
      <!-- End Header -->

       <!-- Begin Search -->
      <div class="row">
        <form @submit.prevent="getNotes" class="flex flex-wrap form-search">
          <div class="col-md-3 input-search">
            <label>Content</label>
            <input v-model="search" type="text" placeholder="Enter content..." class="form-control" />
          </div>
          <div class="col-md-3 input-search">
            <label>Created date</label>
            <input v-model="date" type="date" class="form-control" />
          </div>
          <div class="col-md-3 input-search">
            <label>Sort</label>
            <select v-model="selectedId" @change="updateSelectedName($event)" name="sort" id="sort" class="form-control">
              <option v-for="item in sortDays" :key="item.id" :value="item.name">{{ item.name }}</option>
            </select>
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button type="submit" class="btn btn-primary btn-block" @click=handleSearch>Search</button>
          </div>
        </form>
      </div>
      <!-- End Search -->

      <!-- Begin Note Content -->
      <div class="total-result">There are {{ totalLength }} notes</div>
      <div class="row">
        <div v-for="note in notes.data" :key="note.id" class="col-lg-4 col-xl-3 col-sm-6">
          <div class="note-content" :style="{ backgroundColor: note.background_color }">
            <p>{{ note.text }}</p>
            <div class="action">
              <button @click="editNote(note.id)" class="edit">Edit</button>
              <button @click="delNote(note.id)" class="delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End Note Content -->

      <Bootstrap4Pagination style="justify-content: center; margin-top: 20px" :data="notes"
        @pagination-change-page="getNotes" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  position: relative;

  .container {
    header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding: 0 15px 0 15px;

      h1 {
        font-weight: bold;
        font-size: 75px;
      }

      button {
        border: none;
        width: 50px;
        height: 50px;
        background-color: rgb(21, 20, 20);
        border-radius: 100%;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    form {
      width: 100%;
      display: flex;
      margin-bottom: 25px;

      .input-group {
        padding-left: 0;

        input {
          margin-right: 10px;
        }
      }
    }

    .total-result {
      color: red;
      font-size: 25px;
      margin-bottom: 20px;
    }

    .note-content {
      width: 100%;
      height: 250px;
      position: relative;
      background-color: rgb(237, 182, 44);
      padding: 10px;
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

        .edit,
        .delete {
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }

        .edit {
          background-color: #0068d7;
          margin-right: 10px;
        }

        .delete {
          background-color: #c82333;
        }
      }
    }
  }
}

@media(max-width: 1191px) {
  main {
    .container {
      .note-content {
        margin-bottom: 20px;
      }
    }
  }
}

@media(max-width: 768px) {
  main {
    .container {
      .form-search {
        .input-search {
          margin-bottom: 15px;
        }
      }
    }
  }
}

@media(max-width: 576px) {
  main {
    .container {
      header {
        padding: 0 15px 0 15px;
      }
    }
  }
}

@media(max-width: 320px) {
  main {
    .container {
      header {
        h1 {
          font-size: 50px;
        }

        button {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Bootstrap4Pagination } from "laravel-vue-pagination";

const router = useRouter();

const notes = ref([]);
const search = ref("");
const selectedId = ref(null);
const selectedName = ref(null);
const sortDays = ref([
  {
    id: 1,
    name: 'Increasing with creation time'
  },
  {
    id: 2,
    name: 'Decreasing with creation time'
  }
]);
const date = ref(getCurrentDate());
const totalLength = ref(0);

const updateSelectedName = (e) => {
  selectedName.value = e.target.value;
  console.log(selectedName.value);
};

const getNotes = async (page = 1) => {
  await axios
    .get(`http://127.0.0.1:8000/api/notes?page=${page}&search=${search.value}&date=${date.value}`)
    .then((response) => {
      notes.value = response.data.data;
      totalLength.value = response.data.data.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

getNotes();

const addNote = () => {
  router.push({ name: "add-note" });
};

const editNote = (id) => {
  router.push({ name: "edit-note", params: { id: id } });
};

const delNote = async (id) => {
  if (confirm("Are you sure you want to delete")) {
    await axios
      .delete(`http://127.0.0.1:8000/api/notes/${id}`)
      .then((response) => {
        if (response.status == 200) {
          console.log("Delete note success");
          getNotes();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
};

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
