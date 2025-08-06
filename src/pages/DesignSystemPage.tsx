import { DesignSystemDemo } from '../shared/ui/DesignSystemDemo';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DesignSystemPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.pagesBackground,
        backgroundAttachment: 'fixed',
      }}
    >
      <DesignSystemDemo />
    </Box>
  );
};

export default DesignSystemPage; 