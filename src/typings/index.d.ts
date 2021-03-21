declare namespace Dais {
  interface User {
    id: number;
    role: 'user' | 'admin',
    email: string;
  }

  interface Hash {
    [x: string]: string
  }
  
  interface Request extends Express.Request {
    user?: User;
  }

  const enum Gender {
    Male = 1,
    Female = 2,
    Unknown = 0
  }

  const enum Role {
    User = 'user',
    Admin = 'admin',
  }
}
