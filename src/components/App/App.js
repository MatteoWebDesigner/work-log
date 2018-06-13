let template = `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main class="App_main-content">
            <h2>Add a record</h2>
            <mdc-textfield v-model="timeStart" label="time start" />
            <mdc-textfield v-model="timeEnd" label="time end" />
            <mdc-textfield v-model="label" label="label" />
            <mdc-button @click="onSubmit" raised>Add log</mdc-button>
        </main>

    </mdc-layout-app>
`

export default Vue.component('App', {
    data() {
        return {
            timeStart: "",
            timeEnd: "",
            label: "",
            date: ""
        }
    },
    methods: {
        onSubmit() {

        }
    },
    template
});