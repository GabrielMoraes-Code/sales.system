const prisma = require('../models');

class SaleService {
  async getAllSales() {
    return await prisma.sale.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async getSaleById(id) {
    const sale = await prisma.sale.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    return sale;
  }

  async createSale(saleData) {
    const { clientId, items, discount, paymentMethod } = saleData;

    // Validar se todos os produtos existem e têm estoque suficiente
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto ${product.name}`);
      }
    }

    // Calcular subtotal
    let subtotal = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      subtotal += parseFloat(product.price) * item.quantity;
    }

    // Calcular total com desconto
    const discountAmount = discount || 0;
    const total = subtotal - discountAmount;

    // Criar venda com transação
    const sale = await prisma.$transaction(async (tx) => {
      // Criar a venda
      const newSale = await tx.sale.create({
        data: {
          clientId: clientId || null,
          subtotal,
          discount: discountAmount,
          total,
          paymentMethod,
          status: 'completed',
        },
      });

      // Criar itens da venda e atualizar estoque
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        await tx.saleItem.create({
          data: {
            saleId: newSale.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
          },
        });

        // Atualizar estoque
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newSale;
    });

    // Retornar venda completa
    return await this.getSaleById(sale.id);
  }

  async deleteSale(id) {
    // Verificar se a venda existe
    const sale = await this.getSaleById(id);

    // Reverter estoque dos produtos
    await prisma.$transaction(async (tx) => {
      for (const item of sale.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // Deletar venda (itens serão deletados em cascata)
      await tx.sale.delete({
        where: { id: parseInt(id) },
      });
    });

    return { message: 'Venda deletada com sucesso' };
  }

  async getSalesByDateRange(startDate, endDate) {
    return await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }
}

module.exports = new SaleService();

