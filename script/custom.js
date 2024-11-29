/* 마우스 커서를 따라가는 이미지 */
// 마우스 커서 위치를 담을 변수
let mouseX = 0;
let mouseY = 0;

// 이미지 현재 위치를 담을 변수
let imgX = 0;
let imgY = 0;

// 마우스 움직임에 따라 커서 위치 업데이트
function getMousePosition(e) {
  mouseX = e.clientX + window.scrollX; // 가로 스크롤 위치를 반영
  mouseY = e.clientY + window.scrollY; // 세로 스크롤 위치를 반영
}

// 이미지 위치를 부드럽게 이동
function moveImg() {
  const followCursor = document.getElementById('follow-cursor');

  // 위치 보간 (lerp)
  imgX += (mouseX - imgX) / 5;
  imgY += (mouseY - imgY) / 5;

  // 이미지 위치 업데이트
  followCursor.style.left = `${imgX}px`;
  followCursor.style.top = `${imgY}px`;

  // 다음 프레임 요청
  requestAnimationFrame(moveImg);
}

// 이벤트 리스너 등록
document.addEventListener('mousemove', getMousePosition);

// 애니메이션 시작
moveImg();

fetch("/include/header.html")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data => {
    // Header HTML을 삽입하고 나서 이벤트 리스너 등록
    document.querySelector('.header-include').innerHTML = data;


    // searchbutton 및 다른 요소들 확인
    let header_search = document.querySelector('.header-search');
    let header_top = document.querySelector('.header-top');
    let header_main = document.querySelector('.header-main');
    let closeSearchButton = document.querySelector('.close-btn');
    let searchbutton = document.getElementById('search-icon');
    let header_wrap = document.querySelector('.header-wrap');
    let join_btn = document.getElementById('topmenu-join-btn');

    // 각 요소가 정상적으로 선택되었는지 확인
    console.log(searchbutton, header_search, header_top, header_main, closeSearchButton,header_wrap);

    //이거는 로그인 모달쪽입니다
    let login_close = document.getElementById('login-modal-close-btn');
    let login_modal = document.querySelector('.login-modal');
    let login_icon = document.getElementById('topmenu-login-btn');
    let modal_back = document.querySelector('.modal-back');
    let modal_login_in = document.querySelector('.id-login-btn');
  
    login_icon.addEventListener('click',function(){
      login_modal.classList.toggle('active');
      modal_back.classList.toggle('active');
    })
  
    login_close.addEventListener('click',function(){
      login_modal.classList.toggle('active');
      modal_back.classList.toggle('active');
    })
  
    //  로그인 모달 탭 전환
    let id_login_btn = document.querySelector('.id-login');
    let sns_login_btn = document.querySelector('.sns-login');
    let id_login_area = document.querySelector('.id-login-area');
    let sns_login_area = document.querySelector('.sns-login-area');
    let id_input_area = document.querySelector('.id-input-area');

    id_login_btn.addEventListener('click',function(){
      id_login_btn.classList.add('active');
      sns_login_btn.classList.remove('active');
      id_login_area.classList.add('active');
      sns_login_area.classList.remove('active');
    })
    sns_login_btn.addEventListener('click',function(){
      id_login_btn.classList.remove('active');
      sns_login_btn.classList.add('active');
      id_login_area.classList.remove('active');
      sns_login_area.classList.add('active');
    })

    // 로그인 이후 right-menu 관련
    let my_page_btn = document.getElementById('topmenu-mypage-btn');
    let logout_btn = document.getElementById('topmenu-logout-btn');
    
    modal_login_in.addEventListener('click',function(){
      let inputValue = id_input_area.value;  // 입력된 값 가져오기
      login_modal.classList.remove('active');
      modal_back.classList.remove('active');

      if(inputValue) {
        alert(`환영합니다! ${inputValue}님! 로그인 되었습니다!`);
        join_btn.style.display = 'none';  // join_btn을 숨김
        login_icon.style.display = 'none';  // login_icon을 숨김    
        my_page_btn.style.display = 'flex';
        logout_btn.style.display = 'flex';
      } else {
        alert("아이디를 입력해주세요.");
      }
    })
    logout_btn.addEventListener('click',function(){
      alert(`로그아웃 되었습니다!`);
      join_btn.style.display = 'flex';  
      login_icon.style.display = 'flex';     
      my_page_btn.style.display = 'none';
      logout_btn.style.display = 'none';
    })

    // header nav 관련
    // header_nav와 bottom_nav 요소들을 배열로 수집
    let header_nav_all = Array.from({ length: 5 }, (_, i) => document.getElementById(`item0${i + 1}`));
    let bottom_nav_all = Array.from({ length: 5 }, (_, i) => document.getElementById(`bottom-nav-0${i + 1}`));

    // header_nav 요소들에 mouseover 이벤트 추가
    header_nav_all.forEach((header, index) => {
        header.addEventListener('mouseover', () => {
            bottom_nav_all.forEach((bottom, i) => {
                if (i === index) {
                    bottom.classList.add('active');
                } else {
                    bottom.classList.remove('active');
                }
            });
        });
    });

    // 각 bottom_nav 요소에 mouseleave 이벤트 추가
    bottom_nav_all.forEach(bottom => {
        bottom.addEventListener('mouseleave', () => {
            bottom.classList.remove('active');
        });
    });

// 공통 함수: Bottom Nav 및 세부 메뉴 설정
function setupNav(navPrefix, listCount, mainCount) {
  const lists = Array.from({ length: listCount }, (_, i) =>
    document.getElementById(`${navPrefix}-list-0${i + 1}`)
  );

  const mains = Array.from({ length: mainCount }, (_, i) =>
    document.getElementById(`${navPrefix}-main-0${i + 1}`)
  );

  lists.forEach((list, index) => {
    list.addEventListener('click', () => {
      // 모든 main 비활성화
      mains.forEach(main => main.classList.remove('active'));
      // 해당 index의 main 활성화
      mains[index].classList.add('active');
    });
  });
}

// 공통 함수: 다중 Inner Nav 설정
function setupInnerNav(innerPrefix, innerCounts) {
  const sections = Array.from({ length: innerCounts }, (_, i) =>
    document.getElementById(`${innerPrefix}_${i + 1}`)
  );

  sections.forEach(section => {
    section.addEventListener('click', () => {
      const innerItems = section.querySelectorAll('[id^="' + innerPrefix + '_inner"]');
      innerItems.forEach(inner => inner.classList.toggle('active'));
    });
  });
}

// Bottom Nav 설정
setupNav('bottom-nav-01', 4, 4);
setupNav('bottom-nav-02', 3, 3);
setupNav('bottom-nav-03', 3, 3);
setupNav('bottom-nav-04', 5, 5);
setupNav('bottom-nav-05', 2, 2);

// 공통 함수: nav-item 동작 설정
function setupNavItems() {
  const navTitles = document.querySelectorAll('.nav-item-title');
  const navItems = document.querySelectorAll('.nav-item-in');

  // nav-item-title 클릭 시 하위 메뉴 토글
  navTitles.forEach(title => {
    title.addEventListener('click', () => {
      const parentItem = title.parentElement; // 현재 nav-item
      const subItems = parentItem.querySelectorAll('.nav-item-in');

      // 현재 nav-item의 하위 메뉴를 토글
      subItems.forEach(sub => sub.classList.toggle('active'));
    });
  });

  // nav-item-in-title 클릭 시 내부 항목 토글
  navItems.forEach(item => {
    const innerTitles = item.querySelectorAll('.nav-item-in-title');
    innerTitles.forEach(innerTitle => {
      innerTitle.addEventListener('click', () => {
        const innerItems = item.querySelectorAll('.nav-item-in-in');
        innerItems.forEach(inner => inner.classList.toggle('active'));
      });
    });
  });
}

// 초기화 함수 호출
setupNavItems();


//사이드바 햄버거 버튼

let header_side_menu = document.querySelector('.side-menu-wrap');
let hamburgur = document.querySelector('.icon-hamburgur');
let hamburgurImg = hamburgur.querySelector('img'); // 내부 이미지 태그 선택

hamburgur.addEventListener('click', function () {
  header_side_menu.classList.toggle('active'); // 사이드 메뉴 토글
  
  // 현재 상태에 따라 이미지 변경
  if (header_side_menu.classList.contains('active')) {
    hamburgurImg.src = '/images/variables/close-icon-black.svg'; // 닫기 아이콘
  } else {
    hamburgurImg.src = '/images/header/header-hamburgur.png'; // 햄버거 아이콘
  }
});

  // searchbutton이 존재하는지 확인
  if (searchbutton) {
    searchbutton.addEventListener('click', function() {
      // header_top, header_main이 존재하는지 확인
      if (header_top && header_main) {
        // header_search에 active 클래스를 추가하여 검색창 나타나게 하기
        header_search.classList.add('active');
        
        // header_top과 header_main을 숨기기
        header_top.style.display = 'none';
        header_main.style.display = 'none';
        header_wrap.style.display = 'none';
      } else {
        console.log("header-top or header-main not found!");
      }
    });
  } else {
    console.log("Search button not found!");
  }
  // 닫기 버튼 클릭 시
  if (closeSearchButton) {
    closeSearchButton.addEventListener('click', function() {
      // 검색창을 닫고 원래 상태로 되돌리기
      header_search.classList.remove('active');
      
      // header_top과 header_main을 다시 보이도록 설정
      header_top.style.display = 'flex';
      header_main.style.display = 'flex';
      header_wrap.style.display = 'block';
    });
  } else {
    console.log("Close search button not found!");
  }
  let side_search_btn = document.getElementById('side-search-btn');
  let side_search_wrap = document.querySelector('.side-search-wrap');
  side_search_btn.addEventListener('click',function(){
    side_search_wrap.classList.toggle('active');
  })
})


  .catch(error => {
    console.error('Error fetching header:', error);
  });

