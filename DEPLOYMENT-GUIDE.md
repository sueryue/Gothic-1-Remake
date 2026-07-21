# 🚀 Gothic 1 Remake Wiki - GitHub Pages 部署指南

## 📋 方法一: 使用GitHub API脚本上传(推荐)

### 第1步: 创建Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 设置:
   - **Note**: `gothic1-wiki-upload`
   - **Expiration**: 选择90天
   - **Scopes**: 勾选 ✅ `repo` (Full control)
4. 点击生成并**复制Token**(只显示一次!)

### 第2步: 运行上传脚本

```powershell
cd C:\Users\Administrator\11\gothic1-wiki

.\upload-to-github.ps1 -Token "ghp_你的TOKEN这里"
```

等待上传完成,约1-2分钟。

### 第3步: 启用GitHub Pages

1. 访问仓库: https://github.com/your-username/gothic1-wiki
2. 进入 **Settings** → **Pages**
3. 配置:
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: /(root)
4. 点击 **Save**
5. 等待1-2分钟构建

### 第4步: 访问网站

```
https://your-username.github.io/gothic1-wiki
```

---

## 📋 方法二: 手动拖拽上传

### 第1步: 创建GitHub仓库

1. 访问 https://github.com/new
2. 仓库名: `gothic1-wiki` (注意没有短横线结尾)
3. 设置为 **Public**
4. 不要初始化README
5. 点击 **Create repository**

### 第2步: 推送文件

在PowerShell中执行:

```powershell
cd C:\Users\Administrator\11\gothic1-wiki

# 初始化Git
git init

# 添加远程仓库(替换为你的用户名)
git remote add origin https://github.com/YOUR_USERNAME/gothic1-wiki.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial MVP release - Gothic 1 Remake Wiki"

# 推送到GitHub
git push --set-upstream origin main
```

### 第3步: 启用GitHub Pages

同上,进入 Settings → Pages 启用。

---

## 📋 方法三: 使用Netlify拖拽(最简单)

### 第1步: 打包项目

```powershell
cd C:\Users\Administrator\11
Compress-Archive -Path gothic1-wiki -DestinationPath gothic1-wiki.zip
```

### 第2步: 上传到Netlify

1. 访问 https://app.netlify.com/drop
2. 将 `gothic1-wiki.zip` 文件拖拽到页面上
3. 等待几秒钟自动部署
4. 获得在线地址: `https://xxx.netlify.app`

### 第3步: (可选)自定义域名

Netlify提供免费的子域名,也可以绑定你自己的域名。

---

## 📋 方法四: 使用Vercel

### 第1步: 安装Vercel CLI

```powershell
npm install -g vercel
```

### 第2步: 部署

```powershell
cd C:\Users\Administrator\11\gothic1-wiki
vercel
```

按提示操作,Vercel会自动检测纯静态站点并部署。

---

## ✅ 部署后验证

访问你的网站并检查:

- [ ] 首页正常显示
- [ ] CSS样式正确加载
- [ ] 所有链接可点击
- [ ] 移动端响应式正常
- [ ] 图片显示正常
- [ ] 搜索功能工作

### 常见问题修复

**问题1: CSS未加载**
- 检查MIME类型是否正确
- 强制刷新浏览器 (Ctrl+Shift+R)

**问题2: 图片不显示**
- 确认图片在assets文件夹中
- 使用相对路径: `assets/image.jpg`

**问题3: 404错误**
- 确认HTML文件名大小写一致
- 检查URL路径

---

## 🎯 SEO提交

部署成功后,提交到搜索引擎:

### Google Search Console
1. 访问 https://search.google.com/search-console
2. 添加你的网址
3. 提交sitemap (如有)

### Bing Webmaster Tools
1. 访问 https://www.bing.com/webmasters
2. 提交站点验证
3. 请求索引

---

## 📈 性能监控

建议接入分析工具:

### Google Analytics (免费)
在`<head>`中添加:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

或者使用更轻量的:
- **Umami** (隐私友好): https://umami.is
- **Plausible** (简洁): https://plausible.io

---

## 🔗 推广渠道

部署完成后,在以下平台推广:

1. **Reddit**: r/Gothic, r/Games
2. **Steam Discussions**: 游戏讨论区
3. **Discord**: Gothic社区服务器
4. **Facebook Groups**: Gothic玩家群
5. **YouTube**: 制作视频并在描述中放链接
6. **Fandom wiki**: 在相关链接中引用

---

## 🎉 恭喜!

你已经成功部署了Gothic 1 Remake攻略站!

下一步:
1. ✅ 收集用户反馈
2. ✅ 添加新攻略内容
3. ✅ 拓展更多页面
4. ✅ 建立社区互动

**记住:MVP的核心是快速验证,持续迭代!** 🚀
