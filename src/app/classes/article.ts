export class Article {
  id: number;
  name: string;
  alias: string;


  constructor(obj: object) {
    Object.assign(this, obj);
  }

}
