const fs = require('fs');

const files = ['visual-guide.html', 'lock-solver.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // 替换 href="page.html" -> href="/page.html" (仅在nav-menu内)
    const navMatch = content.match(/(<ul class="nav-menu">[\s\S]*?<\/ul>)/);
    if (navMatch) {
        const navContent = navMatch[1];
        // 找出所有 href="xxx.html"
        const linkRegex = /href="([^"]+\.html)"/g;
        let match;
        while ((match = linkRegex.exec(navContent)) !== null) {
            const href = match[1];
            if (!href.startsWith('/')) {
                content = content.replace(new RegExp(`href="${href}"`, 'g'), `href="/${href}"`);
            }
        }
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}`);
    }
});

console.log('\n完成!');
