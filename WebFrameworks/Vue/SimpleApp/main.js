Vue.component('to-do', {
    props: [
        'text',
        'number'
    ],
    template: '<li>this is a {{text}} with number {{number}}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        arr: ["cool", "call", "curl"]
    }
})