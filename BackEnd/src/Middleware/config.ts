import bcrypt from "bcrypt";

export const createHash = (password : string) : string =>{
    const result = bcrypt.hashSync(password , 10);
    return result;
}

