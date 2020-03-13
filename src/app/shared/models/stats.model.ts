import {AppUser} from './user.model';

export class Stat {
  public constructor(
    public dates?: number[],
    public users?: AppUser[],
    public tag?: string,
    public count?: number
  ) {
  }
}
