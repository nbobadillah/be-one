declare const UserRoles: {
    readonly STUDENT: "student";
    readonly TEACHER: "teacher";
    readonly ADMIN: "admin";
};
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export declare class CreateUserDto {
    name: string;
    email: string;
    age: number;
    role?: UserRole;
}
export {};
