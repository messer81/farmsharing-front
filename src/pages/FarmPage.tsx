import { FarmProfile } from '../entities/farm/ui/FarmProfile.tsx';
                import type { Farm } from '../types';

                const FarmPage = () => {
                    const farm: Farm = {
                        id: 1,
                        name: 'Good Farm',
                        city: 'Haifa',
                        rating: 4.7,
                        products: [],
                        phone: '',
                        email: '',
                        description: '',
                        isVerified: undefined,
                        location: ''
                    };

                    // Сначала создаем ферму, затем добавляем продукты с ссылкой на неё
                    farm.products = [
                        {
                            id: 1,
                            title: 'Avocado',
                            price: 3,
                            imageUrl: 'https://i.postimg.cc/26tnQKcf/c9d16c25d8b568851495e590f5430413.jpg',
                            description: '',
                            category: '',
                            amount: 0,
                            units: '',
                            farm: farm
                        },
                        {
                            id: 2,
                            title: 'Oranges',
                            price: 4,
                            imageUrl: 'https://i.postimg.cc/1300kMtp/d37a26d95d1e8c4248b7787487ba80af.jpg',
                            description: '',
                            category: '',
                            amount: 0,
                            units: '',
                            farm: farm
                        },
                    ];

                    return (
                        <div className="container mx-auto p-4">
                            <FarmProfile farm={farm} />
                        </div>
                    );
                };

                export default FarmPage;