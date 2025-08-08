// 🚀 Express сервер для тестирования API с Postman (CommonJS)
const path = require('path');
console.log('🔍 Current directory:', process.cwd());
console.log('🔍 .env file path:', path.join(process.cwd(), '.env'));
console.log('🔍 .env file exists:', require('fs').existsSync(path.join(process.cwd(), '.env')));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const Stripe = require('stripe');

// 📊 Подключаем JSON "базу данных"
const userDB = require('./data/userDatabase.cjs');
const farmDB = require('./data/farmDatabase.cjs');
const orderDB = require('./data/orderDatabase.cjs');

// Mock данные прямо в сервере для простоты
const mockProducts = [
  {
    id: 1,
    title: {
      en: "Fresh Tomatoes",
      ru: "Свежие помидоры",
      ar: "طماطم طازجة",
      he: "עגבניות טריות"
    },
    description: {
      en: "Fresh organic tomatoes from the farm",
      ru: "Свежие органические помидоры с фермы",
      ar: "طماطم عضوية طازجة من المزرعة",
      he: "עגבניות אורגניות טריות מהחווה"
    },
    farmName: {
      en: "Galil Farm",
      ru: "Ферма Галиль",
      ar: "مزرعة الجليل",
      he: "חוות הגליל"
    },
    unit: {
      en: "kg",
      ru: "кг",
      ar: "كجم",
      he: "ק\"ג"
    },
    price: 15.99,
    originalPrice: 18.99,
    imageUrl: "/src/assets/tomat.jpg",
    category: "vegetables",
    rating: 4.8,
    isOrganic: true,
    stock: 50,
    tags: ["organic", "fresh", "local"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 2,
    title: {
      en: "Halloumi Cheese",
      ru: "Сыр халуми",
      ar: "جبنة حلومي",
      he: "גבינת חלומי"
    },
    description: {
      en: "Traditional Cypriot cheese",
      ru: "Традиционный кипрский сыр",
      ar: "جبنة قبرصية تقليدية",
      he: "גבינה קפריסאית מסורתית"
    },
    farmName: {
      en: "Galil Cheese",
      ru: "Галиль Сыр",
      ar: "جبنة الجليل",
      he: "גבינת הגליל"
    },
    unit: {
      en: "kg",
      ru: "кг",
      ar: "كجم",
      he: "ק\"ג"
    },
    price: 35.00,
    imageUrl: "/src/assets/chease.jpg",
    category: "dairy",
    rating: 4.6,
    isOrganic: false,
    stock: 75,
    tags: ["fresh", "local"],
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-19T16:45:00Z"
  },
  {
    id: 3,
    title: { en: "Sweet Oranges", ru: "Сладкие апельсины", ar: "برتقال حلو", he: "תפוזים מתוקים" },
    description: { en: "Fresh oranges from a citrus grove", ru: "Свежие апельсины с цитрусовой рощи", ar: "برتقال طازج من بستان الحمضيات", he: "תפוזים טריים מגן הדרים" },
    farmName: { en: "Citrus Grove", ru: "Цитрусовая роща", ar: "بستان الحمضيات", he: "גן הדרים" },
    unit: { en: "kg", ru: "кг", ar: "كجم", he: "ק\"ג" },
    price: 12.50, originalPrice: 14.99, imageUrl: "/src/assets/orange.jpg", category: "fruits", rating: 4.9, isOrganic: true, stock: 30, tags: ["organic", "herbs", "fresh"], createdAt: "2024-01-17T09:00:00Z", updatedAt: "2024-01-20T12:15:00Z"
  },
  {
    id: 4,
    title: { en: "Fresh Basil", ru: "Свежий базилик", ar: "ريحان طازج", he: "בזיליקום טרי" },
    description: { en: "Aromatic basil for Italian dishes", ru: "Ароматный базилик для итальянских блюд", ar: "ريحان عطري للأطباق الإيطالية", he: "בזיליקום ארומטי למנות איטלקיות" },
    farmName: { en: "Herb Farm", ru: "Травяная ферма", ar: "مزرعة الأعشاب", he: "חוות התבלינים" },
    unit: { en: "bunch", ru: "пучок", ar: "حزمة", he: "צרור" },
    price: 8.99, originalPrice: 10.59, imageUrl: "/src/assets/basil.jpg", category: "herbs", rating: 4.7, isOrganic: true, stock: 40, tags: ["organic", "herbs", "fresh"], createdAt: "2024-01-18T07:00:00Z", updatedAt: "2024-01-20T11:30:00Z"
  },
  {
    id: 5,
    title: { en: "Homemade Yogurt", ru: "Домашний йогурт", ar: "زبادي منزلي", he: "יוגורט ביתי" },
    description: { en: "Natural homemade yogurt", ru: "Натуральный домашний йогурт", ar: "زبادي طبيعي منزلي", he: "יוגורט טבעי ביתי" },
    farmName: { en: "Dairy Farm", ru: "Молочная ферма", ar: "مزرعة الألبان", he: "חוות החלב" },
    unit: { en: "liter", ru: "литр", ar: "لتر", he: "ליטר" },
    price: 18.50, originalPrice: 21.76, imageUrl: "/src/assets/yogurt.jpg", category: "dairy", rating: 4.5, isOrganic: true, stock: 25, tags: ["fresh", "local"], createdAt: "2024-01-19T10:00:00Z", updatedAt: "2024-01-20T15:20:00Z"
  },
  {
    id: 6,
    title: { en: "Eucalyptus Honey", ru: "Мед из эвкалипта", ar: "عسل الكافور", he: "דבש אקליפטוס" },
    description: { en: "Natural honey from eucalyptus flowers", ru: "Натуральный мед из эвкалистовых цветов", ar: "عسل طبيعي من أزهار الكافور", he: "דבש טבעי מפרחי אקליפטוס" },
    farmName: { en: "Sharon Apiary", ru: "Пасека Шарон", ar: "منحل شارون", he: "כוורת שרון" },
    unit: { en: "jar 500g", ru: "банка 500г", ar: "جرة 500 جرام", he: "צנצנת 500 גרם" },
    price: 45.00, originalPrice: 52.94, imageUrl: "/src/assets/honey.jpg", category: "honey", rating: 4.8, isOrganic: true, stock: 20, tags: ["organic", "artisanal", "local"], createdAt: "2024-01-20T06:00:00Z", updatedAt: "2024-01-20T13:45:00Z"
  },
  {
    id: 7,
    title: { en: "Roses", ru: "Розы", ar: "ورود", he: "ורדים" },
    description: { en: "Fresh roses in various colors", ru: "Свежие розы разных цветов", ar: "ورود طازجة بألوان مختلفة", he: "ורדים טריים בצבעים שונים" },
    farmName: { en: "Flower Farm", ru: "Цветочная ферма", ar: "مزرعة الزهور", he: "חוות הפרחים" },
    unit: { en: "bouquet", ru: "букет", ar: "باقة", he: "זר" },
    price: 25.00, originalPrice: 29.41, imageUrl: "/src/assets/rose.jpg", category: "flowers", rating: 4.9, isOrganic: true, stock: 15, tags: ["organic", "natural", "local"], createdAt: "2024-01-15T12:00:00Z", updatedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: 8,
    title: { en: "Cucumbers", ru: "Огурцы", ar: "خيار", he: "מלפפונים" },
    description: { en: "Fresh crispy cucumbers", ru: "Свежие хрустящие огурцы", ar: "خيار طازج مقرمش", he: "מלפפונים טריים ופריכים" },
    farmName: { en: "Vegetable Farm", ru: "Овощная ферма", ar: "مزرعة الخضار", he: "חוות הירקות" },
    unit: { en: "kg", ru: "кг", ar: "كجم", he: "ק\"ג" },
    price: 9.99, originalPrice: 11.75, imageUrl: "/src/assets/cucumber.jpg", category: "vegetables", rating: 4.7, isOrganic: true, stock: 35, tags: ["organic", "fresh", "local"], createdAt: "2024-01-20T05:00:00Z", updatedAt: "2024-01-20T14:15:00Z"
  },
  {
    id: 9,
    title: { en: "Avocado", ru: "Авокадо", ar: "أفوكادو", he: "אבוקדו" },
    description: { en: "Ripe Hass avocados", ru: "Спелые авокадо Хасс", ar: "أفوكادو هاس ناضج", he: "אבוקדו האס בשל" },
    farmName: { en: "Tropical Farm", ru: "Тропическая ферма", ar: "مزرعة استوائية", he: "חווה טרופית" },
    unit: { en: "kg", ru: "кг", ar: "كجم", he: "ק\"ג" },
    price: 22.50, imageUrl: "/src/assets/avocado.jpg", category: "fruits", rating: 4.6, isOrganic: true, stock: 0, tags: ["fresh", "vitamin-c"], createdAt: "2024-01-18T08:00:00Z", updatedAt: "2024-01-20T09:45:00Z"
  },
  {
    id: 10,
    title: { en: "Mint", ru: "Мята", ar: "نعناع", he: "נענע" },
    description: { en: "Fresh mint for tea", ru: "Свежая мята для чая", ar: "نعناع طازج للشاي", he: "נענע טרייה לתה" },
    farmName: { en: "Herb Farm", ru: "Травяная ферма", ar: "مزرعة الأعشاب", he: "חוות התבלינים" },
    unit: { en: "bunch", ru: "пучок", ar: "حزمة", he: "צרור" },
    price: 6.50, originalPrice: 7.65, imageUrl: "/src/assets/mint.jpg", category: "herbs", rating: 4.8, isOrganic: true, stock: 10, tags: ["organic", "beautiful", "fresh"], createdAt: "2024-01-19T07:00:00Z", updatedAt: "2024-01-20T16:00:00Z"
  }
];

// 📊 Пользователи теперь хранятся в JSON файле data/users.json
// Работа с ними через userDB модуль

// 🔐 JWT секрет (в реальном проекте должен быть в переменных окружения)
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// 🔑 Google OAuth конфигурация
const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
  callbackURL: 'http://localhost:3000/api/auth/google/callback'
};

