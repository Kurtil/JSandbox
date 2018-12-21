Vue.component('KrtlDynoinput',
{
    template:`
        <form class="input" @submit.prevent="onAddDynoClicked">
            <input type="text" id="itemInput" v-model.trim='userInput'>
            <button>Add {{ text | undercase | trim}}</button>
        </form>`,
    props: {
        text: String
    },
    data() {
        return {
            userInput: '',
        }
    },
    methods: {
        onAddDynoClicked() {
            if (this.userInput) {
                this.$emit('add-dyno', this.userInput);
            }
        }
    }
});