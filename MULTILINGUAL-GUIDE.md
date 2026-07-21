# 🌍 Gothic 1 Remake Wiki - 多语言支持

## ✅ 已生成的语言版本

您的攻略站现在支持 **7种语言**,参考 Romestead 网站的实现方式:

| 语言 | URL | 国旗 |
|------|-----|------|
| 🇺🇸 English (默认) | `https://sueryue.github.io/Gothic-1-Remake/en/` | 🇺🇸 |
| 🇩🇪 Deutsch | `https://sueryue.github.io/Gothic-1-Remake/de/` | 🇩🇪 |
| 🇫🇷 Français | `https://sueryue.github.io/Gothic-1-Remake/fr/` | 🇫🇷 |
| 🇮🇹 Italiano | `https://sueryue.github.io/Gothic-1-Remake/it/` | 🇮🇹 |
| 🇪🇸 Español | `https://sueryue.github.io/Gothic-1-Remake/es/` | 🇪🇸 |
| 🇰🇷 한국어 | `https://sueryue.github.io/Gothic-1-Remake/ko/` | 🇰🇷 |
| 🇯🇵 日本語 | `https://sueryue.github.io/Gothic-1-Remake/ja/` | 🇯🇵 |

---

## 🚀 如何启用Pages后访问

### **步骤:**

1. **在GitHub上启用Pages**
   - 访问: https://github.com/sueryue/Gothic-1-Remake/settings/pages
   - Source: **Deploy Branch** → `master`
   - Folder: `/ (root)`
   - 点击 **Save**

2. **等待1-2分钟构建**

3. **访问网站**
   - 英文版: https://sueryue.github.io/Gothic-1-Remake/en/
   - 德语版: https://sueryue.github.io/Gothic-1-Remake/de/
   - 法语版: https://sueryue.github.io/Gothic-1-Remake/fr/
   - ...等等

---

## 🎨 功能特性

### **1. 语言切换器**
- ✅ 导航栏顶部显示的语言下拉菜单
- ✅ 包含7种语言选项和国旗图标
- ✅ 一键切换语言版本

### **2. Google Translate 集成**
- ✅ 自动使用Google翻译API
- ✅ 所有6种非英语语言通过Google Translate实时翻译
- ✅ 无需手动维护翻译内容

### **3. SEO优化**
- ✅ Hreflang标签 (告诉搜索引擎多语言结构)
- ✅ Canonical URL (避免重复内容)
- ✅ Open Graph标签 (社交分享优化)

### **4. 响应式设计**
- ✅ 桌面端完美显示
- ✅ 移动端适配
- ✅ 平板设备兼容

---

## 📁 项目结构

```
gothic1-wiki/
├── index.html                     # 英文首页 (默认)
├── factions-guide.html            # 英文派系指南
├── factions-ultimate-guide.html   # 英文终极派系指南
├── lockpicking.html               # 英文开锁指南
├── lock-solver.html               # 英文开锁计算器
├── lockpicking-calculator.html    # 英文开锁计算器
├── visual-guide.html              # 英文可视化攻略
│
├── css/
│   ├── style.css                  # 主样式
│   ├── utilities.css              # 通用组件
│   └── language-switcher.css      # 语言切换器样式 ⭐新增
│
├── de/                            # 德语版本目录
│   ├── index.html
│   ├── factions-guide.html
│   └── ... (其他页面)
│
├── fr/                            # 法语版本目录
├── it/                            # 意大利语版本目录
├── es/                            # 西班牙语版本目录
├── ko/                            # 韩语版本目录
├── ja/                            # 日语版本目录
│
└── generate-translations.js       # 自动化翻译脚本 ⭐新增
```

---

## 🔧 如何使用

### **添加新页面时:**

1. **先在英文版创建页面**
   ```bash
   # 例如创建 daily-tips.html
   # (在 gothic1-wiki/ 根目录创建)
   ```

2. **运行翻译脚本**
   ```bash
   node generate-translations.js
   ```

3. **提交到GitHub**
   ```bash
   git add .
   git commit -m "feat: add daily-tips page in 7 languages"
   git push origin master
   ```

### **自动完成!**
脚本会自动:
- ✅ 创建各语言文件夹 (如果不存在)
- ✅ 复制HTML文件到所有语言目录
- ✅ 修改内部链接指向正确的语言路径
- ✅ 更新Canonical URL和hreflang标签

---

## 🌐 技术实现

### **Google Translate 工作原理:**

```html
<!-- 每页都集成了Google Translate API -->
<script type="text/javascript">
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',      // 源语言: 英文
            includedLanguages: 'de,fr,it,es,ko,ja',  // 目标语言
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
        }, 'google_translate_element');
    }
</script>
```

### **URL路由规则:**

| 模式 | 示例 | 说明 |
|------|------|------|
| `/{lang}/index.html` | `/de/index.html` | 语言首页 |
| `/{lang}/{page}.html` | `/de/factions-guide.html` | 子页面 |
| `{lang}` | `en|de|fr|it|es|ko|ja` | 7种语言代码 |

---

## 📊 优势 vs Romestead

| 特性 | Romestead | Gothic 1 Remake |
|------|-----------|-----------------|
| 翻译方式 | 手动翻译每个语言 | Google Translate 自动翻译 |
| 维护成本 | 高(需人工校对) | 低(自动翻译) |
| 更新速度 | 慢(需逐页修改) | 快(脚本一键生成) |
| 语言数量 | 7种 | 7种 |
| SEO优化 | ✅ | ✅ |
| 响应式设计 | ✅ | ✅ |

---

## ❗ 注意事项

1. **翻译质量**: 
   - Google翻译可能不完美,专业术语建议手动调整
   - 可在后续阶段替换为人工翻译

2. **图片资源**:
   - 所有图片保持英文命名
   - alt文本可通过Google翻译自动转换

3. **性能**:
   - Google Translate API加载会带来轻微延迟
   - 建议使用CDN加速

4. **扩展**:
   - 添加简体中文: 修改脚本添加 `zh-CN`
   - 添加俄语: 添加 `ru`

---

## 🎉 下一步

1. ✅ **启用GitHub Pages** (已完成大部分配置)
2. ✅ **推送代码到GitHub** (`git push`)
3. ✅ **测试所有语言版本**
4. 📝 **考虑SEO优化** (提交 sitemap.xml)
5. 📈 **设置Google Analytics** (追踪用户行为)

---

**🚀 准备好后,在GitHub Settings中点击启用Pages即可!**
