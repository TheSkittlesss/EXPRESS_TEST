import { providers as _providers, Wallet, utils } from 'ethers';
import { DataSource } from 'typeorm';
import { LOG } from '../blockchain.entity';
/*import { LOGProviders } from '../blockchain.providers';
import { LOGService } from '../blockchain.service';
import { DatabaseModule } from 'src/Postgres/pg.module';
import { databaseProviders } from 'src/Postgres/pg.providers';*/
const providers = _providers;
const provider = providers.getDefaultProvider('ropsten');
const amount = '0.01';
// const acc1 = '0x88Da9E58226E72bb0391E559EEE6Ac1A2627C250';
const acc2 = '0x293Ccd45836e66e33724feE6255F35e3deC0496C'; // sender
const pk2 = 'a2db663ba010a7bc9bd3ee31361db60dc2930cdc70c605ea49952ddcf796d1fd'; // sender PK
const wallet = new Wallet(pk2, provider);
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'P@ssw0rd',
  database: 'new-task',
  entities: [LOG],
});
dataSource.initialize();
export async function SendTransaction(acc1) {
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
    dataSource
      .createQueryBuilder()
      .insert()
      .into('log')
      .values([
        {
          hex: sendTransactionPromise.hash,
          type: 'ETH',
          sender: acc2,
          receiver: acc1,
          amount: amount,
          status: 'Mined',
        },
      ])
      .execute();
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
export function getWalletBalance(address) {
  try {
    return provider.getBalance(address).then(function (balance) {
      const etherString = utils.formatEther(balance);
      //const dataSource = DataSource.getRepository(LOG);

      return { balance: etherString };
    });
  } catch (err) {
    console.log('Возникла ошибка!');
  }
}
