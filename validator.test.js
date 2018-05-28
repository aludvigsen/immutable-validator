import { Map, List } from 'immutable'
import Validator from './index'

const V = a => Validator(a, { logToConsole: false })

const test = {
	a: Map({
		aa: 1,
		bb: 2,
		cc: Map({
			aaa: 1,
			bbb: {
				aaaa: 1
			}
		})
	}),
	b: List([
		{
			aa: 1
		},
		Map({
			aa: 1,
			bb: {
				aaa: 1
			}
		})
	]),
	c: [
		1,
		2,
		Map({
			aa: 1,
			bb: 2,
			cc: 3,
			dd: Map({
				aaa: 1,
				bbb: 2,
				ccc: List([
					1,
					2,
					3,
					4,
					Map({
						aaaa: 1,
						bbbb: {
							aaaaa: 1
						}
					})
				])
			})
		})
	]
}

const test2 = [1, 2, [1]]

describe('Immutable validator', () => {
	it('should validate the root node', () => {
		const fail = { a: 1 }
		const corr = Map({ a: 1 })

		const failResult = ['root']

		expect(V(fail)).toEqual(failResult)
		expect(V(corr)).toEqual([])
	})

	it('should validate test object', () => {
		const res = [
			'root',
			'root.a.cc.bbb',
			'root.b.0',
			'root.b.1.bb',
			'root.c',
			'root.c.2.dd.ccc.4.bbbb'
		]
		expect(V(test)).toEqual(res)
	})

	it('should validate test2 object', () => {
		const res = ['root', 'root.2']
		expect(V(test2)).toEqual(res)
	})
})
