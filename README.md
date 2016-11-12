# Exceptions Relay

## Installation

We use the modern package manager, "yarn". Make sure it is installed first.

* `yarn install`

## Development

You need to specify the GraphQL backend location so that it can read the schema from an introspection query. This is a dependency of [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay).

* `env GRAPHQL_ENDPOINT=http://localhost:4000/graphql yarn run dev`

## Production

Uses the config found in the root directory to output a production build ready to be served with the index.html file.

* `yarn run build`
