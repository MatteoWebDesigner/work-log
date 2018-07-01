import userAgent from "/services/userAgent.js";

export default Vue.component('DatePicker', {
    props: {
        value: { default: "" },
        label: {}
    },

    data() {
        return {
            isAndroid: userAgent.isAndroid,
            dateNativeInput: ""
        }
    },

    computed: {
        dateHasValue() {
            return !(
                this.dateNativeInput == undefined || 
                this.dateNativeInput == "" || 
                this.dateNativeInput == "temp-value"
            );
        }
    },
    methods: {
        handleDateChange(event) {
            this.dateNativeInput = event.target.value;

            this.$emit('input', this.dateNativeInput)
        }
    },

    watch: {
        value(val) {
            if (val === "") {
                this.dateNativeInput = "";
            }
        }
    },

    template: `
        <div 
            class="DatePicker" 
            :class="{
                'isAndroid' : isAndroid 
            }"
        >
            <mdc-textfield 
                v-model="dateNativeInput" 
                :label="label" 
                trailing-icon="event"
            />

            <input 
                type="date" 
                class="DatePicker_native-input" 
                @change="handleDateChange"
            />
        </div>
    `
});