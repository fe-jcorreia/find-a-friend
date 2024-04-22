export interface Address {
  id: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressCreateInput
  extends Omit<Address, "id" | "createdAt" | "updatedAt"> {}
