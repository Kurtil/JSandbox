function log() {
    console.log(this.message)
}

log.call({message: "coucou"})

const logged = log.bind({message: "jean"})

logged()