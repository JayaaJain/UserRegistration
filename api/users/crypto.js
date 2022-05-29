const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = Buffer.from('vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3');
const iv = Buffer.from('+BVWqljQ*680)KCZ');

function encrypt(buffer) {
    var cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
}

module.exports = {
    encrypt: encrypt
}
