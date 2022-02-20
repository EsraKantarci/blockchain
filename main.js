const{Blockchain, Transaction} = require("./blockchain");

let aCoin = new Blockchain();
// aCoin.addBlock(new Block(1, "21/10/2022", { amount: 2 }));
// aCoin.addBlock(new Block(2, "23/10/2022", { amount: 4 }));
// aCoin.addBlock(new Block(3, "21/10/2022", { amount: 10 }));

// console.log(JSON.stringify(aCoin, null, 4));

// console.error("Is block valid? " + aCoin.isChainValid());

// aCoin.chain[1].details = { amount: 20 };
// console.log("Now? " + aCoin.isChainValid());
// aCoin.chain[1].details = { amount: 2 };
// console.log("Now? " + aCoin.isChainValid());

aCoin.createTransaction(new Transaction("a", "b", 100));
aCoin.createTransaction(new Transaction("b", "a", 20));

console.log("Starting ... ");
aCoin.minePendingTransactions("c");

console.log("C'nin balance'ı: ", aCoin.getBalanceOfAddress("c"));
aCoin.minePendingTransactions("c");

console.log("C'nin balance'ı 2: ", aCoin.getBalanceOfAddress("c"));
console.log("A'nin balance'ı: ", aCoin.getBalanceOfAddress("a"));