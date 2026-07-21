const fs = require('fs');
const path = require('path');

console.log('=== 将所有"Wiki"改为"Gothic 1 Remake"(去掉Wiki) ===\n');

// 目录和语言映射
const dirs = ['', 'de', 'fr', 'it', 'es', 'ko', 'ja'];
let fixedCount = 0;

dirs.forEach(dir => {
    const checkPath = dir === '' ? __dirname : path.join(__dirname, dir);
    
    if (!fs.existsSync(checkPath)) return;
    
    const dirName = dir ? '/' + dir + '/' : '根目录';
    console.log('修复 ' + dirName + '...');
    
    const files = fs.readdirSync(checkPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(checkPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        // 1. 修复页面标题 <title>
        content = content.replace(
            /<title>([^<]*?)Wiki([^<]*?)<\/title>/g,
            function(match, before, after) {
                changed = true;
                console.log('    ' + file + ': <title> Wiki -> 无');
                return '<title>' + before + after + '</title>';
            }
        );
        
        // 2. 修复导航栏logo
        content = content.replace(
            /<h1>🏰 ([^<]*?)Wiki<\/h1>/g,
            '<h1>🏰 Gothic 1 Remake</h1>'
        );
        
        // 3. 修复Footer中的About This Guide下方的标题
        content = content.replace(
            /<h4>About This Guide<\/h4>/g,
            '<h4>About Gothic 1 Remake</h4>'
        );
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
        }
    });
});

console.log('\n完成!共修复 ' + fixedCount + ' 个文件。');
console.log('\n请提交并推送到GitHub:');
console.log('  git add .');
console.log("  git commit -m 'refactor: 移除Wiki标识 - 统一为Gothic 1 Remake'");
console.log('  git push origin master');
