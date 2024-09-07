import bcrypt from 'bcryptjs'
async function loginValidate (password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
}

export default loginValidate