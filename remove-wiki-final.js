const fs = require('fs');
const path = require('path');

console.log('=== 移除"Wiki"标识 ===\n');

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
        const original = content;
        
        // 1. 页面标题 <title>
        content = content.replace(
            /Gothic 1 Remake Wiki Ultimate/g,
            'Gothic 1 Remake Ultimate'
        );
        content = content.replace(
            /Ultimate Strategy Guide & Walkthrough \| Tools & Tips \| Gothic 1 Remake Wiki/g,
            'Ultimate Strategy Guide & Walkthrough | Tools & Tips'
        );
        
        // 2. H1 导航栏logo
        content = content.replace(
            /<h1>🏰 Gothic 1 Remake Wiki<\/h1>/g,
            '<h1>🏰 Gothic 1 Remake</h1>'
        );
        
        // 3. Footer版权信息
        content = content.replace(
            /&copy; 2025 Gothic 1 Remake Wiki\./g,
            '&copy; 2025 Gothic 1 Remake.'
        );
        
        // 4. Meta标签 - author
        content = content.replace(
            /content="Gothic 1 Remake Wiki Community"/g,
            'content="Gothic 1 Remake Community"'
        );
        
        // 5. Meta标签 - og:site_name
        content = content.replace(
            /content="Gothic 1 Remake Wiki"/g,
            'content="Gothic 1 Remake"'
        );
        
        // 6. JSON-LD结构化数据
        content = content.replace(
            /"name": "Gothic 1 Remake Wiki"/g,
            '"name": "Gothic 1 Remake"'
        );
        content = content.replace(
            /"Fan-made guide"/g,
            '"Fan-made guide"'
        );
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
            console.log('    ✅ ' + file);
        }
    });
});

console.log('\n完成!共修复 ' + fixedCount + ' 个文件。\n');
