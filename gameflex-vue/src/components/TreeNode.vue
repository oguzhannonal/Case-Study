
<script>
import Modal from './Modal.vue';
import axios from 'axios'
import EditModalVue from './EditModal.vue';
export default {
  name: 'TreeItem', // necessary for self-reference
  props: {
    model: Object
  },
  data() {
    return {
      isOpen: false,
      childModel : this.model,
      selected : null,
      newCategoryName: null,
      showModal: false,
      showEditModal : false,
      editCategoryName : null,
      child : []
    }
  },
  components: {
    Modal,
    EditModalVue
  },
  computed: {
    IsFolder() {
      if(this.selected == null){
        return false
      }
        return this.child.length > 0    
      
      
    },
    IsSelected() {
      return this.selected ? "btn btn-primary" : "btn btn-secondary";
    }
  },
  
  
  methods: {
    
    Toggle() {
      this.child = this.childModel.children[this.selected].children
        if (this.IsFolder) {
        this.isOpen = !this.isOpen
      }

      
    },
    async AddChild(){
      
      await axios
        .post("http://localhost:5000/api/", {
          category_name: this.newCategoryName,
          parent_id: this.childModel.children[this.selected].category_id,
        }).then((response)=> this.childModel.children[this.selected].children.push(
        {
          category_name : this.newCategoryName,
          parent_id :  this.childModel.children[this.selected].category_id,
          children : [],
          category_id : response.data.category_id,
          isdeleted : false
        }))
      this.showModal = false;
      this.isOpen = false;

    },
    async DeleteChild(){

      await axios
      .delete("http://localhost:5000/api/delete/" +this.childModel.children[this.selected].category_id) 
      this.childModel.children.splice(this.selected,1);
      this.isOpen = false;
    },
    async EditChild(){
      await axios.put("http://localhost:5000/api/update/"+this.childModel.children[this.selected].category_id,
      {
        category_name:this.editCategoryName
      })
      this.childModel.children[this.selected].category_name = this.editCategoryName
      this.showEditModal = false;
    }
  },
  
  
  }

</script>

<template>
    
    <div class="flex-container">
      <div class="flex-column">
        <button id="show-modal" type="button" @click="showModal = true" :class="IsSelected" >Add</button>

          <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal" @close="showModal = false">
              <template #header>
                <h3>Add Category</h3>
              </template>
              <template #body>
                <input type="text" v-model="newCategoryName">
              </template>
              <template #footer>
                <button
                        :class="IsSelected"
                        @click="AddChild"
                    >Add</button>
              </template>
            </modal>
          </Teleport>
          <!---->
          <button id="show-modal-edit" type="button" @click="showEditModal = true" :class="IsSelected">Edit</button>
          <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showEditModal" @close="showEditModal = false">
              <template #header>
                <h3>Edit Category</h3>
              </template>
              <template #body>
                <input type="text" v-model="editCategoryName">
              </template>
              <template #footer>
                <button
                        :class="IsSelected"
                        @click="EditChild"
                    >Edit</button>
              </template>
            </modal>
          </Teleport>
        

        <button :class="IsSelected" @click="DeleteChild" type="button">Delete</button>
      <select v-model="this.selected" multiple class="form-select" size="10" >
        <option v-for="(child,index) in this.childModel.children" :key="index" v-bind:value="index" @click="Toggle" >
          {{child.category_name}}
        </option>
      </select>
      
      </div>
      <div v-show="isOpen" v-if="IsFolder && this.selected" > 
          <TreeItem
            :model="this.childModel.children[this.selected]"
            :key="this.childModel.children[this.selected].category_id"
            />   
            </div>       
    </div>
    
</template>
<style >
.flex-row{
  
  flex-direction: row;
  
}
.flex-column{
  flex-direction: column;
}
.btn-secondary{
  cursor: not-allowed;
  pointer-events: none;
}
button {
  margin: 10px !important;
}
.flex-container { 
  display: flex;
  overflow: auto;
  white-space: nowrap;
  
}

</style>