import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthLoginDto, AuthRegisterDto } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "nestjs-typegoose";
import { User } from "src/users/user.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { Country } from "src/countries/country.model";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

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

    async register({ name, pass, email, countryCode: code }: AuthRegisterDto) {
        const user = await this.userModel.findOne({ email }).exec()
        if (user) throw new BadRequestException('User already exist!')
        
        
        const country = await this.countryModel.findOne({ code })
        if (!country) throw new NotFoundException('Country doesn\'t exist!')

        const hashedPass = await bcrypt.hash(pass, 12);
        await this.userModel.create({
            username: name.toLocaleLowerCase(),
            hashedPass,
            country,
            email,
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