// 🔍 Отладочная информация
console.log('🔍 Environment variables:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Loaded' : '❌ Not loaded');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Loaded' : '❌ Not loaded');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Not loaded');
console.log('🔍 Google OAuth Config:');
console.log('Client ID:', GOOGLE_CONFIG.clientID);
console.log('Callback URL:', GOOGLE_CONFIG.callbackURL);

const app = express();
const PORT = process.env.PORT || 3000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

// 🔐 Passport конфигурация
passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CONFIG.clientID,
    clientSecret: GOOGLE_CONFIG.clientSecret,
    callbackURL: GOOGLE_CONFIG.callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('🔍 Google OAuth: Looking for user with email:', profile.emails?.[0]?.value);
      
      // Проверяем, существует ли пользователь в JSON базе
      let user = userDB.findUserByEmail(profile.emails?.[0]?.value);

      if (!user) {
        console.log('🔍 Google OAuth: User not found, creating new user');
        // Создаем нового пользователя в JSON базе
        const userData = {
          name: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          password: await bcrypt.hash(Math.random().toString(36), 10),
          phone: '',
          address: '',
          preferredLanguage: 'ru',
          role: 'user',
          googleId: profile.id
        };

        user = userDB.addUser(userData);
        
        if (!user) {
          throw new Error('Failed to create user in database');
        }
      } else {
        console.log('🔍 Google OAuth: Existing user found:', user.email);
      }

      return done(null, user);
    } catch (error) {
      console.error('❌ Google OAuth error:', error);
      return done(error);
    }
  }
));

