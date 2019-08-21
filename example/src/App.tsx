import { Form } from '@rocketseat/unform';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import * as Yup from 'yup';

import { TextField, Select, Checkbox } from '../../lib';
import GlobalStyles, { Section } from './styles';

// validation schema.
const schema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string(),
  country: Yup.mixed(),
  tech: Yup.mixed(),
  withDefault: Yup.number(),
  withError: Yup.string(),
  multipleSelect: Yup.array(),
  terms: Yup.boolean(),
  acceptEmails: Yup.boolean(),
});

function App() {
  function handleSubmit(payload) {
    console.log(payload);
  }

  const initialData = {
    firstName: 'Diego',
    withDefault: 1,
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} schema={schema} initialData={initialData}>
        <Section>
          <h1>{'<TextField /> Component'}</h1>

          <div>
            <TextField name="firstName" label="First name" fullWidth />
            <TextField name="lastName" label="Last name" fullWidth />
          </div>

          <div>
            <TextField name="email" label="E-mail" fullWidth />
          </div>
        </Section>

        <Section>
          <h1>{'<Select /> Component'}</h1>

          <div>
            <Select
              name="country"
              label="Country"
              options={[
                { value: { id: 1, name: 'brazil' }, label: 'Brazil' },
                { value: 'canada', label: 'Canada' },
              ]}
            />

            <Select
              native
              name="tech"
              label="Tech (Native Select)"
              options={[
                { value: 'react', label: 'React' },
                { value: 'node', label: 'NodeJS' },
              ]}
            />

            <Select
              name="withDefault"
              label="Default value"
              options={[{ value: 1, label: '#ID 1' }]}
            />

            <Select
              name="withError"
              label="Error"
              options={[{ value: 'foo', label: 'bar' }]}
            />

            <Select
              multiple
              name="multipleSelect"
              label="Multiple"
              options={[
                { value: 'node', label: 'NodeJS' },
                { value: 'react', label: 'React' },
                { value: 'vuejs', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
              ]}
            />
          </div>
        </Section>

        <Section>
          <h1>{'<Checkbox /> Component'}</h1>

          <div>
            <Checkbox name="terms" label="Terms & Conditions" />
            <Checkbox
              name="acceptEmails"
              label="I accept to receive promotional e-mails"
              checked
            />
          </div>
        </Section>

        <Section>
          <div>
            <button type="submit">ok!</button>
          </div>
        </Section>
      </Form>
      <GlobalStyles />
    </React.Fragment>
  );
}

export default hot(App);
