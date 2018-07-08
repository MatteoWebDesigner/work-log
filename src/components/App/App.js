import install from "/services/install.js";
import timerLog from "../TimerLog/TimerLog.js";
import datePicker from "../DatePicker/DatePicker.js";
import timePicker from "../TimePicker/TimePicker.js";

const { mapActions, mapGetters } = Vuex;

export default Vue.component('App', {
    components: {
        timerLog,
        datePicker,
        timePicker
    },
    data() {
        return {
            tabActive: 0,
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
        },

        handleChangeTab(value) {
            this.tabActive = value;
        },

        handleTimerLogSave({ date, startTime, endTime, label }) {
            this.date = date;
            this.timeStart = startTime;
            this.timeEnd = endTime;
            this.label = label;

            this.onSubmit();
        }
    },
    template: `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main class="App_main-content">
            <h2 class="App_title">Add a record</h2>
            
            <div class="App_tabs">
                <mdc-tab-bar @change="handleChangeTab">
                    <mdc-tab>Manual entry</mdc-tab>
                    <mdc-tab>Timer entry</mdc-tab>
                </mdc-tab-bar>
            </div>
            
            <template v-if="tabActive === 0">
                <form class="App_form" @submit.prevent="" novalidate>
                    <div class="App_add-record-inputs">
                        <date-picker v-model="date" :value="date" label="date"/>

                        <time-picker v-model="timeStart" :value="timeStart" type="time" label="time start"/>

                        <time-picker v-model="timeEnd" :value="timeEnd" type="time" label="time end"/>

                        <mdc-textfield v-model="label" label="label" />
                    </div>

                    <div class="App_add-record-buttons">
                        <mdc-button @click="clearFields">
                            clear
                        </mdc-button>

                        <mdc-button 
                            raised 
                            :disabled="!isFormValid"
                            @click="onSubmit"
                        >
                            Save
                        </mdc-button>
                    </div>
                </form>
            </template>

            <template v-if="tabActive === 1">
                <timer-log @onSubmit="handleTimerLogSave"></timer-log>
            </template>

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

    </mdc-layout-app>`
});