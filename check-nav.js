const fs = require('fs');

const files = ['factions-guide.html', 'lockpicking.html', 'visual-guide.html', 'lock-solver.html', 'daily-tips.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    
    const content = fs.readFileSync(f, 'utf8');
    const navMatch = content.match(/<ul class="nav-menu">([\s\S]*?)<\/ul>/);
    
    if (navMatch) {
        console.log(`\n${f}:`);
        const links = navMatch[1].match(/href="[^"]+"/g);
        links && links.forEach(l => console.log('  ' + l));
    }
});
