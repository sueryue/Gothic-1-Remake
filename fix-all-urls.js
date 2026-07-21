const fs = require('fs');
const path = require('path');

console.log('=== 修复所有HTML页面的相对路径 ===\n');

// 需要修复的目录
const dirs = ['', 'de', 'fr', 'it', 'es', 'ko', 'ja'];
let fixedCount = 0;

dirs.forEach(langDir => {
    const checkPath = langDir === '' ? __dirname : path.join(__dirname, langDir);
    
    if (!fs.existsSync(checkPath)) return;
    
    const langName = langDir === '' ? '根目录' : '/' + langDir + '/';
    console.log('修复 ' + langName + '...');
    
    const files = fs.readdirSync(checkPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(checkPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;
        
        // 1. 修复导航菜单中的相对路径 (将 index.html -> /index.html)
        content = content.replace(
            /(<ul class="nav-menu">[\s\S]*?<\/ul>)/g,
            function(match) {
                return match.replace(
                    /href="([^"]+\.html)"/g,
                    function(m, href) {
                        if (!href.startsWith('/') && !href.startsWith('http') && !href.startsWith('#')) {
                            return 'href="/' + href + '"';
                        }
                        return m;
                    }
                );
            }
        );
        
        // 2. 修复页面内容区域的相对路径 ../lang/file.html -> /file.html
        content = content.replace(/\.\.\/[a-z]{2}\//g, '/');
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
        }
    });
});

console.log('\n完成!共修复 ' + fixedCount + ' 个文件。');
console.log('\n请提交并推送到GitHub:\n');
console.log('  git add .');
console.log('  git commit -m "fix: 修复所有相对路径问题"');
console.log('  git push origin master');
