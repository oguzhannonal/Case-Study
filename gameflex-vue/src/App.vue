<script>
import axios from "axios";
import TreeItem from "./components/TreeNode.vue";
const myTree = {
  category_name: 'My Tree',
  category_id : 0,
  children: [
  ]
}
const res = await axios.get("http://localhost:5000/api/get");

myTree.children =res.data

console.log(myTree)

export default {
  
  name: "App",
  data() {
    return {
      root: {},
      myTree,

    };
  },

  methods: {

    async addCategory(){
        this.isim = window.prompt("Enter new Category name: ");
      

      
      await axios
        .post("/", {
          category_name: this.isim,
          parent_id: 0,
        })

      const res = await axios.get("http://localhost:5000/api/get");
      this.root = res.data;
  }},
  components: { TreeItem },
};
</script>

<template>
  <div >
    
    <TreeItem  :model="myTree" :key="myTree.category_id" />
    
  </div>
</template>

<style>
@import "./assets/base.css";
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

}
.item {
  cursor: pointer;
  line-height: 1.5;
}







</style>
