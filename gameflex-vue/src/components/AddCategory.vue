<template>
<div>
  <button @click="addCategory()"
        class="btn btn-primary">
        Add
  </button>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddCategory",
  props: {
    node : {}
  },

  data() {
    return {
      localNode: { ...this.node },
    };
  },
  
  methods: {
    async addCategory() {
      this.isim = window.prompt("Enter new Category name: ");
      await axios
        .post("http://localhost:5000/", {
          category_name: this.isim,
          parent_id: 0,
        })
        
    },
  },
};
</script>
<style>

</style>