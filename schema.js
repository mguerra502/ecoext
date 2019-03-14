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

const Db = require('./db');


const Establishment = new GraphQLObjectType({
    name: 'Establishment',
    description: 'This represents an Establishment',
    fields: () => {
        return {
            establishment_id: {
                type: GraphQLInt,
                resolve(establishment) {
                    return establishment.establishment_id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.name;
                }
            },
            address: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.address;
                }
            },
            lat: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.lat;
                }
            },
            lon: {
                type: GraphQLString,
                resolve(establishment) {
                    return establishment.lon;
                }
            },
            phonenumber: {
                type: new GraphQLList(PhoneNumber),
                resolve(establishment) {
                    return establishment.getPhoneNumbers();
                    return establishment.getNotifications();
                }
            },
            notifications: {
                type: new GraphQLList(Notification),
                resolve(establishment) {
                    return establishment.getNotifications();
                }
            },
            transaction: {
                type: new GraphQLList(Transaction),
                resolve(establishment) {
                    return establishment.getTransactions();
                }
            },
        };
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
                    return notification.notification_id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(notification) {
                    return notification.name;
                }
            },
            type: {
                type: GraphQLString,
                resolve(notification) {
                    return notification.type;
                }
            },
            description: {
                type: GraphQLString,
                resolve(notification) {
                    return notification.description;
                }
            },
        };
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
                    return transaction.date;
                }
            },
            label: {
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.label;
                }
            },
            description: {
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.description;
                }
            },
            notification: {
                type: new GraphQLList(Notification),
                resolve(transaction) {
                    return transaction.getNotifications();
                }
            },
            items: {
                type: new GraphQLList(TransactionItems),
                resolve(transaction) {
                    return transaction.getTransactionItems();
                }
            },
            payment: {
                type: new GraphQLList(TransactionPayments),
                resolve(transaction) {
                    // return transaction.getNotifications();
                    // return transaction.getTransactionItems();
                    return transaction.getTransactionPayments();
                    // return transaction.getPayments();
                }
            },
        };
    }
});

const TransactionItems = new GraphQLObjectType({
    name: 'TransactionItems',
    description: 'This represents a Transaction Items',
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
        };
    }
});
const TransactionPayments = new GraphQLObjectType({
    name: 'TransactionPayment',
    description: 'This represents a Transaction Payment',
    fields: () => {
        return {
            transaction_id: {
                type: GraphQLInt,
                resolve(transaction_items) {
                    return transaction_items.transaction_id;
                }
            },
            payment_type_id: {
                type: GraphQLInt,
                resolve(transaction_items) {
                    return transaction_items.transaction_id;
                }
            },
            paid: {
                type: GraphQLFloat,
                resolve(transaction_items) {
                    return transaction_items.paid;
                }
            },
        };
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
            purse: {
                type: new GraphQLList(Purse),
                args: {
                    purse_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return Db.models.purse.findAll({
                        where: args
                    });
                }
            },
            establishment: {
                type: new GraphQLList(Establishment),
                args: {
                    establishment_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
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
                    return Db.models.transaction.findAll({
                        where: args
                    });
                }
            },
            notification: {
                type: new GraphQLList(Notification),
                args: {
                    notification_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return Db.models.notification.findAll({
                        where: args
                    });
                }
            },
            phone_number: {
                type: new GraphQLList(PhoneNumber),
                args: {
                    phone_number_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return Db.models.phone_number.findAll({
                        where: args
                    });
                }
            },
        };
    }
});

const Account = new GraphQLObjectType({
    name: 'Account',
    description: 'This represents an Account',
    fields: () => {
        return {
            
            account_id: {
                type: GraphQLInt,
                resolve(account) {
                    return account.account_id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(account) {
                    return account.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(account) {
                    return account.lastName;
                }
            },
            dob: {
                type: GraphQLString,
                resolve(account) {
                    return account.dob;
                }
            },
            
            purse: {
                type: new GraphQLList(Purse),
                resolve(account) {
                    return account.getPurses();
                }
            },
            notification: {
                type: new GraphQLList(Notification),
                resolve(account) {
                    return account.getNotifications();
                }
            },
        };
    }
});

const Purse = new GraphQLObjectType({
    name: 'Purse',
    description: 'This represents a Purse',
    fields: () => {
        return {
            purse_id: {
                type: GraphQLInt,
                resolve(purse) {
                    return purse.purse_id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(purse) {
                    return purse.name;
                }
            },
            description: {
                type: GraphQLString,
                resolve(purse) {
                    return purse.description;
                }
            },
            account: {
                type: new GraphQLList(Account),
                resolve(purse) {
                    return purse.getAccounts();
                }
            },
            transaction: {
                type: new GraphQLList(Transaction),
                resolve(purse) {
                    return purse.getTransactions();
                }
            },
        };
    }
});

const PhoneNumber = new GraphQLObjectType({
    name: 'PhoneNumber',
    description: 'This represents an PhoneNumber',
    fields: () => {
        return {
            phone_number_id: {
                type: GraphQLInt,
                resolve(phonenumber) {
                    return phonenumber.phone_number_id;
                }
            },
            number: {
                type: GraphQLString,
                resolve(phonenumber) {
                    return phonenumber.number;
                }
            },
        };
    }
});

// const Mutation = new GraphQLObjectType({
//     name: 'Mutations',
//     description: 'Functions to set stuff',
//     fields:{
//         addPhoneNumber: {
//             type: PhoneNumber,
//             args: {
//                 number: {
//                     type: new GraphQLNonNull(GraphQLString)
//                 },
//             },
//             resolve(source, args) {
//                 return Db.models.phone_number.create({
//                     number: args.number,
//                 });
//             }
//         }
//     }
// });

const Schema = new GraphQLSchema({
    query: Query,
    // mutation: Mutation
});


module.exports = Schema;