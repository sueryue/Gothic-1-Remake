# 🎮 Gothic 1 Remake Wiki - UGC (用户生成内容) 系统规划

## 📊 海外成功案例分析

### **标杆平台:**
1. **Fextralife Wiki** - 社区驱动攻略+论坛
2. **ESO Player Guides** - 玩家指南投稿系统
3. **Nexus Mods** - 模组分享社区
4. **GameFAQs** - FAQ投稿+论坛讨论

---

## 🎯 UGC核心模块设计

### **模块一: 玩家攻略投稿系统 (Player Submissions)**

#### **功能:**
```
- 玩家提交原创攻略(Build搭配、Boss策略、解谜技巧)
- 图文混排编辑器(支持Markdown/富文本)
- 审核机制(确保质量后再展示)
- 评分系统(1-5星评价)
- 投票排序(Upvote/Downvote)
```

#### **数据结构:**
```json
{
  "submission_id": "guide_001",
  "author": "DarkKnight_Gamer",
  "title": "Undead Warrior Build - Leveling in 48 Hours",
  "category": "build_guide",
  "difficulty": "intermediate",
  "content": "...markdown content with images...",
  "rating": 4.7,
  "votes": {"up": 156, "down": 12"},
  "views": 2340,
  "created_at": "2025-07-08",
  "status": "approved"
}
```

---

### **模块二: 玩家截图/A艺术画廊 (Community Gallery)**

#### **功能:**
```
- 上传游戏截图、概念艺术、Meme图
- 分类浏览(NPC肖像、战斗瞬间、风景摄影)
- 点赞+评论系统
- 每周精选(Weekly Spotlight)
```

#### **分类标签:**
```
📸 Screenshot (游戏截图)
🎨 Fan Art (同人创作)  
😂 Meme (搞笑图片)
🏆 Achievement (成就展示)
🌅 Scenery (风景摄影)
```

---

### **模块三: NPC个人故事征集 (NPC Personal Stories)**

#### **玩法:**
```
让角色扮演玩家撰写NPC的第一人称传记:

例: 【斯莱的独白】
"人们说我曾在国王卫队服务过...直到那晚做了一件永远无法挽回的事。
如今我戴着这张面具,在Shadowstalk的黑暗中寻找救赎..."
```

#### **特色:**
- 沉浸式文学写作
- 增强玩家情感连接
- 可收录到攻略站作为"情节攻略"内容

---

### **模块四: Build分享库 (Build Showcase)**

#### **功能:**
```
- 玩家分享角色构建方案(属性点、技能加点、装备搭配)
- 可视化Build卡片
- Boss测试报告
- 下载为配置代码(方便他人导入参考)
```

#### **Build卡片示例:**
```yaml
Build Name: Shadow Assassin Master
Author: NightBlade99
Level: 50 (Max)
Stats:
  - Strength: 25
  - Dexterity: 40
  - Wisdom: 15
Skills: Stealth + Dual Wield + Poison Blades
Equipment:
  - Weapon: Shadow Dagger (+45% crit)
  - Armor: Ghost robes
  - Accessory: Ring of Invisibility
Rating: ⭐⭐⭐⭐⭐ (4.9/5.0)
```

---

### **模块五: Bug报告&Glitch百科 (Community Bug Database)**

#### **功能:**
```
- 玩家发现并记录游戏Bug
- 复现步骤+解决方案
- 截图/视频证据
- 开发者标记(Fixed in Patch X)
```

---

### **模块六: 问答社区(Q&A Forum)**

#### **功能:**
```
- 玩家提问(新手问题、剧情疑惑)
- 资深玩家解答
- 最佳回答标记
- 积分奖励体系
```

---

## 🔧 技术实现方案(纯HTML/CSS/JS)

### **阶段一: 静态展示页(Canary MVP)**

**目标:** 先搭建UI框架,暂不后端

```html
<!-- Featured Community Guide -->
<section class="community-spotlight">
    <h2>🏆 Community Pick of the Week</h2>
    
    <article class="user-guide-card" data-author="DarkKnight_Gamer">
        <div class="guide-header">
            <img src="assets/user-avatars/darkknight.jpg" alt="User Avatar" class="avatar">
            <div class="guide-info">
                <h3 class="guide-title">Undead Warrior Build - Level 50 in 48 Hours</h3>
                <p class="guide-author">By u/DarkKnight_Gamer ⭐ Top Contributor</p>
            </div>
            <div class="guide-rating">
                <span class="stars">⭐⭐⭐⭐⭐</span>
                <span class="vote-count">156 upvotes</span>
            </div>
        </div>
        
        <div class="guide-preview">
            <p>This build focuses on fast leveling through efficient XP farming...</p>
            <img src="assets/ugc/build-screenshot-001.jpg" alt="Build showcase">
        </div>
        
        <div class="guide-meta">
            <a href="#" class="read-more-btn">Read Full Guide →</a>
            <span class="views">👁️ 2,340 views</span>
            <span class="comments">💬 28 comments</span>
        </div>
    </article>
</section>
```

---

### **阶段二: LocalStorage模拟提交系统**

**功能:** 前端LocalStorage保存用户投稿(演示用)

