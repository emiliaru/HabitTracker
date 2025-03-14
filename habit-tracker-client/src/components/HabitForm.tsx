import { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  useMediaQuery,
  useTheme,
  Typography,
  IconButton,
  Fade,
  Stack,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Habit, CreateHabitDto, FrequencyType } from '../types/habit';
import { habitApi } from '../api/habitApi';

interface HabitFormProps {
  open: boolean;
  onClose: () => void;
  habit?: Habit;
}

export const HabitForm = ({ open, onClose, habit }: HabitFormProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateHabitDto>({
    name: habit?.name || '',
    description: habit?.description || '',
    frequency: habit?.frequency || FrequencyType.Daily,
  });

  const createMutation = useMutation({
    mutationFn: habitApi.createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setFormData({
        name: '',
        description: '',
        frequency: FrequencyType.Daily,
      });
      setError(null);
      onClose();
    },
    onError: (error: any) => {
      setError(error.message || 'Failed to create habit. Please try again.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; habit: CreateHabitDto }) => 
      habitApi.updateHabit(data.id, { ...data.habit, isArchived: habit?.isArchived || false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setError(null);
      onClose();
    },
    onError: (error: any) => {
      setError(error.message || 'Failed to update habit. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (habit) {
      updateMutation.mutate({ id: habit.id, habit: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleClose = () => {
    setError(null);
    setFormData({
      name: '',
      description: '',
      frequency: FrequencyType.Daily,
    });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      TransitionComponent={Fade}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle 
          sx={{ 
            p: 3,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {habit ? 'Edit Habit' : 'Create New Habit'}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            size="small"
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            {error && (
              <Alert 
                severity="error" 
                onClose={() => setError(null)}
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-message': { width: '100%' }
                }}
              >
                {error}
              </Alert>
            )}
            
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => {
                setError(null);
                setFormData({ ...formData, name: e.target.value });
              }}
              required
              fullWidth
              autoFocus
              error={!!error && !formData.name.trim()}
              helperText={error && !formData.name.trim() ? 'Name is required' : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
              placeholder="What is your goal with this habit?"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            
            <FormControl fullWidth>
              <InputLabel id="frequency-label">Frequency</InputLabel>
              <Select
                labelId="frequency-label"
                value={formData.frequency}
                label="Frequency"
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as FrequencyType })}
                sx={{
                  borderRadius: 2,
                }}
              >
                {Object.values(FrequencyType).map((freq) => (
                  <MenuItem key={freq} value={freq}>
                    {freq}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions 
          sx={{ 
            p: 3,
            pt: 2,
            gap: 1,
          }}
        >
          <Button 
            onClick={handleClose} 
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={createMutation.isPending || updateMutation.isPending}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
            }}
          >
            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (habit ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
