let template = `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main class="App_main-content">
            <h2 class="App_title">Add a record</h2>
            
            <form class="App_form" @submit.prevent="" novalidate>
                <mdc-textfield v-model="date" label="date" />
                <mdc-textfield v-model="timeStart" label="time start" />
                <mdc-textfield v-model="timeEnd" label="time end" />
                <mdc-textfield v-model="label" label="label" />
                <mdc-button @click="onSubmit" raised :disabled="!isFormValid">log new time</mdc-button>
            </form>

            <h2 class="App_title">Records</h2>

            <ul v-for="record in records">
                <li>
                    {{ record.date }} -
                    {{ record.timeStart }} -
                    {{ record.timeEnd }} -
                    {{ record.label }} 

                    <button @click="deleteLog(record.id)">x</button>
                </li>
            </ul>

            <p v-if="!records.length">No items saved</p>
        </main>

    </mdc-layout-app>
`;

const { mapActions, mapGetters } = Vuex;

export default Vue.component('App', {
    data() {
        return {
            timeStart: "",
            timeEnd: "",
            label: "",
            date: ""
        }
    },
    computed: {
        ...mapGetters({
            records: 'getRecordsCollection'
        }),

        isFormValid() {
            return (
                this.timeStart !== "" &&
                this.timeEnd !== "" &&
                this.label !== ""
            )
        }  
    },
    mounted() {
        this.retrieveSavedRecords();
    },
    methods: {
        ...mapActions({
            retrieveSavedRecords: 'retrieveSavedRecords',
            addRecord: 'addRecord',
            deleteRecord: 'deleteRecord'
        }),

        onSubmit() {
            if (!this.isFormValid) {
                return;
            }

            this.addRecord({
                date: this.date,
                timeStart: this.timeStart,
                timeEnd: this.timeEnd,
                label: this.label
            });

            this.clearFields();
        },

        clearFields() {
            this.timeStart = "";
            this.timeEnd = "";
            this.label = "";
            this.date = "";
        },

        deleteLog(id) {
            this.deleteRecord(id);
        }
    },
    template
});