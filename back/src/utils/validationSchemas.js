const { z } = require('zod');

// Esquemas de validação para autenticação
const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  role: z.enum(['ADMIN', 'VENDEDOR', 'CAIXA']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Esquemas de validação para produtos
const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  sku: z.string().min(1, 'SKU é obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
  stock: z.number().int().nonnegative('Estoque deve ser não negativo'),
  minStock: z.number().int().nonnegative('Estoque mínimo deve ser não negativo'),
  category: z.string().min(1, 'Categoria é obrigatória'),
});

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  minStock: z.number().int().nonnegative().optional(),
  category: z.string().min(1).optional(),
});

// Esquemas de validação para clientes
const createClientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
});

const updateClientSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  cpf: z.string().length(11).optional(),
});

// Esquemas de validação para vendas
const createSaleSchema = z.object({
  clientId: z.number().int().positive().optional(),
  items: z.array(
    z.object({
      productId: z.number().int().positive('ID do produto deve ser positivo'),
      quantity: z.number().int().positive('Quantidade deve ser positiva'),
    })
  ).min(1, 'Deve haver pelo menos um item na venda'),
  discount: z.number().nonnegative('Desconto deve ser não negativo').optional(),
  paymentMethod: z.string().min(1, 'Método de pagamento é obrigatório'),
});

// Middleware de validação
const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Erro de validação',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  createProductSchema,
  updateProductSchema,
  createClientSchema,
  updateClientSchema,
  createSaleSchema,
  validate,
};

