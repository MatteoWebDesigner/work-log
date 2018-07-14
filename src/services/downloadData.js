import database from "./database.js";

export default function() {
    return database.getRecords()
        .then((records) => {

            let json = JSON.stringify({ records }),
                blob = new Blob([json], {type: "octet/stream"}),
                url = URL.createObjectURL(blob);
            
            return url;
        });
}