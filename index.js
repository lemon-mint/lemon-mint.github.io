async function jsonGET(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.send();
}

const main_document = {
    data() {
        return {
            navtitle: "Loading...",
            title: "Loading..."
        }
    },
    mounted() {
        let objs = this 
        jsonGET("/index.json",(data)=>{
            objs.navtitle = data.navtitle;
            objs.title = data.title;
        });
    },
    delimiters: ['[%^]', '[^%]']
};
Vue.createApp(main_document).mount('#main-document');
