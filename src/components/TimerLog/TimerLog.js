export default Vue.component('TimerLog', {
    data() {
        return {
            step: 0,
            date: "",
            startTime: "",
            endTime: "",
            label: ""
        };
    },

    computed: {
        isFormValid() {
            return this.label !== "";
        }
    },

    methods: {
        restartStep() {
            this.step = 0;
        },

        nextStep() {
            this.step += 1;
        },

        startRecordingLog() {
            let now = new Date();
            this.date = dateFns.format(now, 'DD-MM-YYYY');
            this.startTime = dateFns.format(now, 'HH:mm');
            this.nextStep(); 
        },

        restartRecordTime() {
            this.restartStep()
            this.clearFields();
        },

        clearFields() {
            this.timeStart = "";
            this.timeEnd = "";
            this.label = "";
            this.date = "";
        },

        endRecordingLog() {
            let now = new Date();
            this.endTime = dateFns.format(now, 'HH:mm');
            this.nextStep(); 
        },

        onSubmit() {
            this.$emit("onSubmit", {
                date: this.date,
                startTime: this.startTime,
                endTime: this.endTime,
                label: this.label
            });

            this.restartRecordTime();
        }
    },

    template: `
    <div class="TimerLog">

        <template v-if="step === 0">
            <mdc-button raised @click="startRecordingLog">
                Start Record Time
            </mdc-button>
        </template>

        <template v-if="step === 1">
            <mdc-button @click="restartRecordTime">
                Cancel
            </mdc-button>

            <mdc-button raised @click="endRecordingLog">
                Stop Record Time
            </mdc-button>
        </template>

        <template v-if="step === 2">
            <div class="">
                <mdc-textfield v-model="label" label="label" />

                <mdc-button 
                    raised 
                    :disabled="!isFormValid"
                    @click="onSubmit"
                >
                    Save
                </mdc-button>
            </div>
        </template>

    </div>`
})