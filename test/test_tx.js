const {
    describe,
    it
} = require('mocha')
const assert = require('assert')
const bitcoin = require('bitcoinjs-lib')

function rng() {
    return Buffer.from('YT8dAtK4d16A3P1z+TpwB2jJ4aFH3g9M1EioIBkLEV4=', 'base64')
}

describe('bitcoinjs-lib (transactions)', function () {
    it('can create a 1-to-1 Transaction', function () {
        const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy')
        const txb = new bitcoin.TransactionBuilder()

        txb.setVersion(1)
        txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0) // Alice's previous transaction output, has 15000 satoshis
        txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000)
        // (in)15000 - (out)12000 = (fee)3000, this is the miner fee

        txb.sign(0, alice)

        // prepare for broadcast to the Bitcoin network, see "can broadcast a Transaction" below
        assert.strictEqual(txb.build().toHex(), '01000000019d344070eac3fe6e394a16d06d7704a7d5c0a10eb2a2c16bc98842b7cc20d561000000006b48304502210088828c0bdfcdca68d8ae0caeb6ec62cd3fd5f9b2191848edae33feb533df35d302202e0beadd35e17e7f83a733f5277028a9b453d525553e3f5d2d7a7aa8010a81d60121029f50f51d63b345039a290c94bffd3180c99ed659ff6ea6b1242bca47eb93b59fffffffff01e02e0000000000001976a91406afd46bcdfd22ef94ac122aa11f241244a37ecc88ac00000000')
    })
});

