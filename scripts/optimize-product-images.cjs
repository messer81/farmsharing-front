#!/usr/bin/env node
// 🖼️ Скрипт для оптимизации изображений карточек продуктов
// Оптимизируем только ИСПОЛЬЗУЕМЫЕ изображения!

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

console.log('🎯 Оптимизируем ТОЛЬКО используемые изображения карточек...');
console.log('');

async function optimizeCardImage() {
  const inputPath = path.join(ASSETS_DIR, 'card image.jpg');
  
  if (!fs.existsSync(inputPath)) {
    console.error('❌ Файл card image.jpg не найден!');
    return;
  }

  console.log('🃏 Обрабатываем card image.jpg (default изображение)...');
  
  try {
    // 1. Оптимизированная версия для карточек (300x200)
    console.log('  📦 Создаем оптимизированную версию для карточек...');
    await sharp(inputPath)
      .resize(300, 200, { fit: 'cover' })
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'card-image-optimized.jpg'));

    // 2. Маленькая версия для превью (150x100)
    console.log('  🔍 Создаем маленькую версию для превью...');
    await sharp(inputPath)
      .resize(150, 100, { fit: 'cover' })
      .jpeg({ quality: 70, progressive: true })
      .toFile(path.join(OPTIMIZED_DIR, 'card-image-small.jpg'));

    // 3. WebP версии
    console.log('  🌐 Создаем WebP версии...');
    
    // WebP основная
    await sharp(inputPath)
      .resize(300, 200, { fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(path.join(OPTIMIZED_DIR, 'card-image-optimized.webp'));
    
    // WebP маленькая
    await sharp(inputPath)
      .resize(150, 100, { fit: 'cover' })
      .webp({ quality: 70 })
      .toFile(path.join(OPTIMIZED_DIR, 'card-image-small.webp'));

    console.log('');
    console.log('✅ card image.jpg успешно оптимизирован!');
    
  } catch (error) {
    console.error('❌ Ошибка при обработке card image.jpg:', error.message);
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
  console.log('📊 РЕЗУЛЬТАТЫ ОПТИМИЗАЦИИ КАРТОЧЕК:');
  console.log('');
  
  const originalSize = await getFileSize(path.join(ASSETS_DIR, 'card image.jpg'));
  console.log(`🔸 Оригинал: card image.jpg (${originalSize})`);
  console.log('');
  
  console.log('🔸 Оптимизированные варианты:');
  
  const variants = [
    'card-image-optimized.jpg',
    'card-image-small.jpg',
    'card-image-optimized.webp',
    'card-image-small.webp'
  ];
  
  for (const variant of variants) {
    const size = await getFileSize(path.join(OPTIMIZED_DIR, variant));
    console.log(`   - ${variant} (${size})`);
  }
  
  console.log('');
  console.log('✅ Оптимизация карточек завершена!');
  console.log('📁 Оригинал сохранен в: src/assets/');
  console.log('📁 Оптимизированные в: src/assets/optimized/');
}

// Основная функция
async function main() {
  try {
    await optimizeCardImage();
    await showResults();
    
    console.log('');
    console.log('🎯 СЛЕДУЮЩИЕ ШАГИ:');
    console.log('1. Обновить imageUtils.ts для использования оптимизированного изображения');
    console.log('2. Добавить фиксированные размеры в ProductCard компонент (исправить CLS)');
    console.log('3. Протестировать производительность');
    
  } catch (error) {
    console.error('❌ Общая ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск
main();