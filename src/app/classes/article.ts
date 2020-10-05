export class Article {
  id: number;
  name: string;
  alias: string;
  artPatId: number;
  artPatName: string;
  projectId: number;
  qOfArtId: number;
  quantity1: number;
  quantity2: number;
  quantity3: number;


  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
