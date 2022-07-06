import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificatiosRepository";

interface IResquest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: IResquest): Promise<void> {

    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase };