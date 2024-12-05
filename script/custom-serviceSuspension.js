document.addEventListener("DOMContentLoaded", function () {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const calendarItems = document.querySelectorAll(".calendar-banner .day");

  // 현재 날짜 가져오기
  const today = new Date();
  const todayIndex = today.getDay(); // 요일 인덱스
  let currentDate = new Date(today); // 현재 날짜 복사

  calendarItems.forEach((item, index) => {
    // label에 요일 추가
    const label = item.querySelector(".label");
    const value = item.querySelector(".value");

    // 오늘부터 1주일간 날짜 계산
    const dayIndex = (todayIndex + index) % 7; // 요일 인덱스 순환
    label.textContent = days[dayIndex];

    // 월/일 계산
    const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 +1)
    const day = currentDate.getDate(); // 일
    value.textContent = `${month}.${day}`;


    // 토요일/일요일 색상 변경
    if (dayIndex === 0) {
      // 일요일
      label.style.color = "#5089EF"; // 빨간색
    } else if (dayIndex === 6) {
      // 토요일
      label.style.color = "#FD5631"; // 파란색
    }
    // 다음 날짜로 변경
    currentDate.setDate(currentDate.getDate() + 1);
  });
});

function getClosestSunday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const diffToSunday = 7 - dayOfWeek; // Days until next Sunday
  const nextSunday = new Date(today);

  if (dayOfWeek !== 0) {
      nextSunday.setDate(today.getDate() + diffToSunday);
  }

  // Ensure it's within 2 weeks of today
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  if (nextSunday > twoWeeksLater) {
      nextSunday.setDate(nextSunday.getDate() - 7);
  }

  return nextSunday.toLocaleDateString(); // Format the date
}

// Update innerHTML
const suspensionInfo = document.querySelector(".suspension-info");
suspensionInfo.innerHTML = `${getClosestSunday()}(일)은 정기휴장일 입니다.`;

