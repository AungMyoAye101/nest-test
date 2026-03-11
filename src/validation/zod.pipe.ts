import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod"
@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        const { data, error, success } = this.schema.safeParse(value);

        if (!success) {
            throw new BadRequestException(error.format())
        }
        return data;

    }
}