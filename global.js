function copyc(text) {
    let input = document.getElementById("copyc");
    input.hidden = false;
    input.value = text;
    input.focus();
    input.select();
    document.execCommand("copy");
    input.hidden = true;
}

function copysharelink() {
    const baseurl = window.location.href.slice(0,window.location.href.length-window.location.pathname.length- window.location.hash.length);
    jsonGET("/posts.json",(posts)=>{
        let postnum = 0
        if (window.location.pathname.startsWith("/b/")) {
            let postname = window.location.pathname.slice(3,window.location.pathname.length-1);
            postnum = posts.indexOf(postname);
        } else if (window.location.pathname.startsWith("/h/")) {
            let postname = window.location.hash.slice(1);
            postnum = posts.indexOf(postname);
        } else if (window.location.pathname.startsWith("/n/")) {
            postnum = parseInt(window.location.hash.slice(1));
        }
        copyc(baseurl+"/r/n/"+(""+postnum))
    })
}
