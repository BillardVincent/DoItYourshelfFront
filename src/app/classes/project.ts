import { Article } from './article';
import { QuantityOfArticle } from './quantity-of-article';

export class Project {
  id: number;
  userId: number;
  name: string;
  quantityOfArticles: QuantityOfArticle[];

  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
