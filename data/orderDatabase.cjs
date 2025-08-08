// 📊 Простая имитация базы данных заказов через JSON файл
const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join(__dirname, 'orders.json');

// 🔍 Убеждаемся, что папка data существует
const ensureDataDirectory = () => {
  const dataDir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 📖 Чтение всех заказов из JSON файла
const loadOrders = () => {
  try {
    ensureDataDirectory();

    if (!fs.existsSync(ORDERS_FILE)) {
      // Если файл не существует, создаем пустой массив
      saveOrders([]);
      return [];
    }

    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading orders:', error);
    return [];
  }
};

// 💾 Сохранение всех заказов в JSON файл
const saveOrders = (orders) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
    console.log('✅ Orders saved to JSON file');
    return true;
  } catch (error) {
    console.error('❌ Error saving orders:', error);
    return false;
  }
};

// 🔢 Генерация следующего ID
const getNextId = (orders) => {
  return orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
};

// 🧾 Получить все заказы
const getAllOrders = () => loadOrders();

// 👤 Получить заказы пользователя
const getOrdersByUser = (userId) => {
  const orders = loadOrders();
  return orders.filter((o) => parseInt(o.userId) === parseInt(userId));
};

// 🔍 Найти заказ по ID
const findOrderById = (id) => {
  const orders = loadOrders();
  return orders.find((o) => o.id === parseInt(id));
};

// ➕ Добавить заказ
const addOrder = (orderData) => {
  try {
    const orders = loadOrders();
    const now = new Date().toISOString();

    const order = {
      id: getNextId(orders),
      status: orderData.status || 'pending',
      createdAt: now,
      updatedAt: now,
      ...orderData,
    };

    orders.push(order);
    if (saveOrders(orders)) {
      console.log(`✅ New order created: ID ${order.id} (userId: ${order.userId})`);
      return order;
    }
    throw new Error('Failed to save orders');
  } catch (error) {
    console.error('❌ Error adding order:', error);
    return null;
  }
};

// ✏️ Обновить заказ
const updateOrder = (id, patch) => {
  try {
    const orders = loadOrders();
    const idx = orders.findIndex((o) => o.id === parseInt(id));
    if (idx === -1) return null;

    orders[idx] = { ...orders[idx], ...patch, updatedAt: new Date().toISOString() };

    if (saveOrders(orders)) {
      console.log(`✅ Order updated: ID ${id}`);
      return orders[idx];
    }
    throw new Error('Failed to save orders');
  } catch (error) {
    console.error('❌ Error updating order:', error);
    return null;
  }
};

module.exports = {
  loadOrders,
  saveOrders,
  getAllOrders,
  getOrdersByUser,
  findOrderById,
  addOrder,
  updateOrder,
};


