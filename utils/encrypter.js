// Libraies requiered to encrypt strings
var Crypto = require("crypto-js");
var CryptoJS = require("crypto-js");
var hex64 = require('hex64');

class EcoExtEncrypter {

    constructor(transaction_id) {
        // Encrypting
        this._encryptedValue = this._encryptID(transaction_id);
    }

    _encryptID(valueToEncrypt) {
        // Convert to hex and pad string with zeros to the left
        const strHex = parseInt(valueToEncrypt, 10).toString(16).padStart(95, '0');
        // Generate keys
        const keyIV = CryptoJS.lib.WordArray.random(16);
        const keyAES = CryptoJS.lib.WordArray.random(32);
        this._keyIV = this._createHexString(keyIV.words);
        this._keyAES = this._createHexString(keyAES.words);
        // Encrypt
        var encrypted = Crypto.AES.encrypt(strHex, keyAES, {
            iv: keyIV
        });
        
        var encryptedString = hex64.transform(this._createHexString(encrypted.ciphertext.words));

        return encryptedString;
    }

    _createHexString(value) {
        var string = "";
        for (var i = 0; i < value.length; i++) {
            string = string + this._signed32BitsIntegerToHex(value[i]);
        }

        return string;
    }

    _signed32BitsIntegerToHex(intValue) {
        // Output hex string
        var hexValue = "";
        var binValue = "";
        // Check if intValue is negative or zero
        if (intValue < 0) {
            binValue = Math.abs(parseInt(intValue, 10)).toString(2);

            while (binValue.length < 31) {
                binValue = "0" + binValue;
            }
            binValue = "1" + binValue;

            hexValue = parseInt(binValue, 2).toString(16);
        } else {
            binValue = parseInt(intValue, 10).toString(2);
            hexValue = parseInt(binValue, 2).toString(16);

            while (hexValue.length < 8) {
                hexValue = "0" + hexValue;
            }
        }

        return hexValue;
    }

    get token() {
        return this._encryptedValue;
    }

    get keyAES() {
        return this._keyAES;
    }

    get keyIV() {
        return this._keyIV;
    } 

}

module.exports = EcoExtEncrypter;