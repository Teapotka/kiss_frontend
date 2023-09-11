const url = "https://kiss-u.onrender.com"
const testUrl = "http://localhost:3000"

let flag = false
let chosen = ""

document.getElementById("counter").innerHTML = "100"

const choose = async (id) => {
  document.getElementById("timi").style.color = "black"
  document.getElementById("elie").style.color = "black"
  console.log(id)
  flag = true
  chosen = id
  await show()
  document.getElementById(id).style.color = "red"
}

const show = async () => {
  if (flag) document.getElementById("container").style.display = "flex"
  document.getElementById("counter").innerHTML = "checking..."
  const raw = await fetch(`${testUrl}/values?name=${chosen}`)
  const person = await raw.json()
  document.getElementById("counter").innerHTML = person["value"]
  console.log("show: "+ JSON.stringify(person))
}

const kiss = async () => {
  let toWho = chosen == "elie" ? "timi" : "elie"
  document.getElementById("loader").innerHTML = `sending your kiss to ${
    toWho.slice(0, 1).toUpperCase() + toWho.slice(1)
  }`

  const raw = await fetch(`${testUrl}/kiss`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: toWho,
    }),
  })
  const values = await raw.json()

  document.getElementById("loader").innerHTML = ``
  await show()
}
