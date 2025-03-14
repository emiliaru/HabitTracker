import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Paper,
  useMediaQuery
} from '@mui/material';
import { Add, LightMode, DarkMode } from '@mui/icons-material';
import { HabitList } from './components/HabitList';
import { HabitForm } from './components/HabitForm';

const queryClient = new QueryClient();

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          flexGrow: 1, 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          pt: 2,
        }}>
          <Container maxWidth="md">
            <Paper 
              elevation={0} 
              sx={{ 
                bgcolor: 'background.paper',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Habit Tracker
                  </Typography>
                  <IconButton 
                    color="inherit" 
                    onClick={() => setDarkMode(!darkMode)}
                    sx={{ mr: 2 }}
                  >
                    {darkMode ? <LightMode /> : <DarkMode />}
                  </IconButton>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Add />}
                    onClick={() => setIsFormOpen(true)}
                    sx={{ 
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                    }}
                  >
                    New Habit
                  </Button>
                </Toolbar>
              </AppBar>

              <Box sx={{ p: 3 }}>
                <HabitList />
              </Box>
            </Paper>
          </Container>

          <HabitForm 
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
