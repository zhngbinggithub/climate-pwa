// 注册 Service Worker

// app.js - 显示完整天气信息、背景图、图标
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registered', reg))
      .catch((err) => console.error('SW registration failed', err));
  });
}

async function applyWeatherStrategy() {
  const weather = await fetchWeather();

  const info = document.getElementById("weather-info");
  info.innerText =
    `📍 ${weather.city} | ${weather.condition} (${weather.description}) | 🌡 ${weather.temperature?.toFixed(1)}°C`;

  // 添加天气图标
  if (weather.icon) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    iconImg.alt = weather.description;
    iconImg.style.width = "50px";
    iconImg.style.verticalAlign = "middle";
    iconImg.style.marginLeft = "10px";
    info.appendChild(iconImg);
  }

  // 设置背景图
  const image = document.getElementById("main-image");
  const lowerCaseWeather = (weather.condition || "default").toLowerCase();
  image.src = `images/${lowerCaseWeather}.jpg`;
  image.alt = weather.condition;

  document.body.className = "";
  document.body.classList.add(lowerCaseWeather);
}

applyWeatherStrategy();

// 离线提示
function showOfflineNotice() {
  const notice = document.createElement('div');
  notice.textContent = '⚠ 当前为离线状态，天气数据来自缓存，可能已过时。';
  notice.style.color = 'orange';
  notice.style.marginTop = '10px';
  notice.style.fontWeight = 'bold';
  document.body.appendChild(notice);
}

window.addEventListener('load', () => {
  if (!navigator.onLine) showOfflineNotice();
});
window.addEventListener('offline', () => {
  showOfflineNotice();
});
