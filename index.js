const Express = require( 'express');
const bodyParser = require('body-parser')
const GraphHTTP = require( 'express-graphql');
const Schema = require( './schema');

const APP_PORT = process.env.ECOEXT_WEB_PORT;
const app = Express();

app.use(bodyParser.json());

app.use('/api', GraphHTTP(req => ({
    schema: Schema,
    pretty: true,
    graphiql: true
})))

app.get('/', (req, res) => {
    res.send('ecoext endpoint');
});

app.listen(APP_PORT, () => {
    console.log(`App listerning on port ${APP_PORT}`)
})

module.exports = app;