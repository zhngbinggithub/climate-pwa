
async function fetchWeather() {
  try {
    const res = await fetch("https://cloudflare-worker.zbcloudf-worker.workers.dev");
    const data = await res.json();
    return data;  //  这里返回完整对象
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
