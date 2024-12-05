/* Section : sub1 */
//모바일 제어
let sub01TextBox = document.querySelector('.content-wrap .text-box');
let showInfoBtn = document.querySelector('.showInfo');
let overlay = document.querySelector('.overlay');
let subModalClose = document.querySelector('.content-wrap .bi-x-lg');

showInfoBtn.addEventListener('click', ()=>{
  document.body.style.overflow = 'hidden';
  sub01TextBox.style.display = 'flex';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
})
subModalClose.addEventListener('click', ()=>{
  sub01TextBox.style.display = 'none';
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
})

/* Section : sub2_반응형 */
// 탭 버튼과 탭 내용 요소들을 선택합니다.
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-contents > div');

// 탭을 표시하는 함수
function showTab(tabId) {
  tabContents.forEach(content => {
    content.style.display = content.id === tabId ? 'block' : 'none';
  });

  tabButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.tab === tabId);
  });
}

// 미디어 쿼리에 따라 탭 기능을 적용하는 함수
function applyTabFunctionality() {
  const desktopQuery = window.matchMedia('(min-width: 1201px)');

  if (!desktopQuery.matches) {
    // 1200px 이하의 화면(태블릿 및 모바일)에서 탭 기능 활성화
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        showTab(this.dataset.tab);
      });
    });

    // 초기 탭 표시 (동물나라)
    showTab('animal');
  } else {
    // 데스크톱 화면에서는 모든 탭 내용을 표시하고 이벤트 리스너 제거
    tabContents.forEach(content => {
      content.style.display = 'block';
    });
    tabButtons.forEach(button => {
      button.removeEventListener('click', function() {
        showTab(this.dataset.tab);
      });
      button.classList.remove('active');
    });
  }
}

// 페이지 로드 시와 화면 크기 변경 시 탭 기능 적용
window.addEventListener('load', applyTabFunctionality);
window.addEventListener('resize', applyTabFunctionality);

/* Section : Sub3 */
// 필요한 요소들 선택
const section03 = document.querySelector(".sub-section-03");
const sliderWrap = section03.querySelector(".review-slider-wrap");
const section04 = document.querySelector(".sub-section-04");

// 터치 및 마우스 이벤트를 위한 변수 초기화
let startX; //터치나 마우스 드래그 시작 위치
let scrollLeft; //슬라이더의 현재 스크롤 위치
let isDragging = false; //현재 드래그 중인지 여부

// 터치 시작 이벤트 핸들러
const handleTouchStart = (e) => {
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX; //e.touches.pageX를 사용하여 시작 X 좌표를 저장
    scrollLeft = sliderWrap.scrollLeft; //현재 슬라이더의 스크롤 위치를 저장
    isDragging = true;

    // 마우스 이벤트일 경우 추가 이벤트 리스너 등록
    if (e.type.includes('mouse')) { //마우스 이벤트인지 터치 이벤트인지 구분
        document.addEventListener('mousemove', handleTouchMove);
        document.addEventListener('mouseup', handleTouchEnd);
    }
};

// 터치 이동 이벤트 핸들러
const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const walk = (startX - x) * 3; // 스크롤 속도 조절
    sliderWrap.scrollLeft = scrollLeft + walk;
};

// 터치 종료 이벤트 핸들러
const handleTouchEnd = () => {
    isDragging = false;
    // 마우스 이벤트 리스너 제거
    document.removeEventListener('mousemove', handleTouchMove);
    document.removeEventListener('mouseup', handleTouchEnd);
};

// 휠 이벤트 핸들러 (데스크톱용)
const handleWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY); //휠 방향을 결정(위로 -1, 아래로 1)
    sliderWrap.scrollLeft += delta * 300; // 스크롤 속도 조절
};

// 화면 너비에 따라 이벤트 리스너 추가 또는 제거하는 함수
const updateEventListeners = () => {
    if (window.innerWidth >= 481 && window.innerWidth <= 1201) {
        // 태블릿 화면에서 터치 및 마우스 이벤트 추가
        sliderWrap.addEventListener('touchstart', handleTouchStart);
        sliderWrap.addEventListener('touchmove', handleTouchMove);
        sliderWrap.addEventListener('touchend', handleTouchEnd);
        sliderWrap.addEventListener('mousedown', handleTouchStart);
    } else if (window.innerWidth > 1201) {
        // 데스크톱 화면에서 휠 이벤트 추가
        sliderWrap.addEventListener('wheel', handleWheel);
    } else {
        // 모바일 화면에서 모든 이벤트 리스너 제거
        sliderWrap.removeEventListener('touchstart', handleTouchStart);
        sliderWrap.removeEventListener('touchmove', handleTouchMove);
        sliderWrap.removeEventListener('touchend', handleTouchEnd);
        sliderWrap.removeEventListener('mousedown', handleTouchStart);
        sliderWrap.removeEventListener('wheel', handleWheel);
    }
};

