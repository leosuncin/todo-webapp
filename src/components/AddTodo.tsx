import { Paper, Grid, TextField, Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onInputKeyPress: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const AddTodo: React.FC<PropTypes.InferProps<typeof propTypes>> = ({
  text,
  onChangeText,
  onInputKeyPress,
  onButtonClick,
}) => (
  <Paper style={{ margin: 16, padding: 16 }}>
    <Grid container>
      <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          fullWidth
          placeholder="Add todo here"
          value={text}
          onChange={onChangeText}
          onKeyPress={onInputKeyPress}
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

export default AddTodo;
