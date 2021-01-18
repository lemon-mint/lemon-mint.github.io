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
      title: "Loading...",
      markdown: "<p>Loading...</p>",
      customfooter: "",
      globalfooter: ""
    }
  },
  mounted() {
    let objs = this;
    function loadhash() {
      jsonGET("/posts.json", (resp) => {
        const postname = resp[parseInt(window.location.hash.replace("#", ""))]
        jsonGET("/index.json", (data) => {
          objs.navtitle = data.navtitle;
        });
        jsonGET("/b/" + postname + "/meta.json", (data) => {
          objs.title = data.title;
          objs.customfooter = data.customfooter;
        });
        rawGET("/globalfooter.html", (data) => {
          objs.globalfooter = data
        })
        setTimeout(
          () => {
            rawGET("/b/" + postname + "/body.md", (data) => {
              objs.markdown = md.makeHtml(data);
              setTimeout(() => {
                runlinker();
              }, 100);
            });
          }, 400
        )
      })
    }
    loadhash();
    window.addEventListener("hashchange",loadhash);
  },
  delimiters: ['[%^]', '[^%]']
};
Vue.createApp(main_document).mount('#main-document');
