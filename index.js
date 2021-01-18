const main_document = {
    data() {
        return {
            navtitle: "Welcome!",
            title: "Hello, World!"
        }
    },
    mounted() {
        void(0);
    },
    delimiters: ['[%^]', '[^%]']
};
Vue.createApp(main_document).mount('#main-document');