// 슬라이더 스타일 설정 함수
const updateSliderStyle = () => {
    if (window.innerWidth >= 481 && window.innerWidth <= 1201) {
        // 태블릿 화면에서의 스타일
        sliderWrap.style.overflowX = 'scroll';
        sliderWrap.style.scrollSnapType = 'x mandatory';
        sliderWrap.style.scrollBehavior = 'smooth';
        // 슬라이더 내부 아이템들의 스타일 설정
        const sliderItems = sliderWrap.children;
        for (let item of sliderItems) {
            item.style.flex = '0 0 100%';
            item.style.scrollSnapAlign = 'start';
        }
    } else if (window.innerWidth > 1201) {
        // 데스크톱 화면에서의 스타일
        sliderWrap.style.overflowX = 'auto';
        sliderWrap.style.scrollSnapType = 'x mandatory';
        sliderWrap.style.scrollBehavior = 'smooth';
        // 슬라이더 내부 아이템들의 스타일 설정
        const sliderItems = sliderWrap.children;
        for (let item of sliderItems) {
            item.style.flex = '0 0 100%';
            item.style.scrollSnapAlign = 'start';
        }
    } else {
        // 모바일 화면에서는 원래 스타일로 복구
        sliderWrap.style.overflowX = '';
        sliderWrap.style.scrollSnapType = '';
        sliderWrap.style.scrollBehavior = '';
        const sliderItems = sliderWrap.children;
        for (let item of sliderItems) {
            item.style.flex = '';
            item.style.scrollSnapAlign = '';
        }
    }
};

// 초기 설정
updateEventListeners();
updateSliderStyle();

// 윈도우 크기 변경 시 이벤트 리스너와 스타일 업데이트
window.addEventListener("resize", () => {
    updateEventListeners();
    updateSliderStyle();
});


/* Section : Sub4 */
let date = new Date();
let viewYear = date.getFullYear();
let viewMonth = date.getMonth();
const monthYear = document.getElementById("month-year");
const daysContainer = document.querySelector(".days");
const scheduleDate = document.getElementById('schedule-date');
const scheduleList = document.getElementById('schedule-list');

// 이벤트 목록 (당일성 및 기간성 이벤트)
let events = [
  { startDate: "2024-11-01", endDate: "2024-11-01", title: "2024년 제1회 광진 생활문화예술축제" },
  { startDate: "2024-11-02", endDate: "2024-11-02", title: "2024 광진가족 가을길 걷기 대회" },
  { startDate: "2024-11-05", endDate: "2024-11-08", title: "서울특별시 청년창업박람회" },
  { startDate: "2024-11-06", endDate: "2024-11-24", title: "쿠바 그림 특별전" }
];

// 달력 렌더링 함수
function renderCalendar(year, month) {
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  monthYear.innerHTML = `${viewYear}<em>년</em> ${viewMonth + 1}<em>월</em>`;
  daysContainer.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 빈칸 추가
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    daysContainer.appendChild(emptyCell);
  }

  // 날짜 채우기
  for (let date = 1; date <= lastDate; date++) {
    const dateCell = document.createElement("div");
    dateCell.innerText = date;
    dateCell.classList.add("day");

    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const day = new Date(year, month, date).getDay();

    // 일요일/토요일 색상 설정
    if (day === 0) dateCell.style.color = "#FD5631"; // 일요일
    if (day === 6) dateCell.style.color = "#5089EF"; // 토요일

    // 이벤트가 있는 날짜 표시
    const eventsForDate = getEventsForDate(fullDate);
    if (eventsForDate.length > 0) {
      dateCell.classList.add("event-day");
      dateCell.addEventListener("click", () => showEvent(fullDate, eventsForDate));
    }

    daysContainer.appendChild(dateCell);
  }
}

// 날짜에 해당하는 이벤트 가져오기
function getEventsForDate(date) {
  return events.filter(event => {
    return date >= event.startDate && date <= event.endDate;
  });
}

// 요일 배열 추가
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

// 일정 표시 함수
function showEvent(date, eventsForDate) {
  scheduleList.innerHTML = ""; // 기존 이벤트 제거

  // 날짜 객체 생성
  const dateObj = new Date(date);
  const dayOfWeek = daysOfWeek[dateObj.getDay()]; // 해당 날짜의 요일 가져오기

  // 날짜와 요일 표시
  scheduleDate.innerHTML = `${dateObj.getDate()}<em>일</em> ${dayOfWeek}<em>요일</em>`;

  if (eventsForDate.length > 0) {
    eventsForDate.forEach(event => {
      const listItem = document.createElement("li");
      if (event.startDate === event.endDate) {
        listItem.innerHTML = `<span>${event.title}</span><br>${event.startDate}`;
      } else {
        listItem.innerHTML = `<span>${event.title}</span><br>${event.startDate} ~ ${event.endDate}`;
      }
      scheduleList.appendChild(listItem);
    });
  } else {
    const noEventItem = document.createElement("li");
    noEventItem.innerHTML = `<span>등록된 일정이 없습니다.</span>`;
    scheduleList.appendChild(noEventItem);
  }
}

// 이전/다음 버튼 클릭 이벤트
document.getElementById("calendar-prev").addEventListener("click", () => {
  viewMonth--;
  if (viewMonth < 0) {
    viewMonth = 11;
    viewYear--;
  }
  renderCalendar(viewYear, viewMonth);
});

document.getElementById("calendar-next").addEventListener("click", () => {
  viewMonth++;
  if (viewMonth > 11) {
    viewMonth = 0;
    viewYear++;
  }
  renderCalendar(viewYear, viewMonth);
});

// 페이지 로드 시 오늘 날짜의 이벤트 표시
function initCalendar() {
  renderCalendar(viewYear, viewMonth);

  const today = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const todayEvents = getEventsForDate(today);

  showEvent(today, todayEvents);
}

// 초기화
initCalendar();




//sns-slider
// 슬라이드 관련 요소 및 변수
const slide = document.querySelector(".sns-slide");
let slideWidth = slide.clientWidth;
let slideItems = document.querySelectorAll(".sns-slide-item");
const maxSlide = slideItems.length;
let currSlide = 1;

// 페이지네이션 요소
const pagination = document.querySelector(".sns-pagination");

// 슬라이드를 무한 루프 기능으로 만들기 위해 처음과 끝 슬라이드를 복제
const firstSlideClone = slideItems[0].cloneNode(true);
const lastSlideClone = slideItems[slideItems.length - 1].cloneNode(true);
slide.appendChild(firstSlideClone); // 첫 슬라이드를 끝에 추가
slide.prepend(lastSlideClone);      // 마지막 슬라이드를 앞에 추가

// 슬라이드 아이템들을 다시 가져와서 업데이트
slideItems = document.querySelectorAll(".sns-slide-item");

// 슬라이드 초기 위치 설정
slide.style.transform = `translateX(-${slideWidth * currSlide}px)`;

// 페이지네이션 업데이트 함수
function updatePagination() {
  pagination.innerHTML = `${currSlide} / ${maxSlide}`;
}

// 슬라이드 이동 함수
function updateSlidePosition() {
  slide.style.transition = "transform 0.3s ease";
  slide.style.transform = `translateX(-${slideWidth * currSlide}px)`;
  updatePagination();
}

// 다음 슬라이드로 이동
function nextMove() {
  currSlide++;
  updateSlidePosition();

  // 마지막 슬라이드 도달 시, 첫 번째 슬라이드로 루프
  if (currSlide === maxSlide + 1) {
    setTimeout(() => {
      slide.style.transition = "none";
      currSlide = 1;
      slide.style.transform = `translateX(-${slideWidth * currSlide}px)`;
      updatePagination();
    }, 300);
  }
}

// 이전 슬라이드로 이동
function prevMove() {
  currSlide--;
  updateSlidePosition();

  // 첫 번째 슬라이드 도달 시, 마지막 슬라이드로 루프
  if (currSlide === 0) {
    setTimeout(() => {
      slide.style.transition = "none";
      currSlide = maxSlide;
      slide.style.transform = `translateX(-${slideWidth * currSlide}px)`;
      updatePagination(); // 페이지네이션 업데이트
    }, 300);
  }
}

