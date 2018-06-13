let template = `
    <mdc-layout-app>

        <mdc-toolbar slot="toolbar">
            <mdc-top-app-bar title="Work log" icon=""></mdc-top-app-bar>    
        </mdc-toolbar>
        
        <main>
            Hello world
        </main>

    </mdc-layout-app>
`

export default Vue.component('App', {
    template
});