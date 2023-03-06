# B💎c Parser

Current release is deployed to IPFS to serve a more secure (single html file react app the CID of ipfs protect the code ) 

## Hosting

https://ton-defi-org.github.io/boc-parser-estimator

```
ipfs:///QmTGuyBxB6ksZ8qZp9Wxr8dHCiKNuj8eCiKh6Q62UjUuwA
```

https://cloudflare-ipfs.com/ipfs//QmTGuyBxB6ksZ8qZp9Wxr8dHCiKNuj8eCiKh6Q62UjUuwA

https://ipfs.io/ipfs//QmTGuyBxB6ksZ8qZp9Wxr8dHCiKNuj8eCiKh6Q62UjUuwA

## Overview

Welcome to the B💎c Parser, an HTML page for handling boc files on the TON blockchain.

A boc file, or "Bag of Cells," is a signed transaction on the TON blockchain that has the following fields:

- `Source Wallet`
- `Destination Address`
- `Amount in Ton`
- `bounce flag`
- `data`
- `StateInit Code and Data`


### Emulate Transactions
The B💎c Parser app allows you to run an emulation of a boc file on the network, and get the expected result. The emulation is done using the (ton-tvm-bus)[https://github.com/ton-defi-org/ton-tvm-bus] module. This can be useful for testing and debugging purposes.



### Share Boc & Publish
the app allows you to share the boc file through a link, which is useful for air gapped devices. This enables you to sign a transaction on an offline computer (see example at https://github.com/ton-defi-org/ton-offline-transaction), and publish ( using the publish boc button) the signed boc through a device with internet connection.
