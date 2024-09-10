// Theme colors
const colors = {
    background: '#1a1a2e',
    surface: '#16213e',
    primary: '#e94560',
    secondary: '#ff9900',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
  };
  
  // Common styles
  const commonStyles = {
    container: {
      backgroundColor: colors.background,
      color: colors.text,
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '20px auto',
    },
    heading: {
      color: colors.primary,
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '12px',
      backgroundColor: colors.surface,
      border: `1px solid ${colors.secondary}`,
      borderRadius: '4px',
      color: colors.text,
      fontSize: '16px',
    },
    button: {
      padding: '12px',
      backgroundColor: colors.secondary,
      color: colors.background,
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.1s',
    },
    buttonHover: {
      backgroundColor: colors.primary,
      transform: 'scale(1.02)',
    },
    link: {
      color: colors.secondary,
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    error: {
      color: colors.primary,
      marginBottom: '10px',
    },
  };
  
  export { colors, commonStyles };