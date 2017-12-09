import { getStore } from "kea";
import persistState from "redux-localstorage";

let enhancers = [];
if (window.localStorage) {
  enhancers.push(persistState());
}
export default getStore({
  //  plugins: [],
  //  paths: ["kea", "scenes"],
  //  reducers: {},
  //  preloadedState: undefined,
  //  middleware: [],
  //  compose: /*composeWithDevTools ||*/ compose,
  enhancers
});
