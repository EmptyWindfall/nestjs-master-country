import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthLoginDto, AuthRegisterDto } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Country } from "../countries/country.model";
import { User } from "../users/user.model";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) 
        private userModel: ReturnModelType<typeof User>,
        @InjectModel(Country) 
        private countryModel: ReturnModelType<typeof Country>,
        // services
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async register({ 
        username, 
        password, 
        email,
        fName,
        lName,
        mName,
        dob,
        countryCode: code,
    }: AuthRegisterDto) {
        const user = await this.userModel.findOne({ email })
        if (user) throw new BadRequestException('User already exist!')
        
        
        const country = await this.countryModel.findOne({ code })
        if (!country) throw new NotFoundException('Country doesn\'t exist!')

        const hashedPass = await bcrypt.hash(password, 12);
        await this.userModel.create({
            username: username.toLocaleLowerCase(),
            hashedPass,
            country,
            email,
            fName,
            lName,
            mName,
            dob,
        });
    }

    async login({ username, password }: AuthLoginDto) {
        const user = await this.userModel.findOne({ $or: [
            { username: username.toLocaleLowerCase() }, 
            { email: username.toLocaleLowerCase() }
        ] })
        if (!user) throw new NotFoundException('User doesn\'t exist!')
        
        if (!bcrypt.compareSync(password, user.hashedPass))
            throw new UnauthorizedException('Invalid password')

        const secret = this.configService.get<string>('app.jwtSecret')
        const payload = { id: user.id }

        return this.jwtService.sign(payload, { secret })
    }
}