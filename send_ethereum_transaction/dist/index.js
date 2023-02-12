"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
// import InputDataDecoder from 'ethereum-input-data-decoder'
const contract_1 = require("./contract");
const web3 = new web3_1.default("https://data-seed-prebsc-1-s1.binance.org:8545/");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const TerryAccount = web3.eth.accounts.privateKeyToAccount("0xdbe4804f5acb2b57e29795cb0e415d81e869c2af4c6ad4182bb0aed279959c4d");
    console.info("Terry address:", TerryAccount.address);
    const AliceAccount = web3.eth.accounts.privateKeyToAccount("e24a5ea109c74c170303e1e380978b19aaa84c1f9b310aa933c32005ecc3b0e0");
    console.log("Alice address:", AliceAccount.address);
    const balance = yield web3.eth.getBalance(AliceAccount.address);
    console.log("Alice balance", balance);
    // nonce
    const nonce = yield web3.eth.getTransactionCount(TerryAccount.address);
    console.log("Terry Nonce:", nonce);
    // gas price
    const gasPrice = yield web3.eth.getGasPrice();
    // with send ETH, gas will be 21000
    // chain id
    const networkId = yield web3.eth.net.getId();
    console.log('network id:', networkId);
    // create contact
    const contract = new web3.eth.Contract([{ "inputs": [], "name": "get", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "data", "type": "string" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], contract_1.address);
    const gas = yield contract.methods.set('Phan Binh Giang 1999').estimateGas({ gas: 5000000 });
    // send some ether from Terry to Alice
    const rawTransaction = {
        to: contract_1.address,
        gas,
        gasPrice,
        nonce,
        value: 0,
        chainId: networkId,
        data: contract.methods.set('Phan Binh Giang').encodeABI()
    };
    console.log("Raw Transaction:", rawTransaction);
    const signedTransaction = yield TerryAccount.signTransaction(rawTransaction);
    console.log("Signed Transaction:", signedTransaction);
    console.log("Send Transaction");
    const receipt = signedTransaction.rawTransaction ? yield web3.eth.sendSignedTransaction(signedTransaction.rawTransaction) : "";
    console.log("Receipt:", receipt);
    const getData = yield contract.methods.get().call();
    console.log({ getData });
});
main();
// const getTransaction = async () => {
//   // web3.eth.getTransaction('0x5f2225f9d603bc6f6efbe4be219e92252402fbb75cc9225cf31e230590c82f5c').then(console.log);
//   // web3.eth.getPendingTransactions().then(console.log)
//   // web3.eth.getTransactionFromBlock('26249962', 1).then(console.log)
//   // await web3.eth.getTransactionCount('0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a').then(console.log)
//   const abi = [{ "inputs": [], "name": "get", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "data", "type": "string" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
//   const decoder = new InputDataDecoder(abi);
//   const data = `0x67043cae0000000000000000000000005a9dac9315fdd1c3d13ef8af7fdfeb522db08f020000000000000000000000000000000000000000000000000000000058a20230000000000000000000000000000000000000000000000000000000000040293400000000000000000000000000000000000000000000000000000000000000a0f3df64775a2dfb6bc9e09dced96d0816ff5055bf95da13ce5b6c3f53b97071c800000000000000000000000000000000000000000000000000000000000000034254430000000000000000000000000000000000000000000000000000000000`;
//   const result = decoder.decodeData(data)
//   console.log({ result });
// }
// getTransaction()
//# sourceMappingURL=index.js.map