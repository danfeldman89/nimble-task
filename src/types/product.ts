export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created: string;
  imageUrl: string = 'src/assets/img.png';

  static currentId: number;

  constructor(
    name: string = '',
    description: string = '',
    price: number = 0,
    imageUrl: string = 'src/assets/img.png',
    created: string = new Date().toISOString(),
  ) {
    Product.currentId++;

    this.id = Product.currentId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.created = created;
    this.imageUrl = imageUrl;
  }
}
