import databaseConnection from "./services/database.js";
import App from "./components/App/App.js";
import store from "./store/index.js";

let template = `<App/>`;

let vm = new Vue({
    el: '#app',
    store,
    template
});

window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
});