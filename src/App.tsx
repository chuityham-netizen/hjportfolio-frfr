import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockKeyhole, X, Plus, Upload, LogOut, Sparkles } from 'lucide-react';
import { sampleProjects } from './sampleProjects';

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: number;
}

// Custom Hook for localStorage
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useLocalStorage<Project[]>('portfolio-projects', []);
  
  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Handle authentication
  const handleAuth = () => {
    if (password === 'Rothesay2!') {
      setIsAdmin(true);
      setShowAuthModal(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  // Handle image upload (convert to base64 for localStorage)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewProject({ ...newProject, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new project
  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.imageUrl) {
      const project: Project = {
        id: Date.now().toString(),
        ...newProject,
        createdAt: Date.now(),
      };
      setProjects([project, ...projects]);
      setNewProject({ title: '', description: '', imageUrl: '' });
      setImagePreview('');
      setShowAddProject(false);
    }
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Load sample projects (admin only)
  const handleLoadSamples = () => {
    setProjects([...sampleProjects, ...projects]);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">

      {/* Header with Admin Button */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-semibold text-white"
          >
            H's Portfolio
          </motion.div>
          
          {isAdmin ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <LogOut size={16} />
              Exit Admin
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 px-4 py-2 glass text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <LockKeyhole size={16} />
              Admin
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-8xl font-bold gradient-text mb-6 tracking-tight"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, sans-serif' }}
          >
            Welcome to H's Portfolio
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 font-light"
          >
            A curated collection of exceptional work
          </motion.p>

          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="inline-block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-8 h-8 mx-auto animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-20 px-6 bg-[#0a0a0a] relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-16 text-center"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Add Project Card (Admin Only) */}
            <AnimatePresence mode="wait">
              {isAdmin && !showAddProject && (
                <motion.div
                  key="add-button"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative"
                >
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="w-full h-[500px] glass rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 hover:border-white/30"
                  >
                    <Plus size={48} className="text-gray-400" />
                    <span className="text-xl font-medium text-gray-300">Add New Project</span>
                  </button>
                </motion.div>
              )}

              {/* Add Project Form */}
              {isAdmin && showAddProject && (
                <motion.div
                  key="add-form"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative glass rounded-3xl shadow-lg p-8 h-[500px] overflow-y-auto"
                >
                  <button
                    onClick={() => {
                      setShowAddProject(false);
                      setNewProject({ title: '', description: '', imageUrl: '' });
                      setImagePreview('');
                    }}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                  >
                    <X size={20} />
                  </button>

                  <h3 className="text-2xl font-bold mb-6 text-white">New Project</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 text-white rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-500"
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 text-white rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none placeholder:text-gray-500"
                        rows={4}
                        placeholder="Describe your project"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors font-medium"
                        >
                          <Upload size={20} />
                          Choose Image
                        </label>
                      </div>
                      {imagePreview && (
                        <div className="mt-4 rounded-2xl overflow-hidden border border-white/10">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleAddProject}
                      disabled={!newProject.title || !newProject.description || !newProject.imageUrl}
                      className="w-full px-6 py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Add Project
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project Cards */}
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative glass rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-white/5"
                >
                  {/* Delete Button (Admin Only) */}
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                    >
                      <X size={20} />
                    </button>
                  )}

                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {projects.length === 0 && !isAdmin && (
              <motion.div
                variants={itemVariants}
                className="col-span-full text-center py-20"
              >
                <p className="text-gray-400 text-xl">No projects yet. Check back soon!</p>
              </motion.div>
            )}

            {/* Load Sample Projects (Admin Only) */}
            {projects.length === 0 && isAdmin && (
              <motion.div
                variants={itemVariants}
                className="col-span-full text-center py-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadSamples}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-200 hover:shadow-xl transition-all"
                >
                  <Sparkles size={20} />
                  Load Sample Projects
                </motion.button>
                <p className="text-gray-400 text-sm mt-3">Start with pre-made examples</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            {isAdmin && (
              <span className="text-xs block mb-2 text-gray-500">
                💡 Pro Tip: Projects are saved to localStorage. For permanent cloud storage, consider integrating Supabase or Firebase.
              </span>
            )}
            <span className="text-sm">© 2024 H's Portfolio. Crafted with precision.</span>
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-gray-300 leading-relaxed">
                  This area is for H's portfolio management only. Public viewing does not require a login.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                    className="w-full px-4 py-3 bg-white/5 text-white rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-500"
                    placeholder="Enter password"
                  />
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </div>

                <button
                  onClick={handleAuth}
                  className="w-full px-6 py-3 bg-white text-black rounded-2xl font-medium hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
