export function isBcryptHash(bcrypt: string) {
  const bcryptRegex = /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;
  return bcryptRegex.test(bcrypt);
}
