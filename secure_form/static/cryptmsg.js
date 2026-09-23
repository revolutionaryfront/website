function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
window.onload = function() {
    const redir_msg = getParameterByName('redir_msg');
    if (redir_msg) {
        span = document.getElementById("redirmsgtxt");
        txt = document.createTextNode(redir_msg);
        span.appendChild(txt);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const ignoreNames = ['k', 'formredir'];

        const formElements = Array.from(form.elements);
        let form_data = '';
        formElements.forEach(element => {
            if (!ignoreNames.includes(element.name) && element.name) {
                form_data += element.name + ': ' + element.value + '\n';
                element.value = '';
            }
        });

        // This might run into CORS issues. Just going to hardcode the key
        // in JS while testing.
        //
        // This is intended to be a kind of ersatz TOTP implementation. It
        // probably doesn't do much but is mostly here to deter bots.
        /*
        const key_resp = await fetch('https://rf.mt.oits.fail/' +
                                     'pubweb_form_key?pk=MTI3MTQK');
        const key = await key_resp.json();
        if (key) {
            form.querySelector('#k').value = key;
        }
        */
        const key = `TVRJM01UUUtNVFl6TWpZSwo=`;
        form.querySelector('#k').value = key;


        const pgpKeyResponse = await fetch(
            'https://secform.revolutionaryfront.org/pgp_pub_key'
        );
        const pgpKeyJson = await pgpKeyResponse.json();
        const b64PubKey = pgpKeyJson.key;
        const bytes = Uint8Array.from(atob(b64PubKey), c => c.charCodeAt(0));
        const publicKeyArmored = new TextDecoder().decode(bytes);

        const publicKey = await openpgp.readKey({
            armoredKey: publicKeyArmored
        });


        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: form_data }),
                                                 encryptionKeys: publicKey,
        });

        formElements.forEach(element => {
            if (!ignoreNames.includes(element.name) && element.name) {
                element.value = encrypted;
            }
        });
        form.querySelector('#message').value = encrypted;
        form.querySelector('#formredir').value = 'https://oits.fail/' +
                                                 'rfwebsite/_html_working/' +
                                                 'contact.html?redir_msg=' +
                                                 'Submission%20Received';
        if (encrypted && key) {
            form.submit();
        }
    });
});