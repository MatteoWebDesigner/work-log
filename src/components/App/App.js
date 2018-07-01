import install from "/services/install.js";
import datePicker from "../DatePicker/DatePicker.js";
import timePicker from "../TimePicker/TimePicker.js";

let template = `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main class="App_main-content">
            <h2 class="App_title">Add a record</h2>
            
            <form class="App_form" @submit.prevent="" novalidate>
                <date-picker v-model="date" :value="date" label="date"/>

                <time-picker v-model="timeStart" :value="timeStart" type="time" label="time start"/>

                <time-picker v-model="timeEnd" :value="timeEnd" type="time" label="time end"/>

                <mdc-textfield v-model="label" label="label" />

                <div class="App_add-recond-buttons">
                    <mdc-button @click="clearFields">
                        clear
                    </mdc-button>

                    <mdc-button 
                        raised 
                        :disabled="!isFormValid"
                        @click="onSubmit"
                    >
                        log new time
                    </mdc-button>
                </div>
            </form>

            <h2 class="App_title">Records</h2>

            <ul class="App_list" v-for="record in records">
                <li>
                    <mdc-card>
                        <mdc-card-header
                            :title="record.date + ' ' + record.label">
                        </mdc-card-header>

                        <mdc-card-text> {{ record.timeStart }} - {{ record.timeEnd }} </mdc-card-text>

                        <mdc-card-actions>
                            <mdc-card-action-icons>

                                <mdc-card-action-icon 
                                    icon="delete" 
                                    @click="deleteLog(record.id)"
                                />

                            </mdc-card-action-icons>
                        </mdc-card-actions>
                    </mdc-card>
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
        datePicker,
        timePicker
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