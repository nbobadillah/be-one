declare const UserRoles: {
    readonly STUDENT: "student";
    readonly TEACHER: "teacher";
    readonly ADMIN: "admin";
};
type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    age?: number;
    role?: UserRole;
}
export {};
