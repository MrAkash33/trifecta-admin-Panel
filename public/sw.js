let cachaData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cachaData).then((cache) => {
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/",
                //all pages which is taking too much time and want to access offline as well the mention here 
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((result) => {
                if (result) {
                    return result;
                }
            })
        )
    }
})