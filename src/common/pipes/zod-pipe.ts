import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        const { data, success, error } = this.schema.safeParse(value);

        if (!success) {
            console.log(error.flatten().formErrors)
            throw new BadRequestException(error.issues.map(err => err.message)[0])
        }
        return data;
    }


}