// 자동 슬라이드 설정
let loopInterval = setInterval(nextMove, 3000);

// 브라우저 크기 변경 시 슬라이드 너비 업데이트
window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
  slide.style.transform = `translateX(-${slideWidth * currSlide}px)`;
});

// 드래그 이벤트 초기화
let startPoint = 0;
let endPoint = 0;

// PC 드래그 이벤트
slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX;
});

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// 초기 페이지네이션 설정
updatePagination();

// 팝업 타이머 ************

// 자정까지 남은 시간 타이머
const timerDisplay = document.getElementById('timer');

// 자정까지 남은 시간 계산
function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // 오늘 자정으로 설정

    return midnight - now; // 자정까지 남은 밀리초
}

// 밀리초를 포맷하여 표시
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    return `${pad(hours)}시 ${pad(remainingMinutes)}분 ${pad(remainingSeconds)}초`;
}

// 숫자가 10 미만이면 0을 추가
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// 자정 타이머 시작
function startMidnightTimer() {
    let timeRemaining = getTimeUntilMidnight();

    const interval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = "00시 00분 00초"; // 자정 도달
            startMidnightTimer(); // 다음 자정 타이머 재시작
        } else {
            timerDisplay.textContent = formatTime(timeRemaining);
            timeRemaining -= 1000; // 1초씩 감소
        }
    }, 1000);
}
// 팝업 관련 DOM 요소
const main_popup = document.querySelector('.main-popup');
const delete_popup = document.getElementById('delete-today');
const popupTimerDisplay = document.getElementById('popup-timer'); // 팝업 타이머 표시용

// 팝업 상태 확인 및 초기화
function checkPopupVisibility() {
    const popupHiddenTime = localStorage.getItem('popupHiddenTime');
    if (popupHiddenTime) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - popupHiddenTime;

        if (timeElapsed < 86400000) {
            main_popup.style.display = 'none';
            delete_popup.checked = true;
        } else {
            localStorage.removeItem('popupHiddenTime');
            main_popup.style.display = 'block';
            delete_popup.checked = false;
        }
    } else {
        main_popup.style.display = 'block';
    }
}

// 팝업 타이머 업데이트
function updatePopupTimer() {
    const popupHiddenTime = localStorage.getItem('popupHiddenTime');
    if (popupHiddenTime) {
        const currentTime = Date.now();
        const timeRemaining = 86400000 - (currentTime - popupHiddenTime);

        if (timeRemaining > 0) {
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            popupTimerDisplay.textContent = `${hours}시 ${minutes}분 ${seconds}초`;
        } else {
            popupTimerDisplay.textContent = "00시 00분 00초";
            localStorage.removeItem('popupHiddenTime');
            main_popup.style.display = 'block';
            delete_popup.checked = false;
        }
    } else {
        popupTimerDisplay.textContent = "팝업 비활성화 중";
    }
}

// 체크박스 상태 변화 처리
delete_popup.addEventListener('change', () => {
    if (delete_popup.checked) {
        main_popup.style.display = 'none';
        localStorage.setItem('popupHiddenTime', Date.now());
    } else {
        main_popup.style.display = 'block';
        localStorage.removeItem('popupHiddenTime');
    }
    updatePopupTimer();
});

// 팝업 타이머 1초마다 업데이트
setInterval(updatePopupTimer, 1000);

// 초기화 함수
window.onload = () => {
  startMidnightTimer(); // 자정 타이머 시작
  checkPopupVisibility(); // 팝업 상태 확인
  updatePopupTimer(); // 팝업 타이머 초기화
};

// 메인섹션 날씨

const apiKey = '0cf183e7d4dfb1748384432b3584c902';  // OpenWeatherMap API 키
const city = 'Seoul';  // 원하는 도시 이름 (예: 서울)
const units = 'metric';  // 온도를 섭씨로 받기 위해 'metric' 사용, 'imperial'은 화씨

// 날씨 정보를 가져올 OpenWeatherMap API URL
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

