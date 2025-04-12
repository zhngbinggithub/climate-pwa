// 注册 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

async function applyWeatherStrategy() {
  const weather = await fetchWeather(); // 调用weather.js中的方法
  document.getElementById("weather-info").innerText = `当前天气：${weather}`;

  const image = document.getElementById("main-image");

  // 根据天气调整加载资源
  if (weather === "Rain" || weather === "Thunderstorm") {
    image.src = "images/light.jpg";
  } else {
    image.src = "images/full.jpg";
  }
}

applyWeatherStrategy();
