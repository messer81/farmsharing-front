// 🧪 Тестовая страница продуктов для демонстрации корзины
import { Container, Typography, Grid } from '@mui/material';
import { useCallback } from 'react';
import { useAppDispatch } from '../app/store/store';
import { addToCart } from '../features/cart/model/cartSlice';
// import { useTranslation } from 'react-i18next';
import { ProductCard } from '../entities/product/ui/ProductCard';
import type { Product } from '../types/api';
// Импортируем изображения
import basilImage from '../assets/basil.jpg';
import honeyImage from '../assets/honey.jpg';
import cucumberImage from '../assets/cucumber.jpg';
import mintImage from '../assets/mint.jpg';

// Тестовые продукты для демонстрации
const testProducts: Product[] = [
    {
        id: 1,
        title: {
            en: 'Fresh Basil',
            ru: 'Свежий базилик',
            ar: 'ريحان طازج',
            he: 'בזיליקום טרי'
        },
        description: {
            en: 'Organic fresh basil from local farms',
            ru: 'Органический свежий базилик с местных ферм',
            ar: 'ريحان طازج عضوي من المزارع المحلية',
            he: 'בזיליקום טרי אורגני מהחוות המקומיות'
        },
        farmName: {
            en: 'Green Valley Farm',
            ru: 'Ферма Зеленая Долина',
            ar: 'مزرعة الوادي الأخضر',
            he: 'חוות עמק ירוק'
        },
        unit: {
            en: 'kg',
            ru: 'кг',
            ar: 'كجم',
            he: 'ק"ג'
        },
        price: 12.50,
        originalPrice: 15.00,
        stock: 10,
        category: 'herbs',
        imageUrl: basilImage,
        isOrganic: true,
        discount: 17,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 2,
        title: {
            en: 'Organic Honey',
            ru: 'Органический мед',
            ar: 'عسل عضوي',
            he: 'דבש אורגני'
        },
        description: {
            en: 'Pure natural honey from wildflowers',
            ru: 'Чистый натуральный мед с полевых цветов',
            ar: 'عسل طبيعي نقي من الأزهار البرية',
            he: 'דבש טבעי טהור מפרחי בר'
        },
        farmName: {
            en: 'Bee Happy Farm',
            ru: 'Ферма Счастливые Пчелы',
            ar: 'مزرعة النحل السعيد',
            he: 'חוות הדבורים המאושרות'
        },
        unit: {
            en: 'kg',
            ru: 'кг',
            ar: 'كجم',
            he: 'ק"ג'
        },
        price: 35.00,
        stock: 5,
        category: 'honey',
        imageUrl: honeyImage,
        isOrganic: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 3,
        title: {
            en: 'Fresh Cucumber',
            ru: 'Свежий огурец',
            ar: 'خيار طازج',
            he: 'מלפפון טרי'
        },
        description: {
            en: 'Crispy fresh cucumbers from greenhouse',
            ru: 'Хрустящие свежие огурцы из теплицы',
            ar: 'خيار مقرمش طازج من الدفيئة',
            he: 'מלפפונים פריכים טריים מהחממה'
        },
        farmName: {
            en: 'Sunny Greenhouse',
            ru: 'Солнечная Теплица',
            ar: 'الدفيئة المشمسة',
            he: 'החממה השמשית'
        },
        unit: {
            en: 'kg',
            ru: 'кг',
            ar: 'كجم',
            he: 'ק"ג'
        },
        price: 8.00,
        stock: 20,
        category: 'vegetables',
        imageUrl: cucumberImage,
        isOrganic: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 4,
        title: {
            en: 'Fresh Mint',
            ru: 'Свежая мята',
            ar: 'نعناع طازج',
            he: 'נענע טרייה'
        },
        description: {
            en: 'Aromatic fresh mint leaves',
            ru: 'Ароматные свежие листья мяты',
            ar: 'أوراق النعناع العطرية الطازجة',
            he: 'עלי נענע ארומטיים טריים'
        },
        farmName: {
            en: 'Herb Garden',
            ru: 'Сад Трав',
            ar: 'حديقة الأعشاب',
            he: 'גן התבלינים'
        },
        unit: {
            en: 'bunch',
            ru: 'пучок',
            ar: 'حزمة',
            he: 'צרור'
        },
        price: 6.50,
        stock: 15,
        category: 'herbs',
        imageUrl: mintImage,
        isOrganic: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    }
];

export const TestProductsPage = () => {
    // const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleAddToCart = useCallback((product: Product) => {
        dispatch(addToCart({ product, quantity: 1 }));
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                    mb: 4, 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'primary.main'
                }}
            >
                🧪 Тестовая страница корзины
            </Typography>
            
            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 4, 
                    textAlign: 'center',
                    color: 'text.secondary',
                    maxWidth: 600,
                    mx: 'auto'
                }}
            >
                Простая страница для тестирования функциональности корзины
            </Typography>

            <Grid container spacing={3}>
                {testProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <ProductCard 
                            product={product}
                            onAddToCart={handleAddToCart}
                            onCardClick={(product) => {
                                console.log('Product clicked:', product);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TestProductsPage; 