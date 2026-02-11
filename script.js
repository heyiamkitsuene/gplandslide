// 亮暗模式切換
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

// AI 模擬判斷
document.getElementById("aiRun").addEventListener("click", () => {
  const slope = parseFloat(document.getElementById("slope").value);
  const soil = document.getElementById("soil").value;
  const water = parseFloat(document.getElementById("water").value);
  const veg = parseFloat(document.getElementById("veg").value);

  let score = 0;
  score += slope > 40 ? 30 : slope > 30 ? 20 : 10;
  score += soil === "黏土" ? 25 : soil === "砂土" ? 15 : 5;
  score += water > 40 ? 25 : water > 25 ? 15 : 5;
  score += veg < 30 ? 20 : veg < 60 ? 10 : 5;

  let level = "";
  if (score >= 75) level = "極高風險";
  else if (score >= 55) level = "高風險";
  else if (score >= 35) level = "中風險";
  else level = "低風險";

  document.getElementById("aiResult").innerHTML = `
    <p>坡度角：${slope}°</p>
    <p>土壤類型：${soil}</p>
    <p>含水量：${water}%</p>
    <p>植被覆蓋率：${veg}%</p>
    <p>🚨 AI 判斷：<strong>${level}</strong></p>
  `;
});

// 抓取最新新聞（RTHK RSS → JSON）
fetch("https://api.rss2json.com/v1/api.json?rss_url=https://news.rthk.hk/rss/")
  .then(res => res.json())
  .then(data => {
    const items = data.items.slice(0,5);
    items.forEach(item => {
      document.getElementById("newsList").innerHTML += `
        <li><a href="${item.link}" target="_blank">📢 ${item.title}</a> <span>${item.pubDate}</span></li>
      `;
    });
  });
