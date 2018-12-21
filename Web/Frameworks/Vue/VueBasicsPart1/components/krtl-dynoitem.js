Vue.component('KrtlDynoitem',
{
    props: {
        text: [String, Number],
        index: Number,
    },
    filters: {
        url(value) {
            return `https://www.github.com/${value}`;
        }
    },
    methods: {
        onDeleteClicked() {
            this.$emit('delete-dyno', this.index);
        }
    },
    template: `
        <li class="dynoitem">
            <button type="button" @click='onDeleteClicked'>x</button>
            {{ this.text | capitalize }}
            <p>
                {{ this.text | undercase | url }}
            </p>
        </li>`
});
