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
      const res = await axios.get("http://localhost:5000/get/");
      this.root = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {},
  components: { TreeNode },
};
</script>

<template>
  <div>
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
