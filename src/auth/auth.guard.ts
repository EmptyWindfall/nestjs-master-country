import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { Request } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../users/user.model';
import * as mongoose from 'mongoose';
import { transformObject } from '../_common/utils/transform.util';
import { TUserResponse } from '../users/user.transform';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectModel(User) 
        private userModel: ReturnModelType<typeof User>,
        // services
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const secret = this.configService.get<string>('app.jwtSecret')
            const payload = await this.jwtService.verifyAsync(token, { secret });
            
            const userObjectId = new mongoose.Types.ObjectId(payload.id)
            const user = await this.userModel.findById(userObjectId)
            
            request['user'] = transformObject(TUserResponse, user);
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}