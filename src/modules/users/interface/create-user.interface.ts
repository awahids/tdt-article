export interface CreateUserInterface {
  id: number;
  uuid: string;
  name: string;
  email: string;
}

export function createUserInterface(user: any): CreateUserInterface {
  return {
    id: user.id,
    uuid: user.uuid,
    name: user.name,
    email: user.email
  };
}
