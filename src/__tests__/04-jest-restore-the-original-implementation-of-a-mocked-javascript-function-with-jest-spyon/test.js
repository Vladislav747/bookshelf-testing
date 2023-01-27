const utils = require('./utils')
const thumbWar = require('./thumb-war')

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }

  mockFn.mock = {calls: []}
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

spyOn(utils, 'get')

utils.getWinner = fn((p1, p2) => p2)

const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')

assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, ['Ken Wheeler'])

//cleanup
utils.getWinner.mockRestore()
