import { Profile, ProfileResponse } from "@/src/components/organisms/profile/profile.types";
import { api } from "./api";
import { ENDPOINTS } from "./Endpoints";

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET /user/me
        getProfile: builder.query<Profile, void>({
            query: () => ({
                url: ENDPOINTS.USER.GET_ME,
                method: 'GET',
            }),
            transformResponse: (response: ProfileResponse) => response.data,
            providesTags: ["Profile"],
        }),

        // PUT /user/me (FormData)
        updateProfile: builder.mutation<Profile, FormData>({
            query: (formData) => ({
                url: ENDPOINTS.USER.UPDATE_ME,
                method: "PUT",
                body: formData,
            }),
            transformResponse: (response: ProfileResponse) => response.data,
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;