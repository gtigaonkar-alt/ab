ws.onmessage = event => {
  const data = JSON.parse(event.data);
  const noise = data.noise;
  const x = data.threshold;

  db.innerText = noise.toFixed(1);
  fill.style.width = `${(noise / 130) * 100}%`;

  fill.className = "";
  zoneText.className = "zone-pill";

  if (noise <= x - 30) {
    fill.classList.add("safe");
    zoneText.innerText = "SAFE";
    zoneText.style.color = "var(--safe)";
  } 
  else if (noise >= x + 30) {
    fill.classList.add("danger");
    zoneText.innerText = "DANGER";
    zoneText.style.color = "var(--danger)";
  } 
  else {
    fill.classList.add("warning");
    zoneText.innerText = "WARNING";
    zoneText.style.color = "var(--warn)";
  }
};
