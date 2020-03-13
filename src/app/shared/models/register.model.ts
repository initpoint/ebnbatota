import { UserType } from './user.model';

export class RegisterVM {
    public constructor(
      public email?: string,
      public password?: string,
      public userType?: UserType
    ) { }
  }
  