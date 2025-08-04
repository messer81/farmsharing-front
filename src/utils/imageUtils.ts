// 🖼️ Утилиты для работы с изображениями

// 🔧 Функция для получения правильного пути к изображению
export const getImageUrl = (imageUrl: string): string => {
  // Если путь начинается с /src/assets/, заменяем на правильный URL
  if (imageUrl.startsWith('/src/assets/')) {
    return `http://localhost:3000${imageUrl}`;
  }
  return imageUrl;
};

// 🖼️ Функция для получения изображения по умолчанию
export const getDefaultImage = (): string => {
  return 'http://localhost:3000/src/assets/card%20image.jpg';
};

// 🔧 Функция для обработки ошибок загрузки изображений
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.target as HTMLImageElement;
  
  // Если изображение уже заменено на дефолтное, не делаем ничего
  if (img.src.includes('card%20image.jpg')) {
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