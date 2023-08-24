import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { TransactionType } from "../entity/TransactionType"

export class TransactionTypeController {

    private transactionTypeRepository = AppDataSource.getRepository(TransactionType)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.transactionTypeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const transactionType = await this.transactionTypeRepository.findOne({
            where: { id }
        })

        if (!transactionType) {
            return "unregistered transaction type"
        }
        return transactionType
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { transactionTypeName } = request.body;

        const transactionType = Object.assign(new TransactionType(), {
            transactionTypeName
        })

        return this.transactionTypeRepository.save(transactionType)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let transactionTypeToRemove = await this.transactionTypeRepository.findOneBy({ id })

        if (!transactionTypeToRemove) {
            throw Error("this transactionType not exist")
        }

        await this.transactionTypeRepository.remove(transactionTypeToRemove)

        return "transactionType has been removed"
    }

}