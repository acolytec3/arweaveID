function save_identity_field (type, value) {
    (async () => {
        $(".btn-save").addClass("disabled").addClass("wait");

        var unixTime = Math.round((new Date()).getTime() / 1000)

        var tx =
			await arweave.createTransaction(
			    {
			        data: value,
			    },
			    wallet
			)

        tx.addTag('App-Name', 'arweave-id')
        tx.addTag('App-Version', versionNumber)
        tx.addTag('Unix-Time', unixTime)
        tx.addTag('Type', type)
        await arweave.transactions.sign(tx, wallet)
        console.log(tx.id)
        var valid = await arweave.transactions.verify(tx)
        if (valid == true)
            { 
                alert('Arweave tx is valid!');
            }
        else { alert('Arweave tx is invalid!')}
        
        $(".btn-save").removeClass("disabled").removeClass("wait");
    })()
}
