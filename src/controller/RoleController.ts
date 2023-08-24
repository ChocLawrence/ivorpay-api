import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Role } from "../entity/Role"

export class RoleController {

    private roleRepository = AppDataSource.getRepository(Role)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.roleRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const role = await this.roleRepository.findOne({
            where: { id }
        })

        if (!role) {
            return "unregistered role"
        }
        return role
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { roleName } = request.body;

        const role = Object.assign(new Role(), {
            roleName
        })

        return this.roleRepository.save(role)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let roleToRemove = await this.roleRepository.findOneBy({ id })

        if (!roleToRemove) {
            throw Error("this role not exist")
        }

        await this.roleRepository.remove(roleToRemove)

        return "role has been removed"
    }

}