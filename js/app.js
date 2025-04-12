// 注册 Service Worker
/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registered', reg))
      .catch((err) => console.error('SW registration failed', err));
  });
}

async function applyWeatherStrategy() {
  const weather = await fetchWeather(); // 调用weather.js中的方法
  document.getElementById("weather-info").innerText = `当前天气：${weather}`;

 // const image = document.getElementById("main-image");
  
  const image = document.getElementById("main-image");
  const lowerCaseWeather = weather.toLowerCase();
  image.src = `images/${lowerCaseWeather}.jpg`;
  image.alt = weather;

 document.body.className = ""; // 清除原有样式
  document.body.classList.add(lowerCaseWeather); // 添加天气样式
 
 
 

}

applyWeatherStrategy();
 
 /*  3.联网检测 + 离线提示  */
 function showOfflineNotice() {
   const notice = document.createElement('div');
   notice.textContent = '⚠ 当前为离线状态，天气为缓存数据，可能不是最新。';
   notice.style.color = 'orange';
   notice.style.marginTop = '10px';
   notice.style.fontWeight = 'bold';
   document.body.appendChild(notice);
 }
 
 window.addEventListener('load', () => {
   if (!navigator.onLine) {
     showOfflineNotice();
   }
 });
 
 window.addEventListener('offline', () => {
   showOfflineNotice();
 });

 