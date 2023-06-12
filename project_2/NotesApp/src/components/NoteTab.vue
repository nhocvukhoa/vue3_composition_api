<template>
  <div class="tabs">
    <div class="tab-link">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTabs = tab"
        :class="{activeTab: selectedTabs === tab}"
      >
        {{ tab }}
      </div>
    </div>
    <div class="tab-content">
      <p v-if="selectedTabs === 'Home'" class="tab-detail">
        <NotesPage></NotesPage>
      </p>
      <p v-if="selectedTabs === 'Bin'" class="tab-detail">
        <BinPage></BinPage>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  .tab-link {
    display: flex;
    border-bottom: 1px solid black;
    .tab {
      padding: 15px;
      font-size: 16px;
      cursor: pointer;
    }
    .activeTab {
      background-color: #F4F4F4;
    }
  }
  .tab-content {
    width: 100%;
    text-decoration: none;
  }
}
</style>

<script setup>
import NotesPage from '../pages/NotesPage.vue';
import BinPage from '../pages/BinPage.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = ref([
  'Home', 'Bin'
]);

const goTrashPage = () => {
  router.push({ name: 'demo' })
}
const selectedTabs = ref('Home');
</script>