document.addEventListener("DOMContentLoaded", function () {
  const leftTopRightHeading = document.querySelector(".left-top-right");

  if (leftTopRightHeading) {
    // 현재 날짜 가져오기
    const today = new Date();
    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    // 월, 일, 요일 계산
    const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1)
    const date = today.getDate(); // 일
    const day = days[today.getDay()]; // 요일

    // h3에 날짜 출력
    leftTopRightHeading.innerHTML = `<h3>${month}월 ${date}일 ${day}</h3>`;
  }
});document.addEventListener("DOMContentLoaded", function () {
  // HTML 요소 선택
  const tempElement = document.querySelector(".main-weather-temp h3");
  const weatherDescElement = document.querySelector(".main-weather-temp h5");
  const windElement = document.querySelector(".subinfo-wind h5");
  const rainElement = document.querySelector(".subinfo-rain h5");
  const weatherIcon = document.querySelector(".main-weather-icon");

  // OpenWeatherMap API 관련 설정
  const apiKey = '0cf183e7d4dfb1748384432b3584c902';  // API 키
  const city = 'Seoul';  // 도시 이름
  const units = 'metric';  // 온도 단위 (섭씨)
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}&lang=kr`;

  // 날씨 정보를 가져오는 함수
  async function fetchWeatherData() {
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();

      // 필요한 데이터 추출
      const temperature = data.main.temp.toFixed(1);
      const description = data.weather[0].description;
      const windSpeed = data.wind.speed.toFixed(1);
      const rainfall = data.rain ? data.rain['1h'] : 0; // 비가 오지 않으면 0mm로 처리
      const weatherCondition = data.weather[0].main; // 날씨 상태 (Clear, Clouds, Rain 등)

      // 날씨 상태에 맞는 아이콘 경로 설정
      let iconUrl;
      switch (weatherCondition) {
        case 'Clear':
          iconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_01.png'; // 맑음
          break;
        case 'Clouds':
          iconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_02.png'; // 구름 조금
          break;
        case 'Rain':
          iconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_05.png'; // 비
          break;
        case 'Snow':
          iconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_06.png'; // 눈
          break;
        case 'Thunderstorm':
          iconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_04.png'; // 번개
          break;
        default:
          iconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_03.png'; // 구름 많음 (기본값)
          break;
      }

      // 데이터 업데이트
      updateWeather({
        temperature,
        description,
        windSpeed,
        rainfall,
        iconUrl,
      });

    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다.", error);
      // 오류 시 기본 데이터로 처리
      updateWeather({
        temperature: 0.0,
        description: "오류날씨",
        windSpeed: 0.0,
        rainfall: 0.0,
        iconUrl: "/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subpage_02_01.png", // 기본 아이콘
      });
    }
  }

  // 날씨 정보 업데이트 함수
  function updateWeather(data) {
    // 온도 업데이트
    tempElement.innerHTML = `<i>${data.temperature}</i> °C`;

    // 날씨 설명 업데이트
    weatherDescElement.innerHTML = `<h5 class="weather-desc">${data.description}</h5>`;

    // 풍속 업데이트
    windElement.textContent = `${data.windSpeed}m/s`;

    // 강수량 업데이트
    rainElement.textContent = `${data.rainfall}mm`;

    // 아이콘 업데이트 (내부 아이콘 경로 사용)
    if (weatherIcon) {
      weatherIcon.innerHTML = `<img src="${data.iconUrl}" alt="${data.description}">`;
    }
  }

  // 날씨 데이터 호출
  fetchWeatherData();
});

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = '0cf183e7d4dfb1748384432b3584c902';
  const city = 'Seoul';
  const units = 'metric';
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}&lang=kr`;

  // 하단 시간대별 날씨 요소 선택
  const bottomItems = document.querySelectorAll(".bottom-item");

  async function fetchForecastData() {
    try {
      const response = await fetch(forecastUrl);
      const data = await response.json();

      // 시간대별 데이터 (3시간 간격으로 제공)
      const forecastList = data.list;

      // 필요한 시간대 데이터 필터링 (09:00, 13:00, 17:00)
      const targetTimes = ["09:00:00", "13:00:00", "17:00:00"];
      const filteredData = forecastList.filter(item => {
      const time = item.dt_txt.split(" ")[1]; // "2024-11-27 09:00:00" → "09:00:00"
      return targetTimes.includes(time);
      });

      // 데이터가 있을 경우, bottom-item에 적용
      filteredData.forEach((item, index) => {
        if (index < bottomItems.length) {
          const iconElement = bottomItems[index].querySelector(".weather-icon img");
          const tempElement = bottomItems[index].querySelector(".temp h4");

          const temp = item.main.temp.toFixed(1);;
          const iconCode = item.weather[0].icon;
          const description = item.weather[0].description;

          // 시간 설정

          // 날씨 아이콘 설정 (사용자 지정 아이콘 매핑)
          const weatherCondition = item.weather[0].main;
          let customIconUrl;
          switch (weatherCondition) {
            case 'Clear':
              customIconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_01.svg'; // 맑음
              break;
            case 'Clouds':
              customIconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_02.svg'; // 구름 조금
              break;
            case 'Rain':
              customIconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_05.svg'; // 비
              break;
            case 'Snow':
              customIconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_06.svg'; // 눈
              break;
            case 'Thunderstorm':
              customIconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_04.svg'; // 번개
              break;
            default:
              customIconUrl = '/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_03.svg'; // 기본값 (구름 많음)
              break;
          }
          iconElement.src = customIconUrl;
          iconElement.alt = description;

          // 온도 설정
          tempElement.textContent = `${temp}°C`;
        }
      });
    } catch (error) {
      console.error("시간대별 날씨 데이터를 가져오는 데 실패했습니다.", error);
    }
  }

  // 호출
  fetchForecastData();
});

