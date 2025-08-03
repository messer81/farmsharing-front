// 🎨 Демонстрация дизайн-системы
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Alert, 
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  Search,
  Add,
  Close
} from '@mui/icons-material';
import { useState } from 'react';

export const DesignSystemDemo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h1" sx={{ mb: 4, textAlign: 'center' }}>
        FarmSharing Design System
      </Typography>

      {/* 🎯 Кнопки */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Buttons
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" size="small">Small Primary</Button>
          <Button variant="contained" size="medium">Medium Primary</Button>
          <Button variant="contained" size="large">Large Primary</Button>
          
          <Button variant="outlined" size="small">Small Outlined</Button>
          <Button variant="outlined" size="medium">Medium Outlined</Button>
          <Button variant="outlined" size="large">Large Outlined</Button>
          
          <Button variant="text" size="small">Small Text</Button>
          <Button variant="text" size="medium">Medium Text</Button>
          <Button variant="text" size="large">Large Text</Button>
        </Box>
      </Box>

      {/* 📝 Типографика */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Typography
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h1">Heading 1 - 36px Bold</Typography>
          <Typography variant="h2">Heading 2 - 30px Semibold</Typography>
          <Typography variant="h3">Heading 3 - 24px Semibold</Typography>
          <Typography variant="h4">Heading 4 - 20px Semibold</Typography>
          <Typography variant="h5">Heading 5 - 18px Semibold</Typography>
          <Typography variant="h6">Heading 6 - 16px Semibold</Typography>
          <Typography variant="body1">Body 1 - 16px Regular</Typography>
          <Typography variant="body2">Body 2 - 14px Regular</Typography>
          <Typography variant="button">Button Text - 16px Semibold</Typography>
        </Box>
      </Box>

      {/* 📦 Карточки */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Cards
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Product Card
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Fresh organic tomatoes from local farm. Grown with care and delivered to your doorstep.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label="Organic" color="success" size="small" />
                <Chip label="Local" color="primary" size="small" />
              </Box>
              <Button variant="contained" startIcon={<ShoppingCart />}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Farm Profile
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Visit our farm and see how we grow the freshest vegetables using sustainable methods.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label="Sustainable" color="success" size="small" />
                <Chip label="Family Owned" color="secondary" size="small" />
              </Box>
              <Button variant="outlined" startIcon={<Favorite />}>
                Follow Farm
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* 📝 Формы */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Forms
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
          <TextField
            fullWidth
            label="Search Products"
            placeholder="Enter product name..."
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <TextField
            fullWidth
            label="Email Address"
            placeholder="your@email.com"
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            placeholder="Tell us about your experience..."
            multiline
            rows={4}
          />
        </Box>
      </Box>

      {/* 🚨 Уведомления */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Alerts
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="success">
            Your order has been successfully placed! We'll notify you when it's ready for pickup.
          </Alert>
          <Alert severity="info">
            New products are available from local farms in your area.
          </Alert>
          <Alert severity="warning">
            Some items in your cart may be out of stock. Please check availability.
          </Alert>
          <Alert severity="error">
            There was an error processing your payment. Please try again.
          </Alert>
        </Box>
      </Box>

      {/* 🎯 Иконки */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Icon Buttons
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <IconButton color="primary" size="small">
            <Add />
          </IconButton>
          <IconButton color="primary" size="medium">
            <ShoppingCart />
          </IconButton>
          <IconButton color="primary" size="large">
            <Favorite />
          </IconButton>
          <IconButton color="secondary" size="medium">
            <Search />
          </IconButton>
          <IconButton color="error" size="medium">
            <Close />
          </IconButton>
        </Box>
      </Box>

      {/* 💬 Диалоги */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Dialogs
        </Typography>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Open Dialog
        </Button>
        
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Product Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              This is a sample dialog showing how our design system handles complex components.
            </Typography>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              defaultValue="1"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="In Stock" color="success" size="small" />
              <Chip label="Organic" color="primary" size="small" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setDialogOpen(false)}>
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* 🎨 Цветовая палитра */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Color Palette
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
            Primary Green
          </Box>
          <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', borderRadius: 1 }}>
            Secondary Gray
          </Box>
          <Box sx={{ p: 2, bgcolor: 'success.main', color: 'white', borderRadius: 1 }}>
            Success Green
          </Box>
          <Box sx={{ p: 2, bgcolor: 'warning.main', color: 'white', borderRadius: 1 }}>
            Warning Orange
          </Box>
          <Box sx={{ p: 2, bgcolor: 'error.main', color: 'white', borderRadius: 1 }}>
            Error Red
          </Box>
          <Box sx={{ p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
            Info Blue
          </Box>
        </Box>
      </Box>
    </Box>
  );
}; 