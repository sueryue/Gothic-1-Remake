#!/usr/bin/env node
/**
 * 自动为所有HTML页面生成多语言版本
 */

const fs = require('fs');
const path = require('path');

// 配置
const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

const srcDir = path.join(__dirname, '.');

// HTML页面列表
const htmlFiles = [
    'index.html',
    'factions-guide.html',
    'factions-ultimate-guide.html',
    'lockpicking.html',
    'lock-solver.html',
    'lockpicking-calculator.html',
    'visual-guide.html',
    'daily-tips.html'
];

console.log('🌍 Gothic 1 Remake - 多语言翻译脚本\n');
console.log(`找到 ${htmlFiles.length} 个HTML文件`);
console.log(`目标语言: ${languages.map(l => l.name).join(', ')}\n`);

// 创建语言文件夹
languages.forEach(lang => {
    const langDir = path.join(srcDir, lang.code);
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
        console.log(`✅ 创建语言文件夹: /${lang.code}/`);
    }
});

// 复制并修改HTML文件
console.log('\n📦 开始复制HTML文件...\n');
htmlFiles.forEach(file => {
    const srcFile = path.join(srcDir, file);
    
    if (!fs.existsSync(srcFile)) {
        console.warn(`⚠️  文件不存在: ${file}`);
        return;
    }
    
    let content = fs.readFileSync(srcFile, 'utf8');
    
    languages.forEach(lang => {
        // 使用 replaceAll 简单替换
        content = content.replaceAll('../en/', `../${lang.code}/`);
        content = content.replaceAll('Gothic-1-Remake/en/', `Gothic-1-Remake/${lang.code}/`);
        
        const langDir = path.join(srcDir, lang.code);
        const destFile = path.join(langDir, file);
        
        try {
            fs.writeFileSync(destFile, content, 'utf8');
            console.log(`✅ ${file} → /${lang.code}/`);
        } catch (err) {
            console.error(`❌ 写入失败 ${file}:`, err.message);
        }
    });
});

console.log('\n✨ 完成!');
console.log('\n🌐 GitHub Pages URL:');
languages.forEach(lang => {
    console.log(`  ${lang.flag} ${lang.name}: https://sueryue.github.io/Gothic-1-Remake/${lang.code}/`);
});
