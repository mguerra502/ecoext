// Libraies requiered to encrypt strings
var Crypto = require("crypto-js");
var CryptoJS = require("crypto-js");
var hex64 = require('hex64');

class decrypter {
    constructor(ecoExTTransactionToken, keyI, keyII) {
        /**
         * I am not needing the keys, this are going to be retrieved from a 
         * function in this class that connects to the database.
         */
        // Decrypting        
        this._decryptedValue = this._decryptToken(ecoExTTransactionToken, keyI, keyII);
    }

    _decryptToken(ciphertextStr, keyI, keyII) {
        // Convert to Decimal array
        const decArr = this._hexStringToDecimalArray(hex64.transform(ciphertextStr));
        const keyAES = this._hexStringToDecimalArray(keyI);
        const keyIV = this._hexStringToDecimalArray(keyII);
        // Decrypt
        var decrypted = Crypto.AES.decrypt({ciphertext: decArr}, keyAES, {
            iv: keyIV
        });
        
        return parseInt(decrypted.toString(CryptoJS.enc.Utf8), 16).toString(10);
    }

    _hexStringToDecimalArray(hexString) {
        var decArray = [];
    
        for (var i = 0; i < hexString.length; i += 8) {
            decArray[i/8] = this._hexTo32BitsSignedInteger(hexString.slice(i, i + 8));
        }
    
        var result = {
            words: decArray,
            sigBytes: hexString.length/2
        };
    
        return result;
    }

    _hexTo32BitsSignedInteger(hexValue) {
        // First, convert to binary
        var binValue = parseInt(hexValue, 16).toString(2);
        // Output Integer string
        var signedIntValue = "";
        // Check if binary number length is equal to 16
        if (binValue.length > 31) {
            signedIntValue += "-" + parseInt(binValue.substring(1), 2).toString(10);
        } else {
            signedIntValue += parseInt(binValue, 2).toString(10);
        }
        
        return signedIntValue;
    }

    get id() {
        return this._decryptedValue;
    }

}

module.exports = decrypter;