
<script>
import axios from "axios";

export default {
  name: "AddCategory",
  props: {
    node : Object,
  },

  data() {
    return {
      localNode : this.node,
      newObject : Object
    };
  },
  
  methods: {
    async addCategory() {
      this.isim = window.prompt("Enter new Category name: ");
      

      console.log(typeof this.localNode)
      
      await axios
        .post("/", {
          category_name: this.isim,
          parent_id: 0,
        })
      const res = await axios.get("get");
      this.localNode = res.data;
        
    },

  },
  component:{
  }
};
</script>
<template>
<div>
  <button @click="addCategory()"
        class="btn btn-primary">
        Add
  </button>

</div>
</template>

<style>

</style>