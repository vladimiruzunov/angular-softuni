export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  role: 'admin' | 'user';
  token?: string;
}
