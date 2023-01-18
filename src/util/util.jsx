import { sha256 } from 'crypto-hash';


export const handleTextInput = async (pw) => {
    let result = "";
    result = await sha256(pw)
    return result;
}