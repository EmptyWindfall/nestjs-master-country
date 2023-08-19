import { alphaNumeric } from "./generate.util"

describe('generate', () => {
    describe('alphaNumeric', () => {
        it('should be have 10 length', () => {
            const salt = alphaNumeric(10)
            expect(salt.length).toBe(10)
        })
        it('should be empty string', () => {
            const salt = alphaNumeric(0)
            expect(salt).toBe('')
        })
    })
})