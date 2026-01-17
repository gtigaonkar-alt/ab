const ESP32_IP = "ESP32_IP_ADDRESS";
const API_KEY = "NOISE_ADMIN_123";

const ws = new WebSocket(`ws://${ESP32_IP}:81`);
const dbEl = document.getElementById("db");
const slider = document.getElementById("slider");

const ctx = document.getElementById("wave").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: Array(32).fill(""),
    datasets: [{
      data: [],
      borderWidth: 2,
      tension: 0.4
    }]
  },
  options: {
    animation: false,
    scales: { x: { display: false }, y: { display: false } }
  }
});

function getState(db, th) {
  if (db < th) return "safe";
  if (db < th + 25) return "warn";
  return "danger";
}

ws.onmessage = e => {
  const d = JSON.parse(e.data);
  dbEl.innerText = `${d.db.toFixed(1)} dB`;

  const state = getState(d.db, d.threshold);
  const color = state === "safe" ? "#00FF9C" :
                state === "warn" ? "#FFC857" :
                "#FF3864";

  dbEl.style.color = color;
  dbEl.style.textShadow = `0 0 25px ${color}`;
  document.querySelector(".card").style.boxShadow =
    `0 0 50px ${color}`;

  chart.data.datasets[0].data = d.wave;
  chart.data.datasets[0].borderColor = color;
  chart.update();
};

slider.onchange = () => {
  fetch(`http://${ESP32_IP}/threshold?value=${slider.value}`, {
    method: "POST",
    headers: { "Authorization": API_KEY }
  });
};
