# UI-UX-PRO-MAX 技能文件

> **用途**：当需要构建高颜值、现代化的前端页面时，加载本文件作为设计系统参考和约束。
> **版本**：v1.0 · 2026-03-30 · 首次提取自 ai-guide 导航官网实战

---

## 1. 设计哲学

| 原则 | 说明 |
|---|---|
| **深色优先** | 以深色背景为主调，减少视觉疲劳，突出内容层次 |
| **玻璃拟态** | 卡片、导航栏使用 `backdrop-filter: blur()` + 半透明背景，营造层次感 |
| **渐变点缀** | 关键元素（标题、按钮、图标背景）使用渐变色，制造视觉焦点 |
| **动效克制** | 动画服务于体验而非炫技，使用 `cubic-bezier(0.4, 0, 0.2, 1)` 缓动 |
| **移动优先** | 所有布局必须在 480px / 768px / 1024px 断点下完美适配 |

---

## 2. 色彩体系（CSS 变量）

直接复制到 `:root` 即可复用：

```css
:root {
  /* 主色 */
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;

  /* 强调色 */
  --accent: #f472b6;
  --accent-light: #f9a8d4;

  /* 背景 */
  --bg-dark: #0f0f23;
  --bg-card: rgba(255, 255, 255, 0.04);
  --bg-card-hover: rgba(255, 255, 255, 0.08);

  /* 边框 */
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.15);

  /* 文字 */
  --text: #e2e8f0;
  --text-dim: #94a3b8;
  --text-bright: #f8fafc;

  /* 光晕 */
  --glow-primary: rgba(99, 102, 241, 0.3);
  --glow-accent: rgba(244, 114, 182, 0.3);

  /* 玻璃效果 */
  --glass: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.06);

  /* 间距 */
  --section-gap: 120px; /* 移动端可缩至 80px */
}
```

### 语义颜色映射

| 语义 | 颜色 | 用途 |
|---|---|---|
| 成功/完成 | `#22c55e` | 已完成 badge、✓ 图标背景 |
| 进行中 | `var(--primary-light)` | 当前阶段 badge |
| 规划中 | `#facc15` | 未来规划 badge |
| 危险/热门 | `var(--accent)` | CTA 按钮、热门标签 |

---

## 3. 排版规范

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
               'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
