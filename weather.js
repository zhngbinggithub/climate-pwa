/* async function fetchWeather(city = "Kuala Lumpur") { //PENANG  Kuala Lumpur
  const apiKey = "027f082ac1aaa445c781c6f27883d85d";  // ⚠️ 替换为你的真实 Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  return data.weather[0].main; // 返回天气主类，如 "Rain", "Clear"
} */
// weather.js
/* async function fetchWeather() {
  try {
    const res = await fetch("https://cloudflare-worker.zbcloudf-worker.workers.dev"); // 替换为你自己的 Worker 地址
    const data = await res.json();
    return data.condition || "Clear"; // 返回 "Rain", "Clouds", 等
  } catch (e) {
    console.error("天气服务出错", e); //cloudflare-worker
    return "Unknown";
  }
}
 */
async function fetchWeather() {
  try {
    const res = await fetch("https://cloudflare-worker.zbcloudf-worker.workers.dev");
    const data = await res.json();
    return data;  // 👈 这里返回完整对象
  } catch (e) {
    console.error("天气服务出错", e);
    return {
      condition: "Unknown",
      description: "Unavailable",
      city: "Unknown",
      temperature: null,
      icon: "",
      timestamp: new Date().toISOString()
    };
  }
}
