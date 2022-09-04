const getCookiesExpireTime = () => {
    let expireLimit = process.env.JWT_TOKEN_EXPIRATION.replace("d", "");
    const expiresIn = new Date(Date.now() + expireLimit * 24 * 60 * 60 * 1000);
    return expiresIn  // THIS WILL RETURN miliseconds
}

export { getCookiesExpireTime }