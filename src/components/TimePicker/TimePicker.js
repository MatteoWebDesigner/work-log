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
            trailing-icon="access_time"
        />

        <input 
            ref="nativeInput"
            type="time" 
            class="TimePicker_native-input"
            @focus="handleTimeFocus" 
            @blur="handleTimeBlur"
            @change="handleTimeChange"
            @keyup="handleTimeKey"
        />
    </div>`
});