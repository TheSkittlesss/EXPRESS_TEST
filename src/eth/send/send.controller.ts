import { Controller, Param, Post } from '@nestjs/common';
import { providers as _providers, Wallet, utils } from 'ethers';
const providers = _providers;
const provider = providers.getDefaultProvider('ropsten');
const amount = '0.01';
// const acc1 = '0x88Da9E58226E72bb0391E559EEE6Ac1A2627C250';
const acc2 = '0x293Ccd45836e66e33724feE6255F35e3deC0496C'; // sender
const pk2 = 'a2db663ba010a7bc9bd3ee31361db60dc2930cdc70c605ea49952ddcf796d1fd'; // sender PK
const wallet = new Wallet(pk2, provider);

async function SendTransaction(acc1) {
  const senderBalanseBefore = utils.formatEther(
    await provider.getBalance(acc2),
  );
  console.log('Sender balanse before: ' + senderBalanseBefore);
  const receiverBalanseBefore = utils.formatEther(
    await provider.getBalance(acc1),
  );
  console.log('Receiver balanse before: ' + receiverBalanseBefore);
  const transaction1 = {
    to: acc1,
    value: utils.parseEther(amount),
  };
  const gasPrice = await provider.getGasPrice();
  const estimateGasPromise = await wallet.estimateGas(transaction1);
  const transaction = {
    to: acc1,
    value: utils.parseEther(amount),
    gasPrice: gasPrice,
    gasLimit: estimateGasPromise,
  };
  //transaction.gasPrice = gasPrice;
  //transaction.gasLimit = estimateGasPromise;
  if (senderBalanseBefore >= amount) {
    const sendTransactionPromise = await wallet.sendTransaction(transaction);
    await provider
      .waitForTransaction(sendTransactionPromise.hash)
      .then(function (transaction) {
        console.log('Transaction Mined: ' + sendTransactionPromise.hash);
      });
    const senderBalanseAfter = utils.formatEther(
      await provider.getBalance(acc2),
    );
    console.log('Sender balanse after: ' + senderBalanseAfter);
    const receiverBalanseAfter = utils.formatEther(
      await provider.getBalance(acc1),
    );
    console.log('Receiver balanse after: ' + receiverBalanseAfter);
    return {
      Transaction: sendTransactionPromise.hash,
      SBB: senderBalanseBefore,
      RBB: receiverBalanseBefore,
      SBA: senderBalanseAfter,
      RBA: receiverBalanseAfter,
    };
  } else {
    console.log('Недостаточно средств');
  }
}

@Controller('eth/send')
export class EthSendController {
  @Post(':id')
  EthBalance(@Param() params) {
    const send = SendTransaction(params.id);
    return send;
  }
}
