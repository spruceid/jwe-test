const { default: base64url } = require('base64url');
const { JWE, JWK } = require('node-jose');

async function main() {
    const priv = await JWK.createKey('EC', 'P-256');

    // assuming, encrypter receives public key of receiver, e.g., through jwks, jwks_uri
    const pub = await JWK.asKey(priv.toJSON());
    const mdocNonce = base64url("d4fDF34450023_$%");
    const apvValue = base64url("SKReader");

    // encrypts to public key, generates new epk
    const encrypted = await JWE.createEncrypt({
        format: 'compact',
        fields: {
          alg: 'ECDH-ES',
          enc: 'A256GCM',
          apu: mdocNonce,
          apv: apvValue
        },
    }, {
        key: pub,
    }).update(JSON.stringify({
        vp_token: 'asdf',
        presentation_submission: 'asdf' })).final()

    console.log('encrypted: ', encrypted);
    console.log('static pub key: ', JSON.stringify(pub));
    console.log('static priv key: ', JSON.stringify(priv));

    // now we decrypt using the private key

    const decrypted = await JWE.createDecrypt(priv).decrypt(encrypted);
    console.log('decrypted', JSON.parse(decrypted.payload.toString('utf8')));
}

main()
