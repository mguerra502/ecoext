const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// import Db from './db'
const Db = require('./db');

// const Person = new GraphQLObjectType({
//     name: 'Person',
//     description: 'This represents a Person',
//     fields: () => {
//         return {
//             id: {
//                 type: GraphQLInt,
//                 resolve(person){
//                     return person.id
//                 }
//             },
//             firstName: {
//                 type: GraphQLString,
//                 resolve(person) {
//                     return person.firstName
//                 }
//             },
//             lastName: {
//                 type: GraphQLString,
//                 resolve(person) {
//                     return person.lastName
//                 }
//             },
//             email: {
//                 type: GraphQLString,
//                 resolve(person) {
//                     return person.email
//                 }
//             },
//             posts:{
//                 type: new GraphQLList(Post),
//                 resolve(person){
//                     return person.getPosts();
//                 }
//             }
//         }
//     }
// })

// const Post = new GraphQLObjectType({
//     name: 'Post',
//     description: 'This represents a Post',
//     fields: () => {
//         return {
//             id: {
//                 type: GraphQLInt,
//                 resolve(post) {
//                     return post.id
//                 }
//             },
//             title: {
//                 type: GraphQLString,
//                 resolve(post) {
//                     return post.title
//                 }
//             },
//             content: {
//                 type: GraphQLString,
//                 resolve(post) {
//                     return post.content
//                 }
//             }
//             ,
//             person: {
//                 type: Person,
//                 resolve(post) {
//                     return post.getPerson();
//                 }
//             }
//         }
//     }
// });

const AccountPurse = new GraphQLObjectType({
    name: 'AccountPurse',
    description: 'This represents an AccountPurse',
    fields: () => {
        return {
            account_id: {
                type: GraphQLInt,
                resolve(account_purse) {
                    return account_purse.account_id
                }
            },
            purse_id: {
                type: GraphQLInt,
                resolve(account_purse) {
                    return account_purse.purse_id
                }
            }
        }
    }
});

const Establishment = new GraphQLObjectType({
    name: 'Establishment',
    description: 'This represents an Establishment',
    fields: () => {
        return {
            establishment_id: {
                type: GraphQLInt,
                resolve(establishment) {
                    return establishment.establishment_id
                }
            },
            purse_id: {
                type: GraphQLInt,
                resolve(establishment) {
                    return establishment.purse_id
                }
            },
            name: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.name
                }
            },
            address: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.address
                }
            },
            lat: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.lat
                }
            },
            lon: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.lon
                }
            },
        }
    }
});

const Transaction = new GraphQLObjectType({
    name: 'Transaction',
    description: 'This represents an Transaction',
    fields: () => {
        return {
            transaction_id: {
                type: GraphQLInt,
                resolve(transaction) {
                    return transaction.transaction_id
                }
            },
            date: {
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.date
                }
            },
            label: {
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.label
                }
            },
            description: {
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.description
                }
            },
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            account: {
                type: new GraphQLList(Account),
                args: {
                    account_id: {
                        type: GraphQLInt    
                    }
                },
                resolve(root, args) {
                    return Db.models.account.findAll({
                        where: args
                    });
                }
            },
            purses: {
                type: new GraphQLList(Purse),
                resolve(root, args) {
                    console.log(Db.models.account_purses);
                    return Db.models.purse.findAll({
                        where: args
                    });
                }
            },
            establishment: {
                type: new GraphQLList(Establishment),
                resolve(root, args) {
                    console.log(Db.models.establishment);
                    return Db.models.establishment.findAll({
                        where: args
                    });
                }
            },
            purses: {
                type: new GraphQLList(Establishment),
                resolve(root, args) {
                    console.log(Db.models.account_purses);
                    return Db.models.purse.findAll({
                        where: args
                    });
                }
            },
            transaction: {
                type: new GraphQLList(Transaction),
                resolve(root, args) {
                    // console.log(Db.models.transaction);
                    return Db.models.transaction.findAll({
                        where: args
                    });
                }
            },
        }
    }
})

const Account = new GraphQLObjectType({
    name: 'Account',
    description: 'This represents an Account',
    fields: () => {
        return {
            
            account_id: {
                type: GraphQLInt,
                resolve(account) {
                    return account.account_id
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(account) {
                    return account.firstName
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(account) {
                    return account.lastName
                }
            },
            dob: {
                type: GraphQLString,
                resolve(account) {
                    return account.dob
                }
            },
            
            purse: {
                type: new GraphQLList(Purse),
                resolve(account) {
                    console.log(account)
                    return account.getPurses();
                }
            }
        }
    }
})

const Purse = new GraphQLObjectType({
    name: 'Purse',
    description: 'This represents a Purse',
    fields: () => {
        return {
            purse_id: {
                type: GraphQLInt,
                resolve(purse) {
                    return purse.purse_id
                }
            },
            name: {
                type: GraphQLString,
                resolve(purse) {
                    return purse.name
                }
            },
            description: {
                type: GraphQLString,
                resolve(purse) {
                    return purse.description
                }
            },
            account: {
                type: new GraphQLList(Account),
                resolve(purse) {
                    return purse.getAccounts();
                }
            }
        }
    }
});

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     description: 'Functions to create stuff',
//     fields: () => {
//         return {
//             addPerson:{
//                 type: Person,
//                 args: {
//                     firstName: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     lastName: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     email: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(_, args){
//                     return Db.models.person.create({
//                         firstName: args.firstName,
//                         lastName: args.lastName,
//                         email: args.email.toLowerCase()
//                     });
//                 }
//             }
//         }
//     }
// })

const Schema = new GraphQLSchema({
    query: Query,
    // mutation: Mutation
})

// export default Schema;
module.exports = Schema;