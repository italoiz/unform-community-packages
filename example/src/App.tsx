import { Form } from '@rocketseat/unform';
import React from 'react';
import * as Yup from 'yup';

import { TextField } from '../../lib';
import GlobalStyles, { Section } from './styles';

// validation schema.
const schema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().required(),
});

export default function App() {
  function handleSubmit(payload) {
    console.log(payload);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} schema={schema}>
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
          <div>
            <button type="submit">ok!</button>
          </div>
        </Section>
      </Form>
      <GlobalStyles />
    </>
  );
}
