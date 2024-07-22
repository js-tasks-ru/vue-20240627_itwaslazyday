import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
    name: 'App',
    template: `
        <div>
            Сегодня {{ new Date().toLocaleDateString('en-En', { dateStyle: 'long' }) }}
        </div>`
});

const app = createApp(App).mount('#app');
