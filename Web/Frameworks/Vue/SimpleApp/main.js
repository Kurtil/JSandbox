Vue.component('to-do', {
    props: {
        text: String,
        number: { type: Number, required: true }
    }
    ,
    data: () => ({
        counter: 4
    }),
    template: '<li @click="counter++">this is a {{text}} with number {{number}}. My counter is {{counter}}</li>'
})

const app = new Vue({
    el: '#app',
    template: `
    <div :title="message">
        {{ message }}
        <to-do v-for="el of arr" :text="el" :key="el" :number="3"></to-do>
    </div>`,
    data: {
        message: 'Hello Vue!',
        arr: ["cool", "call", "curl", 'cral']
    }
})