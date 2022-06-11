import express from "express";
import asyncErrorWrapper from "../middleware/asyncWrapper.js";
import postgresClient from "../config/db.js";

const router = express.Router()


// create category
router.post('/api/v1/categories/', asyncErrorWrapper(async (req, res) => {
	const text = 'INSERT INTO category ("parentId","categoryName") VALUES($1,$2) RETURNING *'
	const values = [req.body.parentId, req.body.categoryName]
	const {
		rows
	} = await postgresClient.query(text, values)

	return res.status(201).json(rows[0])

}))
// update category
router.put('/api/v1/categories/:categoryId', asyncErrorWrapper(async (req, res) => {

	const {
		categoryId
	} = req.params

	const text = 'UPDATE "category" SET "categoryName"=$1 WHERE "categoryId"=$2 RETURNING *'
	const values = [req.body.categoryName, categoryId]
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
// get subCategories
router.get('/api/v1/categories/:parentId', asyncErrorWrapper(async (req, res) => {

	const {
		parentId
	} = req.params
	const text = 'SELECT * FROM "category" WHERE "parentId"=$1 AND "isDeleted"=false ORDER BY "categoryId" ASC'
	const values = [parentId]
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

// get category by id
router.get('/api/v1/categories/:categoryId', asyncErrorWrapper(async (req, res) => {

	const {
		categoryId
	} = req.params
	const text = 'SELECT * FROM "category" WHERE "categoryId"=$1 AND "isDeleted" IS NOT TRUE'
	const values = [categoryId]
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
// get not deleted Category with recursive apporoach
router.get('/api/v1/categories/', asyncErrorWrapper(async (req, res) => {

	const text = 'SELECT * FROM "category" WHERE "isDeleted" IS NOT true ORDER BY "categoryId" ASC'
	const {
		rows
	} = await postgresClient.query(text)
	const traverse = (arr, parentId) =>
		arr.filter(node => node.parentId === parentId)
		.reduce((result, current) => [
			...result,
			{
				...current,
				children: traverse(arr, current.categoryId)
			}
		], [])

	const parseTree = (arr) =>
		arr.sort(({
			parentId
		}) => parentId)
		.filter(({
			parentId
		}) => !parentId)
		.map(node => ({
			...node,
			children: traverse(arr, node.categoryId)
		}))



	if (!rows.length) {
		return res.status(404).json({
			message: 'Category not found.'
		})

	}
	const parsedCategories = parseTree(rows)
	const arrayToObject = (array, key) =>
		array.reduce(
			(obj, item) => ({
				...obj,
				[item[key]]: item
			}), {});
	arrayToObject(parsedCategories, 'categoryId');
	return res.status(200).json(parsedCategories)

}))
// delete category
router.delete('/api/v1/categories/:categoryId', asyncErrorWrapper(async (req, res) => {

	const {
		categoryId
	} = req.params
	const text = 'UPDATE "category" SET "isDeleted"=$1 WHERE "categoryId"=$2 OR "parentId"=$2 RETURNING * '
	const values = [true, categoryId]
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

export default router