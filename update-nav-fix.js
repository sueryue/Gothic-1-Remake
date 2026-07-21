const fs = require('fs');
const path = require('path');

console.log('=== 批量更新所有页面的导航栏 ===\n');

// 目录和语言映射
const dirs = ['', 'de', 'fr', 'it', 'es', 'ko', 'ja'];
let fixedCount = 0;

dirs.forEach(dir => {
    const checkPath = dir === '' ? __dirname : path.join(__dirname, dir);
    
    if (!fs.existsSync(checkPath)) return;
    
    const dirName = dir ? '/' + dir + '/' : '根目录';
    console.log('处理 ' + dirName + '...');
    
    const files = fs.readdirSync(checkPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(checkPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;
        
        // 移除 <li> 标签包裹的语言选择器,让它直接作为 <ul> 的子元素
        // 原始: <ul class="nav-menu"> ... <li><select id="languageSelector">...</select></li></ul>
        // 目标: <ul class="nav-menu"> ... <select id="languageSelector">...</select></ul>
        
        content = content.replace(
            /(<ul class="nav-menu">[\s\S]*?)<li>\s*<select id="languageSelector"/g,
            '$1<select id="languageSelector"'
        );
        
        content = content.replace(
            /<\/select>\s*<\/li>([\s\n]*<\/ul>)/g,
            '</select>$1'
        );
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
            console.log('  ✅ 修复 ' + file);
        }
    });
});

console.log('\n完成!共处理 ' + fixedCount + ' 个文件。\n');
