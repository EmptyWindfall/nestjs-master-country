import { ClassConstructor, plainToInstance } from "class-transformer";

export function transformObject<T>(tClass: ClassConstructor<T>, data: unknown): T {
    return plainToInstance(tClass, data, { excludeExtraneousValues: true })
}

export function transformArray<T>(tClass: ClassConstructor<T>, data: unknown[]): T[] {
    return plainToInstance(tClass, data, { excludeExtraneousValues: true })
}