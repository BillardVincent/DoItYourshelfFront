export class ArticlePattern {

  id: number;
  name: string;
  formatId: number;



  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
