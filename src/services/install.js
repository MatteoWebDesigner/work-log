import store from "../store/index.js";

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();

  deferredPrompt = event;

  store.dispatch("setInstallReady");
});

window.addEventListener('appinstalled', (evt) => {
    store.dispatch("setInstallNotReady");
});

function openPrompt () {
    if (!deferredPrompt) {
        return;
    }

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(() => {
        store.dispatch("setInstallNotReady");
        deferredPrompt = null;
    });
}

export default {
    openPrompt
};