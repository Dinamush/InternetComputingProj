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

const searchInput = document.querySelector('input[type="search"]');
if (searchInput) {
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchTerm = this.value.trim();
      if (searchTerm) {
        window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
      }
    }
  });
}

function contactRedirect() {
  window.location.href = 'contact.html';
}

