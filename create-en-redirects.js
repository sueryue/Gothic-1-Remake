const fs = require('fs');
const path = require('path');

// 创建 en/ 目录下的重定向页面
const pages = [
    'index.html',
    'daily-tips.html',
    'lockpicking.html',
    'factions-guide.html',
    'factions-ultimate-guide.html',
    'lock-solver.html',
    'lockpicking-calculator.html',
    'visual-guide.html'
];

const enDir = path.join(__dirname, 'en');

// 确保en目录存在
if (!fs.existsSync(enDir)) {
    fs.mkdirSync(enDir, { recursive: true });
}

console.log('创建 /en/ 路径的重定向页面:\n');

pages.forEach(page => {
    const filePath = path.join(enDir, page);
    
    // 获取目标URL (去掉page就是首页)
    const targetUrl = page === 'index.html' ? '/' : `/${page}`;
    
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0;url=${targetUrl}">
    <link rel="canonical" href="/${page}">
    <script>
        // Client-side redirect to root (English version)
        window.location.replace('${targetUrl}');
    </script>
</head>
<body>
    <p>If you are not redirected automatically, follow this <a href="${targetUrl}">link to ${page === 'index.html' ? 'the English homepage' : 'the English page'}</a>.</p>
</body>
</html>`;
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ /en/${page} → ${targetUrl}`);
});

console.log('\n完成!现在 /en/* 路径会自动重定向到根目录(英文版)');