/* Include Footer */
fetch("/include/footer.html")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data => {
    document.querySelector('.footer-include').innerHTML = data;
  })
  .catch(error => {
    console.error('Error fetching footer:', error);
  });


  fetch("/include/quick-menu.html")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data => {
    document.querySelector('.quick-menu-include').innerHTML = data;  // 
    
    
    // HTML 삽입 후 이벤트 리스너 추가
    let quickbar = document.getElementById('menu-item');
    let quickmenu = document.querySelector('.open-quick-menu');

    console.log("사이드메뉴 확인");  // 스크립트 로드 확인
    console.log(quickbar, quickmenu); // quickbar와 quickmenu 선택 확인
    
    if (quickbar && quickmenu) {
      quickbar.addEventListener('click', function () {
        console.log("quickbar clicked"); // 클릭 확인
        quickmenu.classList.toggle('active'); // active 클래스 토글
        console.log('Active class toggled:', quickmenu.classList.contains('active')); // active 클래스 확인
      });
    } else {
      console.log('Quick menu or quickbar not found.');
    }
  })
  .catch(error => {
    console.error('Error fetching quick-menu:', error);  // 오류 메시지 수정
  });


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
  document.body.style.overflow = 'none';
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
  const desktopQuery = window.matchMedia('(min-width: 769px)');

  if (!desktopQuery.matches) {
    // 768px 이하의 화면(태블릿 및 모바일)에서 탭 기능 활성화
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
const section03 = document.querySelector(".sub-section-03");
const sliderWrap = section03.querySelector(".review-slider-wrap");
const section04 = document.querySelector(".sub-section-04");

let startX;
let scrollLeft;
let isDragging = false;

// 터치 시작 이벤트 핸들러
const handleTouchStart = (e) => {
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
  scrollLeft = sliderWrap.scrollLeft;
  isDragging = true;

  // 마우스 이벤트일 경우 추가 이벤트 리스너 등록
  if (e.type.includes('mouse')) {
    document.addEventListener('mousemove', handleTouchMove);
    document.addEventListener('mouseup', handleTouchEnd);
  }
};


// 터치 이동 이벤트 핸들러
const handleTouchMove = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
  const walk = (startX - x) * 2; // 스크롤 속도 조절
  sliderWrap.scrollLeft = scrollLeft + walk;
};

