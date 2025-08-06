#!/usr/bin/env node
// 🖼️ Скрипт для создания оптимизированных изображений
// ВАЖНО: Оригиналы сохраняются в src/assets/, оптимизированные в src/assets/optimized/

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Пути
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const OPTIMIZED_DIR = path.join(ASSETS_DIR, 'optimized');

// Создаем папку если не существует
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

console.log('🚀 Начинаем оптимизацию изображений...');
console.log(`📁 Исходная папка: ${ASSETS_DIR}`);
console.log(`📁 Целевая папка: ${OPTIMIZED_DIR}`);
console.log('');

async function optimizeHeroBackground() {
  const inputPath = path.join(ASSETS_DIR, 'hero-bg.jpg');
  
  if (!fs.existsSync(inputPath)) {
    console.error('❌ Файл hero-bg.jpg не найден!');
    return;
  }

  console.log('🎨 Обрабатываем hero-bg.jpg...');
  
  try {
    // 1. Светлая тема - только размытие
    console.log('  ⚪ Создаем вариант для светлой темы...');
    await sharp(inputPath)
      .blur(4) // blur(8px) CSS ≈ blur(4) в Sharp
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-light.jpg'));
    
    // 2. Темная тема - размытие + затемнение
    console.log('  ⚫ Создаем вариант для темной темы...');
    await sharp(inputPath)
      .blur(4)
      .modulate({ brightness: 0.7 }) // brightness(0.7) как в CSS
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-dark.jpg'));

    // 3. Responsive варианты для светлой темы
    console.log('  📱 Создаем mobile вариант (светлая тема)...');
    await sharp(inputPath)
      .resize(480, 320, { fit: 'cover' })
      .blur(3)
      .jpeg({ quality: 70, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-light-mobile.jpg'));

    console.log('  📱 Создаем tablet вариант (светлая тема)...');
    await sharp(inputPath)
      .resize(768, 400, { fit: 'cover' })
      .blur(4)
      .jpeg({ quality: 73, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-light-tablet.jpg'));

    console.log('  💻 Создаем desktop вариант (светлая тема)...');
    await sharp(inputPath)
      .resize(1200, 600, { fit: 'cover' })
      .blur(4)
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-light-desktop.jpg'));

    // 4. Responsive варианты для темной темы
    console.log('  📱 Создаем mobile вариант (темная тема)...');
    await sharp(inputPath)
      .resize(480, 320, { fit: 'cover' })
      .blur(3)
      .modulate({ brightness: 0.7 })
      .jpeg({ quality: 70, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-dark-mobile.jpg'));

    console.log('  📱 Создаем tablet вариант (темная тема)...');
    await sharp(inputPath)
      .resize(768, 400, { fit: 'cover' })
      .blur(4)
      .modulate({ brightness: 0.7 })
      .jpeg({ quality: 73, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-dark-tablet.jpg'));

    console.log('  💻 Создаем desktop вариант (темная тема)...');
    await sharp(inputPath)
      .resize(1200, 600, { fit: 'cover' })
      .blur(4)
      .modulate({ brightness: 0.7 })
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-dark-desktop.jpg'));

    // 5. WebP варианты для лучшего сжатия
    console.log('  🌐 Создаем WebP варианты...');
    
    // WebP светлая тема
    await sharp(inputPath)
      .blur(4)
      .webp({ quality: 75 })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-light.webp'));
    
    // WebP темная тема
    await sharp(inputPath)
      .blur(4)
      .modulate({ brightness: 0.7 })
      .webp({ quality: 75 })
      .toFile(path.join(OPTIMIZED_DIR, 'hero-bg-dark.webp'));

    console.log('');
    console.log('✅ hero-bg.jpg успешно обработан!');
    
  } catch (error) {
    console.error('❌ Ошибка при обработке hero-bg.jpg:', error.message);
  }
}

async function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(1) + ' KB';
  } catch {
    return 'N/A';
  }
}

async function showResults() {
  console.log('');
  console.log('📊 РЕЗУЛЬТАТЫ ОПТИМИЗАЦИИ:');
  console.log('');
  
  const originalSize = await getFileSize(path.join(ASSETS_DIR, 'hero-bg.jpg'));
  console.log(`🔸 Оригинал: hero-bg.jpg (${originalSize})`);
  console.log('');
  
  console.log('🔸 Оптимизированные варианты:');
  
  const variants = [
    'hero-bg-light.jpg',
    'hero-bg-dark.jpg', 
    'hero-bg-light-mobile.jpg',
    'hero-bg-light-tablet.jpg',
    'hero-bg-light-desktop.jpg',
    'hero-bg-dark-mobile.jpg',
    'hero-bg-dark-tablet.jpg',
    'hero-bg-dark-desktop.jpg',
    'hero-bg-light.webp',
    'hero-bg-dark.webp'
  ];
  
  for (const variant of variants) {
    const size = await getFileSize(path.join(OPTIMIZED_DIR, variant));
    console.log(`   - ${variant} (${size})`);
  }
  
  console.log('');
  console.log('✅ Все варианты созданы успешно!');
  console.log('📁 Оригиналы сохранены в: src/assets/');
  console.log('📁 Оптимизированные в: src/assets/optimized/');
}

// Основная функция
async function main() {
  try {
    await optimizeHeroBackground();
    await showResults();
    
    console.log('');
    console.log('🎯 СЛЕДУЮЩИЕ ШАГИ:');
    console.log('1. Обновить HeroSection.tsx для использования оптимизированных изображений');
    console.log('2. Обновить ProductsPage.tsx');
    console.log('3. Убрать CSS фильтры (filter: blur, brightness)');
    console.log('4. Убрать transform: scale');
    console.log('5. Протестировать производительность');
    
  } catch (error) {
    console.error('❌ Общая ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск
main();