<script>
import axios from "axios";
import TreeItem from "./components/TreeNode.vue";
const myTree = {
	category_name: "My Tree",
	category_id: 0,
	children: []
};
const res = await axios.get("http://localhost:5000/api/get");

myTree.children = res.data;
export default {
	name: "App",

	components: { TreeItem },
	data() {
		return {
			root: {},
			myTree
		};
	}
};
</script>

<template>
	<div class="flex-row">
		<TreeItem :key="myTree.category_id" :model="myTree" />
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
