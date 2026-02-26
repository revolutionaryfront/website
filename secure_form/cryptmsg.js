
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const messageTextArea = form.querySelector('textarea[name="message"]');
        const message = messageTextArea.value;
        const form_data = 'Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message;
        form.querySelector('#name').value = '';
        form.querySelector('#email').value = '';


        // This might run into CORS issues. Just going to hardcode the key
        // in JS while testing.
        /*
        const key_resp = await fetch(`https://rf.mt.oits.fail/pubweb_form_key?pk=MTI3MTQK`);
        const key = await key_resp.json();
        if (key) {
            console.log(key);
            form.querySelector('#k').value = key;
        }
        */
        const key = `TVRJM01UUUtNVFl6TWpZSwo=`;
        form.querySelector('#k').value = key;


        const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEaZ/2ZhYJKwYBBAHaRw8BAQdAp95J+Od7ejHB05IKk6u4QaJxTEQ4Aqgw
gwxFI0wPbsnNJXNlY2Zvcm1AcmZkZncub3JnIDxzZWNmb3JtQHJmZGZ3Lm9y
Zz7CwBEEExYKAIMFgmmf9mYDCwkHCRCo3IZK8ACd80UUAAAAAAAcACBzYWx0
QG5vdGF0aW9ucy5vcGVucGdwanMub3JnU8QTRHDUldxRpBtoonECi1AW9nMT
KECnVM5Xb2FoDM4DFQoIBBYAAgECGQECmwMCHgEWIQSKKEyzleZBFAlys3mo
3IZK8ACd8wAAQxYBALp4LfI7y1pqyInJiQvowArb5PiLmpPgkHBmeCO+xtXO
AP9xV02RA6DucBfi62d0xppFDCkgIiAvlhLajrAEXnPHDM44BGmf9mYSCisG
AQQBl1UBBQEBB0ByQ4V7gojunmuoGo/0viiVII/hlirCo/oJbbkgaluBaAMB
CAfCvgQYFgoAcAWCaZ/2ZgkQqNyGSvAAnfNFFAAAAAAAHAAgc2FsdEBub3Rh
dGlvbnMub3BlbnBncGpzLm9yZxKq4k2+bBy/gZy8ji9ga+jL6F5NZuz1iMzM
ljnw/UNDApsMFiEEiihMs5XmQRQJcrN5qNyGSvAAnfMAAC81AQDhP+STSZdY
THXMW5Azl4XkyQVZfG9jDO5SiXdvd37s7AD+Lo5ndahHdfkb2B9kjZq7dd64
6noRHC3lLuFSYSkuagA=
=Xu58
-----END PGP PUBLIC KEY BLOCK-----`;

        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });


        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: form_data }), // input as Message object
                                                encryptionKeys: publicKey,
        });
        form.querySelector('#message').value = encrypted;
        messageTextArea.value = encrypted;

        //console.log(encrypted);
        if (encrypted && key) {
            form.submit();
        }
    });
});

/*
function prepareForm(event) {
    event.preventDefault();
    const form = document.querySelector('#contactForm');

    form.addEventListener('submit', function(event) {
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const messageTextArea = form.querySelector('textarea[name="message"]');
        const message = messageTextArea.value;
        const form_data = name + '\n' + email + '\n' + message;
        form.querySelector('#name').value = '';
        form.querySelector('#email').value = '';
        (async () => {
            // put keys in backtick (``) to avoid errors caused by spaces or tabs
            const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEaZ/2ZhYJKwYBBAHaRw8BAQdAp95J+Od7ejHB05IKk6u4QaJxTEQ4Aqgw
gwxFI0wPbsnNJXNlY2Zvcm1AcmZkZncub3JnIDxzZWNmb3JtQHJmZGZ3Lm9y
Zz7CwBEEExYKAIMFgmmf9mYDCwkHCRCo3IZK8ACd80UUAAAAAAAcACBzYWx0
QG5vdGF0aW9ucy5vcGVucGdwanMub3JnU8QTRHDUldxRpBtoonECi1AW9nMT
KECnVM5Xb2FoDM4DFQoIBBYAAgECGQECmwMCHgEWIQSKKEyzleZBFAlys3mo
3IZK8ACd8wAAQxYBALp4LfI7y1pqyInJiQvowArb5PiLmpPgkHBmeCO+xtXO
AP9xV02RA6DucBfi62d0xppFDCkgIiAvlhLajrAEXnPHDM44BGmf9mYSCisG
AQQBl1UBBQEBB0ByQ4V7gojunmuoGo/0viiVII/hlirCo/oJbbkgaluBaAMB
CAfCvgQYFgoAcAWCaZ/2ZgkQqNyGSvAAnfNFFAAAAAAAHAAgc2FsdEBub3Rh
dGlvbnMub3BlbnBncGpzLm9yZxKq4k2+bBy/gZy8ji9ga+jL6F5NZuz1iMzM
ljnw/UNDApsMFiEEiihMs5XmQRQJcrN5qNyGSvAAnfMAAC81AQDhP+STSZdY
THXMW5Azl4XkyQVZfG9jDO5SiXdvd37s7AD+Lo5ndahHdfkb2B9kjZq7dd64
6noRHC3lLuFSYSkuagA=
=Xu58
-----END PGP PUBLIC KEY BLOCK-----`;

            const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });


            const encrypted = await openpgp.encrypt({
                message: await openpgp.createMessage({ text: form_data }), // input as Message object
                                                    encryptionKeys: publicKey,
            });
            form.querySelector('#message').value = encrypted;
            messageTextArea.value = encrypted;

            console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
        })();
    document.getElementById("contactForm").requestSubmit();
    });
}*/