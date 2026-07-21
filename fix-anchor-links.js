const fs = require('fs');

// 需要修复的文件
const files = [
    'factions-guide.html',
    'lockpicking.html',
    'lock-solver.html'
];

console.log('修复带锚点的导航链接:\n');

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // 替换 index.html#xxx -> /index.html#xxx
    const regex1 = /href="index\.html#([^"]+)"/g;
    if (regex1.test(content)) {
        content = content.replace(regex1, 'href="/index.html#$1"');
        changed = true;
    }
    
    // 替换 factions-guide.html -> /factions-guide.html (在nav-menu中)
    // 替换 lockpicking.html -> /lockpicking.html
    // 替换 other-page.html -> /other-page.html
    const pageNames = ['factions-guide', 'lockpicking', 'lock-solver', 'visual-guide', 'daily-tips'];
    pageNames.forEach(name => {
        const regex2 = new RegExp(`href="${name}\\.html"`, 'g');
        if (regex2.test(content)) {
            content = content.replace(regex2, `href="/${name}.html"`);
            changed = true;
        }
    });
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}`);
    }
});

console.log('\n完成!');
