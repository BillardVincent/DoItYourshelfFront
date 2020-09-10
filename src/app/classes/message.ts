export class Message {

  message: string;


  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
