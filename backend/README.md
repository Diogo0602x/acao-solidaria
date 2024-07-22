# Backend API Documentation

## Introduction

This is the backend API for managing users and fundraisings. It includes functionalities for creating, updating, authenticating, and listing both users and fundraisings, along with managing principal users and fundraising purchases.

## Features

- **User Management**:
  - Create, update, delete, and list users.
  - Authenticate users.
- **Principal User Management**:
  - Create, update, delete, and list principal users.
  - Authenticate principal users.
- **Fundraising Management**:
  - Create, update, delete, and list fundraisings.
  - List fundraisings by user and by ID.
- **Fundraising Purchase Management**:
  - Create and list fundraising purchases by user.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Diogo0602x/jornadaSolidaria.git
    ```

2. Install dependencies:

    ```sh
    cd backend
    yarn install
    ```

3. Set up environment variables:

    Copy the `.env.example` file to `.env` and update the necessary information:

    ```sh
    cp .env.example .env
    ```

4. Run the application:

    ```sh
    yarn dev
    ```

## Running Tests

To run tests, use the following command:

```sh
yarn test
```

## Swagger Documentation

The API documentation is available at `/api-docs` after starting the application.
