// Chave de API para OpenWeatherMap
const key = "ca6fa9dd6e261f980c0fe55b775d6f1c";

// Aguarda o DOM ser completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Obtém a referência para o botão de busca
    const searchButton = document.querySelector('.button');
    // Adiciona um ouvinte de evento para o clique no botão de busca
    searchButton.addEventListener('click', clickButton);
});

// Função principal para lidar com a busca
async function actionButton(city) {
    try {
        // Obtém a referência para o botão e adiciona a classe 'loading' para indicar carregamento
        const button = document.querySelector('.button');
        button.classList.add('loading');

        // Faz a requisição à API para obter dados meteorológicos
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);

        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
            throw new Error('Cidade não encontrada ou erro na requisição');
        }

        // Converte a resposta para formato JSON
        const weatherData = await response.json();
        // Chama a função para exibir os dados na interface do usuário
        actionDisplay(weatherData);
    } catch (error) {
        // Em caso de erro, exibe no console e alerta o usuário
        console.error(error);
        alert('Erro ao obter dados da cidade. Verifique o nome da cidade e tente novamente.');
    } finally {
        // Remove a classe 'loading' após a execução da requisição
        const button = document.querySelector('.button');
        button.classList.remove('loading');
    }
}

// Função chamada ao clicar no botão
function clickButton() {
    // Obtém o valor da entrada de texto contendo o nome da cidade
    const city = document.querySelector(".input").value;
    // Chama a função para buscar e exibir os dados meteorológicos
    actionButton(city);
}

// Função para exibir dados meteorológicos na interface do usuário
function actionDisplay(dados) {
    console.log(dados);
    // Atualiza o título com o nome da cidade
    document.querySelector(".city").innerHTML = `Tempo em ${dados.name}`;
    // Atualiza a temperatura na interface
    document.querySelector(".temp").innerHTML = `${Math.floor(dados.main.temp)}°C`;
    // Atualiza a descrição do clima na interface
    document.querySelector(".text-forecast").innerHTML = dados.weather[0].description;
    // Atualiza a umidade na interface
    document.querySelector(".moisture").innerHTML = `Umidade: ${dados.main.humidity}%`;
    // Atualiza o ícone de previsão do tempo na interface
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}
