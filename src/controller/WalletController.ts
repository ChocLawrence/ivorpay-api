import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Wallet } from "../entity/Wallet";

export class WalletController {
  private walletRepository = AppDataSource.getRepository(Wallet);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.walletRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    
    const wallet = await this.walletRepository.findOne({
      where: { userId: id },
    });


    if (!wallet) {
      return "unregistered wallet";
    }
    return wallet;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { walletNumber, userId, accountBalance } = request.body;

    const wallet = Object.assign(new Wallet(), {
      walletNumber,
      userId,
      accountBalance,
    });

    return this.walletRepository.save(wallet);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let walletToRemove = await this.walletRepository.findOneBy({ id });

    if (!walletToRemove) {
      throw Error("this wallet not exist");
    }

    await this.walletRepository.remove(walletToRemove);

    return "wallet has been removed";
  }
}
