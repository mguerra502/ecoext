const Express = require( 'express');
const bodyParser = require('body-parser')
const GraphHTTP = require( 'express-graphql');
const Schema = require( './schema');
// const graphiql = require( 'graphiql');

/*
const jwt = require('express-jwt');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')
/**/

// config

const APP_PORT = process.env.ECOEXT_WEB_PORT;
const app = Express();

app.use(bodyParser.json())

/*
// authentication middleware
const authMiddleware = jwt({
    // dynamically provide a signing key based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
    }),

    // validate the audience and the issuer.
    // audience: '{YOUR_API_IDENTIFIER}',
    // issuer: `https://YOUR_AUTH0_DOMAIN/`,
    algorithms: ['RS256']
})

app.use(authMiddleware)

// app.use('/', GraphHTTP({
    //     schema: Schema,
    //     pretty: true,
    //     graphiql: true
    // }))
    
    login (_, { email, password }) {
        
        const user = await User.findOne({ where: { email } })
        
        if (!user) {
            throw new Error('No user with that email')
        }
        
        const valid = await bcrypt.compare(password, user.password)
        
        if (!valid) {
            throw new Error('Incorrect password')
        }
        
        // return json web token
        return jsonwebtoken.sign({
            id: user.id,
            email: user.email
        }, 'somesuperdupersecret', { expiresIn: '1y' })
    }
    
app.use('/api', GraphHTTP(req => ({
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: {
        user: req.user
    }
})))

/**/


app.use('/api', GraphHTTP(req => ({
    schema: Schema,
    pretty: true,
    graphiql: true
})))

app.listen(APP_PORT, () => {
    // console.log(process.env);
    console.log(`App listerning on port ${APP_PORT}`)
})