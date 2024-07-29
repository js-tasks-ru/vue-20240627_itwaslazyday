import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
    name: 'App',
    setup() {
        const currentDate = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' });
        return {
            currentDate
        }
    },
    template: `
        <div>
            Сегодня {{ currentDate }}
        </div>`
});

const app = createApp(App).mount('#app');
