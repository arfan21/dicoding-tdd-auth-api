interface PasswordHashInterface {
    hash(password: string): Promise<string>;
}

export default PasswordHashInterface;
