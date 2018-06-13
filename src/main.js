import databaseConnection from "./services/database.js";
import App from "./components/App/App.js";

let template = `<App/>`;

let vm = new Vue({
    el: '#app',
    template
});

window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
});