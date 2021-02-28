import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController
{
    async show(request: Request, response: Response) {
        const surveyRepository = getCustomRepository(SurveyRepository);

        const all = await surveyRepository.find();

        return response.json(all);
    }

    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveyRepository = getCustomRepository(SurveyRepository);

        const survey = surveyRepository.create({
            title, description
        });

        surveyRepository.save(survey)
            .then(() => response.status(201).json(survey) )
            .catch(error => response.status(400).json({ error: error }) );
    }
}
export { SurveyController };