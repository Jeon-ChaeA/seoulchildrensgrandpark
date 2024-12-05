//follow cursor
fetch("../include/follow-cursor.html")
  .then(response=>response.text())
  .then(html=>{
    document.querySelector('.follow-cursor-include').innerHTML = html;
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
  });

// 헤더
fetch("../include/header.html")
  .then(response => response.text())
  .then(html => {
    document.querySelector('.header-include').innerHTML = html;
    //클릭 커서
    let click_here_01 = document.getElementById('click-here-01');
    let click_here_02 = document.getElementById('click-here-02');
    let click_here_03 = document.getElementById('click-here-03');
    console.log(click_here_01,click_here_02,click_here_03);
    let header_gnb_main = document.querySelector('header');
    header_gnb_main.addEventListener('mouseenter',function(){
      click_here_01.style.opacity = '0';
      click_here_02.style.opacity = '0';
      click_here_03.style.opacity = '0';
    })
    header_gnb_main.addEventListener('mouseleave',function(){
      click_here_01.style.opacity = '1';
      click_here_02.style.opacity = '1';
      click_here_03.style.opacity = '1';
    })

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
    // 햄버거메뉴 로그인 이후 관련
    let join_top = document.getElementById('join-top-icon');
    let my_page_top = document.getElementById('mypage-top-icon');
    let login_top = document.getElementById('login-top-icon');
    let logout_top = document.getElementById('logout-top-icon');


    
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
        join_top.style.display = 'none';  // join_btn을 숨김
        login_top.style.display = 'none';  // login_icon을 숨김    
        my_page_top.style.display = 'block';
        logout_top.style.display = 'block';
        
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
      join_top.style.display = 'block';  
      login_top.style.display = 'block';     
      my_page_top.style.display = 'none';
      logout_top.style.display = 'none';
    })
    
    logout_top.addEventListener('click',function(){
      alert(`로그아웃 되었습니다!`);
      join_btn.style.display = 'flex';  
      login_icon.style.display = 'flex';     
      my_page_btn.style.display = 'none';
      logout_btn.style.display = 'none';
      join_top.style.display = 'block';  
      login_top.style.display = 'block';     
      my_page_top.style.display = 'none';
      logout_top.style.display = 'none';
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
setupNav('bottom-nav-04', 6, 6);
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

// 사이드바 햄버거 버튼
let header_side_menu = document.querySelector('.side-menu-wrap');
let hamburgur = document.querySelector('.icon-hamburgur');
let hamburgurImg = hamburgur.querySelector('img'); // 내부 이미지 태그 선택


hamburgur.addEventListener('click', function () {
  header_side_menu.classList.toggle('active'); // 사이드 메뉴 토글
  
  // 햄버거 메뉴 열림/닫힘 상태 확인
  if (header_side_menu.classList.contains('active')) {
    hamburgurImg.src = '/images/variables/close-icon-black.svg'; // 닫기 아이콘
    document.body.style.setProperty('overflow', 'hidden', 'important'); // 스크롤 방지
  } else {
    hamburgurImg.src = '/images/header/header-hamburgur.png'; // 햄버거 아이콘
    document.body.style.overflow = 'auto'; // 스크롤 허용
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

// 사이드바 로그인 기능
login_top.addEventListener('click',function(){
  login_modal.classList.add('active');
  modal_back.classList.add('active');
})

let side_search_btn = document.getElementById('side-search-btn');
let side_search_wrap = document.querySelector('.side-search-wrap');
side_search_btn.addEventListener('click',function(){
  side_search_wrap.classList.toggle('active');
})})

//퀵메뉴
fetch("../include/quick-menu.html")
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

function togglePassword() {
  const passwordField = document.querySelector('.password-input-area');
  const passeye = document.querySelector('.password-eye');
  
  // 비밀번호 아이콘 변경 (옵션)
  if (passwordField.type === 'password') {
    passwordField.type = 'text';  
    passeye.src = '/images/variables/eye-open.svg';  
  } else {
    passwordField.type = 'password'; 
    passeye.src = '/images/variables/eye-close.svg';  
  }
}

// 브레드크럼
document.addEventListener("DOMContentLoaded", function () {
  // breadcrumb 내 모든 리스트 아이템(li) 선택
  let breadcrumbItems = document.querySelectorAll('.breadcrumb > li');

  // 각 리스트 아이템에 클릭 이벤트 추가
  breadcrumbItems.forEach(function (item) {
    let link = item.querySelector('a');
    if (link) {
      // 리스트 아이템 클릭 시
      link.addEventListener('click', function (event) {
        event.preventDefault(); // 기본 링크 동작 방지

        // 해당 리스트 아이템의 depth(서브메뉴) 선택
        let depthMenu = item.querySelector('.depth');
        if (depthMenu) {
          // 서브메뉴의 높이가 없거나 0일 때
          if (depthMenu.style.height === '' || depthMenu.style.height === '0px') {
            // 모든 서브메뉴를 닫음
            breadcrumbItems.forEach(function (i) {
              let subMenu = i.querySelector('.depth');
              if (subMenu) {
                subMenu.style.height = '0';
                subMenu.style.opacity = '0';
              }
            });

            // 현재 클릭한 아이템의 서브메뉴만 펼침
            depthMenu.style.height = depthMenu.scrollHeight + 'px'; // 자동 높이 설정
            depthMenu.style.opacity = '1'; // 보이도록 설정
          } else {
            // 이미 펼쳐져 있는 경우 다시 접기
            depthMenu.style.height = '0';
            depthMenu.style.opacity = '0'; // 숨기기
          }
        }
      });
    }
  });
});

//go-to-top
fetch("../include/go-to-top.html")
.then(response => response.text())
.then(html =>{
  document.querySelector('.go-to-top-include').innerHTML = html;
  const goToTopBtn = document.querySelector('#go-to-top-fox');
  const fox = document.querySelector('#go-to-top-fox .fox');
  const foxText = document.querySelector('#go-to-top-fox span');
  const foxBubble = document.querySelector('#go-to-top-fox .bubble');
  console.log(fox, foxBubble, foxText)

  // 고투탑 버튼 hover 효과
  fox.addEventListener('mouseover', () => {
    foxText.style.opacity = '1';
    foxBubble.style.opacity = '1';
  });

  fox.addEventListener('mouseleave', () => {
    foxText.style.opacity = '0';
    foxBubble.style.opacity = '0';
  });

    // 고투탑 버튼 클릭
    goToTopBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })
