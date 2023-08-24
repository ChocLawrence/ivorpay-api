import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Transaction, TransactionType } from "../entity/Transaction";
import { Wallet } from "../entity/Wallet";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private walletRepository = AppDataSource.getRepository(Wallet);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      return "unregistered transaction";
    }
    return transaction;
  }

  async deposit(request: Request, response: Response, next: NextFunction) {
    const { walletId, amount } = request.body;

    const creditedWallet = await this.walletRepository.findOne({
      where: { walletNumber: walletId },
    });

    if (!creditedWallet) {
      throw Error("Wallet not found");
    }

    const transaction = await Object.assign(new Transaction(), {
      creditedWallet: creditedWallet.walletNumber,
      debitedWallet: null,
      amount,
      transactionType: TransactionType.DEPOSIT,
    });

    const newBalance = +creditedWallet.walletBalance + +amount;

    //deposit in wallet and update balance
    await this.walletRepository.update(
      {
        id: creditedWallet.id,
      },
      {
        walletBalance: newBalance,
      }
    );
    //add to transaction row

    await this.transactionRepository.save(transaction);

    return { message: "Deposit successful" };
  }

  async transfer(request: Request, response: Response, next: NextFunction) {
    const { walletId, amount, debitedWalletId } = request.body;

    const creditedWallet = await this.walletRepository.findOne({
      where: { walletNumber: walletId },
    });

    const debittedWallet = await this.walletRepository.findOne({
      where: { walletNumber: debitedWalletId },
    });

    if (!creditedWallet || !debittedWallet) {
      throw Error("Wallet not found");
    }

    //check if account balance can make the transfer

    if(amount > debittedWallet.walletBalance){
      throw Error("Balance not sufficient");
    }

    const transaction = await Object.assign(new Transaction(), {
      creditedWallet: creditedWallet.walletNumber,
      debitedWallet: debittedWallet.walletNumber,
      amount,
      transactionType: TransactionType.TRANSFER,
    });

    console.log(transaction);

    const newBalanceDebittedWallet = +debittedWallet.walletBalance - +amount;
    const newBalanceCredittedWallet = +creditedWallet.walletBalance + +amount;

    //subtract from debitted account and update
    await this.walletRepository.update(
      {
        id: debittedWallet.id,
      },
      {
        walletBalance: newBalanceDebittedWallet,
      }
    );
    //end

    //deposit in wallet and update balance of credited wallet
    await this.walletRepository.update(
      {
        id: creditedWallet.id,
      },
      {
        walletBalance: newBalanceCredittedWallet,
      }
    );

    //add to transaction row
    await this.transactionRepository.save(transaction);

    return { message: "Transfer successful" };
  }

  async withdraw(request: Request, response: Response, next: NextFunction) {
    const { walletId, amount } = request.body;

    const debitedWallet = await this.walletRepository.findOne({
      where: { walletNumber: walletId },
    });

    if (!debitedWallet) {
      throw Error("Wallet not found");
    }

    //check if account balance can make the transfer

    if(amount > debitedWallet.walletBalance){
      throw Error("Balance not sufficient");
    }


    const transaction = await Object.assign(new Transaction(), {
      debitedWallet: debitedWallet.walletNumber,
      creditedWallet: null,
      amount,
      transactionType: TransactionType.WITHDRAW,
    });

    const newBalance = +debitedWallet.walletBalance - +amount;

    //deposit in wallet and update balance
    await this.walletRepository.update(
      {
        id: debitedWallet.id,
      },
      {
        walletBalance: newBalance,
      }
    );
    //add to transaction row

    await this.transactionRepository.save(transaction);

    return { message: "Withdrawal successful" };
  }


  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let transactionToRemove = await this.transactionRepository.findOneBy({
      id,
    });

    if (!transactionToRemove) {
      throw Error("this transaction not exist");
    }

    await this.transactionRepository.remove(transactionToRemove);

    return "transaction has been removed";
  }
}
