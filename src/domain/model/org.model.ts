import { Role } from "@prisma/client";
import { Address, AddressCreateInput } from "./address.model";

export interface Org {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
}

export interface OrgCreateInput
  extends Omit<Org, "id" | "createdAt" | "updatedAt" | "role" | "address"> {
  password: string;
  address: AddressCreateInput;
}
