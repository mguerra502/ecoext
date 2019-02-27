const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} = require('graphql');

// import Db from './db'
const Db = require('./db');

// const AccountPurse = new GraphQLObjectType({
//     name: 'AccountPurse',
//     description: 'This represents an AccountPurse',
//     fields: () => {
//         return {
//             account_id: {
//                 type: GraphQLInt,
//                 resolve(account_purse) {
//                     return account_purse.account_id
//                 }
//             },
//             purse_id: {
//                 type: GraphQLInt,
//                 resolve(account_purse) {
//                     return account_purse.purse_id
//                 }
//             }
//         }
//     }
// });

// const AccountNotification = new GraphQLObjectType({
//     name: 'AccountNotification',
//     description: 'This represents an AccountNotification',
//     fields: () => {
//         return {
//             account_id: {
//                 type: GraphQLInt,
//                 resolve(account_notification) {
//                     return account_notification.account_id
//                 }
//             },
//             notification_id: {
//                 type: GraphQLInt,
//                 resolve(account_notification) {
//                     return account_notification.notification_id
//                 }
//             }
//         }
//     }
// });

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

const Notification = new GraphQLObjectType({
    name: 'Notification',
    description: 'This represents an Notification',
    fields: () => {
        return {
            notification_id: {
                type: GraphQLInt,
                resolve(notification) {
                    return notification.notification_id
                }
            },
            name: {
                type: GraphQLString,
                resolve(notification) {
                    return notification.name
                }
            },
            type: {
                type: GraphQLString,
                resolve(notification) {
                    return notification.type
                }
            },
            description: {
                type: GraphQLString,
                resolve(notification) {
                    return notification.description
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
                    return transaction.transaction_id;
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
            transaction_items: {
                type: new GraphQLList(TransactionItems),
                resolve(transaction_items) {
                    return transaction_items.getTransactionItems();
                }
            }
        }
    }
});

const TransactionItems = new GraphQLObjectType({
    name: 'TransactionItems',
    description: 'This represents an Transaction Items',
    fields: () => {
        return {
            transaction_id: {
                type: GraphQLInt,
                resolve(transaction_items) {
                    return transaction_items.transaction_id;
                }
            },
            product: {
                type: GraphQLString,
                resolve(transaction_items) {
                    return transaction_items.product;
                }
            },
            price: {
                type: GraphQLFloat,
                resolve(transaction_items) {
                    return transaction_items.price;
                }
            },
            quantity: {
                type: GraphQLInt,
                resolve(transaction_items) {
                    return transaction_items.quantity;
                }
            },
            tax: {
                type: GraphQLFloat,
                resolve(transaction_items) {
                    return transaction_items.tax;
                }
            }
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
                    let a_args = args
                    return Db.models.account.findAll({
                        where: args
                    });
                }
            },
            purse: {
                type: new GraphQLList(Purse),
                args: {
                    purse_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    // console.log(Db.models.account_purses);
                    return Db.models.purse.findAll({
                        where: args
                    });
                }
            },
            establishment: {
                type: new GraphQLList(Establishment),
                resolve(root, args) {
                    // console.log(Db.models.establishment);
                    return Db.models.establishment.findAll({
                        where: args
                    });
                }
            },
            transaction: {
                type: new GraphQLList(Transaction),
                args: {
                    transaction_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    // console.log(Db.models.transaction);
                    return Db.models.transaction.findAll({
                        where: args
                    });
                }
            },
            notification: {
                type: new GraphQLList(Notification),
                resolve(root, args) {
                    // console.log(Db.models.notification);
                    return Db.models.notification.findAll({
                        where: args
                    });
                }
            },
            transaction_items: {
                type: new GraphQLList(TransactionItems),
                args: {
                    // transaction_id: {
                    //     type: GraphQLInt
                    // }
                },
                resolve(root, args) {
                    // console.log(Db.models.transaction);
                    return Db.models.transaction_items.findAll({
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
            },
            notification: {
                type: new GraphQLList(Notification),
                resolve(account) {
                    console.log(account)
                    return account.getNotifications();
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