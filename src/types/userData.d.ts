export interface UserData {
    name: string | null,
    age: number | null,
    city: string | null,
    pinCode: string | null,
  }
  
export interface UpdatedUserData extends UserData {
    id: string;
}