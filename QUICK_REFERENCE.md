# Quick Reference Card

## 🔑 Admin Access
```
Password: Rothesay2!
Location: Click "Admin" button (top-right corner)
```

## ⚡ Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📂 Key Files
```
src/App.tsx           # Main application component
src/index.css         # Global styles + Apple fonts
src/sampleProjects.ts # Demo data (4 sample projects)
```

## 🎨 Color Codes
```
White:      #FFFFFF
Light Gray: #F5F5F7
Dark Text:  #111111
Gray Text:  #6B7280
```

## 📐 Tailwind Classes (Most Used)
```css
rounded-3xl     # Card borders
shadow-lg       # Card shadows
bg-white        # White background
bg-[#F5F5F7]    # Light gray background
text-gray-900   # Dark text
text-gray-600   # Medium text
text-gray-400   # Light text
hover:shadow-2xl # Enhanced shadow on hover
```

## 🎭 Animation Timings
```
Float cycle:    6 seconds
Card entrance:  Stagger 0.1s
Hover lift:     -8px Y-axis
Image zoom:     1.1x scale
```

## 💾 localStorage
```javascript
Key: 'portfolio-projects'
Type: Array<Project>
Clear: localStorage.clear()
Export: localStorage.getItem('portfolio-projects')
```

## 🖼️ Image Guidelines
```
Format:  JPG, PNG, WebP
Size:    < 2MB recommended
Output:  base64 data URL
```

## 🔧 Common Tasks

### Change Password
```typescript
// src/App.tsx, ~line 65
if (password === 'NewPassword123!') {
```

### Adjust Float Speed
```typescript
// src/App.tsx, floatVariants
duration: 4, // Change from 6
```

### Change Grid Layout
```tsx
// src/App.tsx, portfolio section
className="grid grid-cols-1 md:grid-cols-3"
```

### Add More Sample Projects
```typescript
// src/sampleProjects.ts
export const sampleProjects = [
  // Add new project objects here
];
```

## 🐛 Debug Checklist
- [ ] Check browser console for errors
- [ ] Verify localStorage not full
- [ ] Clear cache and reload
- [ ] Try incognito mode
- [ ] Check file size < 2MB
- [ ] Verify correct password

## 📱 Browser Support
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+

## 🚀 Deployment
```bash
npm run build
# Upload dist/index.html to any static host
# Works on: Netlify, Vercel, GitHub Pages
```

## 📊 Performance Targets
```
Build size:  ~111 KB (gzipped)
Load time:   < 2 seconds
FCP:         < 1 second
Interactive: < 2 seconds
```

## 🎯 Feature Status
- ✅ Hero section with floating animation
- ✅ Admin authentication
- ✅ Add/delete projects
- ✅ Image upload (base64)
- ✅ localStorage persistence
- ✅ Responsive design
- ✅ Sample projects loader
- ⏳ Cloud storage (see CLOUD_MIGRATION.md)
- ⏳ User authentication (see CLOUD_MIGRATION.md)

## 📚 Documentation Files
```
README.md               # Complete documentation
IMPLEMENTATION_GUIDE.md # Detailed technical guide
CLOUD_MIGRATION.md      # Supabase/Firebase setup
QUICK_REFERENCE.md      # This file
```

## 🎨 Component Hierarchy
```
App
├── Header (Admin button)
├── Hero Section
│   ├── Title
│   ├── Subtitle
│   └── Floating Logo
├── Portfolio Grid
│   ├── Add Project Card (admin)
│   ├── Project Cards
│   └── Empty State
├── Footer
└── Modals
    ├── Auth Modal
    └── (AnimatePresence)
```

## 🔄 Data Flow
```
User Action
    ↓
State Update (useState)
    ↓
localStorage Save
    ↓
Re-render with Animation
    ↓
Visual Update
```

## 💡 Pro Tips
1. Keep images under 500KB for best UX
2. Use "Load Sample Projects" to test
3. Export localStorage before clearing browser data
4. Test on mobile devices regularly
5. Use Admin mode to see all features

## 🎓 Learning Path
1. ✅ Run the app (`npm run dev`)
2. ✅ Try public view (browse projects)
3. ✅ Enter admin mode (password: `Rothesay2!`)
4. ✅ Load sample projects
5. ✅ Add your own project
6. ✅ Delete a project
7. ✅ Inspect localStorage (DevTools)
8. 📖 Read IMPLEMENTATION_GUIDE.md
9. 🚀 Plan cloud migration (CLOUD_MIGRATION.md)

## 📞 Support Resources
- Framer Motion: https://www.framer.com/motion/
- Tailwind CSS: https://tailwindcss.com/docs
- React 19: https://react.dev
- Lucide Icons: https://lucide.dev

---

**Built with ❤️ using React, Framer Motion, and Tailwind CSS**
