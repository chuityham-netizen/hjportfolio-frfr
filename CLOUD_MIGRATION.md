# Cloud Migration Guide

This guide will help you migrate from localStorage to a cloud-based storage solution for permanent, cross-device project management.

## Option 1: Supabase (Recommended)

### Why Supabase?
- ✅ Free tier with generous limits
- ✅ PostgreSQL database
- ✅ Built-in file storage
- ✅ Real-time subscriptions
- ✅ Row-level security
- ✅ Easy authentication

### Setup Steps

#### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Note your Project URL and anon key

#### 2. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

#### 3. Create Supabase Client
Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 4. Create Database Table
In Supabase SQL Editor, run:
```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON projects
  FOR SELECT USING (true);

-- Allow authenticated write access
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### 5. Create Storage Bucket
In Supabase Storage:
1. Create a new bucket called `project-images`
2. Make it public
3. Set allowed file types: `image/*`

#### 6. Update App Code

Replace the localStorage logic in `App.tsx`:

```typescript
import { supabase } from './lib/supabase';

// Replace useLocalStorage with useEffect
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (data) setProjects(data);
};

const handleAddProject = async () => {
  // 1. Upload image to Supabase Storage
  const file = imageFile; // Get from file input
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(fileName, file);
  
  if (uploadError) return;
  
  // 2. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName);
  
  // 3. Insert project
  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        title: newProject.title,
        description: newProject.description,
        image_url: publicUrl,
      },
    ])
    .select();
  
  if (data) {
    setProjects([data[0], ...projects]);
  }
};

const handleDeleteProject = async (id: string) => {
  await supabase.from('projects').delete().eq('id', id);
  setProjects(projects.filter((p) => p.id !== id));
};
```

#### 7. Add Environment Variables
Create `.env.local`:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### 8. Add Authentication
```typescript
// Sign in
const handleAuth = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@example.com',
    password: password,
  });
  
  if (data.user) {
    setIsAdmin(true);
  }
};

// Sign out
const handleSignOut = async () => {
  await supabase.auth.signOut();
  setIsAdmin(false);
};
```

---

## Option 2: Firebase

### Why Firebase?
- ✅ Google infrastructure
- ✅ Real-time database
- ✅ Cloud storage
- ✅ Comprehensive SDK

### Setup Steps

#### 1. Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Add a web app

#### 2. Install Firebase
```bash
npm install firebase
```

#### 3. Initialize Firebase
Create `src/lib/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
```

#### 4. Update App Code
```typescript
import { db, storage, auth } from './lib/firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fetch projects
const fetchProjects = async () => {
  const q = query(
    collection(db, 'projects'), 
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  const projectsData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setProjects(projectsData);
};

// Add project
const handleAddProject = async () => {
  // 1. Upload image
  const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);
  
  // 2. Add document
  const docRef = await addDoc(collection(db, 'projects'), {
    title: newProject.title,
    description: newProject.description,
    imageUrl,
    createdAt: new Date(),
  });
  
  fetchProjects();
};

// Delete project
const handleDeleteProject = async (id: string) => {
  await deleteDoc(doc(db, 'projects', id));
  setProjects(projects.filter(p => p.id !== id));
};
```

---

## Comparison: Supabase vs Firebase

| Feature | Supabase | Firebase |
|---------|----------|----------|
| Database | PostgreSQL | NoSQL |
| Free Tier | 500MB DB, 1GB Storage | 1GB Storage, 10GB Transfer |
| Real-time | Yes | Yes |
| Authentication | Yes | Yes |
| Learning Curve | Easy | Moderate |
| SQL Support | Yes | No |
| Open Source | Yes | No |
| Self-hosting | Yes | No |

## Recommendation

**Use Supabase if:**
- You prefer SQL databases
- You want open-source solutions
- You need complex queries
- You might self-host in the future

**Use Firebase if:**
- You're already in Google ecosystem
- You prefer NoSQL
- You need Google Cloud integration
- You want extensive documentation

---

## Migration Checklist

- [ ] Choose cloud provider (Supabase or Firebase)
- [ ] Create project account
- [ ] Set up database/collections
- [ ] Configure storage bucket
- [ ] Install SDK dependencies
- [ ] Create client configuration
- [ ] Update data fetching logic
- [ ] Implement file upload
- [ ] Add authentication
- [ ] Set up environment variables
- [ ] Test CRUD operations
- [ ] Deploy updated application

---

## Support Resources

### Supabase
- [Documentation](https://supabase.com/docs)
- [React Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Storage Guide](https://supabase.com/docs/guides/storage)

### Firebase
- [Documentation](https://firebase.google.com/docs)
- [Web Setup](https://firebase.google.com/docs/web/setup)
- [Firestore Guide](https://firebase.google.com/docs/firestore)

---

**Need Help?** The current localStorage implementation works perfectly for demos and single-user scenarios. Only migrate to cloud storage when you need:
- Multi-device access
- Data persistence beyond browser
- Collaboration features
- Production deployment
