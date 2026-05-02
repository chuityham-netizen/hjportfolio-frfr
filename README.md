# H's Portfolio - Premium Design Showcase

A high-end, single-page portfolio website featuring Apple-inspired floating animations, secure admin authentication, and localStorage-based content management.

## 🎨 Features

### Visual Design
- **Dark Mode by Default**: Sleek dark aesthetic with ambient atmosphere
- **Ambient Glow Effects**: Three floating orbs creating cinematic background ambiance
- **Glass Morphism**: Frosted glass cards with backdrop blur and subtle borders
- **Apple-style Typography**: Clean, minimalist design with San Francisco fonts
- **Floating Animations**: Subtle parallax and hover effects using Framer Motion
- **Premium UI**: Rounded cards with purple glow shadows and smooth transitions
- **Color Palette**: Deep Black (#0a0a0a), Glass effects, Purple-Indigo gradients, White text

### Functionality
- **Hero Section**: Bold, animated landing page with floating logo
- **Portfolio Grid**: Responsive card-based project gallery
- **Admin Authentication**: Secure password-protected admin mode
- **Content Management**: Upload and manage projects with images and descriptions
- **localStorage Persistence**: Projects persist across browser sessions

### Animations
- **Ambient Background**: Floating gradient orbs with 20s animation cycles
- **Entrance Animations**: Smooth fade-in and slide-up effects
- **Hover Interactions**: Cards lift, scale, and glow with purple shadows
- **Parallax Effects**: Floating elements with continuous animation
- **AnimatePresence**: Smooth mounting/unmounting transitions
- **Glass Effects**: Frosted glass morphism with backdrop blur

## 🔐 Admin Access

### How to Access Admin Mode

1. Click the "Admin" button in the top-right corner
2. Enter the password: `Rothesay2!`
3. Once authenticated, you'll see:
   - "Add Project" card in the portfolio grid
   - Delete buttons on existing projects
   - "Exit Admin" button to return to public view

### Admin Features

- **Add Projects**: Upload images and add descriptions
- **Delete Projects**: Remove projects with one click
- **Real-time Updates**: Changes appear immediately
- **Persistent Storage**: All projects saved to localStorage

## 📱 Usage

### Public View
- Browse the portfolio without any login
- Smooth scrolling from hero to projects
- Responsive design works on all devices

### Admin Mode
1. Click "Add Project" card
2. Enter project title
3. Write a description
4. Upload an image (converted to base64)
5. Click "Add Project" to save

## 🚀 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 💾 Data Storage

### Current: localStorage
Projects are saved to browser's localStorage for quick demo purposes.

**Limitations:**
- Data is browser-specific
- Limited to ~5-10MB storage
- Cleared when browser data is cleared

### Upgrade Path: Cloud Storage

For permanent, cross-device storage, consider migrating to:

#### Option 1: Supabase (Recommended)
```bash
npm install @supabase/supabase-js
```

**Benefits:**
- Free tier available
- Real-time updates
- File storage for images
- PostgreSQL database
- Built-in authentication

#### Option 2: Firebase
```bash
npm install firebase
```

**Benefits:**
- Google infrastructure
- Real-time database
- Cloud storage
- Easy authentication

## 🎯 Animation Details

### Float Animation
Continuous vertical movement creating a floating effect:
- Duration: 6 seconds
- Ease: easeInOut
- Range: -8px to +8px

### Card Hover
Spring-based animation on hover:
- Y translation: -8px
- Scale: 1.02
- Stiffness: 300
- Damping: 20

### Entrance Animations
Staggered appearance with:
- Opacity: 0 → 1
- Y translation: 20px → 0
- Spring animation (stiffness: 100)

## 📝 Customization

### Changing the Password
Update the password check in `App.tsx`:
```typescript
if (password === 'YourNewPassword') {
  setIsAdmin(true);
}
```

### Modifying Colors
Update Tailwind classes:
- Background: `bg-[#FFFFFF]` to `bg-[#YourColor]`
- Secondary: `bg-[#F5F5F7]` to `bg-[#YourColor]`
- Text: `text-gray-900` to `text-[#YourColor]`

### Adjusting Animations
Modify variants in `App.tsx`:
- `floatVariants` - Hero logo animation
- `itemVariants` - Card entrance effects
- `containerVariants` - Grid stagger timing

## 🌟 Best Practices

1. **Image Optimization**: Keep uploaded images under 2MB for best performance
2. **Regular Backups**: Export localStorage data periodically
3. **Mobile Testing**: Test on various screen sizes
4. **Browser Compatibility**: Works best on modern browsers (Chrome, Safari, Edge, Firefox)

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is created as a demonstration of modern web development techniques.

---

**Note**: This portfolio uses localStorage for demonstration purposes. For production use with multiple administrators or permanent storage, integrate with Supabase or Firebase as outlined above.
