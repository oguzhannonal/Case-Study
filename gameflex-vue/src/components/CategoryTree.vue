<script>
import AddEditModalComponent from "./AddEditModal.vue";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
export default {
	name: "CategoryTree",
	components: {
		AddEditModalComponent,
	},
	props: {
		categories: {
			type:Object,
			required : true
		}
	},
	data() {
		return {
			isParentCategory: false,
			allCategories: this.categories,
			selected: null,
			showModal: false,
      modalTitle : null,
			editAddCategoryName: null,
			categoryChildren: []
		};
	},
	computed: {
		isFolder() {
			if (this.selected == null) {
				return false;
			}
			return this.categoryChildren.length > 0;
		},
		isSelected() {
			return this.selected ? "btn btn-primary" : "btn btn-secondary";
		}
	},

	methods: {
		toggleCategory() {
			this.categoryChildren = this.allCategories.children[this.selected].children;
			if (this.isFolder) {
				this.isParentCategory = !this.isParentCategory;

			}
		},
		async addChild() {
			await axios
				.post("/categories", {
					categoryName: this.editAddCategoryName,
					parentId: this.allCategories.children[this.selected].categoryId
				})
				.then(response =>
					this.allCategories.children[this.selected].children.push({
						categoryName: this.editAddCategoryName,
						parentId: this.allCategories.children[this.selected].categoryId,
						children: [],
						categoryId: response.data.categoryId,
						isDeleted: false
					})
				);
			this.showModal = false;
			this.isParentCategory = true;
		},
		async deleteChild() {
			await axios.delete(
				"/categories/" +
					this.allCategories.children[this.selected].categoryId
			);
			this.allCategories.children.splice(this.selected, 1);
			this.isParentCategory = false;
		},
		async editChild() {
			await axios.put(
				"/categories/" +
					this.allCategories.children[this.selected].categoryId,
				{
					categoryName: this.editAddCategoryName
				}
			);
			this.allCategories.children[
				this.selected
			].categoryName = this.editAddCategoryName;
			this.showModal = false;
		}
	}
};
</script>

<template>
	<div class="flex-container">
		<div class="flex-column">
			<button
				id="show-modal"
				type="button"
				:class="isSelected"
				@click="showModal = true"
			>
				Add
			</button>
			<button
				id="show-modal-edit"
				type="button"
				:class="isSelected"
				@click="showModal = true ; modalTitle = 'Edit'"
			>
				Edit
			</button>
			<Teleport to="body">
				<AddEditModalComponent :show="showModal"  :title="modalTitle" @close="showModal = false">
					<template #header>
						<h3 v-if="modalTitle">Edit Category</h3>
					</template>
					<template #body>
						<input v-model="editAddCategoryName" type="text" />
					</template>
					<template #footer>
						<button v-if="modalTitle" :class="isSelected" @click="editChild">Edit</button>
            <button v-else :class="isSelected" @click="addChild">Add</button>
					</template>
				</AddEditModalComponent>
			</Teleport>
			<button :class="isSelected" type="button" @click="deleteChild">
				Delete
			</button>
			<select v-model="selected" multiple class="form-select" size="10">
				<option
					v-for="(singleCategory, index) in allCategories.children"
					:key="index"
					:value="index"
					@click="toggleCategory"
				>
          {{ singleCategory.categoryName }}
        </option>
			</select>
		</div>
		&nbsp;&nbsp;->&nbsp;&nbsp;
		<div v-show="isParentCategory" v-if="isFolder && selected">
			<CategoryTree
				:key="allCategories.children[selected].categoryId"
				:categories="allCategories.children[selected]"
			/>
		</div>
	</div>
</template>
<style>

.flex-column {
	flex-direction: column;
	align-items: center;
}
.btn btn-secondary {
	cursor: not-allowed;
	pointer-events: none;
}
button {
	margin: 5px !important;
}
.flex-container {
	display: flex;
	overflow: auto;
	white-space: nowrap;
	text-align: center;
	align-items: center;
}
</style>
