function login (files) {
    try
    {
        walletAPI.getPublicKey().then(function (address) {
            var public_address;
            console.log('Received public key is ' + address);
            arweave.wallets.jwkToAddress(address).then((address) => {
                public_address = address;
                update_login_state(true, public_address);
            });
        })
    } catch (err) {
        console.log('Error: '+err);
    }
    
    var fr = new FileReader()
    fr.onload = function (ev) {
        try {
            wallet = JSON.parse(ev.target.result)

            var public_address;
            arweave.wallets.jwkToAddress(wallet).then((address) => {
                public_address = address;
                update_login_state(true, public_address);
            });
        } catch (err) {
            alert('Error logging in: ' + err)
        }
    }
    fr.readAsText(files[0])
}
