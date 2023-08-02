# static-content-server

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | The port on which the server will be launched to upload content            | 11111     |
|CONTENT_DIR_NAME           | Content Directory           | public    |
|PASSWORD           | Password for basic authorization           | password    |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.17.0


# Getting started

- Clone the repository

```
git clone  https://github.com/Momentio/static-content-server

```

- Install dependencies
```
cd static-content-server
npm install
```

- Build the project
```
npm run build
```

- Run the project
```
npm run start
```

- Run dev mode
```
npm run dev
```

# Upload content

- Auth

![Basic Auth](https://github.com/Momentio/static-content-server/blob/master/images/1.png)

- Upload

![Upload](https://github.com/Momentio/static-content-server/blob/master/images/2.png)

## Testing

### Example example.test.ts
```
describe('example', () => {
    test('1 + 2', () => {
        expect(1 + 2).toEqual(3);
    });
});
```

### Running tests using NPM Scripts

````
npm run test

````

Test files are created under test folder.

## Eslint
TSLint is a code linter that helps catch minor code quality and style issues.

### Rules
All rules are configured through `.eslintrc.json`.

## Running
```

npm run lint
```

## Common Issues

## npm install fails
The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.
