Vue.component('krtl-dynoitem',
{
    props: {
        text: String,
        index: Number,
    },
    filters: {
        capitalize(value) {
            if (!value) return '';
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        undercase(value) {
            if (!value) return '';
            return value.charAt(0).toLowerCase() + value.slice(1);
        },
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
