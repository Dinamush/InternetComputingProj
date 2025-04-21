
    
    const form = document.querySelector("footer form");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const emailInput = form.querySelector("input[type='email']");
        if (emailInput.value.trim() !== "") {
          alert(`Thank you for reaching out  ${emailInput.value}!`);
          emailInput.value = "";
        } else {
          alert("Please enter a valid email address.");
        }
      });
    }
  
  