import {AppUser} from './user.model';

export class Item {
  public constructor(
    public info: string = '',
    public imageURL: string = '',
    public tag: string = '',
    public price: string = '',
    public seats: number = 0,
    public rate: number = 0,
    public title: string = '',
    public id: string = '',
  ) {
  }
}



export enum ItemState {
  Active,
  Approved,
  Pending
}
