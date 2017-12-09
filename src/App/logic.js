import { kea } from "kea";

export default kea({
  actions: () => ({
    addItem: () => "new item",
    removeItem: key => key,
    onSelect: ({ key }) => key,
    onChange: (currentItem, e) => ({
      index: currentItem,
      value: e.target.value
    })
  }),

  reducers: ({ actions }) => ({
    items: [
      ["one", "two"],
      null,
      {
        [actions.addItem]: (state, payload) => state.concat(payload),
        [actions.removeItem]: (state, payload) =>
          state.filter((el, i) => i !== payload),
        [actions.onChange]: (state, { index, value }) => {
          const arr = [...state];
          arr[index] = value;
          return arr;
        }
      }
    ],
    currentItem: [
      0,
      null,
      {
        [actions.onSelect]: (state, payload) => payload
      }
    ]
  })
});
