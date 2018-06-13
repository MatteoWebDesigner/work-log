let template = `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main class="App_main-content">
            <h2>Add a record</h2>
            
            <form class="App_form" @submit.prevent="" novalidate>
                <mdc-textfield v-model="date" label="date" />
                <mdc-textfield v-model="timeStart" label="time start" />
                <mdc-textfield v-model="timeEnd" label="time end" />
                <mdc-textfield v-model="label" label="label" />
                <mdc-button @click="onSubmit" raised :disabled="!isFormValid">log new time</mdc-button>
            </form>

            <h2>Records</h2>

            <ul v-for="record in records">
                <li>{{ record.label }}</li>
            </ul>

            <p v-if="!records.length">No items saved</p>
        </main>

    </mdc-layout-app>
`;

import database from "/services/database.js";

export default Vue.component('App', {
    data() {
        return {
            timeStart: "",
            timeEnd: "",
            label: "",
            date: "",
            records: []
        }
    },
    computed: {
        isFormValid() {
            return true;

            // return (
            //     this.timeStart !== "" &&
            //     this.timeEnd !== "" &&
            //     this.label !== ""
            // )
        }
    },
    mounted() {
        database.getRecords().then((records) => {
            this.records = records;
        });
    },
    methods: {
        onSubmit() {
            if (!this.isFormValid) {
                return;
            }

            database.addRecord({
                timeStart: this.timeStart,
                timeEnd: this.timeEnd,
                label: this.label
            })
        },

        clearFields() {
            this.timeStart = "";
            this.timeEnd = "";
            this.label = "";
            this.date = "";
        }
    },
    template
});