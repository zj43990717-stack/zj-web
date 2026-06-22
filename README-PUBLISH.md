# 张晶个人网站发布说明

这个目录已经是可直接发布的静态网站版本。

## 方式一：GitHub Pages

1. 登录 GitHub
2. 新建一个仓库
3. 仓库名建议使用：`你的GitHub用户名.github.io`
4. 把这个目录里的所有文件上传到仓库根目录：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets` 文件夹
5. 进入仓库 `Settings`
6. 打开 `Pages`
7. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
8. 保存后等待几分钟
9. 你的网站链接会变成：
   - `https://你的GitHub用户名.github.io/`

## 方式二：Vercel

1. 登录 Vercel
2. 选择 `Add New -> Project`
3. 上传这个目录，或者导入 GitHub 仓库
4. 直接部署
5. 部署完成后会自动生成公网链接

## 当前可发布目录

- `index.html`
- `styles.css`
- `script.js`
- `assets/`

## 备注

这是纯静态网站，不需要后端，不需要数据库，也不需要额外安装依赖。
