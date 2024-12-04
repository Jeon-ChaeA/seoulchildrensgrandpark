
// directions.html 하단 (허정 작업) //


let traffic_button = document.getElementById('traffic-button');
let parking_button = document.getElementById('parking-button');

let inner_traffic = document.querySelector('.inner-traffic');
let inner_parking = document.querySelector('.inner-parking');

traffic_button.addEventListener('click',function(){
  traffic_button.classList.add('active')
  parking_button.classList.remove('active')
  inner_traffic.classList.add('active')
  inner_parking.classList.remove('active')
})
parking_button.addEventListener('click',function(){
  traffic_button.classList.remove('active')
  parking_button.classList.add('active')
  inner_traffic.classList.remove('active')
  inner_parking.classList.add('active')
})