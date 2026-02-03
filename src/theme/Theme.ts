export const Colors = {
  primary: '#C6A234', // Gold
  secondary: '#1A1A1A', // Dark Gray
  background: '#000000', // Black
  card: '#121212', // Slightly lighter black
  text: '#FFFFFF',
  textMuted: '#A0A0A0',
  accent: '#F2D06B', // Light Gold
  danger: '#FF4B4B',
  success: '#4BB543',
  border: '#2A2A2A',
  goldGradient: ['#8A6E1F', '#C6A234', '#F5D04C', '#C6A234', '#8A6E1F'],
  goldLight: ['#C6A234', '#F5D04C', '#FFF3B0', '#F5D04C', '#C6A234'],
  silverGradient: ['#434343', '#909090', '#E0E0E0', '#909090', '#434343'],
  silverLight: ['#808080', '#D3D3D3', '#FFFFFF', '#D3D3D3', '#808080'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  body: {
    fontSize: 14,
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.textMuted,
  },
};
