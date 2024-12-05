//Sub-page :: ticket-info
//카드 보여주기 효과
document.addEventListener('DOMContentLoaded', () => {
  const ticketContainer = document.querySelector('.ticket-info-cards');
  const ticketCards = Array.from(document.querySelectorAll('.ticket-card'));

  let animationTriggered = false;

  const triggerCardAnimation = () => {
    if (animationTriggered) return;
    const containerOffset = ticketContainer.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.3;

    if (containerOffset < triggerPoint) {
      animationTriggered = true;

      const customOrder = ['big-5-ticket', 'group-ticket', 'free-pass-ticket'];
      const sortedCards = ticketCards.sort((a, b) => {
        return customOrder.indexOf(a.classList[1]) - customOrder.indexOf(b.classList[1]);
      });

      sortedCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('on');
        }, index * 300); 
      });

      setTimeout(() => {
        ticketCards.forEach((card) => {
          card.classList.add('move'); 
        });
      }, sortedCards.length * 300 + 500); 
    }
  };
  document.addEventListener('scroll', triggerCardAnimation);
});

// 아코디언
const ticketRsvList = document.querySelectorAll('.ticket-rsv-list');

ticketRsvList.forEach(function (item) {
  const header = item.querySelector('.ticket-rsv-header');
  header.addEventListener('click', function () {
    const content = item.querySelector('.ticket-rsv-content');
    const isOpen = content.style.maxHeight;

    if (!isOpen) {
      // 현재 아이템 열기
      content.style.maxHeight = content.scrollHeight + 'px';
      header.classList.add('active');
    } else {
      // 현재 아이템 닫기
      content.style.maxHeight = null;
      header.classList.remove('active');
    }
  });
});

//sub page 05,06 
//sub page 05 :: ticket -rsv
const ticketData = [
  {
    "자유이용권": {
      "adult": { "price": 25200, "quantity": 0 },
      "teen": { "price": 22200, "quantity": 0 },
      "child": { "price": 22200, "quantity": 0 },
      "total": 0
    },
    "big-5": {
      "adult": { "price": 17100, "quantity": 0 },
      "teen": { "price": 15300, "quantity": 0 },
      "child": { "price": 14400, "quantity": 0 },
      "total": 0
    },
    "단체이용권": {
      "adult": { "price": 22000, "quantity": 0 },
      "teen": { "price": 20000, "quantity": 0 },
      "child": { "price": 18000, "quantity": 0 },
      "total": 0
    }
  }
];

// 수량 변경 및 총합 업데이트 함수
function updateTotal(ticketType) {
  const group = ticketData[0][ticketType]; // 배열의 첫 번째 요소로 접근
  let groupTotal = 0;

  // 해당 그룹의 총합 계산
  Object.keys(group).forEach((key) => {
    if (key !== 'total') {
      groupTotal += group[key].quantity * group[key].price;
    }
  });

  // 해당 그룹의 total 값을 갱신
  group.total = groupTotal;

  // 해당 그룹의 total을 화면에 업데이트
  const totalInput = document
    .querySelector(`[data-ticket="${ticketType}"]`)
    .closest('.ticket-rsv-list')
    .querySelector('.option-total .amount-input input');
  totalInput.value = groupTotal.toLocaleString(); // 금액을 콤마로 구분하여 표시
}

// 버튼 클릭 이벤트 추가
document.querySelectorAll('.qty-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const btn = e.target.closest('button'); // 클릭한 버튼
    const ticketType = btn.dataset.ticket; // 티켓 종류 (자유이용권, BIG-5, 단체이용권)
    const category = btn.dataset.type; // 어른, 청소년, 어린이
    const isIncrease = btn.querySelector('i').classList.contains('bi-plus-circle'); // 증가/감소 여부

    // 수량 변경
    const input = btn.closest('.ticket-qty').querySelector('input');
    let quantity = parseInt(input.value, 10) || 0;
    quantity = isIncrease ? quantity + 1 : Math.max(0, quantity - 1); // 수량 증가/감소
    input.value = quantity; // 변경된 수량을 input에 반영

    // 데이터 업데이트
    ticketData[0][ticketType][category].quantity = quantity;

    // 그룹별 총합 업데이트
    updateTotal(ticketType);
  });
});

// 로컬 스토리지에 데이터 저장
function saveToLocalStorage() {
  const cart = {};
  let hasItems = false; // 장바구니에 담긴 항목 여부 확인
  let groupTicketTotal = 0; // 단체이용권 합계

  Object.keys(ticketData[0]).forEach((ticketType) => {
    const group = ticketData[0][ticketType];
    cart[ticketType] = {};

    Object.keys(group).forEach((category) => {
      if (category !== 'total') {
        const quantity = group[category].quantity;
        if (quantity > 0) { // 수량이 0보다 큰 항목만 저장
          cart[ticketType][category] = {
            price: group[category].price,
            quantity,
          };
          hasItems = true; // 담긴 항목이 있으면 true로 설정

          // 단체이용권의 합계 계산
          if (ticketType === "단체이용권") {
            groupTicketTotal += quantity;
          }
        }
      }
    });
  });

  // 단체이용권 조건 확인
  if (groupTicketTotal > 0 && groupTicketTotal < 20) {
    alert('단체 이용권은 20매 이상 구매해야 합니다.');
    return false; // 저장 및 다음 동작 중지
  }

  if (!hasItems) {
    alert('상품을 선택해주세요.'); // 선택된 항목이 없으면 알림
    return false; // 저장 및 다음 동작 중지
  }

  // 로컬 스토리지에 저장
  localStorage.setItem('cart', JSON.stringify(cart));
  return true; // 저장 완료
}

