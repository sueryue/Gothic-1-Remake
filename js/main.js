// Gothic 1 Remake Wiki - Main JavaScript
// Handles interactive features, language switching, and UX

document.addEventListener('DOMContentLoaded', function() {

    // === Language Switcher ===
    window.changeLanguage = function(lang) {
        var base = '/Gothic-1-Remake/';
        var newUrl = base;
        if (lang !== 'en') {
            newUrl = base + lang + '/';
        }
        window.location.href = newUrl;
    };

    // Set language selector to match current URL
    var langSelector = document.getElementById('languageSelector');
    if (langSelector) {
        var pathMatch = window.location.pathname.match(/\/Gothic-1-Remake\/(en|de|fr|it|es|ko|ja)\//);
        if (pathMatch) {
            langSelector.value = pathMatch[1];
        }
    }

    // === FAQ Accordion ===
    document.querySelectorAll('.faq-question').forEach(function(question) {
        question.addEventListener('click', function() {
            var answer = this.nextElementSibling;
            var isOpen = answer.style.display === 'block';
            document.querySelectorAll('.faq-answer').forEach(function(a) {
                a.style.display = 'none';
            });
            answer.style.display = isOpen ? 'none' : 'block';
        });
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // === Back to Top Button ===
    (function() {
        var btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:50px;height:50px;background:var(--color-accent);color:white;border:none;border-radius:50%;font-size:1.5rem;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s ease;z-index:999;box-shadow:0 4px 8px rgba(0,0,0,0.3);';
        document.body.appendChild(btn);

        window.addEventListener('scroll', function() {
            var v = window.scrollY > 300 ? '1' : '0';
            var s = window.scrollY > 300 ? 'visible' : 'hidden';
            btn.style.opacity = v;
            btn.style.visibility = s;
        });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

    console.log('🏰 Gothic 1 Remake Wiki loaded successfully!');
});