// 🔧 Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// 📁 Статические файлы (изображения)
app.use('/src/assets', express.static('src/assets'));

// 🔐 Middleware для проверки JWT токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// 🔐 Auth API Routes

// 🔑 Google OAuth маршруты
app.get('/api/auth/google', (req, res, next) => {
  console.log('🔍 Google OAuth request received');
  console.log('🔍 Request URL:', req.url);
  console.log('🔍 Request headers:', req.headers);
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/api/auth/google/callback', (req, res, next) => {
  console.log('🔍 Google OAuth callback received');
  console.log('🔍 Request URL:', req.url);
  console.log('🔍 Request query:', req.query);
  passport.authenticate('google', { session: false })(req, res, next);
}, (req, res) => {
  try {
    console.log('🔍 Google OAuth callback processing');
    console.log('🔍 User data:', req.user);
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email, role: req.user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('🔍 JWT token created, redirecting to frontend');
    // Перенаправляем на фронтенд с токеном
    res.redirect(`http://localhost:5173/auth-callback?token=${token}`);
  } catch (error) {
    console.log('🔍 Error in Google OAuth callback:', error);
    res.redirect(`http://localhost:5173/auth-callback?error=Authentication failed`);
  }
});

// 📝 Регистрация
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, preferredLanguage } = req.body;

    // Проверяем, существует ли пользователь в JSON базе
    const existingUser = userDB.findUserByEmail(email);
    if (existingUser) {
      console.log('❌ Registration failed: User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя в JSON базе
    const userData = {
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      preferredLanguage: preferredLanguage || 'ru',
      role: 'user'
    };

    const newUser = userDB.addUser(userData);
    
    if (!newUser) {
      throw new Error('Failed to create user in database');
    }
    
    console.log('✅ Registration successful:', email);

    // Создаем JWT токен
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Возвращаем пользователя без пароля
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🔑 Вход
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя в JSON базе
    const user = userDB.findUserByEmail(email);
    if (!user) {
      console.log('❌ Login failed: User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('✅ Login: User found:', email);

    // Проверяем пароль
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Создаем JWT токен
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Возвращаем пользователя без пароля
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 👤 Получить профиль пользователя
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const user = userDB.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// 🔄 Обновить профиль
app.put('/api/auth/profile', authenticateToken, (req, res) => {
  const { name, phone, address, preferredLanguage } = req.body;
  
  const updateData = {};
  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (address) updateData.address = address;
  if (preferredLanguage) updateData.preferredLanguage = preferredLanguage;

  const updatedUser = userDB.updateUser(req.user.id, updateData);
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = updatedUser;
  res.json({
    message: 'Profile updated successfully',
    user: userWithoutPassword
  });
});

// 📧 Сброс пароля (имитация отправки email)
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  
  const user = userDB.findUserByEmail(email);
  if (!user) {
    // В реальном приложении не раскрываем, существует ли пользователь
    return res.json({ message: 'If user exists, password reset email has been sent' });
  }

  // Имитация отправки email
  console.log(`📧 Password reset email would be sent to: ${email}`);
  res.json({ message: 'If user exists, password reset email has been sent' });
});

// 🚪 Выход (в JWT системе обычно выполняется на клиенте)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // В JWT системе logout обычно обрабатывается на клиенте
  // Здесь можно добавить логику blacklist токенов, если необходимо
  res.json({ message: 'Logout successful' });
});

