import install from "/services/install.js";
import datePicker from "../DatePicker/DatePicker.js";

let template = `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main class="App_main-content">
            <h2 class="App_title">Add a record</h2>
            
            <form class="App_form" @submit.prevent="" novalidate>
                <date-picker v-model="date" type="date" label="date"/>

                <date-picker v-model="timeStart" type="time" label="time start"/>

                <date-picker v-model="timeEnd" type="time" label="time end"/>

                <mdc-textfield v-model="label" label="label" />

                <mdc-button 
                    raised 
                    :disabled="!isFormValid"
                    @click="onSubmit"
                >
                    log new time
                </mdc-button>
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

            <mdc-button 
                raised 
                v-if="isInstallReady"
                @click="install"
            >
                Install web app
            </mdc-button>
        </main>

    </mdc-layout-app>
`;

const { mapActions, mapGetters } = Vuex;

export default Vue.component('App', {
    components: {
        datePicker
    },
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

        isInstallReady() {
            return this.$store.state.isInstallAppReady;
        },

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

        install() {
            install.openPrompt();
        },

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