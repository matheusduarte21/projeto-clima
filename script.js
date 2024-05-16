document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault() // para não deixarmos a pagina atualizar e enviar o formulário
    
    let input = document.querySelector('#searchInput').value // para pegarmos o que a pessoa escreveu

    if(input !== '') { // para sabermos se o usuario digitou algo
        clearInfo()
        showWarning('carregando')
    }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=a2f9cdc2498eebfc06947d967f787dd4&units=metric&lang=pt_br` // minha api
        
        let results = await fetch(url) // meu requerimento intero
        let json = await results.json()

        if(json.cod === 200){ // 200 é quando a requisição deu certo
            showInfo({ // o necessário pra ser exibido de fato
                name:json.name,
                country:json.sys.country,
                temp: json.main.temp,
                tempoIcon: json.weather[0].icon,
                windSpeend: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            clearInfo()
            showWarning('não encotramos essa localização')
        }

})

function showInfo(json){
    showWarning('')//tiro a função
    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>℃<sup/> `
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeend} <span>km/h<span/>`

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempoIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.tranform = `rotate${json.windAngle-90}deg`

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display ='none'
}