// 📡 API Routes

// 🛍️ Mock Products endpoint для совместимости
app.get('/products-mock', (req, res) => {
  res.json({
    data: mockProducts,
    total: mockProducts.length,
    message: 'Mock products data'
  });
});

app.get('/api/products', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  
  const paginatedProducts = mockProducts.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedProducts,
    total: mockProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(mockProducts.length / limit)
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = mockProducts.find(p => p.id === parseInt(id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json({ data: mockProducts, total: mockProducts.length });
  }
  
  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(q.toLowerCase()) ||
    product.description.toLowerCase().includes(q.toLowerCase()) ||
    product.category.toLowerCase().includes(q.toLowerCase()) ||
    product.farmName.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    data: filteredProducts,
    total: filteredProducts.length
  });
});

app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  
  const filteredProducts = mockProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    data: filteredProducts,
    total: filteredProducts.length
  });
});

// 🏭 Farms API endpoints
app.get('/api/farms', (req, res) => {
  const { north, south, east, west, search } = req.query;
  let farms = farmDB.getAllFarms();

  if ([north, south, east, west].every(v => typeof v !== 'undefined')) {
    farms = farmDB.getFarmsByBounds({
      north: parseFloat(north),
      south: parseFloat(south),
      east: parseFloat(east),
      west: parseFloat(west),
    });
  }

  if (search) {
    const q = String(search).toLowerCase();
    farms = farms.filter(f =>
      JSON.stringify(f.name).toLowerCase().includes(q) ||
      String(f.location || '').toLowerCase().includes(q)
    );
  }

  res.json({ data: farms, total: farms.length });
});

app.get('/api/farms/:id', (req, res) => {
  const { id } = req.params;
  const farm = farmDB.getFarmById(id);
  if (!farm) return res.status(404).json({ error: 'Farm not found' });
  res.json(farm);
});

