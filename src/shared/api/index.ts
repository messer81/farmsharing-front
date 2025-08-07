// Единый фасад для API хуков и клиентов RTK Query

export { baseApi } from './rtk';

// Продукты
export { useGetProductsQuery, useGetProductsPaginatedQuery } from '../../entities/product/model/rtkApi';

// Пользователь
export {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} from '../../entities/user/model/rtkApi';

// Заказы
export { useGetOrdersByUserQuery, useCreateOrderMutation } from '../../entities/order/model/rtkApi';

// Фермы
export { useGetFarmsQuery, useGetFarmByIdQuery } from '../../entities/farm/model/rtkApi';


