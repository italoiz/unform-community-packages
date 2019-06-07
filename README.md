<h1 align="center">

![](assets/logo.png)

</h1>

<div align="center">

[![npm](https://img.shields.io/npm/v/unform-material-ui.svg)](https://www.npmjs.com/package/unform-material-ui)
[![Build Status](https://travis-ci.org/italoiz/unform-material-ui.svg?branch=master)](https://travis-ci.org/italoiz/unform-material-ui)
[![Coverage Status](https://coveralls.io/repos/github/italoiz/unform-material-ui/badge.svg?branch=master)](https://coveralls.io/github/italoiz/unform-material-ui?branch=master)

</div>

## Overview

This library uses [Unform](https://github.com/Rocketseat/unform) + [Material UI](https://material-ui.com) styles to create super beautiful forms easily.

<!-- Unform is a performance focused library that helps you creating beautiful forms in React with the power of uncontrolled components performance and React Hooks. -->

## Table of contents

- [Roadmap](#roadmap)
- [Installation](#installation)
- [Guides](#guides)
  - [Basics](#basics)
  - [Components](#components)
    - [TextField Component](#textfield--component)
- [Contributing](#contributing)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Code of Conduct](#code-of-conduct)
- [License](#license)

## Roadmap

- Support all [Material UI](https://material-ui.com) components;
- Better docs;

## Installation

Just add unform to your project:

```
yarn add unform-material-ui @rocketseat/unform @material-ui/core
```

## Guides

### Basics

> ⚠️ This is a library that depends on **Unform** and **Material UI** to work, both must be installed in your project.

- Here's how to use the [Unform library here](https://github.com/Rocketseat/unform#basics)
- Here's how to se up the [Material UI here](https://material-ui.com/getting-started/installation/)

### Components

> ️️⚠️ For now, all components of the **Material UI** are not yet supported. Below are just the supported components.

#### `<TextField />` Component

The `<TextField />` component, is similar to the default component `<Input />`. See the component documentation [here](https://material-ui.com/api/text-field/) for more information.

```jsx
import React from 'react';
import { Form } from '@rocketseat/unform';
import { TextField } from 'unform-material-ui';

function App() {
  function handleSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit}>
      <TextField name="name" />
      <TextField multiline name="bio" />

      <button type="submit">Send</button>
    </Form>
  );
}
```

## Contributing

Thanks for being interested on making this package better. We encourage everyone to help improving this project with some new features, bug fixes and performance issues. Please take a little bit of your time to read our guides, so this process can be faster and easier.

### Contribution Guidelines

Take a moment to read about our [Contribution Guidelines](/.github/CONTRIBUTING.md) so you can understand how to submit an issue, commit and create pull requests.

### Code of Conduct

We expect you to follow our [Code of Conduct](/.github/CODE_OF_CONDUCT.md). You can read it to understand what kind of behaviour will and will not be tolerated.

## License

MIT © [Italo Izaac](https://github.com/italoiz)
