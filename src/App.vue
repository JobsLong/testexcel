<template>
  <top-navbar
    :store.sync="store" 
    :testcases.sync="testcases" 
    :testgroup.sync="testgroups">
  </top-navbar>

  <div class="container-fluid main-content">
    <div v-show="isLoading" class="loading">
      <img src="http://7xrkvy.dl1.z0.glb.clouddn.com/16-7-6/54141698.jpg" alt="Loading...">
    </div>
    <excel-list 
      :store="store" 
      :testcases="testcases" 
      :testgroup="testgroups">
    </excel-list>
  </div>
</template>

<script>
import topNavbar from './components/patrials/TopNavbar'
import excelList from './components/excel/List'

export default {
  data() {
    return {
      isLoading: true,
      store: null,
      testcases: [],
      testgroups: []
    }
  },
  components: {
    topNavbar,
    excelList
  },
  ready() {
    
  },
  events: {
    projectsLoaded (projects) {
      this.isLoading = false
    }
  },
  methods: {
  }
}
</script>

<style>
  .loading {
    height: 100vh;
    width: 100%;
    text-align: center;
    background-color: #ffffff;
  }
</style>
