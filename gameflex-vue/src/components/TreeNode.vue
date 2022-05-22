<template>
  <div :style="nodeMargin">
  
    <div :class="toggleClickState" v-if="isdeleted != true" @click="toggleClick">
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
        @click="addCategory(localNode.category_id),toggleClick"
        class="btn btn-primary"
        :class="toggleClickStateButton"
      >
        Add
      </button>
      <button
        @click="deleteCategory(localNode.category_id),toggleClick"
        class="btn btn-danger"
        :class="toggleClickStateButton"

      >
        Delete
      </button>
      <button
        @click="editCategory(localNode.category_id),toggleClick"
        class="btn btn-warning"
        :class="toggleClickStateButton"
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
      isClicked: false,
      localNode: { ...this.node },
      clickAble:false,
      haveChildren : false,
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
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return children && children.length > 0;
    },
    toggleChildrenIcon() {
      return (this.showChildren ) ? "btn btn-info" : "btn btn-info";
    },
    toggleClickState(){
      return this.isClicked ? "alert alert-primary" : "alert alert-secondary"
    },
    toggleClickStateButton(){
      return this.clickAble ? "btn-active" : "btn-disabled"
      
  }
},
  methods: {
    async addCategory(nodeParentId) {
      this.isim = window.prompt("Enter new Category name: ");
      await axios
        .post("/", {
          category_name: this.isim,
          parent_id: nodeParentId,
        })
        .then(() =>
          axios
            .get("getSub/" + nodeParentId)
            .then((response) =>
              console.log(
                (this.localNode.children = response.data["SubCategories"])
              )
            )
        );
    },
    async deleteCategory(nodeCategoryId) {
      let url = "delete/" + nodeCategoryId;
      this.localNode.children = {};
      await axios.delete(url);
      this.isdeleted = true;

    },
    async editCategory(nodeCategoryId) {
      var newName = window.prompt("Enter new Category name: ");
      let url = "update/" + nodeCategoryId;
      await axios.put(url, {
        category_name: newName,
      });
      this.localNode.category_name = newName;
    },
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
    toggleClick(){
      this.isClicked = !this.isClicked;
      this.clickAble=!this.clickAble;
      
      
    }

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
.btn-disabled{
  pointer-events: none;
  background-color: gray !important;
  border-color: gray !important;
}
.btn-active{
  pointer-events: visible ;

}

</style>