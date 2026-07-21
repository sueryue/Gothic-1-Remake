const fs = require('fs');
const path = require('path');

console.log('=== 修复所有页面的多语言配置 ===\n');

// 语言和目录映射
const langMap = {
    '': 'en',           // 根目录 = 英文
    'de': 'de',         // 德语目录 = 德语
    'fr': 'fr',         // 法语目录 = 法语
    'it': 'it',         // 意大利语目录 = 意大利语
    'es': 'es',         // 西班牙语目录 = 西班牙语
    'ko': 'ko',         // 韩语目录 = 韩语
    'ja': 'ja'          // 日语目录 = 日语
};

let fixedCount = 0;

Object.keys(langMap).forEach(dir => {
    const targetLang = langMap[dir];
    const checkPath = dir === '' ? __dirname : path.join(__dirname, dir);
    
    if (!fs.existsSync(checkPath)) return;
    
    const dirName = dir ? '/' + dir + '/' : '根目录';
    console.log('修复 ' + dirName + ' (lang=' + targetLang + ')...');
    
    const files = fs.readdirSync(checkPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(checkPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        
        // 1. 修复 html lang 属性
        const oldLangPattern = /<html[^>]*lang="[^"]*"/;
        if (oldLangPattern.test(content)) {
            content = content.replace(oldLangPattern, `<html lang="${targetLang}"`);
            changed = true;
        }
        
        // 2. 修复 canonical URL (只在根目录的index.html修复)
        if (dir === '' && file === 'index.html') {
            const oldCanonical = content.match(/rel="canonical"[^>]*href="([^"]+)"/);
            if (oldCanonical && oldCanonical[1].includes('/en/')) {
                content = content.replace(
                    /rel="canonical"[^>]*href="[^"]+"/,
                    'rel="canonical" href="https://sueryue.github.io/Gothic-1-Remake/"'
                );
                changed = true;
            }
        }
        
        // 3. 其他语言目录的 canonical URL
        if (dir !== '' && file === 'index.html') {
            const oldCanonical = content.match(/rel="canonical"[^>]*href="([^"]+)"/);
            if (oldCanonical && oldCanonical[1].includes('/de/') && dir !== 'de') {
                // 错误地指向/de/,需要修正
                content = content.replace(
                    /rel="canonical" href="[^"]+"/,
                    `rel="canonical" href="https://sueryue.github.io/Gothic-1-Remake/${dir}/"`
                );
                changed = true;
            }
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
        }
    });
});

console.log('\n完成!共修复 ' + fixedCount + ' 个文件。\n');
console.log('请提交并推送到GitHub:\n');
console.log('  git add .');
console.log('  git commit -m "fix: 修复所有页面的lang属性和canonical URL"');
console.log('  git push origin master');
