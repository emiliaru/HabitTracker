import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { statisticsApi } from '../api/statisticsApi';

export const StatisticsDashboard = () => {
  const { data: userStats, isLoading } = useQuery({
    queryKey: ['userStatistics'],
    queryFn: statisticsApi.getUserStatistics,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!userStats) {
    return (
      <Typography color="error">
        Failed to load statistics. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Overall Stats */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Overall Progress
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{userStats.totalHabits}</Typography>
                    <Typography color="textSecondary">Total Habits</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{userStats.activeHabits}</Typography>
                    <Typography color="textSecondary">Active Habits</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{userStats.totalCategories}</Typography>
                    <Typography color="textSecondary">Categories</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">
                      {userStats.overallCompletionRate.toFixed(1)}%
                    </Typography>
                    <Typography color="textSecondary">Completion Rate</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Performing Habits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performing Habits
              </Typography>
              <List>
                {userStats.topPerformingHabits.map((habit) => (
                  <ListItem key={habit.habitId}>
                    <ListItemText
                      primary={habit.habitName}
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            Completion Rate: {habit.completionRate.toFixed(1)}%
                          </Typography>
                          <br />
                          <Typography variant="body2" component="span">
                            Current Streak: {habit.currentStreak} days
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Needs Attention */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error">
                Needs Attention
              </Typography>
              <List>
                {userStats.needsAttentionHabits.map((habit) => (
                  <ListItem key={habit.habitId}>
                    <ListItemText
                      primary={habit.habitName}
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span" color="error">
                            Completion Rate: {habit.completionRate.toFixed(1)}%
                          </Typography>
                          <br />
                          <Typography variant="body2" component="span">
                            Days Tracked: {habit.daysTracked}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Performance */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Performance
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(userStats.completionRateByCategory).map(([category, rate]) => (
                  <Grid item xs={12} sm={6} md={4} key={category}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1">{category}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={rate}
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2">{rate.toFixed(1)}%</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
