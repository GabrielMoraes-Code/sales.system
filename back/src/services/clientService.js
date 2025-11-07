const prisma = require('../models');

class ClientService {
  async getAllClients() {
    return await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sales: {
          select: {
            id: true,
            total: true,
            date: true,
          },
        },
      },
    });
  }

  async getClientById(id) {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
      include: {
        sales: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return client;
  }

  async createClient(clientData) {
    const { name, email, phone, cpf } = clientData;

    // Verificar se email já existe
    const existingClientByEmail = await prisma.client.findUnique({
      where: { email },
    });

    if (existingClientByEmail) {
      throw new Error('Cliente com este email já existe');
    }

    // Verificar se CPF já existe
    const existingClientByCpf = await prisma.client.findUnique({
      where: { cpf },
    });

    if (existingClientByCpf) {
      throw new Error('Cliente com este CPF já existe');
    }

    return await prisma.client.create({
      data: {
        name,
        email,
        phone,
        cpf,
      },
    });
  }

  async updateClient(id, clientData) {
    const { name, email, phone, cpf } = clientData;

    // Verificar se o cliente existe
    await this.getClientById(id);

    // Se o email foi alterado, verificar se já existe
    if (email) {
      const existingClient = await prisma.client.findUnique({
        where: { email },
      });

      if (existingClient && existingClient.id !== parseInt(id)) {
        throw new Error('Cliente com este email já existe');
      }
    }

    // Se o CPF foi alterado, verificar se já existe
    if (cpf) {
      const existingClient = await prisma.client.findUnique({
        where: { cpf },
      });

      if (existingClient && existingClient.id !== parseInt(id)) {
        throw new Error('Cliente com este CPF já existe');
      }
    }

    return await prisma.client.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(cpf && { cpf }),
      },
    });
  }

  async deleteClient(id) {
    // Verificar se o cliente existe
    await this.getClientById(id);

    return await prisma.client.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new ClientService();