// API 호출
fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    // 날씨 정보
    const temp = Math.round(data.main.temp);  // 온도 (반올림)
    const iconCode = data.weather[0].icon;  // 날씨 아이콘 코드
    const precipitation = data.rain ? data.rain['1h'] : 0;  // 강수량 (1시간 기준)
    const windSpeed = data.wind.speed;  // 바람 속도
    const weatherCondition = data.weather[0].main; // 날씨 상태 (Clear, Clouds, Rain 등)

        // 날씨 아이콘 매핑 (날씨 상태별 이미지 파일 경로)
        let iconUrl;
        switch (weatherCondition) {
          case 'Clear':
            iconUrl = 'subpage_02_01.png'; // 맑음
            break;
          case 'Clouds':
            iconUrl = 'subpage_02_02.png'; // 구름 조금
            break;
          case 'Thunderstorm':
            iconUrl = 'subpage_02_04.png'; // 번개
            break;
          case 'Rain':
            iconUrl = 'subpage_02_05.png'; // 비
            break;
          case 'Snow':
            iconUrl = 'subpage_02_06.png'; // 눈
            break;
          default:
            iconUrl = '/subpage_02_02.png'; // 구름 조금 (기본값)
            break;
        }
    

    // HTML 요소에 값 설정
    document.getElementById('temp').innerHTML = `<h4>온도</h4><h3>${temp}°C</h3>`;
    document.getElementById('prec').innerHTML = `<h4>강수량</h4><h3>${precipitation}mm</h3>`;
    document.getElementById('wind').innerHTML = `<h4>풍속</h4><h3>${windSpeed}m/s</h3>`;
  
    document.getElementById('weather-icon').src = `/seoulchildrensgrandpark_Portfolio/images/subpage_02_serviceSuspension/${iconUrl}`;

  })
  .catch(error => {
    console.error('날씨 정보를 가져오는 중 오류 발생:', error);
  });



  let currentSection = 0;
    let isScrollLocked = false; // 줌 및 스크롤 잠금 상태 관리
    let Scrolling = false; // 스크롤 중 여부

    // 특정 섹션으로 스크롤
    function scrollToSection(index) {
      if (index < 0 || index >= sections.length || Scrolling || isScrollLocked ) return; // 메뉴 열림 상태 추가
      Scrolling = true;
      window.scrollTo({ top: sections[index].offsetTop, behavior: 'smooth' });
      setTimeout(() => {
        Scrolling = false;
        currentSection = index;
      }, 800);
    }

    // // 휠 이벤트 처리 (풀페이지 스크롤)  기능 충돌 오류 문제로 안 쓰기로~ 
    // window.addEventListener('wheel', (event) => {

    //   if (event.deltaY > 0) {
    //     scrollToSection(currentSection + 1); // 아래로 스크롤
    //   } else {
    //     scrollToSection(currentSection - 1); // 위로 스크롤
    //   }
    // }, { passive: false });

    // // 터치 스크롤 (모바일 지원)
    // let touchStartY = 0;
    // window.addEventListener('touchstart', (event) => {
    //   touchStartY = event.touches[0].clientY;
    // });

    // window.addEventListener('touchend', (event) => {
    //   if (isScrollLocked || isMenuOpen) return; // 메뉴 열림 상태 추가
    //   const touchEndY = event.changedTouches[0].clientY;
    //   if (touchStartY - touchEndY > 50) {
    //     scrollToSection(currentSection + 1);
    //   } else if (touchEndY - touchStartY > 50) {
    //     scrollToSection(currentSection - 1);
    //   }
    // });


    // 줌 기능
    let zoomableImage = document.querySelector('.scroll-zoom');
    let zoomContainer = document.querySelector('.zoom-section');
    let zoomText = document.querySelector('.zoom-text');
    let currentZoom = 1;

    zoomContainer.addEventListener('wheel', (event) => {
      event.preventDefault();
      
      let newZoom = currentZoom + (event.deltaY < 0 ? 0.1 : -0.1);
      newZoom = Math.min(Math.max(newZoom, 1), 2.5);

      zoomableImage.style.transform = `scale(${newZoom})`;
      if (newZoom === 2.5) {
        zoomableImage.style.display = 'none';
        zoomText.style.display = 'none';
        isScrollLocked = false; // 줌 후 스크롤 허용
      } else {
        zoomableImage.style.display = 'block';
        zoomText.style.display = 'block';
        isScrollLocked = true; // 줌 중에는 스크롤 방지
      }
      currentZoom = newZoom;
    });

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'; // 새로 고침 후 스크롤 위치를 자동으로 복원하지 않음
    }
    
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.scrollTo(0, 0); // 새로 고침 시 최상단으로
      }, 10);
    });