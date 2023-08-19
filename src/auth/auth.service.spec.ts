import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { getModelToken } from "nestjs-typegoose"

describe('AuthService', () => {
    let authService: AuthService
    let mockJwtService: any = {}
    let mockConfigService: any = {}
    let mockUserModel: any = {}
    let mockCountryModel: any = {}

    beforeEach(async () => {
        const MockModule: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getModelToken("User"),
                    useValue: mockUserModel
                },
                {
                    provide: getModelToken("Country"),
                    useValue: mockCountryModel
                },
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: mockConfigService },
            ]
        }).compile()
        authService = MockModule.get(AuthService)
    })

    describe('register', () => {
        it('should be throw error user already exist', async () => {
            mockUserModel.findOne = () => ({ email: 'windfall@gmail.com' })
            await expect(
                authService.register({
                    password: 'P4$$w0rD',
                    email: 'windfall@gmail.com',
                    countryCode: 'th',
                })
            ).rejects.toThrow('User already exist!')
        })
        it('should be throw error country does not exist', async () => {
            mockUserModel.findOne = () => undefined
            mockCountryModel.findOne = () => undefined
            await expect(
                authService.register({
                    password: 'P4$$w0rD',
                    email: 'windfall@gmail.com',
                    countryCode: 'th',
                })
            ).rejects.toThrow('Country doesn\'t exist!')
        })
        it('should be created user successfully', async () => {
            mockUserModel.findOne = () => undefined
            mockCountryModel.findOne = () => ({ code: 'th' })

            mockUserModel.create = jest.fn().mockImplementation(data => {
                expect(data).toEqual(expect.objectContaining({
                    username: 'windfall',
                    country: { code: 'th' },
                    email: 'windfall@gmail.com',
                }))
            })
            
            await authService.register({
                password: 'P4$$w0rD',
                username: 'WinDFall',
                email: 'windfall@gmail.com',
                countryCode: 'th',
            })
        })
    })

    describe('login', () => {
        it('should be throw error user does not exist', async () => {
            mockUserModel.findOne = () => undefined
            await expect(
                authService.login({
                    username: 'email@gmail.com',
                    password: 'P4$$w0rD',
                })
            ).rejects.toThrow('User doesn\'t exist!')
        })
        it('should be throw error invalid password', async () => {
            mockUserModel.findOne = () => ({
                hashedPass: '$2b$12$bCjZN9s8srOgd/IoRHt1O.Lp5GG3sF2b7WU9leRryhj9h1gx2GOEu',
            })
            await expect(
                authService.login({
                    username: 'email@gmail.com',
                    password: 'P4$$w0rD',
                })
            ).rejects.toThrow('Invalid password')
        })
        it('should be sign jwt successfully', async () => {
            mockUserModel.findOne = () => ({
                id: 'user1234',
                hashedPass: '$2b$12$bCjZN9s8srOgd/IoRHt1O.Lp5GG3sF2b7WU9leRryhj9h1gx2GOEu',
            })

            mockConfigService.get = () => 'jwtSecret'
            mockJwtService.sign = (payload, data) => `${payload.id}_${data.secret}`
            
            const result = await authService.login({
                username: 'email@gmail.com',
                password: 'secretpass',
            })
            expect(result).toEqual('user1234_jwtSecret')
        })
    })
})