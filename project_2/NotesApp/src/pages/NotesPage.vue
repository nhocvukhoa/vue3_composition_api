<template>
  <main>
    <div class="note-page">
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
            <label>Sort by created date</label>
            <select @change="updateSelectedName($event)" name="sort" id="sort" class="form-control">
              <option v-for="item in sortDays" :key="item.id" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button type="submit" class="btn btn-primary btn-block">
              Search
            </button>
          </div>
        </form>
      </div>
      <!-- End Search -->

      <!-- Begin Menu Tool-->
      <div class="row">
        <div class="col-12">
          <div class="menu-tool">
            <h5>Menu tools</h5>
            <div class="action">
              <el-button type="danger" size="large" class="btn-del__all" @click="delMultiple" plain>Delete Multiple</el-button>
              <el-dropdown>
                <el-button size="large" type="primary" plain>
                  Grid<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Small</el-dropdown-item>
                    <el-dropdown-item>Large</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <!-- End Menu Tool-->

      <!-- Begin Note Total -->
      <div v-if="totalLength > 1">
        <p class="total-result">{{ totalLength }} notes</p>
      </div>
      <div v-else>
        <p class="total-result">{{ totalLength }} note</p>
      </div>
      <!-- End Note Total -->

      <!-- Begin Note Content -->
      <div class="row">
        <div v-for="note in notes.data" :key="note.id" class="col-lg-4 col-xl-3 col-sm-6">
          <div class="note-content" :style="{ backgroundColor: note.background_color }">
            <p>{{ note.text }}</p>
            <div class="action">
              <button @click="editNote(note.id)" class="edit">Edit</button>
              <button @click="delNote(note.id)" class="delete">Delete</button>
            </div>
          </div>
          <div class="note-footer">
            <p class="note-created__at">{{ note.created_at }}</p>
            <div v-if="note.rating">
              <i class="bi bi-star-fill noteRate" @click="ratingNote(note.id)"></i>
            </div>
            <div v-else="!note.rating">
              <i class="bi bi-star-fill" @click="ratingNote(note.id)"></i>
            </div>
            <input type="checkbox" v-model="selectedNote" :value="note.id" />
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
.tabs {
  .tab-content {
    main {
      position: relative;

      .note-page {
        header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding: 0 15px 0 15px;

          h1 {
            font-weight: bold;
            font-size: 55px;
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
          label {
            font-weight: 500;
          }
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

        .note-footer {
          display: flex;
          justify-content: center;
          padding-bottom: 15px;

          p {
            margin-bottom: 0;
          }

          .note-created__at {
            margin-right: 5px;
          }

          .bi-star-fill {
            margin-right: 5px;

            &:hover {
              cursor: pointer;
            }
          }

          .noteRate {
            color: yellow;
          }
        }

        .menu-tool {
          border: 1px solid brown;
          margin-bottom: 15px;
          padding: 15px;
          position: relative;

          .action {
            display: flex;
            flex-wrap: wrap;
            .btn-del__all {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1191px) {
  main {
    .note-page {
      .note-content {
        margin-bottom: 20px;
      }
    }
  }
}

@media (max-width: 768px) {
  main {
    .note-page {
      .form-search {
        .input-search {
          margin-bottom: 15px;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  main {
    .note-page {
      header {
        padding: 0 15px 0 15px;
      }
    }
  }
}

@media (max-width: 320px) {
  main {
    .note-page {
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
import moment from "moment";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Bootstrap4Pagination } from "laravel-vue-pagination";
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter();

const notes = ref([]);
const search = ref("");
const selectedName = ref(null);
const sortDays = ref([
  {
    id: 1,
    name: "-- Choose sort type --",
  },
  {
    id: 2,
    name: "Increase",
  },
  {
    id: 3,
    name: "Decrease",
  },
]);
const date = ref("");
const totalLength = ref(0);
const selectedNote = ref([]);

const updateSelectedName = (e) => {
  selectedName.value = e.target.value;
  console.log(selectedName.value);
};

const getNotes = async (page = 1) => {
  await axios
    .get(
      `http://127.0.0.1:8000/api/notes?page=${page}&search=${search.value}&date=${date.value}&sort=${selectedName.value}`
    )
    .then((response) => {
      notes.value = response.data.data;

      const items = response.data.data;

      items.data.forEach((item) => {
        const formattedDate = moment(item.created_at).format(
          "DD-MM-YYYY HH:mm:ss"
        );

        item.created_at = formattedDate;
      });

      totalLength.value = response.data.data.total;
      console.log(response.data.data.data);
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

const ratingNote = async (id) => {
  await axios
    .post("http://127.0.0.1:8000/api/notes/rate", {
      note_id: id,
      rated: true,
    })
    .then((response) => {
      getNotes();
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const delMultiple = async () => {
  if (confirm("Do you want to delete multiple notes?")) {
    let params = selectedNote.value;
    axios
      .post("http://127.0.0.1:8000/api/notes/deleteMultiple", { params })
      .then((response) => {
        getNotes();
        selectedNote.value = [];
      });
  }
};

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>
