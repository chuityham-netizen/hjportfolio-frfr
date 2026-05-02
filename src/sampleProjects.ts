// Sample projects for demonstration
// In a real application, these would come from a database or localStorage

export const sampleProjects = [
  {
    id: '1',
    title: 'Minimalist Dashboard',
    description: 'A clean, modern dashboard design focused on data visualization and user experience. Built with React and D3.js for interactive charts.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with seamless checkout experience, inventory management, and real-time analytics.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    createdAt: Date.now() - 86400000 * 14, // 14 days ago
  },
  {
    id: '3',
    title: 'Mobile App Design',
    description: 'iOS and Android app design with fluid animations and intuitive navigation. Focus on accessibility and user engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    createdAt: Date.now() - 86400000 * 21, // 21 days ago
  },
  {
    id: '4',
    title: 'Brand Identity System',
    description: 'Comprehensive brand identity including logo design, color palette, typography, and brand guidelines for a tech startup.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    createdAt: Date.now() - 86400000 * 28, // 28 days ago
  },
];

// Helper function to load sample projects into localStorage
export const loadSampleProjects = () => {
  const existingProjects = localStorage.getItem('portfolio-projects');
  if (!existingProjects || JSON.parse(existingProjects).length === 0) {
    localStorage.setItem('portfolio-projects', JSON.stringify(sampleProjects));
    return true;
  }
  return false;
};
