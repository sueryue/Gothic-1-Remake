const fs = require('fs');
const path = require('path');

// 根目录的HTML文件
const rootFiles = [
    'index.html',
    'factions-guide.html',
    'factions-ultimate-guide.html',
    'lockpicking.html',
    'lock-solver.html',
    'lockpicking-calculator.html',
    'visual-guide.html',
    'daily-tips.html'
];

console.log('修复根目录HTML文件的导航链接:\n');

rootFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // 将 href="xxx.html" 改为 href="/xxx.html" (导航栏链接)
    // 只修复导航菜单中的链接(<ul class="nav-menu">...</ul>)
    content = content.replace(
        /(<ul class="nav-menu">[\s\S]*?)href="([^"]*)"/g,
        function(match, nav, href) {
            // 跳过锚点(#开头)和外部链接(http://, https://, mailto:)
            if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) {
                return match;
            }
            // 确保href不是以/开头
            if (href.startsWith('/')) {
                return match;
            }
            return match.replace(href, '/' + href);
        }
    );
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}`);
    }
});

console.log('\n修复完成!');
