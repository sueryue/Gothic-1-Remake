#!/usr/bin/env python3
"""Update all HTML files with new 5-menu navigation structure."""
import re
import os

BASE = r'C:\Users\Administrator\Gothic-1-Remake'

# New navigation HTML (will be inserted into each file)
def get_new_nav(current_file):
    """Return new nav with active class on the matching page."""
    path_pages = {
        'index.html': 'home',
        'walkthrough.html': 'walkthrough',
        'daily-tips.html': 'walkthrough',
        'visual-guide.html': 'walkthrough',
        'map-guide.html': 'walkthrough',
        'lock-solver.html': 'tools',
        'lockpicking-calculator.html': 'tools',
        'lockpicking.html': 'tools',
        'factions-guide.html': 'factions',
        'factions-ultimate-guide.html': 'factions',
        'bestiary.html': 'resources',
        'equipment.html': 'resources',
        'skills-guide.html': 'resources',
        'community.html': 'resources',
    }

    cat = path_pages.get(os.path.basename(current_file), 'home')

    nav = '''        <ul class="nav-menu">
                <li class="nav-item"><a href="index.html"''' + (''' class="active"''' if cat == 'home' else '') + '''>Home</a></li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropdown-toggle"''' + (''' style="color:var(--color-gold)"''' if cat == 'walkthrough' else '') + '''>Walkthrough</a>
                    <ul class="dropdown-menu"><li><a href="walkthrough.html">Walkthrough</a></li><li><a href="daily-tips.html">Daily Tips</a></li><li><a href="visual-guide.html">Visual Guide</a></li><li><a href="map-guide.html">Map Guide</a></li></ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropdown-toggle"''' + (''' style="color:var(--color-gold)"''' if cat == 'tools' else '') + '''>Tools</a>
                    <ul class="dropdown-menu"><li><a href="lock-solver.html">Lock Solver</a></li><li><a href="lockpicking-calculator.html">Calculator</a></li><li><a href="lockpicking.html">Lockpicking Guide</a></li></ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropdown-toggle"''' + (''' style="color:var(--color-gold)"''' if cat == 'factions' else '') + '''>Factions</a>
                    <ul class="dropdown-menu"><li><a href="factions-guide.html">Factions Overview</a></li><li><div class="dropdown-divider"></div></li><li><a href="factions-ultimate-guide.html">Ultimate Guide</a></li></ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropdown-toggle"''' + (''' style="color:var(--color-gold)"''' if cat == 'resources' else '') + '''>Resources</a>
                    <ul class="dropdown-menu"><li><a href="bestiary.html">Bestiary</a></li><li><a href="equipment.html">Equipment</a></li><li><a href="skills-guide.html">Skills & Builds</a></li><li><a href="community.html">Community</a></li></ul>
                </li>'''

    return nav

# Files to update
files = [
    'index.html', 'daily-tips.html', 'factions-guide.html', 'factions-ultimate-guide.html',
    'visual-guide.html', 'lockpicking.html', 'lock-solver.html', 'lockpicking-calculator.html',
    'walkthrough.html', 'bestiary.html', 'equipment.html', 'skills-guide.html',
    'map-guide.html', 'community.html'
]

for fname in files:
    path = os.path.join(BASE, fname)
    if not os.path.exists(path):
        print(f"SKIP (not found): {fname}")
        continue

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the nav menu section: from <ul class="nav-menu"> to the matching </ul> before </nav>
    # We need to match: <ul class="nav-menu"> ... </ul> (the one that's a direct child of <nav>)
    # Strategy: find "<ul class=\"nav-menu\">" and match the closing </ul> that comes before </nav>
    # This is simpler with regex that matches the entire ul block

    old_nav_start = content.find('<ul class="nav-menu">')
    if old_nav_start == -1:
        # Try without quotes
        old_nav_start = content.find('<ul class=nav-menu>')
    if old_nav_start == -1:
        print(f"SKIP (no nav-menu found): {fname}")
        continue

    # Find the closing </ul> by counting nested <ul> tags
    pos = old_nav_start
    depth = 0
    nav_end = -1
    while pos < len(content):
        next_ul = content.find('<ul', pos + 1)
        next_ul_end = content.find('</ul>', pos + 1)

        if next_ul_end == -1:
            break

        # Check if there's a nested <ul> before the next </ul>
        if next_ul != -1 and next_ul < next_ul_end:
            depth += 1
            pos = next_ul
        else:
            if depth == 0:
                nav_end = next_ul_end + 5  # include </ul>
                break
            else:
                depth -= 1
                pos = next_ul_end + 5

    if nav_end == -1:
        print(f"SKIP (could not find nav end): {fname}")
        continue

    old_nav = content[old_nav_start:nav_end]
    new_nav = get_new_nav(path)

    # Replace
    new_content = content[:old_nav_start] + new_nav + '\n' + content[nav_end:]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"OK: {fname} ({cat})")

print("Done!")