// 터치 종료 이벤트 핸들러
const handleTouchEnd = () => {
  isDragging = false;
  
  // 마우스 이벤트 리스너 제거
  document.removeEventListener('mousemove', handleTouchMove);
  document.removeEventListener('mouseup', handleTouchEnd);
};

// 화면 너비에 따라 이벤트 리스너 추가 또는 제거하는 함수
const updateEventListeners = () => {
  if (window.innerWidth >= 481 && window.innerWidth <= 768) {
    // 481px에서 768px 사이의 화면 너비일 때
    sliderWrap.addEventListener('touchstart', handleTouchStart);
    sliderWrap.addEventListener('touchmove', handleTouchMove);
    sliderWrap.addEventListener('touchend', handleTouchEnd);
    sliderWrap.addEventListener('mousedown', handleTouchStart);
  } else {
    // 그 외의 화면 너비일 때 이벤트 리스너 제거
    sliderWrap.removeEventListener('touchstart', handleTouchStart);
    sliderWrap.removeEventListener('touchmove', handleTouchMove);
    sliderWrap.removeEventListener('touchend', handleTouchEnd);
    sliderWrap.removeEventListener('mousedown', handleTouchStart);
    document.removeEventListener('mousemove', handleTouchMove);
    document.removeEventListener('mouseup', handleTouchEnd);
  }
};

