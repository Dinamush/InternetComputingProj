function increaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    const newSize = Math.min(currentSize + 2, 24); // Max size of 24px
    document.body.style.fontSize = newSize + 'px';
    localStorage.setItem('fontSize', newSize);
}

function decreaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    const newSize = Math.max(currentSize - 2, 12); // Min size of 12px
    document.body.style.fontSize = newSize + 'px';
    localStorage.setItem('fontSize', newSize);
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrastMode', isHighContrast);
    
    // Force refresh of all interactive elements
    refreshInteractiveElements();
}

function refreshInteractiveElements() {
    // Force refresh of focus states
    document.activeElement?.blur();
    
    // Reset hover states
    const hoverElements = document.querySelectorAll('a, button, .btnn, .btn, .btn-small');
    hoverElements.forEach(el => {
        el.style.transition = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.transition = '';
    });
}

// Initialize accessibility settings on page load
document.addEventListener('DOMContentLoaded', function() {
    // Restore high contrast mode
    const isHighContrast = localStorage.getItem('highContrastMode') === 'true';
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }
    
    // Restore font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.body.style.fontSize = savedFontSize + 'px';
    }
});
