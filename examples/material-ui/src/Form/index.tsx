import React from 'react';

import { Button, Grid, CircularProgress, MenuItem } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import {
  TextField,
  Select,
  Autocomplete,
} from '../../../../packages/material-ui/lib';
import { AutocompleteOption } from '../../../../packages/material-ui/lib/Autocomplete/types';
import { useRandomPerson } from './useRandomPerson';

const FormWrapper: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const { loading, loadNewPerson } = useRandomPerson();
  const [loadingCountries, setLoadingCountries] = React.useState(true);
  const [countries, setCountries] = React.useState<AutocompleteOption[]>([]);
  const [data, setData] = React.useState({});

  const loadCountries = React.useCallback(async () => {
    setLoadingCountries(true);
    try {
      const response = await fetch('https://restcountries.eu/rest/v2/all');
      const countriesData = await response.json();

      const formatedCountries = countriesData.map(country => ({
        label: `${country.name} - (${country.alpha2Code})`,
        value: country.alpha2Code,
      }));

      setCountries(formatedCountries);
    } catch (err) {
      console.log(err);
    }
    setLoadingCountries(false);
  }, []);

  React.useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const loadData = React.useCallback(async () => {
    const person = await loadNewPerson();

    formRef.current?.setData({
      ...person,
      yesno: 1,
      truefalse: true,
    });
  }, [loadNewPerson]);

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={formdata => setData(formdata)}
        initialData={{
          email: 'foo@bar.com',
          countries: ['US', 'BR', 'JP'],
          country: 'BR',
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

          <Grid item xs={6}>
            <Select
              name="yesno"
              label="Yes or No?"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={0}>0 - No</MenuItem>
              <MenuItem value={1}>1 - Yes</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Select
              name="truefalse"
              label="true or false?"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={false}>False</MenuItem>
              <MenuItem value>True</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="country"
              name="country"
              label="Autocomplete Country"
              noOptionsText="No Records Found"
              options={countries}
              loading={loadingCountries}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="countries"
              name="countries"
              label="Autocomplete Countries"
              noOptionsText="No Records Found"
              multiple
              required
              options={countries}
              loading={loadingCountries}
            />
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
