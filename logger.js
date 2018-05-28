export default (logArray, opts) => {
	const title = 'Immutable validator'

	if (opts.collapsed) {
		console.groupCollapsed(title)
	} else {
		console.info(title)
	}

	// Log array
	logArray.forEach(v => console.log(v))

	if (opts.collapsed) console.groupEnd()
}
