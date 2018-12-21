Vue.component('KrtlCard',
{
    template: '#krtl-card',
    data() {
        return {
            title: 'Dinosaurs',
            items: [
                { id: 1,text: 'Velociraptor' },
                { id: 2,text: 'Triceratorps' },
                { id: 3,text: 'stegosaurus' },
                { id: 4,text: 'randomcolor' },
            ],
            expanded: true,
        }
    },
    methods: {
        addItem(dynoName) {
            // const input = document.getElementById('itemInput');
            if (dynoName !== '') {
                this.items.push({ text: dynoName });
            }
        },
        deleteItem(index) {
            this.items.splice(index, 1);
        },
        randomColor() {
            return [...'xxxxxx'].reduce((acc, cur) => acc.concat(this.randomInt()), "#");
        },
        randomInt() {
            return Math.ceil(Math.random() * 9);
        },
    },
    computed: {
        dynoLength() {
            return this.items.length;
        },
        headerClassObject: {
            get() {
                this.items.length;
                return this.items.find(el => el.text === 'randomcolor') ? {
                    'backgroundColor': this.randomColor()
                } : null;
            },
            set() {
                throw 'Header Class Object cannot be setted';
            }
        },
    },
    watch: {
        items(val) {
            if (val && val[val.length - 1] && val[val.length - 1].text === 'TRex') {
                this.$emit('TREXXX !');
                alert('You have a TRex !!!');
            }
        }
    }
});
