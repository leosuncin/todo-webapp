import { Button, ButtonGroup, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

export type FilterBy = 'all' | 'completed' | 'active';

export type FilterTodoProps = {
  all: number;
  completed: number;
  active: number;
  filter?: FilterBy;
  switchFilter: (filter: FilterBy) => void;
  onClearCompleted: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'middle',
      padding: theme.spacing(),
      margin: theme.spacing(2, 0),
    },
    typography: {
      margin: 'auto 0',
    },
  }),
);

const FilterTodo: React.FC<FilterTodoProps> = ({
  all,
  completed,
  active,
  filter = 'all',
  switchFilter,
  onClearCompleted,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.typography}>
        {active} items left
      </Typography>
      <ButtonGroup>
        <Button
          variant="outlined"
          size="small"
          disableElevation
          color={filter === 'all' ? 'primary' : 'default'}
          onClick={() => switchFilter('all')}
        >
          All ({all})
        </Button>
        <Button
          variant="outlined"
          size="small"
          disableElevation
          disabled={active < 1}
          color={filter === 'active' ? 'primary' : 'default'}
          onClick={() => switchFilter('active')}
        >
          Active ({active})
        </Button>
        <Button
          variant="outlined"
          size="small"
          disableElevation
          disabled={completed < 1}
          color={filter === 'completed' ? 'primary' : 'default'}
          onClick={() => switchFilter('completed')}
        >
          Completed ({completed})
        </Button>
      </ButtonGroup>
      {completed ? (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          disableElevation
          onClick={onClearCompleted}
        >
          Clear completed
        </Button>
      ) : null}
    </Paper>
  );
};

export default FilterTodo;
