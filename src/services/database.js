let database = new Promise((resolve, reject) => {
    let connection = window.indexedDB.open("records");

    connection.onsuccess = function(event) {
        let connection = event.target.result;

        resolve(connection);
    }
    
    connection.onerror = function(event) {
        reject("not working");
    }
    
    connection.onupgradeneeded = function(event) {
        let connection = event.target.result;

        let objectStore = connection.createObjectStore("records", { keyPath: "id", autoIncrement: true });

        objectStore.transaction.oncomplete = function(event) {
            resolve(connection);
        };
    }

});

function handleConnectionOnSuccess() {

}

function handleConnectionOnError() {

}

function handleConnectionOnUpgradeneeded() {

}

function addRecord({ date, timeStart, timeEnd, label }) {
    return database.then((connection) => {
        
        let transaction = connection.transaction(["records"], "readwrite");

        let recordsObjectStore = transaction.objectStore("records");

        recordsObjectStore.add({
            date,
            timeStart,
            timeEnd,
            label
        });

    });
}

function deleteRecord(id) {
    return database.then((connection) => {
        
        let transaction = connection.transaction(["records"], "readwrite");

        let recordsObjectStore = transaction.objectStore("records");

        recordsObjectStore.delete(id);

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
    deleteRecord,
    getRecords 
};