// 초기 설정
updateEventListeners();

// 윈도우 크기 변경 시 이벤트 리스너 업데이트
window.addEventListener("resize", updateEventListeners);

// 슬라이더 스타일 설정
const updateSliderStyle = () => {
  if (window.innerWidth >= 481 && window.innerWidth <= 768) {
    sliderWrap.style.overflowX = 'scroll';
    sliderWrap.style.scrollSnapType = 'x mandatory';
    sliderWrap.style.scrollBehavior = 'smooth';
    
    // 슬라이더 내부 아이템들의 스타일 설정
    const sliderItems = sliderWrap.children;
    for (let item of sliderItems) {
      item.style.flex = '0 0 100%';
      item.style.scrollSnapAlign = 'start';
    }
  } else {
    // 다른 화면 크기에서는 원래 스타일로 복구
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

// 메인섹션 팝업 타이머
// 타이머 변수
let interval;
const timerDisplay = document.getElementById('timer');
// 자정까지 남은 시간 계산
function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);  // 오늘 자정으로 설정
    const timeRemaining = midnight - now;  // 자정까지 남은 밀리초
    return timeRemaining;
}

// 밀리초를 "00시 : 00분 : 00초" 형식으로 포맷하는 함수
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    return `${pad(hours)}시  ${pad(remainingMinutes)}분  ${pad(remainingSeconds)}초`;
}
// 숫자가 10 미만이면 앞에 0을 추가하는 함수
function pad(number) {
    return number < 10 ? '0' + number : number;
}
// 타이머 시작 함수
function startTimer() {
    // 처음 자정까지 남은 시간 계산
    let timeRemaining = getTimeUntilMidnight();
    interval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(interval); // 자정에 도달하면 타이머 멈춤
            timerDisplay.textContent = "00시 : 00분 : 00초"; // 자정에 리셋
            startTimer();  // 자정이 지나면 다시 타이머 시작
        } else {
            timerDisplay.textContent = formatTime(timeRemaining); // 포맷된 시간 출력
            timeRemaining -= 1000; // 1초씩 감소
        }
    }, 1000); // 1초마다 실행
}
// 페이지 로드 시 자동으로 타이머 시작
window.onload = startTimer;

// 메인 팝업 요소와 체크박스 요소
let main_popup = document.querySelector('.main-popup');
let delete_popup = document.getElementById('delete-today');

// 페이지 로드 시 저장된 상태 확인
function checkPopupVisibility() {
    // localStorage에서 저장된 'popupHidden' 값을 가져옴
    let popupHiddenTime = localStorage.getItem('popupHiddenTime');
    if (popupHiddenTime) {
        // 저장된 시간이 현재 시간에서 24시간(86400000ms) 이내면 팝업을 숨긴다
        let currentTime = new Date().getTime();
        if (currentTime - popupHiddenTime < 86400000) {
            main_popup.style.display = 'none';
            delete_popup.checked = true; // 체크박스도 체크 상태로 설정
        } else {
            // 24시간이 지나면 팝업을 다시 표시
            main_popup.style.display = 'block';
            delete_popup.checked = false; // 체크박스를 체크 해제 상태로 설정
        }
    } else {
        // 'popupHiddenTime'이 없으면 팝업을 기본값으로 표시
        main_popup.style.display = 'block';
    }
}

