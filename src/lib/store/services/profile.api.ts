import { Profile, ProfileResponse } from "@/src/components/organisms/profile/profile.types";
import { api } from "./api";




export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET /user/me
        getProfile: builder.query<Profile, void>({
            query: () => `/user/me`,
            transformResponse: (response: ProfileResponse) => response.data,
            providesTags: ["Profile"],
        }),

        // PUT /user/me (FormData)
        updateProfile: builder.mutation<Profile, FormData>({
            query: (formData) => ({
                url: `/user/me`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;