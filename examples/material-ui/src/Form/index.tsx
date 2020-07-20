import React from 'react';

import { TextField } from 'unform-material-ui';

import { Button, Grid, CircularProgress } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

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
        id="formdata"
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField fullWidth name="name.first" label="First Name" />
          </Grid>
          <Grid item xs>
            <TextField fullWidth name="name.last" label="Last Name" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="email" label="E-mail" />
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
          type="reset"
          variant="contained"
          size="small"
          form="formdata"
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
