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
            {{ text | capitalize }}
            <p>
                {{ text | undercase | url }}
            </p>
        </li>`
});
