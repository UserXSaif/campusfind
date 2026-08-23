# 🔍 CampusFind — University Lost & Found Platform

> **A modern, production-quality, responsive university Lost & Found web application built with HTML5, CSS3, and Vanilla JavaScript.**

![CampusFind Platform](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📌 Project Overview

**CampusFind** solves a widespread problem across university campuses: misplaced student IDs, keys, calculators, electronics, bags, and personal belongings. Without a centralized digital platform, lost items are scattered across bulletin boards and physical security offices.

CampusFind provides an intuitive, centralized portal where students, faculty, and campus staff can:
- 🔴 **Report Lost Items** with rich descriptions, locations, time stamps, and images.
- 🟢 **Report Found Items** to help fellow students recover their belongings.
- 🔍 **Search & Filter** active items by category, campus location, date, and keywords.
- 📊 **Manage Reports** via an interactive student dashboard.
- 📞 **Contact Reporters** safely with built-in safe exchange guidelines and one-click copy actions.

---

## ✨ Key Features

- 📱 **100% Responsive Design**: Fluid layouts optimized for smartphones (375px+), tablets (768px), laptops (1024px), and desktop monitors (1440px+).
- ⚡ **Real-time Live Search & Dynamic Filtering**: Instant search by keywords, category tags, campus buildings/rooms, and submission date with instant sorting (Newest, Oldest, A–Z, Z–A).
- 💾 **Client-Side State Persistence**: Seamlessly uses browser `localStorage` to persist newly reported items, bookmarked favorites, and resolved statuses across sessions.
- 🎨 **Modern Design System**: Built with CSS custom properties (variables), clean typography (Inter font), card elevations, and custom UI components (toasts, modals, accordions).
- 🛡️ **Interactive Form Validation**: Live field validation with inline error messaging, file preview with remove buttons, and future date prevention.
- 📊 **Student Dashboard**: Live statistical metrics (Total Reports, Active Lost, Active Found, Resolved), report deletion, and one-click status resolution.
- ♿ **Accessibility (a11y)**: Semantic HTML5 landmark tags, keyboard navigation (`Escape` closes modals and mobile nav), and ARIA attributes.

---

## 📁 Project Architecture & File Directory

```
University Ip Project/
├── index.html              # Landing page (Hero, Categories, Recent Items, How It Works, Stats)
├── lost-items.html         # Directory of lost items with live search & multi-filtering
├── found-items.html        # Directory of found items with live search & multi-filtering
├── item-details.html       # Dynamic item detail view with query param routing (?id=...&type=...)
├── report-lost.html        # Report lost item form with client validation & image upload
├── report-found.html       # Report found item form with client validation & image upload
├── search.html             # Multi-tab search results page (All, Lost, Found)
├── dashboard.html          # User dashboard with stats, my reports, and resolution actions
├── about.html              # Platform mission, statistics, process, and future roadmap
├── contact.html            # Contact form, campus security office info, and FAQ accordion
├── login.html              # Authentication demo page with 1-click quick-fill demo
├── register.html           # Student registration page with live validation & strength meter
├── 404.html                # Custom error page with quick-navigation directory
│
├── css/
│   ├── style.css           # Global reset, color variables, typography, navbar, footer
│   ├── components.css      # Buttons, cards, badges, forms, modals, toasts, dashboard
│   └── responsive.css      # Media queries for 375px, 576px, 768px, 992px, 1200px
│
├── js/
│   ├── data.js             # Realistic sample dataset (24 items), locations, categories
│   ├── app.js              # Modals, toasts, hamburger menu, bookmarks, auth state
│   ├── search.js           # Search filter engine, grid rendering, URL query parser
│   ├── forms.js            # Validation rules, image preview, demo login/register
│   └── dashboard.js        # Profile loading, report rendering, metrics, resolution
│
├── vercel.json             # Vercel routing configuration & clean URLs
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## 🚀 How to Run Locally

### 1. Directly in Browser
No server required! Simply double-click `index.html` or drag it into any web browser (Chrome, Firefox, Edge, Safari).

### 2. Using VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.
3. The site will run at `http://127.0.0.1:5500/index.html`.

### 3. Using Python Local Server
```bash
python -m http.server 5500
```
Open `http://localhost:5500` in your browser.

---

## 🌐 Deployment to GitHub & Vercel

### Step 1: Push to GitHub
```bash
# Initialize git repository
git init

# Stage all project files
git add .

# Commit changes
git commit -m "feat: initial release of CampusFind university lost & found platform"

# Link your GitHub repository
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/campusfind.git

# Push code to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Select your `campusfind` repository.
4. Keep the default settings (Framework Preset: **Other** / Root Directory: `./`).
5. Click **"Deploy"**.
6. Your website is live in seconds with HTTPS enabled!

---

## 🎓 Academic Coursework Details
- **Project Name**: CampusFind
- **Course**: Internet Programming (IP)
- **Primary Technologies**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser LocalStorage API

---

## 📄 License
This project is developed for university academic coursework and educational demonstration purposes.
