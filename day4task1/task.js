async function apicall() {
  const res = await fetch("https://poetrydb.org/title/Ozymandias/lines.json")
  const data = await res.json()
  document.getElementById("poem").innerText = data[0].lines.join("\n")
}
