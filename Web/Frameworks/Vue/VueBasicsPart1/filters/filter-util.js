Vue.filter('capitalize', value => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('undercase', value => {
    if (!value) return '';
    return value.charAt(0).toLowerCase() + value.slice(1);
});

Vue.filter('trim', value => {
    if (!value) return '';
    return value.trim();
});
