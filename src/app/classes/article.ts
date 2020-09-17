export class Article {
  id: number;
  name: string;
  alias: string;
  artPatId: number;
  artPatName: string;

  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
