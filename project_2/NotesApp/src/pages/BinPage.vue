<template>
  <div class="bin-page">
    <h3>Total: {{ totalBin }}</h3>
    <div class="row">
      <div class="col-12">
        <div class="menu-tool">
          <h5>Menu tools</h5>
          <div class="action">
            <el-button
              type="danger"
              size="large"
              class="btn-del__all"
              @click="delMultipleBin"
              plain
              >Delete Multiple</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="item in bin.data"
        :key="item.id"
        class="col-lg-4 col-xl-3 col-sm-6"
      >
        <div
          class="bin-content"
          :style="{ backgroundColor: item.background_color }"
        >
          <p v-html="item.text"></p>
          <div class="action">
            <button class="edit" @click="restore(item.id)">Restore</button>
            <button class="delete" @click="destroy(item.id)">Delete</button>
          </div>
        </div>
        <div class="bin-footer d-flex">
          <p>{{ item.deleted_at }}</p>
          <input type="checkbox" v-model="selectedNote" :value="item.id" />
        </div>
      </div>
    </div>

    <Bootstrap4Pagination
      style="justify-content: center"
      :data="bin"
      @pagination-change-page="getBin"
    />
  </div>
</template>

<style lang="scss" scoped>
.bin-page {
  width: 100%;
  margin: 10px 0 10px 0;

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

  .bin-content {
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

  .bin-footer {
    justify-content: center;
    p {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
}
</style>

<script setup>
import axios from "axios";
import moment from "moment";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Bootstrap4Pagination } from "laravel-vue-pagination";
import toastr from "toastr";

const router = useRouter();

const bin = ref([]);
const totalBin = ref();
const selectedNote = ref([]);

const getBin = async (page = 1) => {
  await axios
    .get(`http://127.0.0.1:8000/api/bin?page=${page}`)
    .then((response) => {
      bin.value = response.data.data;
      totalBin.value = response.data.data.total;

      const items = response.data.data;

      items.data.forEach((item) => {
        const formattedDate = moment(item.deleted_at).format(
          "DD-MM-YYYY HH:mm:ss"
        );

        item.deleted_at = formattedDate;
      });
      console.log(items);
    })
    .catch((error) => {
      console.log(error);
    });
};

getBin();

const restore = async (id) => {
  if (confirm("Are you sure you want to restore note?")) {
    await axios
      .put(`http://127.0.0.1:8000/api/bin/restore/${id}`)
      .then((response) => {
        if (response.status == 200) {
          getBin();
          console.log("Restore note success");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
};

const destroy = async (id) => {
  if (confirm("Are you sure you want to destroy note forever?")) {
    await axios
      .delete(`http://127.0.0.1:8000/api/bin/${id}`)
      .then((response) => {
        if (response.status == 200) {
          getBin();
          console.log("Destroy note forever success");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
};

const delMultipleBin = async () => {
  if (confirm("Do you want to delete multiple notes?")) {
    let params = selectedNote.value;
    console.log(params)
    axios
      .post("http://127.0.0.1:8000/api/bin/del", { params })
      .then((response) => {
        console.log(params)
        getBin();
        selectedNote.value = [];
      });
  } 
}
</script>
