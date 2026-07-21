const fs = require('fs');
const path = require('path');

console.log('=== 全面检查所有HTML页面的链接 ===\n');

const dirsToCheck = ['', 'de', 'fr', 'it', 'es', 'ko', 'ja'];
let totalIssues = 0;

dirsToCheck.forEach(langDir => {
    const checkPath = langDir === '' ? __dirname : path.join(__dirname, langDir);
    
    if (!fs.existsSync(checkPath)) return;
    
    const langName = langDir === '' ? '🇺🇸 根目录 (英文)' : `🇩🇪 /${langDir}/`;
    console.log(`\n${langName} 目录:`);
    console.log('-'.repeat(70));
    
    const files = fs.readdirSync(checkPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(checkPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 查找导航菜单中的链接
        const navMatch = content.match(/<ul class="nav-menu">([\s\S]*?)<\/ul>/);
        
        if (navMatch) {
            const navContent = navMatch[1];
            const links = [...navContent.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
            
            const issues = [];
            links.forEach(href => {
                // 跳过外部链接、锚点、mailto、JavaScript
                if (href.match(/^https?:\/\//i) || 
                    href.match(/^mailto:/i) || 
                    href.startsWith('#') || 
                    href.startsWith('javascript:') ||
                    href.includes('@')) {
                    return;
                }
                
                // 检查是否是相对路径但不在根目录
                if (!href.startsWith('/') && !href.startsWith('../')) {
                    issues.push({ href, type: '相对路径' });
                }
                
                // 检查是否有 ../lang/ 路径
                const relMatch = href.match(/^\.\.\/[a-z]{2}\//);
                if (relMatch) {
                    issues.push({ href, type: '错误相对路径' });
                }
            });
            
            if (issues.length > 0) {
                console.log(`\n  ⚠️ ${file}:`);
                issues.forEach(issue => {
                    console.log(`     ${issue.type}: ${issue.href}`);
                    totalIssues++;
                });
            }
        }
    });
});

console.log('\n' + '='.repeat(70));
if (totalIssues === 0) {
    console.log('✅ 所有页面链接都正确!没有发现404风险。');
} else {
    console.log(`❌ 发现 ${totalIssues} 个问题需要修复!`);
    console.log('\n请根据上述列表进行修复。');
}

process.exit(totalIssues > 0 ? 1 : 0);
const fs = require('fs');
const path = require('path');

console.log('=== 全面检查所有HTML页面的链接 ===\n');

// 检查的目录列表
const dirsToCheck = [
    '',             // 根目录 (英文)
    'de',           // 德语
    'fr',           // 法语
    'it',           // 意大利语
    'es',           // 西班牙语
    'ko',           // 韩语
    'ja'            // 日语
];

let totalIssues = 0;

dirsToCheck.forEach(langDir => {
    const checkPath = langDir === '' ? __dirname : path.join(__dirname, langDir);
    
    if (!fs.existsSync(checkPath)) {
        console.log(`⚠️  ${langDir || '根'}目录不存在，跳过`);
        return;
    }
    
    console.log(`\n${langDir === '' ? '🇺🇸 根目录 (英文)' : `🇩🇪 /${langDir}/`} 目录:`);
    console.log('-'.repeat(60));
    
    const files = fs.readdirSync(checkPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(checkPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 查找导航菜单中的链接
        const navMatch = content.match(/<ul class="nav-menu">([\s\S]*?)<\/ul>/);
        
        if (navMatch) {
            const navContent = navMatch[1];
            const links = [...navContent.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
            
            // 检查是否有问题链接
            const issues = [];
            links.forEach(href => {
                // 跳过外部链接、锚点、mailt