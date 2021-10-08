export default class Variant {
  #fields = {
    id /*          */: 'i',
    title /*       */: 'vtl',
    color /*       */: 'c',
    size /*        */: 's',
    inStock /*     */: 'is',
    image /*       */: 'im',
    price /*       */: 'p',
    storePrice /*  */: 'sp',
    link /*        */: 'l',
  };

  constructor(data = {}) {
    Object.keys(this.#fields).forEach((f) => {
      if (data[f] === undefined) {
        return;
      }
      this[f] = data[f];
    });
  }
}
