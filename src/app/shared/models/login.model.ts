export class LoginVM {
  public constructor(
    public email?: string,
    public password?: string
  ) {
  }
}

export class SignUpVM {
  public constructor(
    public first_name?: string,
    public last_name?: string,
    public email?: string,
    public password?: string
  ) {
  }
}
