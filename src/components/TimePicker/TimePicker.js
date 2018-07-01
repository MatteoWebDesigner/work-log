import userAgent from "/services/userAgent.js";

export default Vue.component('DatePicker', {
    props: {
        type: { default: "date" },
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
        
        icon() {
            switch (this.type) {
                case "time":
                    return "access_time";
                break;
                default:
                    return "event";
            }
        },

        dateHasValue() {
            return !(
                this.dateNativeInput == undefined || 
                this.dateNativeInput == "" || 
                this.dateNativeInput == "temp-value"
            );
        },

        timeHasValue() {
            return this.type === 'time' && this.dateHasValue;
        }
    },
    methods: {
        handleDateChange(event) {
            this.dateNativeInput = event.target.value;

            this.$emit('input', this.dateNativeInput)
        },

        handleTimeKey() {
            this.dateNativeInput = "half-value";
        },

        handleTimeChange(event) {
            this.handleDateChange(event);
        },

        handleTimeFocus() {
            if (this.dateNativeInput === '') {
                this.dateNativeInput = 'temp-value';
            }
        },

        handleTimeBlur() {
            if (this.dateNativeInput === 'temp-value') {
                this.dateNativeInput = '';
            }
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
        class="TimePicker" 
        :class="{ 
            'has-value' : dateHasValue,
            'isAndroid' : isAndroid 
        }"
    >
        <mdc-textfield 
            v-model="dateNativeInput" 
            :label="label" 
            :trailing-icon="icon"
        />

        <input 
            type="time" 
            class="TimePicker_native-input"
            ref="time"
            @focus="handleTimeFocus" 
            @blur="handleTimeBlur"
            @change="handleTimeChange"
            @keyup="handleTimeKey"
        />
    </div>`
});