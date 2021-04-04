import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';

type NewTodoFields = {
  /**
   * The new task description
   *
   * @type {string}
   */
  text: string;
};

export type AddTodoProps = {
  /**
   * Handle add a new todo
   *
   */
  onSubmit: (newTodo: NewTodoFields) => void;
  /**
   * Default text of the new todo
   *
   * @type {string}
   */
  defaultText?: string;
};

export const validations: { [name in keyof NewTodoFields]: RegisterOptions } = {
  text: {
    required: 'Text is required',
    maxLength: {
      value: 140,
      message: 'Text must be at most 140 characters',
    },
  },
};

const AddTodo: React.FC<AddTodoProps> = ({ onSubmit, defaultText = '' }) => {
  const { handleSubmit, register, formState, reset } = useForm<NewTodoFields>({
    defaultValues: {
      text: defaultText,
    },
  });
  const { ref, ...rest } = register('text', validations.text);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit((body) => {
        onSubmit(body);
        reset();
      })}
    >
      <TextField
        label="Task"
        margin="normal"
        id="text-input"
        variant="outlined"
        placeholder="What needs to be done? "
        fullWidth
        error={!!formState.errors.text}
        helperText={formState.errors.text?.message}
        inputRef={ref}
        {...rest}
      />
      <Button
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        fullWidth
        disabled={formState.isSubmitting}
      >
        Add
      </Button>
    </Grid>
  );
};

export default AddTodo;
