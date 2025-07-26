// src/components/ProductCard/ProductCard.tsx
import React from 'react'
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, Button, Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { addToCart } from '../features/cart/cartSlice'
import { useAppDispatch } from '../../hooks/redux'

// Типы предложения, соответствуют вашему бэкенду
interface Offer {
    id: number
    title: string
    description: string
    price: number
    imageUrl?: string
}

interface ProductCardProps {
    offer: Offer
}

// Тени из customShadows
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1)
  `,
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `
      0px 4px 8px rgba(0, 0, 0, 0.12),
      0px 16px 24px rgba(0, 0, 0, 0.16)
    `,
    },
}))

const StyledCardMedia = styled(CardMedia)({
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
})

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
})

const ProductCard: React.FC<ProductCardProps> = ({ offer }) => {
    const dispatch = useAppDispatch()
    const handleAddToCart = () => {
        dispatch(addToCart({
            id: offer.id,
            title: offer.title,
            price: offer.price,
            imageUrl: offer.imageUrl,
            quantity: 1,
        }))
    }
    return (
        <StyledCard>
            <StyledCardMedia
                image={offer.imageUrl || '/placeholder-image.jpg'}
                title={offer.title}
            />
            <StyledCardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {offer.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        flexGrow: 1,
                        marginBottom: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {offer.description}
                </Typography>
                <Box sx={{ marginTop: 'auto' }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        ₪{offer.price}
                    </Typography>
                </Box>
            </StyledCardContent>
            <CardActions sx={{ padding: 2, paddingTop: 0 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddToCart}
                    sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                >
                    Добавить в корзину
                </Button>
            </CardActions>
        </StyledCard>
    )
}
export default ProductCard

// import React from 'react'
// import {
//     Card,
//     CardMedia,
//     CardContent,
//     CardActions,
//     Typography,
//     Button,
//     Box,
// } from '@mui/material'
// import { styled } from '@mui/material/styles'
// import { useAppDispatch } from '../../hooks/redux'
// import { addToCart } from '../features/cart/cartSlice'
//
// // Типы для товара (соответствуют вашему бэкенду)
// interface Offer {
//     id: number
//     title: string
//     description: string
//     price: number
//     imageUrl?: string
//     userId: number
// }
//
// interface ProductCardProps {
//     offer: Offer
// }
//
// // Стилизованная карточка с красивыми тенями
// const StyledCard = styled(Card)(({ theme }) => ({
//     maxWidth: 345,
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//
//     // Базовая тень (из первого проекта, но улучшенная)
//     boxShadow: `
//     0px 2px 4px rgba(0, 0, 0, 0.1),
//     0px 8px 16px rgba(0, 0, 0, 0.1)
//   `,
//
//     // Эффект при наведении
//     '&:hover': {
//         transform: 'translateY(-8px)',
//         boxShadow: `
//       0px 4px 8px rgba(0, 0, 0, 0.12),
//       0px 16px 24px rgba(0, 0, 0, 0.16)
//     `,
//     },
//
//     // Адаптивность
//     [theme.breakpoints.down('sm')]: {
//         maxWidth: '100%',
//     },
// }))
//
// // Стилизованная область для изображения
// const StyledCardMedia = styled(CardMedia)({
//     height: 200,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
// })
//
// // Стилизованная область контента
// const StyledCardContent = styled(CardContent)({
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
// })
//
// const ProductCard: React.FC<ProductCardProps> = ({ offer }) => {
//     const dispatch = useAppDispatch()
//
//     // Функция добавления в корзину
//     const handleAddToCart = () => {
//         dispatch(addToCart({
//             id: offer.id,
//             title: offer.title,
//             price: offer.price,
//             imageUrl: offer.imageUrl,
//             quantity: 1,
//         }))
//     }
//
//     return (
//         <StyledCard>
//             {/* Изображение товара */}
//             <StyledCardMedia
//                 image={offer.imageUrl || '/placeholder-image.jpg'}
//                 title={offer.title}
//             />
//
//             {/* Контент карточки */}
//             <StyledCardContent>
//                 {/* Название товара */}
//                 <Typography
//                     gutterBottom
//                     variant="h6"
//                     component="h2"
//                     sx={{
//                         fontWeight: 600,
//                         fontSize: '1.1rem',
//                         lineHeight: 1.3,
//                         marginBottom: 1,
//                     }}
//                 >
//                     {offer.title}
//                 </Typography>
//
//                 {/* Описание товара */}
//                 <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                         flexGrow: 1,
//                         marginBottom: 2,
//                         display: '-webkit-box',
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient: 'vertical',
//                         overflow: 'hidden',
//                     }}
//                 >
//                     {offer.description}
//                 </Typography>
//
//                 {/* Цена */}
//                 <Box sx={{ marginTop: 'auto' }}>
//                     <Typography
//                         variant="h6"
//                         component="span"
//                         sx={{
//                             fontWeight: 700,
//                             color: 'primary.main',
//                             fontSize: '1.3rem',
//                         }}
//                     >
//                         ₪{offer.price}
//                     </Typography>
//                 </Box>
//             </StyledCardContent>
//
//             {/* Действия (кнопки) */}
//             <CardActions sx={{ padding: 2, paddingTop: 0 }}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     onClick={handleAddToCart}
//                     sx={{
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         borderRadius: 2,
//                         padding: '10px 0',
//                     }}
//                 >
//                     Добавить в корзину
//                 </Button>
//             </CardActions>
//         </StyledCard>
//     )
// }
//
// export default ProductCard
