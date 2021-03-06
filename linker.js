const runlinker = () => {
    jsonGET("/allow_link.json", (allowlist) => {
        hljs.initHighlighting();
        document.querySelectorAll("a").forEach((el) => {
            if (typeof (el.href) == "string") {
                if ((el.href.startsWith("http://") || el.href.startsWith("https://")) && (el.origin != window.location.origin)) {
                    console.log("Found :", el.href);
                    if (!allowlist.includes(el.host)) {
                        console.log("Host", el.host, "Nofollow :", el.href);
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
            }
        });
    });
};
