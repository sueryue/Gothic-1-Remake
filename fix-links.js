const fs = require('fs');
const path = require('path');

const languages = ['de', 'fr', 'it', 'es', 'ko', 'ja'];

languages.forEach(lang => {
    const dir = path.join(__dirname, lang);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 替换 ../lang/ 为 /
        content = content.replace(/\.\.\/[a-z]{2}\//g, '/');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${lang}/${file}`);
    });
});

console.log('\n所有语言版本的导航链接已修复!');
