import { resetKeaCache, getStore, keaReducer } from "kea";
import initStore from "../store";
import logic from "./logic";

Object.freeze(initStore);

let store = { ...initStore };

beforeEach(() => {
  resetKeaCache();
  store = { ...initStore };
});

describe("action construction", () => {
  test("can add item", () => {
    const { addItem } = logic.actions;
    expect(addItem()).toEqual({
      payload: "new item",
      type: addItem.toString()
    });
  });
  test("can remove item", () => {
    const { removeItem } = logic.actions;
    expect(removeItem(0)).toEqual({
      payload: 0,
      type: removeItem.toString()
    });
  });
  test("can select item", () => {
    const { onSelect } = logic.actions;
    expect(onSelect({ key: 0 })).toEqual({
      payload: 0,
      type: onSelect.toString()
    });
  });

  test("can update item", () => {
    const { onChange } = logic.actions;
    expect(onChange(0, { target: { value: "asdf" } })).toEqual({
      payload: { index: 0, value: "asdf" },
      type: onChange.toString()
    });
  });
});

describe("reducers", () => {
  test("individual reducer example test", () => {
    const { addItem } = logic.actions;
    expect(
      logic.reducers.items([], {
        type: addItem.toString(),
        payload: "a new item"
      })
    ).toEqual(["a new item"]);
  });

  test("addItem", () => {
    const { addItem } = logic.actions;
    expect(logic.reducer({}, addItem())).toEqual({
      items: ["one", "two", "new item"],
      currentItem: 0
    });
  });

  test("removeItem", () => {
    const { removeItem } = logic.actions;
    expect(logic.reducer({}, removeItem(0))).toEqual({
      items: ["two"],
      currentItem: 0
    });
  });

  test("onSelect", () => {
    const { onSelect } = logic.actions;
    // key is the same leakage type as e.target.value, but with the Tabs API
    expect(logic.reducer({}, onSelect({ key: 1 }))).toEqual({
      items: ["one", "two"],
      currentItem: 1
    });
  });

  test("onChange", () => {
    const { onChange } = logic.actions;
    // e.target.value in the action is leaking DOM API details into our logic
    // This is a tradeoff between convenience and the ability to easily reuse
    // in new or unexpected scenarios
    expect(
      logic.reducer({}, onChange(1, { target: { value: "asdf" } }))
    ).toEqual({
      items: ["one", "asdf"],
      currentItem: 0
    });
  });
});

describe("one-off cases", () => {
  test("[bug]: deleting the currently selected item (when it's the last item) results in no selection", () => {
    const { removeItem, onSelect } = logic.actions;
    const state = logic.reducer({}, onSelect({ key: 1 }));
    expect(logic.reducer(state, removeItem(1))).toEqual({
      items: ["one"],
      currentItem: 1
    });
  });
});
