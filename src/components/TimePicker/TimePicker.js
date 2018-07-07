import userAgent from "/services/userAgent.js";

export default Vue.component('TimePicker', {
    props: {
        value: { default: "" },
        label: {}
    },

    data() {
        return {
            isAndroid: userAgent.isAndroid,
            hasValue: false,
            isFocused: false
        }
    },

    computed: {
        isActive() {
            return this.hasValue || this.isFocused;
        }
    },

    methods: {
        handleDateChange(event) {
            this.dateNativeInput = event.target.value;

            this.$emit('input', this.dateNativeInput)
        },

        handleInputFocus() {
            this.isFocused = true;
        },

        handleInputBlur() {
            this.isFocused = false;
        }
    },

    watch: {
        value(val) {
            this.hasValue = val !== "";
        }
    },

    template: `
        <div 
            class="TimePicker" 
            :class="{
                'is-active': isActive
            }"
        >
            <label class="TimePicker_label" for="test">{{label}}</label>

            <input 
                id="test"
                type="time" 
                class="TimePicker_input" 
                @focus="handleInputFocus"
                @blur="handleInputBlur"
                @change="handleDateChange"
            />

            <mdc-icon icon="access_time" class="TimePicker_icon"></mdc-icon>

            <div class="TimePicker_line"></div>
        </div>
    `
});