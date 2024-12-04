let certArray = [
`/certificates/React-Basic-Hackerrank.JPG`,
`/certificates/NodeJs-Hackerrank.jpg`,
`/certificates/Javascript-Hackerrank.jpg`,
`/certificates/Javascript-level2-Hackerrank.jpg`,
`/certificates/Advanced-javascript.jpg`,
`/certificates/Advanced-css.jpg`,
`/certificates/Complete-web-developer.jpg`,
`/certificates/Complete-React-developer.jpg`,
`/certificates/Web-design.jpg`,
`/certificates/Complete-NodeJS-developer.jpg`,    
];

let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/static/css/main.chunk.css",
        "/index.html",
        "/",
        "/udemy.svg",
        "/logo192.png",
        "https://hrcdn.net/community-frontend/assets/favicon-ddc852f75a.png",
        "https://ka-f.fontawesome.com/releases/v6.1.1/css/free.min.css?token=b4ea88b2df",
        "https://ka-f.fontawesome.com/releases/v6.1.1/css/free-v4-shims.min.css?token=b4ea88b2df",
        "https://ka-f.fontawesome.com/releases/v6.1.1/css/free-v5-font-face.min.css?token=b4ea88b2df",
        "https://ka-f.fontawesome.com/releases/v6.1.1/css/free-v4-font-face.min.css?token=b4ea88b2df",
        ...certArray
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        console.log(requestUrl);
        fetch(requestUrl);
      })
    );
  }
});
