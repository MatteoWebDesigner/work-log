import database from "/services/database.js";

let recordIDIncrement = 1;

export default {
    state: {
        isInstallAppReady: false,
        retrievedRecords: false,
        recordsOrder: [],
        records: {}
    },
    mutations: {
        ["SET_INSTALL_READY"](state) {
            state.isInstallAppReady = true;
        },

        ["SET_INSTALL_NOT_READY"](state) {
            state.isInstallAppReady = false;
        },

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

        ["EDIT_RECORD"](state, { 
            id,
            date, 
            timeStart, 
            timeEnd, 
            label 
        }) {
            Vue.set(state.records, id, { id, date, timeStart, timeEnd, label });

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
                recordIDIncrement = Math.max(...state.recordsOrder) + 1;
            }
            
            state.retrievedRecords = true;
        }
    },
    getters: {
        getRecordsCollection(state) {
            return state.recordsOrder.map((recordID) => state.records[recordID]);
        },

        getRecordById(state) {
            return (id) => state.records[id];
        }
    },
    actions: {
        setInstallReady({ commit }) {
            commit('SET_INSTALL_READY');
        },

        setInstallNotReady({ commit }) {
            commit('SET_INSTALL_NOT_READY');
        },

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

        editRecord({ commit }, editRecordData) {            
            return database
                .editRecord(editRecordData)
                .then(() => {
                    commit('EDIT_RECORD', editRecordData);
                });
        },

        deleteRecord({ commit }, id) {            
            return database
                .deleteRecord(id)
                .then(() => {
                    commit('DELETE_RECORD', id);
                });
        },

        retrieveSavedRecords({ commit }) {

            return database.getRecords()
                .then((records) => {
                    commit('RETRIEVE_SAVED_RECORDS', records);
                });
        }
    }
}