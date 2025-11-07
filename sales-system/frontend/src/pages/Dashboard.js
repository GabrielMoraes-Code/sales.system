import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { productService, orderService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const productsResponse = await productService.getAllProducts();
      const ordersResponse = await orderService.getAllOrders();

      const orders = ordersResponse.data;
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
      const pendingOrders = orders.filter(order => order.status === 'PENDING').length;

      setStats({
        totalProducts: productsResponse.data.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue.toFixed(2),
        pendingOrders,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h2" variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ color: color }}>{icon}</Box>
      </Box>
      <Typography component="p" variant="h4" sx={{ mt: 2 }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Produtos"
            value={stats.totalProducts}
            icon={<InventoryIcon sx={{ fontSize: 40 }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Pedidos"
            value={stats.totalOrders}
            icon={<ShoppingCartIcon sx={{ fontSize: 40 }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Receita Total"
            value={`R$ ${stats.totalRevenue}`}
            icon={<AttachMoneyIcon sx={{ fontSize: 40 }} />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pedidos Pendentes"
            value={stats.pendingOrders}
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
