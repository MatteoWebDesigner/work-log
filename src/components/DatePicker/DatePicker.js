let template = `
    <div 
        class="DatePicker" 
        :class="{ 
            'is-time' : type === 'time', 
            'has-value' : dateHasValue
        }"
    >
        <mdc-textfield 
            v-model="date" 
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
        label: {}
    },
    data() {
        return {
            date: ""
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
                this.date == undefined || 
                this.date == "" || 
                this.date == "temp-value"
            );
        },

        timeHasValue() {
            return this.type === 'time' && this.dateHasValue;
        }
    },
    methods: {
        handleDateChange(event) {
            this.date = event.target.value;

            this.$emit('input', this.date)
        },

        handleTimeKey() {
            this.date = "half-value";
        },

        handleTimeChange(event) {
            this.handleDateChange(event);
        },

        handleTimeFocus() {
            if (this.date === '') {
                this.date = 'temp-value';
            }
        },

        handleTimeBlur() {
            if (this.date === 'temp-value') {
                this.date = '';
            }
        }
    },
    template
});