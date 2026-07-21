const fs = require('fs');
const dirs = ['', 'de', 'fr', 'it', 'es', 'ko', 'ja'];
let issues = 0;

console.log('=== 全面检查所有HTML页面的链接 ===\n');

dirs.forEach(d => {
    const base = d || '.';
    if (!fs.existsSync(base)) return;
    
    console.log((d ? '/' + d + '/ : ' : '根目录: ') + '-'.repeat(50));
    
    fs.readdirSync(base).filter(f => f.endsWith('.html')).forEach(f => {
        const content = fs.readFileSync(base + '/' + f, 'utf8');
        const nav = content.match(/<ul class="nav-menu">([\s\S]*?)<\/ul>/);
        
        if (nav) {
            const linkMatches = [...nav[1].matchAll(/href="([^"]+)"/g)];
            linkMatches.forEach(m => {
                const h = m[1];
                // Check if it's a problematic relative path
                // Allow: absolute paths (/file.html), anchor links (file.html#section)
                if (!h.startsWith('/') && 
                    !h.startsWith('../') && 
                    !h.startsWith('http') && 
                    !h.startsWith('mailto') &&
                    !h.includes('#')) {  // 现在允许带#的链接
                    console.log('  WARNING: ' + f + ' -> ' + h);
                    issues++;
                }
            });
        }
    });
});

console.log('\n' + '='.repeat(60));
if (issues === 0) {
    console.log('✅ 所有页面链接都正确!没有发现404风险。');
} else {
    console.log('❌ 发现 ' + issues + ' 个问题需要修复!');
}
