<template>
    <div class="callback">
        <h1>This is a callback stuff...</h1>
    </div>
</template>

<script>
import { afterLoggedIn } from '../utils/auth.js'


export default {
    name: "Callback",
    beforeMount() {
        afterLoggedIn().then(() => {
            this.$router.push('/secret');
        });
    //     handleAuth(err => {
    //         if (err) {
    //             // eslint-disable-next-line
    //             console.log(err)
    //             return;
    //         }
    //         this.$router.push('/secret');
    //     })
    },
    props: {

    },
    methods: {

    },
}
</script>
