import userAgent from "/services/userAgent.js";

export default Vue.component('DatePicker', {
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
            class="DatePicker" 
            :class="{
                'is-active': isActive
            }"
        >
            <label class="DatePicker_label" for="test">{{label}}</label>

            <input 
                id="test"
                type="date" 
                class="DatePicker_input" 
                @focus="handleInputFocus"
                @blur="handleInputBlur"
                @change="handleDateChange"
            />

            <mdc-icon icon="event" class="DatePicker_icon"></mdc-icon>

            <div class="DatePicker_line"></div>
        </div>
    `
});