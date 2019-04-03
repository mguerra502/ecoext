const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType
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
                    return establishment.getPhoneNumber();
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
                    if (transaction.null) {
                        return transaction.null;
                    }
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
                    return transaction.getTransactionPayments();
                }
            },
        };
    }
});

// const PaymentType = new GraphQLObjectType({
//     name: 'PaymentType',
//     description: 'This represents an Payment Type',
//     fields: () => {
//         return {
//             payment_type_id: {
//                 type: GraphQLInt,
//                 resolve(payment_type) {
//                     return payment_type.payment_type_id;
//                 }
//             },
//             type: {
//                 type: GraphQLString,
//                 resolve(payment_type) {
//                     return payment_type.type;
//                 }
//             }
//         };
//     }
// });

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
const InputTransactionItems = new GraphQLInputObjectType({
    name: 'Items',
    description: 'This represents a Transaction Items',
    fields: () => {
        return {
            transaction_id: {
                type: GraphQLInt,
            },
            product: {
                type: GraphQLString,
            },
            price: {
                type: GraphQLFloat,
            },
            quantity: {
                type: GraphQLInt,
            },
            tax: {
                type: GraphQLFloat,
            }
        };
    }
});

const TransactionPayments = new GraphQLObjectType({
    name: 'TransactionPayment',
    description: 'This represents a Transaction Payment',
    fields: () => {
        return {
            // transaction_id: {
            //     type: GraphQLInt,
            //     description: "The id of the transaction",
            //     resolve(transaction_payment) {
            //         return transaction_payment.transaction_id;
            //     }
            // },
            payment_type_id: {
                type: GraphQLInt,
                resolve(transaction_payment) {
                    return transaction_payment.transaction_id;
                }
            },
            ammount: {
                type: GraphQLFloat,
                resolve(transaction_payment) {
                    return transaction_payment.paid;
                }
            },
            payment_type: {
                type: GraphQLString,
                resolve(root, args) {
                    // Basically if the model exists
                    // we are able to call it from the schema
                    return Db.models.payment_type.findByPk(root.payment_type_id)
                    .then(project => {
                        return project.type;
                    });
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
            user: {
                type: new GraphQLList(UserLogin),
                args: {
                    user_id: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.user_login.findAll({
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
            keys: {
                type: new GraphQLList(Keys),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return Db.models.keys.findAll({
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
                     if (account.null) {
                         return account.null;
                     }
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

const UserLogin = new GraphQLObjectType({
    name: 'UserLogin',
    description: 'This represents a UserLogin',
    fields: () => {
        return {
            account_id: {
                type: GraphQLInt,
                resolve(userlogin) {
                    return userlogin.account_id;
                }
            },
            email: {
                type: GraphQLString,
                resolve(userlogin) {
                    return userlogin.email;
                }
            },
            passwrod: {
                type: GraphQLString,
                resolve(userlogin) {
                    return userlogin.passwrod;
                }
            },
            user_id: {
                type: GraphQLString,
                resolve(userlogin) {
                    return userlogin.user_id;
                }
            },
            account: {
                type: Account,
                resolve(userlogin) {
                    return userlogin.getAccount();
                }
            },
        };
    }
});

const PhoneNumber = new GraphQLObjectType({
    name: 'PhoneNumber',
    description: 'This represents an PhoneNumber',
    
    fields: () => ({
            id: {
                type: GraphQLInt,
                resolve(phonenumber) {
                    console.dir(phonenumber)
                    if (phonenumber.null) {
                        return phonenumber.null
                    }
                    return phonenumber.id;
                }
            },
            number: {
                type: GraphQLString,
                resolve(phonenumber) {
                    return phonenumber.number;
                }
            },
    })
});

const Keys = new GraphQLObjectType({
    name: 'Keys',
    description: 'This represents a Key',
    
    fields: () => ({
            id: {
                type: GraphQLString,
                resolve(keys) {
                    console.dir(keys)
                    if (keys.null) {
                        return keys.null
                    }
                    return keys.id;
                }
            },
            key_aes: {
                type: GraphQLString,
                resolve(keys) {
                    return keys.key_aes;
                }
            },
            key_iv: {
                type: GraphQLString,
                resolve(keys) {
                    return keys.key_iv;
                }
            },
            ipv4: {
                type: GraphQLString,
                resolve(keys) {
                    return keys.ipv4;
                }
            },
            port: {
                type: GraphQLInt,
                resolve(keys) {
                    return keys.port;
                }
            },
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    // fields:{
    fields(){
        return {
            addPhoneNumber: {
                type: PhoneNumber,
                args: {
                    number: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                resolve(source, args) {
                    // console.log(source)
                    return Db.models.phone_number.create({
                        number: args.number,
                    })
                    // return Db.models.phone_number.create({
                    //     number: args.number,
                    // })
                }
            },
            addAccount: {
                type: Account,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    gender: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    dob: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                },
                resolve(source, args) {
                    // console.log(source)
                    return Db.models.account.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        gender: args.gender,
                        dob: args.dob,
                    })
                }
            },
            addKeys: {
                type: Keys,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    
                    key_aes: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    key_iv: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    ipv4: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    port: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                },
                resolve(source, args) {
                    // console.log(source)
                    return Db.models.keys.create({
                        id: args.id,
                        key_aes: args.key_aes,
                        key_iv: args.key_iv,
                        ipv4: args.ipv4,
                        port: args.port
                    })
                }
            },
            // addMovies(movies: [MovieInput]): [Movie]
            addTransaction: {
                // type: Transaction,
                type: Transaction,
                args: {
                    label: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    // date: {
                    //     type: new GraphQLNonNull(GraphQLInt)
                    // },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    items: {
                        // type: new GraphQLList(GraphQLString)
                        type: new GraphQLList(InputTransactionItems)
                        // type: new GraphQLList(new GraphQLInputObjectType({
                        //     name: "Teste"
                        // }))
                    },
                    
                },
                resolve(source, args) {
                    // console.log(source)
                    // const transaction_result = args.items[1];
                    // console.dir(args.items);
                    return Db.models.transaction.create({
                        label: args.label,
                        // date: 11111111,
                        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        description: args.description,
                    })
                    /*
                    .then((result) => {
                        const transactionItems_array = [];
                        const tid = result.null;

                        args.items.forEach(element => {
                            transactionItems_array.push({
                                transaction_id: result.null,
                                price: element.price,
                                product: element.product,
                                quantity: element.quantity,
                                tax: element.tax
                            });
                        });
                        
                        const items_result = Db.models.transaction_items.bulkCreate(transactionItems_array);

                        return tid;
                    });
                    /* */
                }
            },
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});


module.exports = Schema;