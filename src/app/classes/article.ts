export class Article {
  id: number;
  name: string;


  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
