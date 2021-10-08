import Variant from './Variant';

export default class Product {
  #fields = {
    siteId /*        */: 'aid',
    name /*          */: 'tl',
    sku /*           */: 'pk', // 網站原始 sku
    url /*           */: 'dl',
    brand /*         */: 'br',
    categoryPath /*  */: 'cp',
    description /*   */: 'de',

    imageUrl /*      */: 'iu',
    price /*         */: 'p',
    origPrice /*     */: 'sp',
    variants /*      */: 'va',

    live /*          */: 'lv',

    customLabel0 /*  */: 'cl0',
    customLabel1 /*  */: 'cl1',
    customLabel2 /*  */: 'cl2',
    customLabel3 /*  */: 'cl3',
    customLabel4 /*  */: 'cl4',
  };

  constructor({
    //
    siteId = window.tagtoo_advertiser_id,
    name = '',
    sku = '',
    url = window.location.href,
    price = 0,
    origPrice = 0,
    live = true,
    description = '',
    categoryPath = '',
    imageUrl = '',
    variants = [],
    brand = '',
    customLabel0 = '',
    customLabel1 = '',
    customLabel2 = '',
    customLabel3 = '',
    customLabel4 = '',
  } = {}) {
    this.siteId = Number(siteId);
    this.name = String(name);
    this.sku = String(sku);
    this.url = String(url);
    this.price = Number((Number(price) || 0).toFixed(2));
    if (this.price < 0) {
      this.price = 0;
    }
    this.live = Boolean(Number(live));
    this.origPrice = Number((Number(origPrice) || 0).toFixed(2)) || undefined;
    if (this.origPrice < 0) {
      this.origPrice = 0;
    }
    this.description = String(description) || undefined;
    this.categoryPath = String(categoryPath) || undefined;
    this.imageUrl = String(imageUrl) || undefined;
    this.brand = String(brand) || undefined;
    this.customLabel0 = String(customLabel0) || undefined;
    this.customLabel1 = String(customLabel1) || undefined;
    this.customLabel2 = String(customLabel2) || undefined;
    this.customLabel3 = String(customLabel3) || undefined;
    this.customLabel4 = String(customLabel4) || undefined;
    // prettier-ignore
    this.variants = variants?.length ?
      variants.map((v) => (v?.constructor === Variant ? v : new Variant(v))) :
      undefined;
    Object.keys(this.#fields).forEach((field) => {
      if (this[field] === undefined) {
        delete this[field];
      }
    });
  }

  queryString() {
    const result = [];
    Object.entries(this.#fields).forEach(([field, alias]) => {
      if (this[field] === undefined) {
        return;
      }
      let data = this[field];
      if (field === 'variants') {
        data = JSON.stringify(data.map((v) => (v?.constructor === Variant ? v : new Variant(v))));
      }
      result.push(`${alias}=${encodeURIComponent(data)}`);
    });
    return result.join('&');
  }
}
