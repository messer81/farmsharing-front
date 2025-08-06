// 🖼️ Утилиты для работы с изображениями

// 🔧 Функция для получения правильного пути к изображению
export const getImageUrl = (imageUrl: string): string => {
  // Если путь пустой или не указан, возвращаем дефолтное изображение
  if (!imageUrl || imageUrl.trim() === '') {
    return getDefaultImage();
  }
  
  // Если путь уже полный (начинается с /src/assets/), используем его как есть
  if (imageUrl.startsWith('/src/assets/')) {
    return imageUrl;
  }
  
  // Если путь короткий (например, "tomat.jpg"), добавляем префикс
  if (!imageUrl.includes('/')) {
    return `/src/assets/${imageUrl}`;
  }
  
  return imageUrl;
};

// 🖼️ Функция для получения изображения по умолчанию
export const getDefaultImage = (): string => {
  // ✅ Используем оптимизированное изображение (16KB вместо 104KB!)
  return '/src/assets/optimized/card-image-optimized.jpg';
};

// 🔧 Функция для обработки ошибок загрузки изображений
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.target as HTMLImageElement;
  
  // Если изображение уже заменено на дефолтное, не делаем ничего
  if (img.src.includes('card-image-optimized.jpg')) {
    return;
  }
  
  // Устанавливаем дефолтное изображение
  img.src = getDefaultImage();
  
  // Устанавливаем стили для корректного отображения
  img.style.objectFit = 'cover';
  img.style.minHeight = '100px';
  img.style.maxHeight = '120px';
  img.style.width = '100%';
}; 