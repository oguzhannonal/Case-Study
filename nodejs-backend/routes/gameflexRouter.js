import express from "express";
import AsyncWrapper from "../middleware/asyncWrapper.js";
import postgresClient from "../config/db.js";

const gameflexRouter = express.Router()


//create category
gameflexRouter.post('/api', AsyncWrapper(async (req, res) => {
	const text = "INSERT INTO category (parent_id,category_name) VALUES($1,$2) RETURNING *"
	const values = [req.body.parent_id, req.body.category_name]
	const {
		rows
	} = await postgresClient.query(text, values)

	return res.status(201).json(rows[0])

}))
//update category
gameflexRouter.put('/api/update/:category_id', AsyncWrapper(async (req, res) => {

	const {
		category_id
	} = req.params

	const text = "UPDATE category SET category_name=$1 WHERE category_id=$2 RETURNING *"
	const values = [req.body.category_name, category_id]
	const {
		rows
	} = await postgresClient.query(text, values)
	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}
	return res.status(200).json({
		updatedCategory: rows[0]
	})





}))
//get subCategories
gameflexRouter.get('/api/getSub/:parent_id', AsyncWrapper(async (req, res) => {

	const {
		parent_id
	} = req.params
	const text = "SELECT * FROM category WHERE parent_id=$1 AND isdeleted=false ORDER BY category_id ASC"
	const values = [parent_id]
	const {
		rows
	} = await postgresClient.query(text, values)
	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}

	return res.status(200).json(rows)



}))
//get parentCategories
gameflexRouter.get('/api/getParent/', AsyncWrapper(async (req, res) => {

	const text = "SELECT category_name FROM category WHERE parent_id IS NULL ORDER BY category_id ASC"
	const {
		rows
	} = await postgresClient.query(text)
	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}
	return res.status(200).json({
		ParentCategories: rows[0]
	})



}))
//get category by id
gameflexRouter.get('/api/getById/:category_id', AsyncWrapper(async (req, res) => {

	const {
		category_id
	} = req.params
	const text = "SELECT * FROM category WHERE category_id=$1 AND isdeleted IS NOT TRUE"
	const values = [category_id]
	const {
		rows
	} = await postgresClient.query(text, values)
	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}
	return res.status(200).json({
		Category: rows
	})

}))
//get not deleted Category with recursive apporoach
gameflexRouter.get('/api/get', AsyncWrapper(async (req, res) => {

	const text = "SELECT * FROM category WHERE isDeleted IS NOT true ORDER BY category_id ASC"
	const {
		rows
	} = await postgresClient.query(text)
	const traverse = (arr, parent_id) =>
		arr.filter(node => node.parent_id === parent_id)
		.reduce((result, current) => [
			...result,
			{
				...current,
				children: traverse(arr, current.category_id)
			}
		], [])

	const parseTree = (arr) =>
		arr.sort(({
			parent_id
		}) => parent_id)
		.filter(({
			parent_id
		}) => !parent_id)
		.map(node => ({
			...node,
			children: traverse(arr, node.category_id)
		}))



	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}
	const a = parseTree(rows)
	const arrayToObject2 = (array, key) =>
		array.reduce(
			(obj, item) => ({
				...obj,
				[item[key]]: item
			}), {});
	arrayToObject2(a, 'category_name');
	return res.status(200).json(a)

}))
//delete category
gameflexRouter.delete('/api/delete/:category_id', AsyncWrapper(async (req, res) => {

	const {
		category_id
	} = req.params
	const text = "UPDATE category SET isdeleted=$1 WHERE category_id=$2 OR parent_id=$2 RETURNING * "
	const values = [true, category_id]
	const {
		rows
	} = await postgresClient.query(text, values)
	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}

	return res.status(200).json({
		deletedCategory: rows[0]
	})

}))

export default gameflexRouter