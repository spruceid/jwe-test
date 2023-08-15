const { default: base64url } = require('base64url');
const { JWE, JWK } = require('node-jose');

async function main() {
    const priv = await JWK.createKey('EC', 'P-256');

    // assuming, encrypter receives public key of receiver, e.g., through jwks, jwks_uri
    const pub = await JWK.asKey(priv.toJSON(), 'public');
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
        vp_token: 'o2ZzdGF0dXMAZ3ZlcnNpb25jMS4waWRvY3VtZW50c4GjZ2RvY1R5cGV1b3JnLmlzby4xODAxMy41LjEubURMbGRldmljZVNpZ25lZKJqZGV2aWNlQXV0aKFvZGV2aWNlU2lnbmF0dXJlhEOhASag9lhANs223c6kwCPmAzxJ6iqPEWdK-xfU8DOO8R-H8N1c9PW-3ro6CPPKJWbjSioijMJoYJpvDB3eSdNIvgnIcFCux2puYW1lU3BhY2Vz2BhBoGxpc3N1ZXJTaWduZWSiamlzc3VlckF1dGiEQ6EBJqEYIVkBtzCCAbMwggFaoAMCAQICFF89NpavJ2aAWxoM_dnN7pizUPfLMAoGCCqGSM49BAMCMCMxCzAJBgNVBAYTAlVUMRQwEgYDVQQDDAtJQUNBIFV0b3BpYTAeFw0yMzAzMzEwNzE4NDZaFw0yNDA1MDQwNzE4NDVaMCYxFzAVBgNVBAMMDlV0b3BpYSBEb2NTaWduMQswCQYDVQQGEwJVVDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABCHPaJJhj0iszJzdD8KK4hTBpNPscN8jSABUJkqPIv6_Jdj9v-BDKu2bOWd0KS5TIrPmHqzDkkXQDoIMbR2xujKjaTBnMB8GA1UdIwQYMBaAFD6EoN8VXjAP6-AhO8rpKkSLx0ASMBUGA1UdJQEB_wQLMAkGByiBjF0FAQIwHQYDVR0OBBYEFILj_ktyDP5MtY86cxMf9u-QuWFvMA4GA1UdDwEB_wQEAwIHgDAKBggqhkjOPQQDAgNHADBEAiA4a4nramTuN4G6k4jzr7nmy-pxiVL4uOdHBSj_LLObFQIgdB3EMJ0n2ZLWRRUhmJ3WeIORzIZ9_wlXssVnCmVhiM5ZA_jYGFkD86ZnZG9jVHlwZXVvcmcuaXNvLjE4MDEzLjUuMS5tRExndmVyc2lvbmMxLjBsdmFsaWRpdHlJbmZvo2ZzaWduZWTAdDIwMjMtMDMtMzFUMDc6NDc6MTlaaXZhbGlkRnJvbcB0MjAyMy0wMy0zMVQwNzo0NzoxOVpqdmFsaWRVbnRpbMB0MjAyNy0wMS0wMlQwMDowMDowMFpsdmFsdWVEaWdlc3RzoXFvcmcuaXNvLjE4MDEzLjUuMbQAWCA_Kk7C-I-G1fYlVggcbgvgwAYZ9WTvPnRF_R0BNHipyARYINrVQxwlfmmCHTNi8Dv4Z24F7l_9wwFocMUjd_-m6_sEB1ggDlYpzekgZhQpOrnhg1RH2tf73zp1e-fhMelNasslB14IWCCsZWowZKPrjqEt6C17ES6mqtGlljM0-9v93Z17oISdLAlYIDk5T2eVoGj35HLCmDRWL-CgVWtR_k7rQEK79NqKEQh6ClggX4gMwb6VG3gMeOOVxg_fHgr3aTBRFFtkDmWIIQKcOegLWCCx078bL8El6vC8tYMC7SH38N2R_GvY2obz4KyrK3p2RwxYIKw8BK3Bmh7oIkHQ8Z1XznLeVw50P9EmhxeGSQ1Ilr4tDVggX2RC7rEM8f-8d9GuTNvtlSYEXARstwMTF63C1ZEKHigOWCB-QX6DbYp4NiBJKGO-hZ9Q_lkOLTawHkN1V8uM7LJqhg9YIEaLITkTnto8dOdF7BkCOdrsH9f9URzvJd6JdY55HEcFEFggep5SMwO8A1FH1pJFuk48D4dpa92I6ykhdsQoE78VuhERWCDZIRRHFY7WFAOnBIRMO9NlDo7Ye4mxWpRyFZPuFC8tWBNYICTjL08fY_I8HUu_2KKUU9SygoeoLFeMGgXbcvuluA58FFgg-akuY5zwzdA7GeAW_oBPxgjOJVwCRB_tgsvNrhheuu0VWCBlxYnTOg5AC_Oqrt-FuswAYZFmULPXNUoF4e_VqHSZyBZYIBmLtyEhJJ1KZQpaVMW778XlfwO8HNLZL6Q6cazi2lw1GBhYIGeQzCWjaPyb2LTG6rMNPutyIxxGKiQn7b2SIkwwBbxZGBlYINPVv0fJwqKLq3rTJ1XMeQonS5ddYWZm_x1qno7FBxH0GBpYIPztcSHK2APedSQPbeh-13ASAdlJwNk9i_Q6Gfm0nuyBbWRldmljZUtleUluZm-haWRldmljZUtleaQBAiABIVggckEDH341JeHkSya73EmRaa7YysHQAnNz5GV5Ycu2uVgiWCA4My3cdRTmiaNGH9TONtdp9AXH9Q5gt6tnGQKN2eEOem9kaWdlc3RBbGdvcml0aG1nU0hBLTI1NlhAdpjABFrULcruHF-VA0LDRrkP-4Rjls9R6BWDBMXN1hwdpSazLzylwHOZ61D-EvRlkFALJ2LoaxwWmEKZZEiSYGpuYW1lU3BhY2VzoXFvcmcuaXNvLjE4MDEzLjUuMYbYGFhSpGhkaWdlc3RJRAxmcmFuZG9tUPc7rk3JR-Scad7GrfKfMWJxZWxlbWVudElkZW50aWZpZXJqZ2l2ZW5fbmFtZWxlbGVtZW50VmFsdWVkSm9obtgYWFukaGRpZ2VzdElEDWZyYW5kb21QIn_hvCYvd2IsTFKngjYjInFlbGVtZW50SWRlbnRpZmllcnFpc3N1aW5nX2F1dGhvcml0eWxlbGVtZW50VmFsdWVmVXRvcGlh2BhYUqRoZGlnZXN0SUQPZnJhbmRvbVBNd3iVOm0PIqPKVCMZZaoocWVsZW1lbnRJZGVudGlmaWVya2ZhbWlseV9uYW1lbGVsZW1lbnRWYWx1ZWNEb2XYGFhcpGhkaWdlc3RJRBNmcmFuZG9tUHYHJA8oQrAA4qjOqWV2uBZxZWxlbWVudElkZW50aWZpZXJrZXhwaXJ5X2RhdGVsZWxlbWVudFZhbHVl2QPsajIwMzAtMDItMjLYGFhcpGhkaWdlc3RJRBgYZnJhbmRvbVADFZndea5Tz1Ly4KkWUxG5cWVsZW1lbnRJZGVudGlmaWVyamlzc3VlX2RhdGVsZWxlbWVudFZhbHVl2QPsajIwMjAtMDItMjPYGFhcpGhkaWdlc3RJRBgaZnJhbmRvbVCkf0zOGyzOPlfvq3j8qS0-cWVsZW1lbnRJZGVudGlmaWVyamJpcnRoX2RhdGVsZWxlbWVudFZhbHVl2QPsajE5ODUtMDItMDU',
        presentation_submission: {
            "definition_id": "mDL-sample-req",
            "id": "mDL-sample-res",
            "descriptor_map": [
                {
                    "id": "org.iso.18013.5.1.mDL",
                    "format": "mso_mdoc",
                    "path": "$"
                }
            ]
        }})).final()

    console.log('encrypted: ', encrypted);
    console.log('static pub key: ', pub.toJSON());
    console.log('static priv key: ', priv.toJSON(true));

    // now we decrypt using the private key

    const decrypted = await JWE.createDecrypt(priv).decrypt(encrypted);
    console.log('decrypted', JSON.parse(decrypted.payload.toString('utf8')));
}

main()
