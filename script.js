const key = "ca6fa9dd6e261f980c0fe55b775d6f1c"

function actionDisplay(dados) {
    console.log(dados)
    document.querySelector(".city").innerHTML ="Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".text-forecast").innerHTML = dados.weather[0].description
    document.querySelector(".moisture").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

async function actionButton(city) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then(response => response.json())
      
        actionDisplay(dados)
}

function clickButton() {
    const city = document.querySelector(".input").value
      
        actionButton(city)
}