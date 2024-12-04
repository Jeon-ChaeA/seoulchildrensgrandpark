/* Include Footer */
fetch("../include/footer-white.html")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data => {
    document.querySelector('.footer-white-include').innerHTML = data;
  })
  .catch(error => {
    console.error('Error fetching footer:', error);
  });
