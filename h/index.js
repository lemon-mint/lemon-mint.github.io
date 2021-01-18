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
    const loadpage = ()=>{
      jsonGET("/index.json", (data) => {
        objs.navtitle = data.navtitle;
      });
      jsonGET("/b/"+window.location.hash.replace("#","")+"/meta.json", (data) => {
        objs.title = data.title;
        objs.customfooter = data.customfooter;
      });
      rawGET("/globalfooter.html", (data)=>{
        objs.globalfooter = data
      })
      setTimeout(
        () => {
          rawGET("/b/"+window.location.hash.replace("#","")+"/body.md", (data) => {
            objs.markdown = md.makeHtml(data);
            setTimeout(() => {
              hljs.initHighlighting();
              document.querySelectorAll("a").forEach((el) => {
                if (typeof (el.href) == "string") {
                  if ((el.href.startsWith("http://") || el.href.startsWith("https://")) && (el.origin != window.location.origin)) {
                    el.rel = "nofollow";
                    el.onclick = (e) => {
                      e.preventDefault();
                      let clickcount = e.detail;
                      setTimeout(() => {
                        console.log(clickcount);
                        if (clickcount < 2) {
                          window.location.href = "/redirect/?url=" + el.href;
                        } else {
                          window.location.href = el.href;
                        }
                      }, 100)
                      return false;
                    }
                    el.ondblclick = (e) => {
                      e.preventDefault();
                      setTimeout(() => {
                        window.location.href = el.href;
                      }, 10)
                      return false;
                    };
                  }
                }
              });
            }, 500);
          });
        }, 400
      )
    }
    loadpage();
    window.addEventListener("hashchange",loadpage);
  },
  delimiters: ['[%^]', '[^%]']
};
Vue.createApp(main_document).mount('#main-document');
