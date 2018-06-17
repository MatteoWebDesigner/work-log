
import AppStore from "/store/App/App.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    ...AppStore
});