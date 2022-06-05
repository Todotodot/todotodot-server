module.exports = {
  secretKey: process.env.SECRET_KEY,
  option: {
    algorithm: "HS256",
    expiresIn: "30m",
  },
};
