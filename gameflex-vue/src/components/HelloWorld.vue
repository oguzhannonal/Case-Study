<script>
import axios from "axios";

export default {
  props: ["parent_id"],
  data() {
    return {
      greeting: "Hello World!",
      items: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:5000/getSub/:parent_id");
      this.items = res.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<template>
  <div class="greetings">
    <ul class="list-group">
      <li v-for="item of items" :key="item.id" class="list-group-item">
        {{ item.category_name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
