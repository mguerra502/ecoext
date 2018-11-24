const Express = require( 'express');
const GraphHTTP = require( 'express-graphql');
const Schema = require( './schema');
const graphiql = require( 'graphiql');

// config

const APP_PORT = 3000;
const app = Express();

app.use('/', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}))

app.listen(APP_PORT, () => {
    console.log(process.env);
    console.log(process.env.ECOEXT_MARIADB_USER);
    console.log(process.env.ECOEXT_MARIADB_ROOTPASSWORD);
    console.log(process.env.ECOEXT_MARIADB_PORT);
    console.log(`App listerning on port ${APP_PORT}`)
})