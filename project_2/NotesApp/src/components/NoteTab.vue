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
      <div v-show="selectedTabs === 'Home'">
        <NotesPage></NotesPage>
      </div>
      <div v-show="selectedTabs === 'Thùng rác'">Tab 2</div>
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  .tab-link {
    display: flex;
    .tab {
      padding: 20px;
      font-size: 25px;
    }
    .activeTab {
      background-color: #F4F4F4;
    }
  }
  .tab-content {
    width: 100%;
  }
}
</style>

<script setup>
import NotesPage
 from '../pages/NotesPage.vue';
import { ref } from 'vue'

const tabs = ref([
  'Home', 'Thùng rác'
]);
const selectedTabs = ref('Home');
</script>
