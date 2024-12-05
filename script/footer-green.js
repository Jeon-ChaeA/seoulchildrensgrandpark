/* Include Footer */
fetch("/include/footer-green.html")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data => {
    document.querySelector('.footer-green-include').innerHTML = data;
  })
  .catch(error => {
    console.error('Error fetching footer:', error);
  });
