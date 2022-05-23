<script>
import axios from "axios";
import TreeNode from "./components/TreeNode.vue";
export default {
  name: "App",
  data() {
    return {
      root: {},

    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:5000/api/get");
      this.root = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addCategory(){
        this.isim = window.prompt("Enter new Category name: ");
      

      console.log(typeof this.localNode)
      
      await axios
        .post("/", {
          category_name: this.isim,
          parent_id: 0,
        })
      const res = await axios.get("http://localhost:5000/api/get");
      this.root = res.data;
  }},
  components: { TreeNode },
};
</script>

<template>
  <div>
    <button @click="addCategory()"
        class="btn btn-primary">
        Add
  </button>
    
    <TreeNode v-for="node in root" :key="node.id" :node="node"/>
  </div>
</template>

<style>
@import "./assets/base.css";
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
