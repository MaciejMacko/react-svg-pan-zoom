import {getDefaultValue} from "../src/features/common";
import {createFakeDOM, createFakeEvent, testBBox, testMatrix} from "./test-utils";
import {identity} from "transformation-matrix";

describe('testBBox', () => {
  test('square', () => {
    const value = getDefaultValue(
      200, 200,       //viewer 200x200
      0, 0, 400, 400, //svg 400x400
    )

    expect(testBBox(value)).toEqual([0, 0, 400, 400])
  })

  test('view box', () => {
    const value = getDefaultValue(
      200, 100,         //viewer 200x100
      30, 60, 100, 200, //svg 70x140
    )

    expect(testBBox(value)).toEqual([0, 0, 70, 140])
  })
})

test('testMatrix', () => {
  const value = getDefaultValue(
    200, 200,       //viewer 200x200
    0, 0, 400, 400, //svg 400x400
  )

  const matrix = testMatrix(value)
  expect(matrix).toEqual(identity())
  expect(matrix).toMatchSnapshot()
})

describe("createFakeEvent", () => {
  test("common", () => {
    const event = createFakeEvent({type: 'click'})
    expect(event.type).toBe('click')
    expect(event).toMatchSnapshot()
    expect(function () {
      event.attach = 100
    }).toThrow()
  })

  test("mouse", () => {
    const event = createFakeEvent({type: 'click', mouse: [50, 100]})
    expect(event).toMatchObject({clientX: 50, clientY: 100})
  })

  test("touches", () => {
    const event = createFakeEvent({type: 'click', touches: [[50, 100], [200, 300]]})
    expect(event.touches).toEqual([{clientX: 50, clientY: 100}, {clientX: 200, clientY: 300}])
  })

})

test("createFakeDOM", () => {
  const dom = createFakeDOM({position: [200, 300]})
  const {left, top} = dom.getBoundingClientRect()
  expect(left).toEqual(200)
  expect(top).toEqual(300)
  expect(dom.getBoundingClientRect).toHaveBeenCalledTimes(1)
})
