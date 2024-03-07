# E-commerce Fashion ADN

## Overview

E-commerce Fashion ADN is a TypeScript and Redux Toolkit-powered frontend project that connects to the [FakeAPI](https://fakeapi.platzi.com/) to create a dynamic e-commerce platform. The project includes features like product listing, individual product pages, user profiles (accessible upon login), and a shopping cart (implemented as a page or modal).

## Technologies Used

- **TypeScript**: Provides static typing for enhanced code quality.
- **Redux Toolkit**: Manages state efficiently.
- **React**: The core library for building the user interface.
- **React Router**: Enables navigation between pages.
- **Styled Components**: Utilized for styling components.
- **Axios**: Handles API requests.
- **Yup**: Schema validation for form inputs.
- **Lodash**: Utility library for various functionalities.

## Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/adhanif/fs17-Frontend-project.git

2. Navigate to the project directory.
   ```bash
   cd fs17-Frontend-project
   
3. Install dependencies.
   ```bash
   npm install

3. Usage
   ```bash
   npm install

### Redux Store

#### Product Reducer

- Get all products.
- Find a single product.
- Filter products by categories.
- Sort products by price.
- Create, update, and delete a product (admin only).

#### User Reducer

- Register and login.

#### Cart Reducer

- Add product to cart.
- Remove products.
- Update product quantity in the cart.


## API Endpoint

Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/).



## Scripts

- `npm start`: Start the development server.
- `npm build`: Build the production-ready application.
- `npm test`: Run unit tests.
- `npm eject`: Eject from create-react-app configuration.

## Deployment

The application is deployed on Netlify. Click the button below to visit the live site:
 [Netlify](https://ecommerce-fashion-adn.netlify.app/).

## License

This project is licensed under the [MIT License](LICENSE).
