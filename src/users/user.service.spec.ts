import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { getModelToken } from "nestjs-typegoose"

describe('UserService', () => {
    let userService: UserService
    let mockUserModel: any = {}

    beforeEach(async () => {
        const MockModule: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken("User"),
                    useValue: mockUserModel
                },
                UserService,
            ]
        }).compile()
        userService = MockModule.get(UserService)
    })

    describe('getUsers', () => {
        it('should be empty string when no data', async () => {
            mockUserModel.find = () => []

            const result = await userService.getUsers()
            expect(result).toEqual([])
        })
        it('should be transform and remove raw data', async () => {
            mockUserModel.find = () => [
                { _id: '1234', hashedPass: 'secret', email: 'email1', country: '1000', createdAt: '2023-08-19T00:00:00Z', updatedAt: '2023-08-19T00:00:00Z' },
                { _id: '5678', username: 'test', email: 'email2', country: '1000', createdAt: '2023-08-19T00:00:00Z', updatedAt: '2023-08-19T00:00:00Z' },
            ]

            const result = await userService.getUsers()
            expect(result).toEqual([
                { id: '1234', email: 'email1', country: '1000', createdAt: '2023-08-19T00:00:00Z', updatedAt: '2023-08-19T00:00:00Z' },
                { id: '5678', username: 'test', email: 'email2', country: '1000', createdAt: '2023-08-19T00:00:00Z', updatedAt: '2023-08-19T00:00:00Z' },
            ])
        })
    })
})