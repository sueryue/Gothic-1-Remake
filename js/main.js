// Gothic 1 Remake Wiki - Main JavaScript
// Handles interactive features, language switching, hamburger menu, and UX

document.addEventListener('DOMContentLoaded', function() {

    // === Hamburger Menu Toggle ===
    var hamburger = document.querySelector('.hamburger-toggle');
    var navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.innerHTML = isOpen ? '✕' : '☰';
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // 点击页面空白处关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.innerHTML = '☰';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // === 触屏下拉菜单切换 ===
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            // 只在手机/平板上用点击来切换
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                var parent = toggle.parentElement;
                var dropdown = parent.querySelector('.dropdown-menu');

                if (dropdown) {
                    // 关闭其他下拉菜单
                    document.querySelectorAll('.dropdown-menu.open').forEach(function(d) {
                        if (d !== dropdown) d.classList.remove('open');
                    });

                    dropdown.classList.toggle('open');
                }
            }
        });
    });

    // === Language Switcher ===
    window.changeLanguage = function(lang) { /* Language switching removed — all content available in English */ };

    // Language selector removed

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
