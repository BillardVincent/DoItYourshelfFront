export class ArticleDetailed {
  id: number;
  name: string;
  alias: string;
  

  constructor(obj: object) {
    Object.assign(this, obj);
  }




}
