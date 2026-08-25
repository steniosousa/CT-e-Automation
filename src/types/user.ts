declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface jwtPayload {
  email: string;
}
