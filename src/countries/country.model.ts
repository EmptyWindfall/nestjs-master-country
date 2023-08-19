import { Ref, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "../users/user.model";

export class Country extends TimeStamps {
    @prop({ required: true })
    name: string

    @prop({ required: true })
    code: string

    @prop()
    alpha3: string

    @prop()
    phoneCode: string

    @prop({ required: true })
    capital: string

    @prop()
    currency: string

    @prop()
    continent: string

    @prop()
    continentCode: string

    @prop({ ref: () => User })
    user: Ref<User>[]
}