import type { Address } from "viem";

type Params = {
    nPrefix?: number;
    nSuffix?: number;
    separator?: 'braces' | 'brackets' | 'parenthesis';
  };
  
  const opening = {
    braces: '{',
    brackets: '[',
    parenthesis: '(',
  };
  
  const closing = {
    braces: '}',
    brackets: ']',
    parenthesis: ')',
  };
  
  export function truncateEthAddress(address: Address|string, { nPrefix, nSuffix, separator }: Params = {}) {
    const addressString = address.toString();
    const match = addressString.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/);
    const nTotalIsLongerThanAddress = (nPrefix || 0) + (nSuffix || 0) > address.length;
  
    return match && !nTotalIsLongerThanAddress
      ? `0x${address.slice(2, 2 + (nPrefix || 4))}${separator ? opening[separator] : ''}…${
          separator ? closing[separator] : ''
        }${address.slice(address.length - (nSuffix || 4))}`
      : address;
  }