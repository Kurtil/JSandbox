module.exports = {
    TRUE : x => y => x,
    FALSE : x => y => y,
    cond : isTrue => isFalse => conditional => conditional(isTrue)(isFalse),
}



