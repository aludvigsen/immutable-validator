import Validator from './validator'

const defaults = {
	collapsed: true,
	logToConsole: true
}

export default (state, opts) => {
	const options = Object.assign({}, defaults, opts)
	return Validator(state, options)
}
