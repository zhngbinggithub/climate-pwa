
/* 
 1.离线缓存页面与天气数据（通过 Service Worker 实现）
 
 2.优化 manifest.json（确保可以“添加到主屏幕”）
 
 3.离线访问提示处理（检测网络状态，提示当前数据为缓存值或无法更新）app.js
 */
/* 1.此版本支持缓存核心页面资源 & 天气接口数据，离线时自动使用缓存 */
const CACHE_NAME = 'climate-pwa-cache-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/weather.js',
  '/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/default.jpg',
  '/images/clear.jpg',
  '/images/rain.jpg',
  '/images/thunderstorm.jpg',
  '/images/clouds.jpg',
  '/images/mist.jpg'
];

// 安装阶段：缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// 拦截 fetch 请求
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.includes('data/2.5/weather')) {
    // 天气 API 使用网络优先策略 + 缓存备份
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // 其他请求使用缓存优先策略
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
