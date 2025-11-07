const prisma = require('../models');

class ProductService {
  async getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    return product;
  }

  async createProduct(productData) {
    const { name, sku, price, stock, minStock, category } = productData;

    // Verificar se SKU já existe
    const existingProduct = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      throw new Error('Produto com este SKU já existe');
    }

    return await prisma.product.create({
      data: {
        name,
        sku,
        price,
        stock,
        minStock,
        category,
      },
    });
  }

  async updateProduct(id, productData) {
    const { name, sku, price, stock, minStock, category } = productData;

    // Verificar se o produto existe
    await this.getProductById(id);

    // Se o SKU foi alterado, verificar se já existe
    if (sku) {
      const existingProduct = await prisma.product.findUnique({
        where: { sku },
      });

      if (existingProduct && existingProduct.id !== parseInt(id)) {
        throw new Error('Produto com este SKU já existe');
      }
    }

    return await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(sku && { sku }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock }),
        ...(minStock !== undefined && { minStock }),
        ...(category && { category }),
      },
    });
  }

  async deleteProduct(id) {
    // Verificar se o produto existe
    await this.getProductById(id);

    return await prisma.product.delete({
      where: { id: parseInt(id) },
    });
  }

  async getLowStockProducts() {
    return await prisma.product.findMany({
      where: {
        stock: {
          lte: prisma.product.fields.minStock,
        },
      },
    });
  }
}

module.exports = new ProductService();