// "장바구니에 담기" 버튼 클릭 이벤트
if (document.querySelector('.add-cart')) {
  document.querySelector('.add-cart').addEventListener('click', () => {
    const isSaved = saveToLocalStorage(); // 저장 시도
    if (isSaved) {
      alert('장바구니에 담겼습니다.'); // 저장 성공 시 알림
    }
  });
}

// "예매하기" 버튼 클릭 이벤트
if (document.querySelector('.reserve')) {
  document.querySelector('.reserve').addEventListener('click', () => {
    const isSaved = saveToLocalStorage(); // 저장 시도
    if (isSaved) {
      window.location.href = '/html/ticket-cart.html'; // 장바구니 페이지로 이동
    }
  });
}

// sub page 06 :: ticket cart
document.addEventListener('DOMContentLoaded', () => {
  function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const cartContainer = document.querySelector('.cart-items');

    if (!cartItems || Object.keys(cartItems).length === 0) {
      cartContainer.innerHTML = '<p>장바구니가 비어 있습니다.</p>';
      updateCartItemCount();
      updateTotalAmount();
      return;
    }

    cartContainer.innerHTML = '';

    Object.keys(cartItems).forEach((ticketType) => {
      const ticket = cartItems[ticketType];

      Object.keys(ticket).forEach((category) => {
        const { price, quantity } = ticket[category];

        if (quantity > 0) {
          const itemHTML = `
            <div class="cart-item">
              <div class="check-status">
                <input class="cart-chk" type="checkbox" checked>
              </div>
              <div class="thum">
                <img src="/seoulchildrensgrandpark_Portfolio/images/subpage_06_ticket_cart/thum-${ticketType}.jpg" alt="${ticketType} 썸네일">
              </div>
              <div class="cart-overview">
                <div class="cart-overview-header">
                  <h4>${ticketType.toUpperCase()}</h4>
                  <button class="btn-clear" data-ticket="${ticketType}" data-category="${category}"></button>
                </div>
                <div class="cart-overview-detail">
                  <div class="cart-overview-info">
                    <span class="cart-info">
                      ${category === 'adult' ? '성인' : category === 'teen' ? '청소년' : '어린이'}
                      <em>(${quantity})</em>
                    </span>
                  </div>
                  <div class="cart-overview-price">
                    <span class="ticket-price">${(price * quantity).toLocaleString()}</span>원
                  </div>
                </div>
              </div>
            </div>`;
          cartContainer.innerHTML += itemHTML;
        }
      });
    });

    // 삭제 버튼에 이벤트 추가
    document.querySelectorAll('.btn-clear').forEach((button) => {
      button.addEventListener('click', (e) => {
        const ticketType = e.target.dataset.ticket;
        const category = e.target.dataset.category;

        if (cartItems[ticketType][category]) {
          delete cartItems[ticketType][category];
          if (Object.keys(cartItems[ticketType]).length === 0) {
            delete cartItems[ticketType];
          }
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        loadCartItems(); // UI 갱신
      });
    });

    // 체크박스 이벤트 재등록
    document.querySelectorAll('.cart-chk').forEach((checkbox) => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    // UI 갱신 후 총 금액 및 수량 업데이트
    updateTotalAmount();
    updateCartItemCount();
  }

  loadCartItems();
});

// 체크박스 상태 변경 시 아이템 수와 총 금액 업데이트
function handleCheckboxChange() {
  const checkboxes = document.querySelectorAll('.cart-chk');
  const selectAllCheckbox = document.querySelector('.cart-chk-all');

  let selectedCount = 0;
  let totalCount = checkboxes.length;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCount += 1;
    }
  });

  // 전체선택 체크박스 상태 업데이트
  if (selectAllCheckbox) {
    selectAllCheckbox.checked = selectedCount === totalCount;
  }

  // 업데이트 호출
  updateCartItemCount();
  updateTotalAmount();
}

// 장바구니 아이템 수 업데이트
function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  let selectedCount = 0;
  let totalCount = 0;

  Object.keys(cart).forEach((ticketType) => {
    const ticketGroup = cart[ticketType];
    Object.keys(ticketGroup).forEach((category) => {
      const item = ticketGroup[category];
      if (item.quantity > 0) {
        totalCount += 1;
      }
    });
  });

  const cartCountElement = document.querySelector('.cart-header span em');
  if (cartCountElement) {
    const selectedCheckboxes = document.querySelectorAll('.cart-chk:checked').length;
    cartCountElement.textContent = `${selectedCheckboxes}/${totalCount}`;
  }
}

// 총 결제 금액 업데이트
function updateTotalAmount() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalAmount = 0;

  cartItems.forEach((item) => {
    const checkbox = item.querySelector('.cart-chk');
    const price = parseInt(item.querySelector('.ticket-price').textContent.replace(/[^0-9]/g, ''), 10);
    if (checkbox.checked) {
      totalAmount += price;
    }
  });

  const totalAmountElement = document.querySelector('.price em');
  totalAmountElement.textContent = totalAmount.toLocaleString();
}

// 전체 삭제 버튼
if (document.getElementById('clear-all')) {
  document.getElementById('clear-all').addEventListener('click', () => {
    localStorage.removeItem('cart');
    location.reload();
  });
}

// 전체선택 체크박스 이벤트
document.querySelector('.cart-chk-all').addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  document.querySelectorAll('.cart-chk').forEach((checkbox) => {
    checkbox.checked = isChecked;
  });

  updateCartItemCount();
  updateTotalAmount();
});
