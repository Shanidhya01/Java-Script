document.addEventListener('DOMContentLoaded',()=>{
    const API_KEY="9067dccb1ca5eccc805c2a8bc6c4f915";
    const cityInput= document.getElementById('city-input');
    const getWeatherBtn=document.getElementById('get-weather-btn');
    const weatherInfo=document.getElementById('weather-info');
    const cityNameDisplay =document.getElementById('city-name');
    const temperatureDisplay=document.getElementById('temperature');
    const descriptionDisplay=document.getElementById('description');
    const errorMessage=document.getElementById('error-message');

    getWeatherBtn.addEventListener('click',async ()=>{
        const city=cityInput.value.trim();
        if(city==="")return;
        //it may thorw an error
        //database is always in another continent
        try {
            const weatherData= await fetchWeatherData(city);
            displayWeatherdata(weatherData);

            
        } catch (error) {
            showError();
            
        }

    });
    async function fetchWeatherData(city){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("city not found");
        }
        const data=await response.json();
        return data;
    }

    function displayWeatherdata(data){
        console.log(data);
        const{name,main,weather}=data;
        cityNameDisplay.textContent=`City : ${name}`;
        temperatureDisplay.textContent=`Temperature:${main.temp}*C`;
        descriptionDisplay.textContent=`Weather:${weather[0].description}`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }



});
