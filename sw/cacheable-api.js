import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

export default (path='/api/', {cacheName='api-cache', fetchOptions={}}={})=>{

    // look for api responses that opt-in to cacheable
    // once cached, the cached version is returned first while cache is also updated to latest
    registerRoute(
        ({url}) => url.pathname.startsWith(path),
        new StaleWhileRevalidate({
            cacheName: cacheName,
            fetchOptions,
            plugins: [
                new CacheableResponsePlugin({
                    headers: {
                        'X-Is-Cacheable': '1',
                    },
                })
            ]
        })
    );

}