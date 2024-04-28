import { CreateRoleInterface } from "@/modules/role/interface/create-role.interface";

export interface CreateUserInterface {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role: CreateRoleInterface;
}

export function createUserInterface(user: any, role: any): CreateUserInterface {
  return {
    id: user.id,
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    role: role
  };
}
