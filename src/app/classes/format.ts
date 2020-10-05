export class Format {
  id: number;
name: string;
unit: string;
unitName: string;
nbDimension: number;


constructor(obj: object) {
  Object.assign(this, obj);
}
}