document.addEventListener("DOMContentLoaded", function () {
  // HTML 요소 선택
  const maxTempElement = document.getElementById("max-temp");
  const minTempElement = document.getElementById("min-temp");
  const avgTempElement = document.getElementById("avg-temp");
  const rainfallElement = document.getElementById("rainfall");
  const rainChanceElement = document.getElementById("rain-chance");
  const windSpeedElement = document.getElementById("wind-speed");

  // OpenWeatherMap API 관련 설정
  const apiKey = '0cf183e7d4dfb1748384432b3584c902'; // API 키
  const city = 'Seoul'; // 도시 이름
  const units = 'metric'; // 온도 단위 (섭씨)
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}&lang=kr`;

  // 날씨 정보를 가져오는 함수
  async function fetchWeatherDetails() {
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();

      // 데이터 처리
      const todayForecasts = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const today = new Date();
        return forecastDate.toDateString() === today.toDateString();
      });

      // 최고, 최저, 평균 온도 계산
      const temperatures = todayForecasts.map(forecast => forecast.main.temp);
        const maxTemp = Math.max(...temperatures).toFixed(1);
        const minTemp = Math.min(...temperatures).toFixed(1);
      const avgTemp = (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(1);

      // 강수량, 풍속, 강수 확률 (강수 확률은 OpenWeatherMap에 없으므로 추정)
      const rainfall = todayForecasts.reduce((acc, forecast) => acc + (forecast.rain ? forecast.rain['3h'] || 0 : 0), 0).toFixed(1);
      const windSpeeds = todayForecasts.map(forecast => forecast.wind.speed);
      const avgWindSpeed = (windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length).toFixed(1);
      const rainChance = todayForecasts.filter(forecast => forecast.weather[0].main.includes('Rain')).length / todayForecasts.length * 100;

      // 데이터 업데이트
      maxTempElement.textContent = `최고 기온 : ${maxTemp}°C`;
      minTempElement.textContent = `최저 기온 : ${minTemp}°C`;
      avgTempElement.textContent = `평균 기온 : ${avgTemp}°C`;
      rainfallElement.textContent = `강수량 : ${rainfall}mm`;
      rainChanceElement.textContent = `강수 확률 : ${rainChance.toFixed(0)}%`;
      windSpeedElement.textContent = `풍속 : ${avgWindSpeed}m/s`;
    } catch (error) {
      console.error("날씨 상세 정보를 가져오는 데 실패했습니다.", error);
    }
  }

  // 날씨 데이터 호출
  fetchWeatherDetails();
});


document.addEventListener("DOMContentLoaded", function () {
  // OpenWeatherMap API 관련 설정
  const apiKey = '0cf183e7d4dfb1748384432b3584c902'; // API 키
  const city = 'Seoul'; // 도시 이름
  const units = 'metric'; // 섭씨
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}&lang=kr`;

  // 요일 이름 배열
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 날씨 데이터를 가져오는 함수
  async function fetchFutureWeather() {
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();

      // 6일간의 데이터 추출
      const forecasts = getDailyForecasts(data.list);

      // UI 업데이트
      forecasts.forEach((forecast, index) => {
        const date = new Date(forecast.date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const weekday = weekDays[date.getDay()];
        const temp = forecast.avgTemp.toFixed(1);
        const icon = `/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/subicon_02_0${forecast.weatherCode}.svg`;

        // 각 요소 업데이트
        document.getElementById(`day-${index + 1}`).innerHTML = `<h5>${year}-${month}-${day} <br>${weekday}요일</h5>`;
        document.getElementById(`temp-${index + 1}`).textContent = `${temp}°C`;
        document.getElementById(`icon-${index + 1}`).src = icon;
      });
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다.", error);
    }
  }

  // 6일간의 일일 평균 데이터 추출
  function getDailyForecasts(list) {
    const dailyData = {};
    list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          weatherCodes: [],
        };
      }
      dailyData[date].temps.push(forecast.main.temp);
      dailyData[date].weatherCodes.push(forecast.weather[0].main);
    });

    // 6일 간의 데이터로 변환
    const dailyAverages = Object.keys(dailyData)
      .slice(0, 6) // 첫 6일만 추출
      .map(date => {
        const temps = dailyData[date].temps;
        const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

        // 가장 많이 등장한 날씨 상태를 추출
        const weatherCounts = dailyData[date].weatherCodes.reduce((acc, code) => {
          acc[code] = (acc[code] || 0) + 1;
          return acc;
        }, {});
        const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) => (weatherCounts[a] > weatherCounts[b] ? a : b));

        // 날씨 코드 매핑
        const weatherCode = mapWeatherToIconCode(mostCommonWeather);

        return { date, avgTemp, weatherCode };
      });

    return dailyAverages;
  }

  // 날씨 상태를 아이콘 코드로 매핑
  function mapWeatherToIconCode(weather) {
    switch (weather) {
      case 'Clear':
        return 1; // 맑음
      case 'Clouds':
        return 2; // 구름
      case 'Clouds':
        return 3; // 구름많음
      case 'Rain':
        return 5; // 비
      case 'Snow':
        return 6; // 눈
      default:
        return 3; // 구름많음
    }
  }

  // 날씨 데이터 호출
  fetchFutureWeather();
});