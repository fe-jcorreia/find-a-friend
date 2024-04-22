import { Org } from "./org.model";

export interface Pet {
  id: string;
  name: string;
  description: string;
  energy: number;
  size: number;
  independence: number;
  ambient: string;
  created_at: Date;
  updated_at: Date;
  org: Org;
}
