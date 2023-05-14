 // Get the client number input field
 var clientNumberInput = document.getElementById('client-number');
  
 // Add an event listener to the input field to save the value to localStorage
 clientNumberInput.addEventListener('input', function() {
   localStorage.setItem('clientNumber', clientNumberInput.value);
 });
 console.log(clientNumberInput);