// 📊 Простая имитация базы данных пользователей через JSON файл
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, 'users.json');

// 🔍 Убеждаемся, что папка data существует
const ensureDataDirectory = () => {
  const dataDir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 📖 Чтение всех пользователей из JSON файла
const loadUsers = () => {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(USERS_FILE)) {
      // Если файл не существует, создаем пустой массив
      saveUsers([]);
      return [];
    }
    
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading users:', error);
    return [];
  }
};

// 💾 Сохранение всех пользователей в JSON файл
const saveUsers = (users) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    console.log('✅ Users saved to JSON file');
    return true;
  } catch (error) {
    console.error('❌ Error saving users:', error);
    return false;
  }
};

// 🔍 Поиск пользователя по email
const findUserByEmail = (email) => {
  const users = loadUsers();
  return users.find(user => user.email === email);
};

// 🔍 Поиск пользователя по ID
const findUserById = (id) => {
  const users = loadUsers();
  return users.find(user => user.id === parseInt(id));
};

// ➕ Добавление нового пользователя
const addUser = (userData) => {
  try {
    const users = loadUsers();
    
    // Генерируем новый ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const newUser = {
      id: newId,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    if (saveUsers(users)) {
      console.log(`✅ New user created: ${newUser.email} (ID: ${newUser.id})`);
      return newUser;
    } else {
      throw new Error('Failed to save user');
    }
  } catch (error) {
    console.error('❌ Error adding user:', error);
    return null;
  }
};

// ✏️ Обновление существующего пользователя
const updateUser = (id, userData) => {
  try {
    const users = loadUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    
    if (userIndex === -1) {
      return null;
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    if (saveUsers(users)) {
      console.log(`✅ User updated: ${users[userIndex].email} (ID: ${id})`);
      return users[userIndex];
    } else {
      throw new Error('Failed to save user');
    }
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return null;
  }
};

// 📊 Получение всех пользователей
const getAllUsers = () => {
  return loadUsers();
};

// 📈 Статистика пользователей
const getUserStats = () => {
  const users = loadUsers();
  return {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length,
    withGoogleId: users.filter(u => u.googleId).length
  };
};

module.exports = {
  findUserByEmail,
  findUserById,
  addUser,
  updateUser,
  getAllUsers,
  getUserStats,
  loadUsers,
  saveUsers
};