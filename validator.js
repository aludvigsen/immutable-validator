import { Iterable } from 'immutable'
import isPrimitive from 'is-primitive'
import Logger from './logger'

let pathArray = []

export default (state, opts) => {
	// Clear array
	clearArray()

	// Traverse state
	traverseState(state, 'root')

	// console log results
	if (opts.logToConsole) Logger(pathArray, opts)

	return pathArray
}

const clearArray = () => (pathArray = [])
const add = v => pathArray.push(v)

const isImmutable = v => Iterable.isIterable(v)
const logIfNotImmutable = (v, path) => {
	if (isPrimitive(v)) return false
	if (!isImmutable(v)) add(path)
}

const traverseState = (leaf, path) => {
	// First round
	if (path === 'root') logIfNotImmutable(leaf, 'root')

	if (isImmutable(leaf)) {
		leaf.forEach((val, key) => {
			logIfNotImmutable(val, `${path}.${key}`)
			traverseState(val, `${path}.${key}`)
		})
	} else if (leaf !== null && typeof leaf === 'object') {
		for (let key in leaf) {
			logIfNotImmutable(leaf[key], `${path}.${key}`)
			traverseState(leaf[key], `${path}.${key}`)
		}
	}

	return null
}
