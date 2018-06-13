let database = new Promise((resolve, reject) => {
    let connection = window.indexedDB.open("records");

    connection.onsuccess = function(event) {
        console.log("onsuccess", event.target.result);

        let connection = event.target.result;

        resolve(connection);
    }
    
    connection.onerror = function(event) {
        reject("not working");
    }
    
    connection.onupgradeneeded = function(event) {
        console.log("onupgradeneeded", event.target.result);

        let connection = event.target.result;

        resolve(connection);
    
        connection.createObjectStore("records", { keyPath: "id", autoIncrement: true });
    }

});

function handleConnectionOnSuccess() {

}

function handleConnectionOnError() {

}

function handleConnectionOnUpgradeneeded() {

}

function addRecord({ timeStart, timeEnd, label }) {
    database.then((connection) => {
        
        let transaction = connection.transaction(["records"], "readwrite");

        let recordsObjectStore = transaction.objectStore("records");

        recordsObjectStore.add({
            timeStart,
            timeEnd,
            label
        });

    });
}

function getRecords() {
    let 
        resolve,
        promise = new Promise((promiseResolve) => {
            resolve = promiseResolve;
        });

    database.then((connection) => {
        let transaction = connection.transaction(["records"]);
        let recordsObjectStore = transaction.objectStore("records");
        let query = recordsObjectStore.openCursor();
        let response = [];
        
        query.onsuccess = function(event) {
            let cursor = event.target.result;

            if (cursor) {
                response.push(cursor.value);
                cursor.continue();
            } else {
                resolve(response);
            }
        };
    });

    return promise;
}

export default { 
    database,
    addRecord, 
    getRecords 
};