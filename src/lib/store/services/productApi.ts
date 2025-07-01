// store/services/productsApi.js
import { api } from './api'

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
  //   getProducts: builder.query({
  //     query: ({ page = 1, limit = 10, category, search } = {}) => ({
  //       url: '/products',
  //       params: { page, limit, category, search },
  //     }),
  //     providesTags: (result) =>
  //       result
  //         ? [
  //             ...result.data.map(({ id }) => ({ type: 'Product', id })),
  //             { type: 'Product', id: 'LIST' },
  //           ]
  //         : [{ type: 'Product', id: 'LIST' }],
  //   }),
    
  //   getProduct: builder.query({
  //     query: (id) => `/products/${id}`,
  //     providesTags: (result, error, id) => [{ type: 'Product', id }],
  //   }),
    
  //   createProduct: builder.mutation({
  //     query: (productData) => ({
  //       url: '/products',
  //       method: 'POST',
  //       body: productData,
  //     }),
  //     invalidatesTags: [{ type: 'Product', id: 'LIST' }],
  //   }),
    
  //   updateProduct: builder.mutation({
  //     query: ({ id, ...patch }) => ({
  //       url: `/products/${id}`,
  //       method: 'PATCH',
  //       body: patch,
  //     }),
  //     invalidatesTags: (result, error, { id }) => [
  //       { type: 'Product', id },
  //       { type: 'Product', id: 'LIST' },
  //     ],
  //   }),
    
  //   deleteProduct: builder.mutation({
  //     query: (id) => ({
  //       url: `/products/${id}`,
  //       method: 'DELETE',
  //     }),
  //     invalidatesTags: (result, error, id) => [
  //       { type: 'Product', id },
  //       { type: 'Product', id: 'LIST' },
  //     ],
  //   }),
    
  //   getCategories: builder.query({
  //     query: () => '/products/categories',
  //     providesTags: ['Category'],
  //   }),
  }),
})

export const {
  // useGetProductsQuery,
  // useGetProductQuery,
  // useCreateProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
  // useGetCategoriesQuery,
} = productsApi