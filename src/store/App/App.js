import database from "/services/database.js";

let recordIDIncrement = 1;

export default {
    state: {
        retrievedRecords: false,
        recordsOrder: [],
        records: {}
    },
    mutations: {
        ["ADD_NEW_RECORD"](state, { 
            date, 
            timeStart, 
            timeEnd, 
            label 
        }) {
            Vue.set(state.records, recordIDIncrement, { id: recordIDIncrement, date, timeStart, timeEnd, label })
            state.recordsOrder.push(recordIDIncrement);

            recordIDIncrement += 1;
        },

        ["DELETE_RECORD"](state, id) {
            Vue.delete( state.records, id )
            state.recordsOrder = state.recordsOrder.filter((recordID) => recordID !== id);
        },

        ["RETRIEVE_SAVED_RECORDS"](state, records) {
            records.forEach(({ 
                id, 
                date, 
                timeStart, 
                timeEnd, 
                label 
            }) => {
                Vue.set(state.records, id, { id, date, timeStart, timeEnd, label })
                state.recordsOrder.push(id);
            });

            if (state.recordsOrder.length) {
                recordIDIncrement = Math.max(...state.recordsOrder);
            }
            
            state.retrievedRecords = true;
        }
    },
    getters: {
        getRecordsCollection(state) {
            return state.recordsOrder.map((recordID) => state.records[recordID]);
        }
    },
    actions: {
        addRecord({ state, commit }, newRecordData) {

            if (!state.retrievedRecords) {
                return;
            }
            
            return database
                .addRecord(newRecordData)
                .then(() => {
                    commit('ADD_NEW_RECORD', newRecordData);
                });
        },

        deleteRecord({ commit }, id) {            
            return database
                .deleteRecord(id)
                .then(() => {
                    commit('DELETE_RECORD', id);
                });
        },

        retrieveSavedRecords({ state, commit }) {

            return database.getRecords()
                .then((records) => {
                    commit('RETRIEVE_SAVED_RECORDS', records);
                });
        }
    }
}