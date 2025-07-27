import { api } from "./api";

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          _id: string;
          fileName: string;
          filePath: string;
          uploadedBy: string;
          uploadedAt: string;
        };
      },
      FormData
    >({
      query: (formData) => ({
        url: "/uploads/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
  }),
});

export const { useUploadProfileImageMutation } = uploadApi;
