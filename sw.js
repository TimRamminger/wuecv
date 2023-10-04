const staticCacheName = 'site-static-beta.v1.1';
const dynamicCacheName = 'site-dynamic-beta.v1.1';
const assets = [
    'index.html', 'SCRIPTS/script_home.js', 'CSS/mainSite.css', 'JSON/manifest1.json', 'img/wuerfel/hinergrund_hauptmenu.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap', 
    'img/wuerfel/saufi_profilbild_sized.png', 'img/wuerfel/1.png', 'img/wuerfel/2.png', 'img/wuerfel/3.png', 'img/wuerfel/4.png',
    'img/wuerfel/5.png', 'img/wuerfel/6.png'
];

self.addEventListener('install', evt => {
    console.log("service worker has been installed");
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
            console.log('caching shell assets');
        })
    );
});


self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});


self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes ||fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});