// 체크박스 상태 변화 시 처리
delete_popup.addEventListener('change', function() {
    if (delete_popup.checked) {
        // 체크박스가 체크되면 팝업 숨기기
        main_popup.style.display = 'none';
        // 현재 시간을 localStorage에 저장 (24시간 동안 보이지 않게)
        localStorage.setItem('popupHiddenTime', new Date().getTime());
    } else {
        // 체크박스가 해제되면 팝업 보이기
        main_popup.style.display = 'block';
        // 'popupHiddenTime' 삭제하여 24시간 제한을 해제
        localStorage.removeItem('popupHiddenTime');
    }
});

// 페이지 로드 시 팝업 상태 확인
window.onload = checkPopupVisibility;

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
    const temp = data.main.temp;  // 온도
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

    document.getElementById('weather-icon').src = `/images/subpage_02(운휴안내)/${iconUrl}`;

  })
  .catch(error => {
    console.error('날씨 정보를 가져오는 중 오류 발생:', error);
  });

  
  // 풀페이지 스크롤 기능
  const sections = document.querySelectorAll('section');
  let currentSection = 0;
  let Scrolling = false;
  
  // 특정 섹션으로 스크롤하는 함수
  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || Scrolling || isScrollLocked) return;
  
  if (sections[index].classList.contains('main-section')) {
      isMainSection = true;
    } else {
      isMainSection = false;
    }
  
  
  
    Scrolling = true;
    window.scrollTo({
      top: sections[index].offsetTop,
      behavior: 'smooth',
    });
  
    setTimeout(() => {
      Scrolling = false;
      currentSection = index;
    }, 800);
  }
  
  // 마우스 휠 이벤트 처리
  window.addEventListener('wheel', (event) => {
    if (isScrollLocked) return; // 줌 상태일 때 스크롤 방지
    if (event.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else {
      scrollToSection(currentSection - 1);
    }
  });
  
  // 터치 스크롤을 위한 추가 처리
  let touchStartY = 0;
  
  window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
  });
  
  window.addEventListener('touchend', (event) => {
    if (isScrollLocked) return; // 줌 상태일 때 터치 스크롤 방지
    const touchEndY = event.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) {
      scrollToSection(currentSection + 1);
    } else if (touchEndY - touchStartY > 50) {
      scrollToSection(currentSection - 1);
    }
  });
  
  // 줌 기능
  let zoomableImage = document.querySelector('.scroll-zoom');
  let zoomContainer = document.querySelector('.zoom-section');
  let zoomText = document.querySelector('.zoom-text');
  let currentZoom = 1;
  let isScrollLocked = true; // 스크롤 잠금 상태를 관리
  
  zoomContainer.addEventListener('wheel', function (event) {
    event.preventDefault();
  
    let newZoom = currentZoom;
  
    if (event.deltaY < 0) {
      newZoom += 0.1;
    } else {
      newZoom -= 0.1;
    }
  
    newZoom = Math.min(Math.max(newZoom, 1), 2.5);
  
    if (newZoom === 2.5) {
      zoomableImage.style.display = 'none';
      zoomText.style.display = 'none';
      isScrollLocked = false; // 줌이 끝나면 스크롤 허용
    } else {
      zoomableImage.style.display = 'block';
      isScrollLocked = true; // 줌 중에는 스크롤 방지
    }
  
    zoomableImage.style.transform = `scale(${newZoom})`;
    currentZoom = newZoom;
  });
  
  // 스크롤 잠금 처리
  window.addEventListener('wheel', (event) => {
    if (isScrollLocked) {
      event.preventDefault(); // 줌 중일 때 모든 스크롤 방지
      event.stopPropagation();
    }
  }, { passive: false });