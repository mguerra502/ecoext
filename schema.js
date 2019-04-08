// const graphql = require('graphql');
const encrypter = require("./utils/encrypter");
const decrypter = require("./utils/decrypter");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType,
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
            token_id: {
                type: GraphQLString,
                resolve(transaction){
                    return transaction.token_id;
                }
            }
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

const InputTransactionPayment = new GraphQLInputObjectType({
    name: 'InputTransactionPayment',
    description: 'This represents a InputTransactionPayment',
    fields: () => {
        return {
            ammount: {
                type: GraphQLFloat,
            },
            payment_type: {
                type: GraphQLString,
            }
        };
    }
});

const InputSocketInfo = new GraphQLInputObjectType({
    name: 'InputSocketInfo',
    description: 'This represents a Transaction Items',
    fields: () => {
        return {
            ipv4: {
                type: GraphQLString,
            },
            port: {
                type: GraphQLInt,
            }
        };
    }
});

const TransactionPayments = new GraphQLObjectType({
    name: 'TransactionPayment',
    description: 'This represents a Transaction Payment',
    fields: () => {
        return {
            
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
                    .then((project) => {
                        return project.type;
                    });
                }
            },
            
        };
    }
});


const PurseTransaction = new GraphQLObjectType({
    name: 'PurseTransaction',
    description: 'This represents a Purse Transaction',
    fields: () => {
        return {
            
            purse_id: {
                type: GraphQLInt,
                resolve(purse_transaction) {
                    return purse_transaction.purse_id;
                }
            },
            transaction_id: {
                type: GraphQLFloat,
                resolve(purse_transaction) {
                    return purse_transaction.transaction_id;
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
            transactionByToken: {
                type: Transaction,
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                
                resolve(root, args) {

                    return Db.models.keys.findOne({
                        where: args
                    })
                    .then((transaction) => {
                        
                        const token = String(transaction.dataValues.id);
                        const keyiv = String(transaction.dataValues.key_iv);
                        const keyaes = String(transaction.dataValues.key_aes);

                        const id = new decrypter(token, keyaes, keyiv).id;
                        
                        return Db.models.transaction.findOne({
                            where: {
                                transaction_id: id
                            }
                        });
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
            password: {
                type: GraphQLString,
                resolve(userlogin) {
                    return userlogin.password;
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
                    if (phonenumber.null) {
                        return phonenumber.null;
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
                    if (keys.null) {
                        return keys.null;
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
                    return Db.models.phone_number.create({
                        number: args.number,
                    });
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
                    return Db.models.account.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        gender: args.gender,
                        dob: args.dob,
                    });
                }
            },
            
            addTransaction: {
                type: Transaction,
                args: {
                    label: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    items: {
                        type: new GraphQLList(InputTransactionItems)
                    },
                    socketInfo:{
                        type: InputSocketInfo
                    },
                    paymentInfo:{
                        type: InputTransactionPayment
                    },
                },
                resolve(source, args) {
                    let tr_id = 0;
                    return Db.models.transaction.create({
                        label: args.label,
                        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        description: args.description,
                    })
                    .then((result) => {
                        tr_id = result.null;
                        
                        const transactionItems_array = [];
                        
                        args.items.forEach(element => {
                            transactionItems_array.push({
                                transaction_id: result.null,
                                price: element.price,
                                product: element.product,
                                quantity: element.quantity,
                                tax: element.tax
                            });
                        });
                        
                        return Db.models.transaction_items.bulkCreate(transactionItems_array);
                    })
                    
                    .then((result) => {
                        
                        const ammountPaid = args.paymentInfo.ammount;
                        
                        Db.models.payment_type.findOne({
                            where: {
                                type: args.paymentInfo.payment_type,
                            },
                        })
                        
                        .then((project) => {

                            const payment_type_id_id = project.dataValues.payment_type_id;

                            return Db.models.transaction_payment.create({
                                paid: ammountPaid,
                                transaction_id: tr_id,
                                payment_type_id: payment_type_id_id,
                            });
                        });
                        
                    })

                    .then(() => {
                        const enc = new encrypter(String(tr_id));
                        
                        return Db.models.keys.create({
                            id: enc.token,
                            key_aes: enc.keyAES,
                            key_iv: enc.keyIV,
                            port: args.socketInfo.port,
                            ipv4: args.socketInfo.ipv4,
                        });
                    }).then((encrypted) => {
                        return {"token_id": encrypted.id, transaction_id: tr_id};
                    })
                    
                    .catch((err) => {
                        console.log("err");
                        console.log(err);
                    });
                }
            },
            addTransactionToPurse: {
                type: PurseTransaction,
                args: {
                    purse_id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    
                    transaction_token: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                resolve(source, args) {

                    const token = args.transaction_token;

                    return Db.models.keys.findOne({
                        where: {
                            id: token
                        }
                    })
                    .then((foundToken) => {
                        const key_aes = foundToken.dataValues.key_aes;
                        const key_iv = foundToken.dataValues.key_iv;

                        return new decrypter(token, key_aes, key_iv).id;
                    })
                    .then((transaction_id) => {
                        return Db.models.purse_transactions.create({
                            purse_id: args.purse_id,
                            transaction_id: transaction_id
                        })
                    })
                    
                    .then((purse_transaction) => {
                        return Db.models.keys.destroy({
                            where: {
                                id: token
                            }
                        })
                    })
                    .then((deleted_key) => {
                        console.log(deleted_key)
                    })
                }
            },
            addUser: {
                type: UserLogin,
                args: {
                    first_name: {
                        type: GraphQLString,
                    },
                    last_name: {
                        type: GraphQLString,
                    },
                    gender: {
                        type: GraphQLString,
                    },
                    dob: {
                        type: GraphQLFloat,
                    },
                    uid: {
                        type: GraphQLString,
                    },
                    email: {
                        type: GraphQLString,
                    },
                    password: {
                        type: GraphQLString,
                    },
                },
                resolve(source, args) {
                    var addUser = `CALL CreateUser("${args.first_name}", "${args.last_name}", "${args.gender}", "${args.dob}", "${args.uid}", "${args.email}", "${args.password}");`;

                    return Db.query(addUser, null, {
                        raw: true
                    }).then((result) => {
                        return Db.models.user_login.findOne({
                            where: {
                                user_id: args.uid
                            }
                        });
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            },
        };
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});


module.exports = Schema;