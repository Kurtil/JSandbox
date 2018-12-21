Vue.component('KrtlFooter',
{
    props: {
        dynoLength: {
            type: Number,
            default() {
                // can be a simple prop, but can be a methode to compute stuffs... :P
                return 0
            },
            // require: true,
            validator(value) {
                // for test purpose, impossible to pass 13 as dynoLength
                return value != 13;
            },
        }
    },
    template:`
<footer>You have {{dynoLength}} dyno{{dynoLength > 1 ? 's' : ''}}</footer>`,
});