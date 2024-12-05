/* #### attraction.html #### */
// read more 기능
document.querySelector('.readmore').addEventListener('click', function() {
  const rides = document.querySelectorAll('.rides-container .ride-item');
  const attractionInner = document.querySelector('.attraction-inner');
  
  rides.forEach(ride => {
    ride.style.display = 'block';
  });

  this.style.display = 'none';

// 반응형에 따라 .attraction-inner의 높이 조정
if (window.innerWidth <= 480) {
  attractionInner.style.height = '8800px';
} else if (window.innerWidth >= 481 && window.innerWidth <= 768) {
  attractionInner.style.height = '3650px';
}
});

//ride-item 검색기능
const attractions = [// 어트랙션 목록
  { id: 'drop-tower', name: '드롭타워', minHeight: 130 },
  { id: 'super-jump', name: '슈퍼점프', minHeight: 130 },
  { id: 'family-coaster', name: '패밀리코스터', minHeight: 130, needsGuardian: true },
  { id: 'swing-chair', name: '회전그네', minHeight: 125, needsGuardian: true },
  { id: 'bumper-car', name: '범퍼카', minHeight: 120 },
  { id: 'magic-swing', name: '매직스윙', minHeight: 120 },
  { id: 'super-viking', name: '슈퍼바이킹', minHeight: 110 },
  { id: 'flume-ride', name: '후룸라이드', minHeight: 110, needsGuardian: true },
  { id: 'carousel', name: '회전목마', minHeight: 100, needsGuardian: true },
  { id: 'swing-bear', name: '스윙베어', minHeight: 100, needsGuardian: true },
  { id: 'dino-train', name: '디노기차', minHeight: 100, needsGuardian: true },
  { id: 'swinger', name: '스윙거', minHeight: 90, needsGuardian: true },
  { id: 'teacup-ride', name: '회전컵', minHeight: 90, needsGuardian: true },
  { id: 'mini-viking', name: '미니바이킹', minHeight: 90, needsGuardian: true },
  { id: 'ladybug-ride', name: '무당벌레', minHeight: 90, maxHeight: 140 },
  { id: 'frog-jump', name: '개구리점프', minHeight: 90, maxHeight: 140 },
  { id:'little-train' ,name:'꼬마기차' ,minHeight :90 ,maxHeight :140},
  { id:'wow-exploration-team' ,name:'와우탐험대' ,indoor:true},
  { id:'spout-adventure' ,name:'스파우트 어드벤처' ,indoor:true},
  { id:'vr-experience' ,name:'VR(가상체험)' ,indoor:true}
];

const form = document.getElementById('attraction-form');
const resetButton = document.querySelector('.reset');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // 사용자 입력 값 가져오기
  const height = parseInt(document.querySelector('input[name="키"]').value);
  const needsGuardian = document.querySelector('input[name="보호자"]').checked;
  const isRainy = document.querySelector('input[name="날씨"]').checked;

  // 조건 확인 및 표시 여부 결정
  attractions.forEach(attraction => {
      const element = document.getElementById(attraction.id);
      if (!element) return;

      let shouldDisplay = true;
      
      // 조건에 따른 표시 여부 결정
      if (isRainy && !attraction.indoor) shouldDisplay = false;
      if (needsGuardian && !attraction.needsGuardian && attraction.minHeight > height) shouldDisplay = false;
      if (attraction.minHeight && height < attraction.minHeight) shouldDisplay = false;
      if (attraction.maxHeight && height > attraction.maxHeight) shouldDisplay = false;

      // 조건에 맞는 어트랙션만 표시
      element.style.display = shouldDisplay ? '' : 'none';
  });
});

// 초기화 버튼 클릭 시 결과를 초기화
resetButton.addEventListener('click', function() {
  form.reset(); //초기화
  attractions.forEach(attraction => {
      const element = document.getElementById(attraction.id);
      if (element) {
          element.style.display = ''; // 모든 어트랙션 다시 표시
      }
  });
});

const goToTop = document.getElementById('go-to-top-fox');
const fox = document.querySelector('#go-to-top-fox .fox');
const foxText = document.querySelector('#go-to-top-fox span');
const foxBubble = document.querySelector('#go-to-top-fox .bubble');

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
goToTop.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentSection = 0;
  Scrolling = false;
});
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

// /* #### directions.html #### */
// //지도 구현
document.addEventListener('DOMContentLoaded', function() {
  /* #### directions.html #### */
  //지도 구현
  

  //탭기능 구현
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          const tabId = tab.getAttribute('data-tab');

          // 모든 탭과 탭 내용에서 active 클래스 제거
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));

          // 클릭된 탭과 해당 내용에 active 클래스 추가
          tab.classList.add('active');
          document.getElementById(tabId).classList.add('active');
      });
  });
});