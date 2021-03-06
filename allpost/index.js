let md = new showdown.Converter();
md.setFlavor("github")
md.setOption('tasklists', 'true');
md.setOption('tables', 'true');
md.setOption('parseImgDimensions', 'true');
md.setOption('ghCodeBlocks', 'true');
md.setOption('requireSpaceBeforeHeadingText', 'true');

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

async function rawGET(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = xhr.responseText;
      callback(data);
    }
  };
  xhr.send();
}

const main_document = {
  data() {
    return {
      navtitle: "Loading...",
      title: "All posts",
      markdown: "<p>Loading...</p>",
      customfooter: "",
      globalfooter: ""
    }
  },
  mounted() {
    let objs = this;
    jsonGET("/index.json", (data) => {
      objs.navtitle = data.navtitle;
    });
    jsonGET("/posts.json",(posts)=>{
      objs.markdown = "";
      posts.forEach(element => {
        objs.markdown += `<a href="/b/${element}/">${element}</a><br/>`
      });
    });
  },
  delimiters: ['[%^]', '[^%]']
};
Vue.createApp(main_document).mount('#main-document');
