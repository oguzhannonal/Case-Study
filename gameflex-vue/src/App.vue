<script>
import axios from "axios";
import CategoryTree from "./components/CategoryTree.vue";
const myCategoryTree = {
	categoryName: "My Tree",
	categoryId: 0,
	children: []
};
axios.defaults.baseURL = "http://localhost:5000/api/v1";
const res = await axios.get("/categories");

myCategoryTree.children = res.data;
export default {
	name: "App",

	components: { CategoryTree },
	data() {
		return {
      myCategoryTree: myCategoryTree
		};
	}
};
</script>

<template>
	<div class="flex-row">
		<CategoryTree :key="myCategoryTree.categoryId" :categories="myCategoryTree" />
	</div>
</template>

<style>
@import "./assets/base.css";
#app {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
}

.flex-row {
	display: flex;
	flex-direction: row;
}
</style>