```

| 层级 | 字号 | 字重 | 颜色 |
|---|---|---|---|
| 页面大标题 | `clamp(2.5rem, 6vw, 4.5rem)` | 900 | 渐变文字 |
| 区块标题 | `clamp(1.8rem, 4vw, 2.5rem)` | 800 | 渐变文字 |
| 卡片标题 | `1.1rem - 1.2rem` | 700 | `--text-bright` |
| 正文 | `0.9rem - 1rem` | 400 | `--text` |
| 辅助说明 | `0.8rem - 0.85rem` | 500 | `--text-dim` |
| 标签/badge | `0.75rem - 0.85rem` | 600-700 | 语义色 |

### 渐变文字技巧

```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary-light), var(--accent), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}
```

---

## 4. 组件模式库

### 4.1 玻璃拟态卡片

```css
.glass-card {
  padding: 32px 24px;
  border-radius: 20px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-card:hover {
  transform: translateY(-4px);
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

**变体 — 带顶部渐变线**：

```css
.glass-card-accent {
  /* 继承 .glass-card */
  position: relative;
  overflow: hidden;
}
.glass-card-accent::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0;
  transition: opacity 0.4s;
}
.glass-card-accent:hover::before { opacity: 1; }
```

### 4.2 导航栏（吸顶毛玻璃）

```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.navbar.scrolled {
  padding: 10px 0;
  background: rgba(15, 15, 35, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border);
}
```

JS 滚动监听：

```js
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
```

### 4.3 按钮系统

| 类型 | 背景 | 阴影 | 悬停效果 |
|---|---|---|---|
| Primary | `linear-gradient(135deg, --primary, --primary-dark)` | `glow-primary` | `translateY(-2px)` + 阴影增强 |
| Accent | `linear-gradient(135deg, --accent, #e879a8)` | `glow-accent` | 同上 |
| Secondary | `--bg-card` + `1px border` | 无 | 背景/边框变亮 + `translateY(-2px)` |

通用按钮基础：

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}
```

### 4.4 Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  color: var(--primary-light);
  border: 1px solid rgba(99, 102, 241, 0.2);
}
```

### 4.5 时间线（路线图）

```css
.timeline {
  position: relative;
  padding-left: 40px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 15px; top: 0;
  width: 2px; height: 100%;
  background: linear-gradient(180deg, var(--primary), var(--accent), var(--primary));
}
.timeline-dot {
  position: absolute;
  left: -33px; top: 32px;
  width: 12px; height: 12px;
  border-radius: 50%;
  border: 3px solid var(--primary);
  background: var(--bg-dark);
}
.timeline-dot.active {
  background: var(--primary);
  box-shadow: 0 0 12px var(--glow-primary);
}
```

### 4.6 Section Title

```css
.section-title {
  text-align: center;
  margin-bottom: 64px;
}
.section-title h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-bright), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.section-title p {
  color: var(--text-dim);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}
```

---

## 5. 动画系统

### 5.1 入场动画（滚动触发）

```css
.fade-in {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

### 5.2 数字滚动计数器

```js
function animateCounter(element, target, duration = 2000, suffix = '') {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    element.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

### 5.3 英雄区渐变呼吸

```css
.hero::before {
  background:
    radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(244, 114, 182, 0.06) 0%, transparent 50%);
  animation: heroGlow 15s ease-in-out infinite;
}
@keyframes heroGlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(2%, -2%) scale(1.02); }
  66% { transform: translate(-1%, 1%) scale(0.98); }
}
```

### 5.4 脉冲指示点

```css
.pulse-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}
```

---

## 6. 粒子背景系统

Canvas 粒子 + 近距连线，适合深色主题的科技感背景：

```js
class Particle {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  // update() / draw() 略，见 site/index.html 完整实现
}

// 粒子数量公式：Math.min(80, Math.floor(w * h / 15000))
// 连线距离阈值：120px
// 连线透明度：0.06 * (1 - dist / 120)
```

**使用方式**：放一个 `<canvas>` 在页面最底层，CSS 设置 `position: fixed; pointer-events: none; z-index: 0;`

---

## 7. 响应式断点

```css
/* 平板横屏 */
@media (max-width: 1024px) {
  /* 3列 → 2列 */
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  /* 双列 spotlight → 单列 */
  .spotlight-card { grid-template-columns: 1fr; }
}

/* 平板竖屏 / 大手机 */
@media (max-width: 768px) {
  :root { --section-gap: 80px; }
  /* 隐藏桌面导航，显示汉堡菜单 */
  .nav-links { display: none; }
  .mobile-toggle { display: flex; }
  /* 2列 stat → 保持2列 */
  /* 3列 features → 1列 */
  .features-grid { grid-template-columns: 1fr; }
  /* 按钮堆叠 */
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
}

/* 小手机 */
@media (max-width: 480px) {
  .stat-card { padding: 20px 12px; }
  .stat-number { font-size: 1.8rem; }
  .hero { padding: 100px 16px 60px; }
}
```

---

## 8. 自定义滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-dark); }
::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 3px; }
```

---

## 9. SEO & 可访问性检查清单

- [ ] `<title>` 包含核心关键词，≤60 字符
- [ ] `<meta description>` 包含价值主张，≤160 字符
- [ ] `<meta keywords>` 列出 5-10 个关键词
- [ ] Open Graph 标签（`og:title`, `og:description`, `og:type`）
- [ ] `<html lang="zh-CN">`
- [ ] 所有图片有 `alt` 属性
- [ ] 外链有 `rel="noopener"` + `target="_blank"`
- [ ] 按钮/可交互元素有 `aria-label`
- [ ] Emoji 作为 favicon：`data:image/svg+xml,<svg ...><text>🐟</text></svg>`
- [ ] 字体使用系统字体栈，零外部请求

---

## 10. 使用方式

在需要构建高颜值页面的任务中，Claw 应该：

1. **加载本文件**，将其作为设计约束和代码片段来源
2. 根据项目需求**选择组件**（不必全用），保持一致的视觉风格
3. 先搭骨架（HTML 结构），再填样式（复制/改色彩变量），最后加动效
4. **所有颜色走 CSS 变量**，便于一键换肤
5. 响应式必测三个断点：480 / 768 / 1024
6. 完成后**更新本文件**，将新组件/模式补充进来

---

## 11. 实战案例

| 项目 | 文件 | 使用的组件 |
|---|---|---|
| ai-guide 导航官网 | `site/index.html` | 全部组件：粒子背景、玻璃卡片、导航栏、按钮系统、时间线、Badge、计数器、fade-in 动画 |

---

*本技能文件由 Claw 在 2026-03-30 从 ai-guide 导航官网实战中提取，将持续迭代。*
