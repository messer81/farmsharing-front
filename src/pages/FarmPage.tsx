import { FarmProfile } from '../entities/farm/ui/FarmProfile.tsx';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Farm } from '../types';

const FarmPage = () => {
    const theme = useTheme();
    const farm: Farm = {
        id: 1,
        name: { en: 'Good Farm', ru: 'Хорошая Ферма', ar: 'مزرعة جيدة', he: 'חווה טובה' },
        description: { en: 'A wonderful farm with fresh produce', ru: 'Замечательная ферма со свежими продуктами', ar: 'مزرعة رائعة مع منتجات طازجة', he: 'חווה נפלאה עם תוצרת טרייה' },
        location: 'Haifa',
        verified: false,
        rating: 4.7,
        products: []
    };

    // Сначала создаем ферму, затем добавляем продукты с ссылкой на неё
    farm.products = [
        {
            id: 1,
            title: { en: 'Avocado', ru: 'Авокадо', ar: 'أفوكادو', he: 'אבוקדו' },
            price: 3,
            imageUrl: 'https://i.postimg.cc/26tnQKcf/c9d16c25d8b568851495e590f5430413.jpg',
            description: { en: 'Fresh avocados', ru: 'Свежие авокадо', ar: 'أفوكادو طازج', he: 'אבוקדו טרי' },
            category: 'vegetables',
            stock: 100,
            isOrganic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            farmName: farm.name,
            unit: { en: 'kg', ru: 'кг', ar: 'كغ', he: 'ק"ג' }
        },
        {
            id: 2,
            title: { en: 'Oranges', ru: 'Апельсины', ar: 'برتقال', he: 'תפוזים' },
            price: 4,
            imageUrl: 'https://i.postimg.cc/1300kMtp/d37a26d95d1e8c4248b7787487ba80af.jpg',
            description: { en: 'Sweet oranges', ru: 'Сладкие апельсины', ar: 'برتقال حلو', he: 'תפוזים מתוקים' },
            category: 'fruits',
            stock: 150,
            isOrganic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            farmName: farm.name,
            unit: { en: 'kg', ru: 'кг', ar: 'كغ', he: 'ק"ג' }
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: theme.palette.background.pagesBackground,
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="container mx-auto p-4">
                <FarmProfile farm={farm} />
            </div>
        </Box>
    );
};

export default FarmPage;