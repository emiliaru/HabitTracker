import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Fade,
} from '@mui/material';
import { Check, Edit, Delete, AccessTime } from '@mui/icons-material';
import { format } from 'date-fns';
import { Habit, FrequencyType } from '../types/habit';
import { habitApi } from '../api/habitApi';
import { HabitForm } from './HabitForm';

export const HabitList = () => {
  const queryClient = useQueryClient();
  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [deleteHabit, setDeleteHabit] = useState<Habit | null>(null);

  const { data: habits, isLoading, error } = useQuery<Habit[]>({
    queryKey: ['habits'],
    queryFn: habitApi.getAllHabits
  });

  const deleteMutation = useMutation({
    mutationFn: (habitId: number) => habitApi.deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setDeleteHabit(null);
    },
  });

  const toggleCompletionMutation = useMutation({
    mutationFn: (habit: Habit) => habitApi.updateHabit(habit.id, {
      ...habit,
      isCompleted: !habit.isCompleted,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const getFrequencyColor = (frequency: FrequencyType) => {
    switch (frequency) {
      case FrequencyType.Daily:
        return 'primary';
      case FrequencyType.Weekly:
        return 'secondary';
      case FrequencyType.Monthly:
        return 'info';
      default:
        return 'default';
    }
  };

  const handleDelete = (habit: Habit) => {
    setDeleteHabit(habit);
  };

  const confirmDelete = () => {
    if (deleteHabit) {
      deleteMutation.mutate(deleteHabit.id);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error" variant="h6" gutterBottom>
          Error loading habits
        </Typography>
        <Typography color="textSecondary">
          Please try again later
        </Typography>
      </Box>
    );
  }

  if (!habits?.length) {
    return (
      <Box 
        p={4} 
        textAlign="center" 
        sx={{
          bgcolor: 'background.default',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No habits found
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          Create your first habit to get started!
        </Typography>
        <AccessTime sx={{ fontSize: 64, color: 'text.disabled' }} />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {habits.map((habit) => (
          <Grid item xs={12} sm={6} key={habit.id}>
            <Card 
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {habit.name}
                  </Typography>
                  {habit.isCompleted && (
                    <Chip
                      label="Completed"
                      size="small"
                      color="success"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
                
                {habit.description && (
                  <Typography 
                    color="textSecondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {habit.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    label={habit.frequency}
                    size="small"
                    color={getFrequencyColor(habit.frequency)}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Created {format(new Date(habit.createdAt), 'PP')}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                <Tooltip title={habit.isCompleted ? "Mark as incomplete" : "Mark as complete"}>
                  <IconButton 
                    size="small"
                    onClick={() => toggleCompletionMutation.mutate(habit)}
                    color={habit.isCompleted ? 'success' : 'default'}
                  >
                    <Check />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton 
                    size="small"
                    onClick={() => setEditHabit(habit)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    size="small"
                    onClick={() => handleDelete(habit)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <HabitForm
        open={!!editHabit}
        onClose={() => setEditHabit(null)}
        habit={editHabit || undefined}
      />

      <Dialog 
        open={!!deleteHabit} 
        onClose={() => setDeleteHabit(null)}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 0,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>Delete Habit</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteHabit?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={() => setDeleteHabit(null)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
