import { User } from "src/modules/user/entities/user.entity";
import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema<User>({
    name: "User",
    target: User,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },

    },

})