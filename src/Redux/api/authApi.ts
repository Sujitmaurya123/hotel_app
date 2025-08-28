// src/app/services/authApi.ts
import type { AuthResponse } from "../../features/auth/types";
import { apiSlice } from "../apiSlice";

// Helper: persist/remove token
const setToken = (token: string) => localStorage.setItem("token", token);
const clearToken = () => localStorage.removeItem("token");

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, { name: string; phone: string }>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<{ message: string }, { phone: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    sendOtp: builder.mutation<{ message: string }, { phone: string }>({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        data: body,
      }),
    }),

    verifyOtp: builder.mutation<AuthResponse, { phone: string; otp: string }>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Auth", "Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) setToken(data.token);
        } catch {
          // ignore error silently
        }
      },
    }),



    

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          clearToken();
        }
      },
    }),
  }),

  overrideExisting: false,
});

// Hooks
export const {
  useSignupMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = authApi;
