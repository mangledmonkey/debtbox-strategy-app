import CryptoJS from "crypto-js";
import { PUBLIC_IV } from "$env/static/public";

// Function to hash the wallet address to use as the encryption key
function hashKey(walletAddress: string|null): CryptoJS.lib.WordArray {
    if (walletAddress)
        return CryptoJS.SHA256(walletAddress);
    
    return CryptoJS.SHA256(PUBLIC_IV);
}

// Encrypt a value
export function encryptWallet(
    address: string,
    walletAddress:
    string
): string {
    const key = hashKey(walletAddress);
    const iv = CryptoJS.enc.Hex.parse(PUBLIC_IV);
    const encrypted = CryptoJS.AES.encrypt(address, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
}

// Decrypt a value
export function decryptWallet(
    encryptedValue: string,
    walletAddress: string
): string {
    const key = hashKey(walletAddress);
    const iv = CryptoJS.enc.Hex.parse(PUBLIC_IV);
    const bytes = CryptoJS.AES.decrypt(encryptedValue, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
}
