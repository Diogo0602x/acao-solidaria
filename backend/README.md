# Backend API Documentation

## Introduction

This is the backend API for managing users and fundraisings. It includes functionalities for creating, updating, authenticating, and listing both users and fundraisings, along with managing principal users and fundraising purchases.

## Features

- User Management:
  - Create, update, delete, and list users.
  - Authenticate users.
- Principal User Management:
  - Create, update, delete, and list principal users.
  - Authenticate principal users.
- Fundraising Management:
  - Create, update, delete, and list fundraisings.
  - List fundraisings by user and by ID.
- Fundraising Purchase Management:
  - Create and list fundraising purchases by user.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repository.git
    ```

2. Install dependencies:

    ```sh
    cd your-repository
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables.

4. Run the application:

    ```sh
    yarn start
    ```

## Running Tests

To run tests, use the following command:

```sh
yarn test
