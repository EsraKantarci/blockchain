const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, details, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.details = details;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();

  }
  //yukarıyı alıp, hashleyeceğiz sha ile
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.details)
    ).toString();
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "21/02/2022", "Genesis Block", 0);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash; //bir öncekinin hash'ini al kontrol amaçlı
    newBlock.hash = newBlock.calculateHash(); //her yeni block oluştuğunda hash'i yeniden updatelemen lazım
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }   
    }

    return true;
  }
}

let aCoin = new Blockchain();
aCoin.addBlock(new Block(1, "21/10/2022", { amount: 2 }));
aCoin.addBlock(new Block(2, "23/10/2022", { amount: 4 }));
aCoin.addBlock(new Block(3, "21/10/2022", { amount: 10 }));

console.log(JSON.stringify(aCoin, null, 4));

console.error("Is block valid? " + aCoin.isChainValid());

aCoin.chain[1].details = {amount: 20};

console.log("Now? " + aCoin.isChainValid());

aCoin.chain[1].details = {amount: 2};

console.log("Now? " + aCoin.isChainValid());