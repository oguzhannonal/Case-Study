<template>

  <div :style="nodeMargin">
  
    <div class="alert alert-primary" v-if="isdeleted != true">
      {{ localNode.category_name }}
      <button
        v-if="hasChildren"
        :class="toggleChildrenIcon"
        @click="toggleChildren"
        @keypress="toggleChildren"
      >
        Toogle
      </button>
      <button
        @click="addCategory(localNode.category_id)"
        class="btn btn-primary"
      >
        Add
      </button>
      <button
        @click="deleteCategory(localNode.category_id)"
        class="btn btn-danger"
      >
        Delete
      </button>
      <button
        @click="editCategory(localNode.category_id)"
        class="btn btn-warning"
      >
        Edit
      </button>
    </div>
    <div v-if="hasChildren" v-show="showChildren">
      <TreeNode
        v-for="child in localNode.children"
        :key="child.category_id"
        :node="child"
        :spacing="spacing + 30"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TreeNode",
  props: {
    node: {
      type: Object,
      required: true,
    },
    spacing: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isdeleted: this.node.isdeleted,
      showChildren: false,
      localNode: { ...this.node },
    };
  },
  computed: {
    nodeMargin() {
      return {
        "margin-left": `${this.spacing}px`,
      };
    },
    hasChildren() {
      const { children } = this.localNode;
      return children && children.length > 0;
    },
    toggleChildrenIcon() {
      return this.showChildren ? "btn btn-info" : "btn btn-info";
    },
  },
  methods: {
    async addCategory(nodeParentId) {
      this.isim = window.prompt("Enter new Category name: ");
      await axios
        .post("http://localhost:5000/", {
          category_name: this.isim,
          parent_id: nodeParentId,
        })
        .then(() =>
          axios
            .get("http://localhost:5000/getSub/" + nodeParentId)
            .then((response) =>
              console.log(
                (this.localNode.children = response.data["SubCategories"])
              )
            )
        );
    },
    async deleteCategory(nodeCategoryId) {
      let url = "http://localhost:5000/delete/" + nodeCategoryId;
      await axios.delete(url);
      this.isdeleted = true;
    },
    async editCategory(nodeCategoryId) {
      var newName = window.prompt("Enter new Category name: ");
      let url = "http://localhost:5000/update/" + nodeCategoryId;
      await axios.put(url, {
        category_name: newName,
      });
      this.localNode.category_name = newName;
    },
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
  },
};
</script>
<style>
.alert {
  margin-left: 120px;
}
.btn {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
