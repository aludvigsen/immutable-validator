# Immutable validator

> Deep validates an Object/Array/Map/List

Simple tool to validate that your immutable-js object is fully immutable. Deep validates and logs paths if there are any leafs that are not an instance from immutable-js. Primitive values are ignored.

### What do I use it for?

* If you got a large nested state and expect everything (non-primitives) to be an instance of immutable-js
* Validate that your redux store is fully immutable

## Installation

```sh
npm install immutable-validator --save
```

## Usage example

```js
import { Map, List } from 'immutable'
import ImmutableValidator from 'immutable-validator'

const obj = Map({
    a: 1,
    b: 2,
    c: {},
    d: [],
    e: List([
        1,
        2,
        Map({
            aa: 1,
            bb: {}
        })
    ])
})

ImmutableValidator(obj /**, options **/)

/** LOGS:
 * root.c
 * root.d
 * root.e.2.bb
 * /
```

## Redux example

Usage with Redux

```js
import { createStore } from 'redux'
import rootReducer from '../rootReducer'
import ImmutableValidator from 'immutable-validator'

const Store = createStore(rootReducer)

Store.subscribe(() => ImmutableValidator(Store.getState()))
```

## Options

Object passed as second argument

| Command      | default | Description                    |
| ------------ | ------- | ------------------------------ |
| logToConsole | true    | Log result to console          |
| collapsed    | true    | Collapse the result in console |
