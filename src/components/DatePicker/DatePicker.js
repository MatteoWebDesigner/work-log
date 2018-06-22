let template = `
    <div 
        class="DatePicker" 
        :class="{ 
            'is-time' : type === 'time', 
            'has-value' : dateHasValue
        }"
    >
        <mdc-textfield 
            v-model="dateNativeInput" 
            :label="label" 
            :trailing-icon="icon"
        />

        <template v-if="type === 'date'">
            <input 
                type="date" 
                class="DatePicker_native-input-date" 
                @change="handleDateChange"
            />
        </template>

        <template v-if="type === 'time'">
            <input 
                type="time" 
                class="DatePicker_native-input-time"
                ref="time"
                @focus="handleTimeFocus" 
                @blur="handleTimeBlur"
                @change="handleTimeChange"
                @keyup="handleTimeKey"
            />
        </template>
    </div>
`;

export default Vue.component('DatePicker', {
    props: {
        type: { default: "date" },
        value: { default: "" },
        label: {}
    },

    data() {
        return {
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

    template
});