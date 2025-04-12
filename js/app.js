// 注册 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
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
 