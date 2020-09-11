import React from 'react';

import { Button, Grid, CircularProgress, MenuItem } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { TextField, Select } from '../../../../packages/material-ui/lib';
import { useRandomPerson } from './useRandomPerson';

const FormWrapper = () => {
  const formRef = React.useRef<FormHandles>(null);
  const { loading, loadNewPerson } = useRandomPerson();
  const [data, setData] = React.useState({});

  const loadData = React.useCallback(async () => {
    const person = await loadNewPerson();
    formRef.current?.setData(person);
  }, [loadNewPerson]);

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={formdata => setData(formdata)}
        initialData={{
          email: 'foo@bar.com',
        }}
        id="formdata"
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="name.first"
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="name.last" label="Last Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="email" label="E-mail" />
          </Grid>
          <Grid item xs={6}>
            <Select name="gender" label="Gender" variant="outlined" fullWidth>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Form>
      <div className="action-buttons">
        <Button
          color="primary"
          type="submit"
          variant="contained"
          size="small"
          form="formdata"
        >
          Submit
        </Button>
        <Button
          color="secondary"
          type="button"
          variant="contained"
          size="small"
          onClick={() => {
            formRef?.current?.reset({ email: 'test' });
          }}
        >
          Reset
        </Button>
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={loadData}
          disabled={loading}
        >
          {loading && <CircularProgress size={18} />}
          Load data
        </Button>
      </div>
      <code>
        <pre>{JSON.stringify(data, null, 3)}</pre>
      </code>
    </>
  );
};

export default FormWrapper;
