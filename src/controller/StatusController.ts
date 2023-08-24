import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Status } from "../entity/Status"

export class StatusController {

    private statusRepository = AppDataSource.getRepository(Status)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.statusRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const status = await this.statusRepository.findOne({
            where: { id }
        })

        if (!status) {
            return "unregistered status"
        }
        return status
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { statusName } = request.body;

        const status = Object.assign(new Status(), {
            statusName
        })

        return this.statusRepository.save(status)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let statusToRemove = await this.statusRepository.findOneBy({ id })

        if (!statusToRemove) {
            throw Error("this status not exist")
        }

        await this.statusRepository.remove(statusToRemove)

        return "status has been removed"
    }

}