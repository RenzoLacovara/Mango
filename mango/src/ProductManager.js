import fs from "fs";
class Product {
  static id = 1;

  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.id++;
  }
}
class ProductManager {
  #products;
  #productDirPath;
  #productsFilePath;
  #fileSystem;

  constructor() {
    this.#products = [];
    this.#productDirPath = "./module1/files";
    this.#productsFilePath = this.#productDirPath + "/Products.json";
    this.#fileSystem = fs;
  }
  #prepareDir = async () => {
    await this.#fileSystem.promises.mkdir(this.#productDirPath, {
      recursive: true,
    });
    if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
      await this.#fileSystem.promises.writeFile(this.#productsFilePath, "[]");
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    try {
      await this.#prepareDir();
      await this.getProducts();
      if (title && description && price && thumbnail && code && stock) {
        if (this.#products.some((product) => product.code === code)) {
          console.log("Codigo repetido");
        } else {
          this.#products.push(newProduct);
          console.log(this.#products);
          this.#fileSystem.promises.writeFile(
            this.#productsFilePath,
            JSON.stringify(this.#products)
          );
        }
      } else {
        console.log("no se aceptan valores null, undefined, o vacios");
      }
    } catch (error) {
      throw Error(
        `Error creando producto nuevo: ${JSON.stringify(
          newProduct
        )}, detalle del error: ${error}`
      );
    }
  };
  getProducts = async () => {
    try {
      await this.#prepareDir();
      let prodFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        "utf-8"
      );
      this.#products = JSON.parse(prodFile);
      console.log(this.#products);
      return this.#products;
    } catch (error) {
      throw Error(`Error consultando los productos por archivo, valide el archivo: ${
        this.#productDirPath
      },
       detalle del error: ${error}`);
    }
  };
  getProductById = async (code) => {
    await this.getProducts();
    let productfilter = this.#products.find((product) => product.code === code);
    if (productfilter) {
      console.log(`Producto encontrado: ${productfilter}`);
    } else {
      console.log(`Codigo: ${code} no arroja resultados`);
    }
  };

  updateProduct = async (id, newProd) => {
    await this.getProducts();
    const updatedProducts = this.#products.map((prod) => {
      if (prod.id === id) {
        return { ...prod, ...newProd };
      } else {
        return prod;
      }
    });
    this.#products = updatedProducts;
    this.#fileSystem.promises.writeFile(
      this.#productsFilePath,
      JSON.stringify(this.#products)
    );
    console.log(this.#products);
  };
  deleteProduct = async (code) => {
    await this.getProducts();
    if (this.#products.find((prod) => prod.code === code)) {
      let filteredProducts = this.#products.filter(
        (prod) => prod.code !== code
      );
      this.#products = filteredProducts;
      this.#fileSystem.promises.writeFile(
        this.#productsFilePath,
        JSON.stringify(this.#products)
      );
      console.log(this.#products);
    } else {
      console.log(`producto con codigo ${code} no encontrado`);
    }
  };
}
let productManager = new ProductManager();

export { productManager };
