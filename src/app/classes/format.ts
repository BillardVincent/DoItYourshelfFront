export class Format {
  id: number;
name: string;
unit: string;


constructor(obj: object) {
  Object.assign(this, obj);
}
}
