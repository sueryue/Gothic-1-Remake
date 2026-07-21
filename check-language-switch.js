const fs = require('fs');
const path = require('path');

console.log('=== 全面检查语言切换功能 ===\n');

const dirs = ['', 'de', 'fr', 'it', 'es', 'ko', 'ja'];
let issues = [];

dirs.forEach(d => {
    const base = d || '.';
    if (!fs.existsSync(base)) return;
    
    const langName = d ? '/' + d + '/' : '根目录 (英文)';
    console.log('\n' + langName);
    console.log('-'.repeat(60));
    
    // 检查 index.html
    const indexFile = path.join(base, 'index.html');
    if (!fs.existsSync(indexFile)) {
        console.log('  ❌ index.html 不存在!');
        issues.push({ dir: langName, issue: 'Missing index.html' });
        return;
    }
    
    const content = fs.readFileSync(indexFile, 'utf8');
    
    // 1. 检查 html lang 属性
    const langMatch = content.match(/<html[^>]*lang="([^"]+)"/);
    const htmlLang = langMatch ? langMatch[1] : null;
    console.log('  HTML lang: ' + (htmlLang || '❌ NOT FOUND'));
    
    // 2. 检查语言选择器
    const langSelector = content.match(/<select[^>]*id="languageSelector"[\s\S]*?<\/select>/);
    console.log('  语言选择器: ' + (langSelector ? '✅ FOUND' : '❌ MISSING'));
    
    if (!langSelector) {
        issues.push({ dir: langName, issue: 'Missing language selector' });
    }
    
    // 3. 检查Google Translate集成
    const gtInit = (content.match(/googleTranslateElementInit/g) || []).length;
    const gtScript = content.match(/translate_google|translate_a\/element\.js/g);
    console.log('  Google Translate初始化: ' + (gtInit > 0 ? '✅ ' + gtInit + ' calls' : '❌ MISSING'));
    console.log('  Google Translate API: ' + (gtScript ? '✅ FOUND (' + gtScript.length + ' refs)' : '❌ MISSING'));
    
    if (gtInit === 0) {
        issues.push({ dir: langName, issue: 'Missing Google Translate initialization' });
    }
    if (!gtScript) {
        issues.push({ dir: langName, issue: 'Missing Google Translate API script' });
    }
    
    // 4. 检查 hreflang 标签
    const hreflangs = [...content.matchAll(/rel="alternate"[^>]*hreflang="([^"]+)"/g)].map(m => m[1]);
    console.log('  Hreflang标签: ' + (hreflangs.length > 0 ? '✅ ' + hreflangs.join(', ') : '❌ MISSING'));
    
    if (hreflangs.length === 0) {
        issues.push({ dir: langName, issue: 'Missing hreflang tags for SEO' });
    }
    
    // 5. 检查 canonical URL
    const canonical = content.match(/rel="canonical"[^>]*href="([^"]+)"/);
    console.log('  Canonical URL: ' + (canonical ? '✅ ' + canonical[1] : '❌ MISSING'));
    
    if (!canonical) {
        issues.push({ dir: langName, issue: 'Missing canonical URL' });
    }
    
    // 6. 检查语言选择器的选项
    const selectOptions = content.match(/<option[^>]*value="([^"]+)"/g) || [];
    if (selectOptions.length > 0) {
        console.log('  语言选项数量: ✅ ' + selectOptions.length);
    } else {
        console.log('  语言选项: ❌ NONE');
        issues.push({ dir: langName, issue: 'No language options in selector' });
    }
});

// 总结
console.log('\n' + '='.repeat(60));
console.log('检查总结:');
console.log('=' .repeat(60));

if (issues.length === 0) {
    console.log('✅ 所有页面的语言切换功能配置正确!');
} else {
    console.log('❌ 发现 ' + issues.length + ' 个问题:\n');
    issues.forEach((issue, idx) => {
        console.log((idx + 1) + '. ' + issue.dir + ': ' + issue.issue);
    });
    console.log('\n建议修复这些问题以确保语言切换正常工作。');
}
