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

function searchResources(query) {
  // Get all searchable content
  const resources = document.querySelectorAll('.resource-item');
  query = query.toLowerCase();
  
  resources.forEach(item => {
    const title = item.querySelector('h3').textContent.toLowerCase();
    const description = item.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(query) || description.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Add event listener to search input
document.querySelector('input[type="search"]').addEventListener('keyup', (e) => {
  searchResources(e.target.value);
});

function performSearch(query) {
    const searchResults = [];
    const searchableContent = document.querySelectorAll('.searchable');
    
    searchableContent.forEach(content => {
        if (content.innerText.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
                title: content.querySelector('h3')?.innerText || '',
                description: content.querySelector('p')?.innerText || '',
                link: content.querySelector('a')?.href || ''
            });
        }
    });
    
    displaySearchResults(searchResults);
}