import { Ref, prop } from "@typegoose/typegoose"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { Country } from "src/countries/country.model"

export class User extends TimeStamps {
    @prop()
    username: string

    @prop({ required: true })
    hashedPass: string

    @prop({ required: true })
    email: string

    @prop()
    fname: string

    @prop()
    lname: string

    @prop()
    mname: string

    @prop()
    dob: Date

    @prop({ required: true, ref: () => Country })
    country: Ref<Country>
}