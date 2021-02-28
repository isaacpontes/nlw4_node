import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class UserController 
{
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        const userRepository = getCustomRepository(UserRepository);
        
        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            return response.status(400).json({ error: 'User already exists. '});
        }
        
        const user = userRepository.create({
            name, email
        });
        
        userRepository.save(user)
            .then(() => response.status(201).json(user) )
            .catch(error => response.status(400).json({ error: error }) );
    }
}

export { UserController };
