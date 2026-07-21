// Gothic 1 Remake Wiki - Main JavaScript
// Handles interactive features and user experience

document.addEventListener('DOMContentLoaded', function() {
    
    // === Search Functionality ===
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            alert('Please enter a search term');
            return;
        }
        
        // Simple in-page search highlighting
        window.find(query, {
            caseSensitive: false,
            highlight: true,
            matchDiacritics: true
        });
    }
    
    // === FAQ Accordion ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
    
    function toggleFAQ(e) {
        const answer = e.target.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all FAQs first
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.style.display = 'none';
        });
        
        // Toggle current
        answer.style.display = isOpen ? 'none' : 'block';
    }
    
    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for sticky header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // === Active Navigation Highlighting ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial check
    
    function highlightNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // === Lockpicking Visual Guide Interaction ===
    const buttons = document.querySelectorAll('.button:not(.empty)');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
    
    function handleButtonClick(e) {
        const button = e.target;
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Optional: Add sound effect or visual feedback
        console.log('Button clicked:', button.className);
    }
    
    // === "Back to Top" Button ===
    const createBackToTop = () => {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--color-accent);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
            z-index: 999;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTop();
    
    // === Table of Contents Auto-Update ===
    const tocList = document.querySelector('.toc-list');
    if (tocList) {
        const headings = document.querySelectorAll('.guide-section h2, .guide-section h3');
        headings.forEach(heading => {
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
            }
        });
    }
    
    // === Print-Friendly Styles ===
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print This Page';
    printButton.style.cssText = `
        margin: 2rem 0;
        padding: 1rem 2rem;
        background: var(--color-bg-light);
        color: var(--color-text-primary);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        cursor: pointer;
    `;
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    // Add to first guide section
    const firstGuideSection = document.querySelector('.guide-section');
    if (firstGuideSection && !document.querySelector('.print-button')) {
        printButton.classList.add('print-button');
        firstGuideSection.insertBefore(printButton, firstGuideSection.firstChild);
    }
    
    // === Analytics Tracking (placeholder) ===
    const trackEvent = (category, action, label) => {
        // Replace with your analytics implementation
        console.log(`Analytics: ${category} | ${action} | ${label}`);
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         'event_category': category,
        //         'event_label': label
        //     });
        // }
    };
    
    // Track guide card clicks
    document.querySelectorAll('.guide-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.guide-title').textContent;
            trackEvent('Guide Click', 'click', title);
        });
    });
    
    console.log('🏰 Gothic 1 Remake Wiki loaded successfully!');
});
