// Enhanced search data structure with more content types
const searchableContent = {
    resources: [
        { 
            title: 'CSEC Mathematics', 
            type: 'syllabus', 
            url: 'documents/syllabuses/csec_mathematics.pdf', 
            keywords: ['mathematics', 'csec', 'syllabus'] 
        },
        { 
            title: 'CAPE Physics', 
            type: 'syllabus', 
            url: 'documents/syllabuses/cape_physics.pdf', 
            keywords: ['physics', 'cape', 'syllabus'] 
        },
        { 
            title: 'Grade 5 Math Worksheet', 
            type: 'worksheet', 
            url: 'documents/worksheets/grade5_math.pdf', 
            keywords: ['grade 5', 'worksheet', 'mathematics'] 
        },
        { 
            title: 'Education Statistics 2024', 
            type: 'report', 
            url: 'documents/reports/education_statistics_2024.pdf', 
            keywords: ['statistics', 'report', '2024'] 
        },
        { title: 'CSEC Mathematics', type: 'textbook', url: 'textbooks.html#csec-math', keywords: ['mathematics', 'csec', 'textbook'] },
        { title: 'CAPE Physics', type: 'textbook', url: 'textbooks.html#cape-physics', keywords: ['physics', 'cape', 'textbook'] },
        { title: 'Grade 10 Worksheets', type: 'worksheet', url: 'worksheets.html#grade10', keywords: ['grade 10', 'worksheet', 'practice'] },
        { title: 'Past Papers 2023', type: 'pastpaper', url: 'pastpapers.html#2023', keywords: ['past papers', 'exam', '2023'] }
    ],
    syllabuses: [
        { title: 'CSEC Syllabus', url: 'csecsyllabus.html', keywords: ['csec', 'syllabus', 'curriculum'] },
        { title: 'CAPE Syllabus', url: 'capesyllabus.html', keywords: ['cape', 'syllabus', 'curriculum'] }
    ],
    news: [
        { title: 'Education Updates 2024', url: 'news.html#updates2024', keywords: ['news', 'updates', '2024'] }
    ],
    grades: [
        { title: 'Grade 5 Resources', url: 'grade5.html', keywords: ['grade 5', 'primary', 'resources'] },
        { title: 'Grade 6 Resources', url: 'grade6.html', keywords: ['grade 6', 'primary', 'resources'] },
        { title: 'Grade 7 Resources', url: 'grade7.html', keywords: ['grade 7', 'secondary', 'form 1'] },
        { title: 'Grade 8 Resources', url: 'grade8.html', keywords: ['grade 8', 'secondary', 'form 2'] },
        { title: 'Grade 9 Resources', url: 'grade9.html', keywords: ['grade 9', 'secondary', 'form 3'] },
        { title: 'Grade 10 Resources', url: 'grade10.html', keywords: ['grade 10', 'secondary', 'form 4'] },
        { title: 'Grade 11 Resources', url: 'grade11.html', keywords: ['grade 11', 'secondary', 'form 5'] }
    ],
    help: [
        { title: 'FAQ', url: 'faq.html', keywords: ['faq', 'help', 'questions', 'answers'] },
        { title: 'Help Center', url: 'help.html', keywords: ['help', 'support', 'assistance'] },
        { title: 'Contact Us', url: 'contact.html', keywords: ['contact', 'email', 'phone', 'support'] }
    ],
    forms: [
        { title: 'Administrative Forms', url: 'forms.html', keywords: ['forms', 'documents', 'administrative'] },
        { title: 'Circulars & Memos', url: 'circulars.html', keywords: ['circulars', 'memos', 'announcements'] }
    ]
};

// Enhanced search handler
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', handleSearchEvent);
        input.addEventListener('input', handleSearchSuggestions);
    });
}

function handleSearchEvent(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.trim().toLowerCase();
        if (query) {
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        }
    }
}

function handleSearchSuggestions(e) {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 2) return;

    const results = searchContent(query).slice(0, 5); // Limit to 5 suggestions
    showSearchSuggestions(results, e.target);
}

function showSearchSuggestions(results, inputElement) {
    let suggestionBox = document.getElementById('search-suggestions');
    if (!suggestionBox) {
        suggestionBox = document.createElement('div');
        suggestionBox.id = 'search-suggestions';
        inputElement.parentNode.appendChild(suggestionBox);
    }

    suggestionBox.innerHTML = results.map(result => `
        <div class="suggestion-item" onclick="window.location.href='${result.url}'">
            ${result.title}
        </div>
    `).join('');
}

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

// Search results page functionality
function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q')?.toLowerCase();
    const searchQueryElement = document.getElementById('search-query');
    const resultsContainer = document.getElementById('search-results-container');
    const noResults = document.getElementById('no-results');

    if (!query || !resultsContainer) return;

    searchQueryElement.textContent = `Search results for: "${query}"`;

    const results = searchContent(query);
    
    if (results.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }

    results.forEach(result => {
        const resultElement = createResultElement(result);
        resultsContainer.appendChild(resultElement);
    });
}

// Search through content
function searchContent(query) {
    const results = [];
    const searchTypes = ['resources', 'syllabuses', 'news', 'grades', 'help', 'forms'];

    searchTypes.forEach(type => {
        searchableContent[type].forEach(item => {
            if (matchesSearch(item, query)) {
                results.push({
                    ...item,
                    category: type
                });
            }
        });
    });

    return results;
}

// Check if item matches search query
function matchesSearch(item, query) {
    const searchableTerms = [
        item.title.toLowerCase(),
        ...(item.keywords || []).map(k => k.toLowerCase())
    ];

    return searchableTerms.some(term => term.includes(query));
}

// Create search result element
function createResultElement(result) {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    
    div.innerHTML = `
        <h3>${result.title}</h3>
        <p>Category: ${result.category}</p>
        <p>Type: ${result.type || 'N/A'}</p>
        <a href="${result.url}" class="btnn">View Resource</a>
    `;

    return div;
}

// Initialize search results if on search results page
if (window.location.pathname.includes('search-results.html')) {
    displaySearchResults();
}
