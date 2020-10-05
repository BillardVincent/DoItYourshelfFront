export class QuantityOfArticle {
  id: number;
  articleId: number;
  projectId: number;
  unit1: number;
  unit2: number;
  unit3: number;

  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
