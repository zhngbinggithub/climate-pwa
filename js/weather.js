async function fetchWeather(city = "Kuala Lumpur") {
  const apiKey = "027f082ac1aaa445c781c6f27883d85d";  // ⚠️ 替换为你的真实 Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  return data.weather[0].main; // 返回天气主类，如 "Rain", "Clear"
}
