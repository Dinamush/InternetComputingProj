document.addEventListener('DOMContentLoaded', function() {
    // Video category filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            videoCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Lazy loading for videos
    const videoContainers = document.querySelectorAll('.video-container');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const iframe = container.querySelector('iframe');
                if (iframe && !iframe.src.includes('youtube.com')) {
                    iframe.src = iframe.getAttribute('data-src');
                }
                observer.unobserve(container);
            }
        });
    }, options);

    videoContainers.forEach(container => {
        observer.observe(container);
    });
});