```javascript
class UGCManager {
    // 提交攻略
    submitGuide(data) {
        const submissions = JSON.parse(localStorage.getItem('ugc_guides') || '[]');
        
        const newSubmission = {
            id: 'guide_' + Date.now(),
            author: data.author,
            title: data.title,
            content: data.content,
            rating: 0,
            votes: { up: 0, down: 0 },
            views: 0,
            created_at: new Date().toISOString(),
            status: 'pending' // 待审核
        };
        
        submissions.push(newSubmission);
        localStorage.setItem('ugc_guides', JSON.stringify(submissions));
        
        return { success: true, message: 'Your guide is pending review!' };
    }
    
    // 获取已审核攻略列表
    getApprovedGuides(category = null) {
        let submissions = JSON.parse(localStorage.getItem('ugc_guides') || '[]');
        
        // 过滤已审核内容
        let filtered = submissions.filter(g => g.status === 'approved');
        
        if (category) {
            filtered = filtered.filter(g => g.category === category);
        }
        
        // 按评分排序
        return filtered.sort((a, b) => b.rating - a.rating);
    }
    
    // 投票
    vote(guidId, type) {
        let submissions = JSON.parse(localStorage.getItem('ugc_guides') || '[]');
        const guide = submissions.find(g => g.id === guidId);
        
        if (guide) {
            guide.votes[type]++;
            guide.rating = this.calculateRating(guide);
            localStorage.setItem('ugc_guides', JSON.stringify(submissions));
        }
    }
    
    calculateRating(guide) {
        const total = guide.votes.up + guide.votes.down;
        if (total === 0) return 0;
        return (guide.votes.up / total).toFixed(2);
    }
}
```

---

### **阶段三: 接入真实后端(Filebase/BaaS)**

**推荐方案:**
```
✅ Filebase.io - 对象存储(存图片/视频)
✅ Supabase - 开源Firebase替代(数据库+认证)
❌ 避免: 自建服务器(维护成本高)
```

---

## 🎨 UI/UX设计规范

### **UGC卡片样式系统:**

```css
/* User-Generated Content Cards */
.user-guide-card {
    background: linear-gradient(135deg, rgba(15, 52, 96, 0.6), rgba(22, 33, 62, 0.8));
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
}

.user-guide-card:hover {
    border-color: var(--color-accent);
    box-shadow: 0 8px 20px rgba(233, 69, 96, 0.3);
    transform: translateY(-3px);
}

/* 用户头像徽章 */
.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--color-gold);
}

/* 星级评分 */
.stars {
    color: var(--color-gold);
    font-size: 1.2rem;
    letter-spacing: 2px;
}

/* 投票按钮 */
.vote-btn {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-accent);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.vote-btn:hover {
    background: var(--color-accent);
}

/* 贡献者等级徽章 */
.contributor-badge {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
}

.badge-top-contributor {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #1a1a2e;
}

.badge-newcomer {
    background: linear-gradient(135deg, #228b22, #6a0dad);
    color: white;
}
```

---

## 📋 实施路线图

### **Phase 1: 展示页(第1周)** ✅
- [ ] 创建Featured Community Guide页面
- [ ] 设计UGC卡片组件
- [ ] 添加示例内容(Mock Data)

### **Phase 2: 投稿表单(第2周)**
- [ ] 开发提交表单UI
- [ ] LocalStorage保存数据
- [ ] 审核队列管理

### **Phase 3: 互动功能(第3周)**
- [ ] 投票系统(Upvote/Downvote)
- [ ] 评论区实现
- [ ] 评分算法

### **Phase 4: 后端集成(第4周)**
- [ ] 接入Supabase数据库
- [ ] 用户登录(Google/GitHub OAuth)
- [ ] 文件上传(图片/视频)

### **Phase 5: 社区运营(持续)**
- [ ] 每周精选(Winner Spotlight)
- [ ] 贡献者排行榜
- [ ] 积分奖励体系

---

## 🌟 激励系统设计

### **玩家动机:**
```
✅ 荣誉感应 (Top Contributor徽章)
✅ 曝光机会 (首页展示、Discord频道介绍)
✅ 排名竞争 (月度排行榜)
✅ 专属特权 (早期访问新工具、特殊Discord角色)
```

### **等级体系:**
```
Level 1: Newcomer (新手投稿)
Level 2: Contributor (3篇以上被采纳)
Level 3: Expert (10篇+高分评价)
Level 4: Moderator (获得审核权限)
Level 5: Hall of Fame (终身成就)
```

---

## 📝 内容质量管控

### **三级审核机制:**
```
1️⃣ 自动关键词过滤 (敏感词/广告)
2️⃣ 社区举报 (Downvote>20自动下架)
3️⃣ 人工审核 (管理员最终决定)
```

### **投稿规范:**
```
📜 必须为原创内容
📜 禁止剧透(需标注WARNING)
📜 尊重其他玩家(无恶意攻击)
📜 标注来源(引用第三方资料需注明)
```

---

## 🚀 快速启动建议

### **最低可行产品(MVP):**

**本周即可上线:**
1. 创建`community-guides.html`(示例攻略展示页)
2. 添加3-5篇Mock内容(您可手动撰写或让AI生成)
3. 集成到导航栏
4. 收集用户反馈

**下周迭代:**
1. 添加投稿表单
2. 实现简单的审批流程
3. 接入邮件通知

---

## 💡 差异化竞争策略

**相比Fextralife的优势:**
```
🎯 更简洁的UI(无广告骚扰)
🎯 专注Gothic 1生态(垂直深度)
🎯 中文+英文双语UGC(跨越语言障碍)
🎯 AI辅助校对(翻译质量控制)
```

---

## 📊 成功指标(KPI)

| 指标 | Month 1 | Month 3 | Month 6 |
|------|---------|---------|---------|
| 注册用户 | 50 | 500 | 2000 |
| 投稿攻略 | 20 | 200 | 800 |
| 月活读者 | 500 | 5000 | 20000 |
| 平均评分 | 4.0 | 4.5 | 4.7 |

---

## ✅ 下一步行动

**您希望我立即开始实现哪个模块?**

1. **Featured Community Guides展示页** (推荐首选)
2. **UGC投稿表单系统**
3. **Build分享库**
4. **截图画廊**
5. **Q&A论坛**

请选择优先级,我将创建完整的HTML页面!
