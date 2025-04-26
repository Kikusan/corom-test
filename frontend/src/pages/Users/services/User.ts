export type UserBase = {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: Date;
};

export type RegisteredUser = UserBase & { id: string }


export type TableUser = UserBase & { id: number, technicalId: string }