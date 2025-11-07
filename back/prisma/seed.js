const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Criar usuários
  const adminPassword = await bcrypt.hash('admin123', 10);
  const vendedorPassword = await bcrypt.hash('vendedor123', 10);
  const caixaPassword = await bcrypt.hash('caixa123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sistema.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@sistema.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const vendedor = await prisma.user.upsert({
    where: { email: 'vendedor@sistema.com' },
    update: {},
    create: {
      name: 'Vendedor',
      email: 'vendedor@sistema.com',
      password: vendedorPassword,
      role: 'VENDEDOR',
    },
  });

  const caixa = await prisma.user.upsert({
    where: { email: 'caixa@sistema.com' },
    update: {},
    create: {
      name: 'Caixa',
      email: 'caixa@sistema.com',
      password: caixaPassword,
      role: 'CAIXA',
    },
  });

  console.log('Usuários criados:', { admin, vendedor, caixa });

  // Criar produtos
  const produtos = [
    {
      name: 'Notebook Dell',
      sku: 'NB001',
      price: 3500.00,
      stock: 15,
      minStock: 5,
      category: 'Eletrônicos',
    },
    {
      name: 'Mouse Logitech',
      sku: 'MS001',
      price: 120.00,
      stock: 50,
      minStock: 10,
      category: 'Periféricos',
    },
    {
      name: 'Teclado Mecânico',
      sku: 'KB001',
      price: 450.00,
      stock: 30,
      minStock: 10,
      category: 'Periféricos',
    },
    {
      name: 'Monitor LG 24"',
      sku: 'MN001',
      price: 800.00,
      stock: 20,
      minStock: 5,
      category: 'Eletrônicos',
    },
    {
      name: 'Webcam HD',
      sku: 'WC001',
      price: 250.00,
      stock: 3,
      minStock: 5,
      category: 'Periféricos',
    },
    {
      name: 'Headset Gamer',
      sku: 'HS001',
      price: 350.00,
      stock: 25,
      minStock: 10,
      category: 'Periféricos',
    },
  ];

  for (const produto of produtos) {
    await prisma.product.upsert({
      where: { sku: produto.sku },
      update: {},
      create: produto,
    });
  }

  console.log('Produtos criados');

  // Criar clientes
  const clientes = [
    {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '11987654321',
      cpf: '12345678901',
    },
    {
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '11987654322',
      cpf: '12345678902',
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      phone: '11987654323',
      cpf: '12345678903',
    },
  ];

  for (const cliente of clientes) {
    await prisma.client.upsert({
      where: { email: cliente.email },
      update: {},
      create: cliente,
    });
  }

  console.log('Clientes criados');

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