app.get('/api/farms/:id/products', (req, res) => {
  const { id } = req.params;
  const farm = farmDB.getFarmById(id);
  if (!farm) return res.status(404).json({ error: 'Farm not found' });

  // 1) Если в JSON-БД у фермы есть собственный список товаров — отдаем его
  if (Array.isArray(farm.products) && farm.products.length > 0) {
    return res.json({ data: farm.products, total: farm.products.length });
  }

  // 2) Иначе — совместимость со старыми моками по названию фермы
  const nameKey = JSON.stringify(farm.name || {});
  const fallback = mockProducts.filter(p => JSON.stringify(p.farmName || {}) === nameKey);
  return res.json({ data: fallback, total: fallback.length });
});

// 🛒 Cart API endpoints
let mockCart = [];

app.get('/api/cart', (req, res) => {
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const existingItem = mockCart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    mockCart.push({
      id: Date.now(),
      productId,
      quantity,
      product
    });
  }
  
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.put('/api/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  
  const item = mockCart.find(item => item.id === parseInt(itemId));
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  item.quantity = quantity;
  
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.delete('/api/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  
  const itemIndex = mockCart.findIndex(item => item.id === parseInt(itemId));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  mockCart.splice(itemIndex, 1);
  
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.delete('/api/cart', (req, res) => {
  mockCart = [];
  
  res.json({
    data: [],
    total: 0,
    totalPrice: 0
  });
});

// 💳 Payments API (Stripe)
app.post('/api/payments/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'ils' } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: 'Stripe not configured' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('❌ Stripe create-intent error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🧾 Orders API endpoints
app.post('/api/orders', (req, res) => {
  try {
    const { userId, items, deliveryAddress, paymentMethod, paymentId = null, totalAmount, currency } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }
    if (!deliveryAddress || !deliveryAddress.address || !deliveryAddress.city || !deliveryAddress.name || !deliveryAddress.phone) {
      return res.status(400).json({ message: 'Delivery address is invalid' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }
    if (!currency) {
      return res.status(400).json({ message: 'Currency is required' });
    }

    // Собираем снимок товаров из mockProducts
    const orderItems = items.map(({ productId, quantity }) => {
      const product = mockProducts.find((p) => p.id === parseInt(productId));
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }
      return {
        product,
        quantity,
        price: product.price,
      };
    });

    const orderData = {
      userId: userId || 0,
      items: orderItems,
      totalAmount,
      currency,
      status: 'pending',
      deliveryAddress,
      paymentMethod,
      paymentId,
    };

    const order = orderDB.addOrder(orderData);
    if (!order) {
      return res.status(500).json({ message: 'Failed to create order' });
    }

    res.status(201).json({ data: order, success: true, message: 'Order created' });
  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/orders', (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const orders = orderDB.getOrdersByUser(userId);
    res.json({ data: orders, success: true, total: orders.length });
  } catch (error) {
    console.error('❌ Get orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 📊 Статистика пользователей
app.get('/api/admin/users/stats', (req, res) => {
  try {
    const stats = userDB.getUserStats();
    const allUsers = userDB.getAllUsers().map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json({
      message: 'User database statistics',
      stats,
      users: allUsers,
      database: {
        type: 'JSON File',
        location: './data/users.json',
        persistent: true
      }
    });
  } catch (error) {
    console.error('❌ Error getting user stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🏠 Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'FarmSharing API Server',
    version: '1.0.0',
    endpoints: [
      // 🔐 Auth endpoints
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'PUT /api/auth/profile',
      'POST /api/auth/forgot-password',
      'POST /api/auth/logout',
      // 🛍️ Products endpoints
      'GET /api/products',
      'GET /api/products/:id',
      'GET /api/products/search?q=query',
      'GET /api/products/category/:category',
      // 🏪 Farms endpoints
      'GET /api/farms',
      'GET /api/farms/:id',
      'GET /api/farms/:id/products',
      // 🛒 Cart endpoints
      'GET /api/cart',
      'POST /api/cart/add',
      'PUT /api/cart/:itemId',
      'DELETE /api/cart/:itemId',
      'DELETE /api/cart'
    ]
  });
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/products`);
  console.log(`🔍 Health check at http://localhost:${PORT}/`);
}); 