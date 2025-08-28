// src/app/services/bookingApi.ts
import type { User } from "../../features/auth/types";
import { apiSlice } from "../apiSlice";

// Types
interface Room {
  id: string;
  roomNumber: string;
  type: string;
  price: number;
  capacity: number;
}

interface AvailabilityResponse {
  available: boolean;
  rooms: Room[];
}

interface DiscountResponse {
  valid: boolean;
  discount_percent: number;
}

interface BookingResponse {
  message: string;
  booking: any;
  total_price: number;
}

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // -------- PROFILE --------
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<User, { name: string }>({
      query: (data) => ({
        url: "/auth/profile",
        method: "PUT",
        data, // ✅ use body instead of data
      }),
      invalidatesTags: ["Profile"],
    }),

    // -------- BOOKINGS --------
    checkAvailability: builder.mutation<
      AvailabilityResponse,
      { check_in_date: string; check_out_date: string; room_type: string }
    >({
      query: (body) => ({
        url: "/bookings/availability",
        method: "POST",
        body,
      }),
    }),

    validateCode: builder.mutation<
      DiscountResponse,
      { code: string; codeType: string }
    >({
      query: (body) => ({
        url: "/bookings/validate-code",
        method: "POST",
        body,
      }),
    }),

    createBooking: builder.mutation<
      BookingResponse,
      {
        user_id: string;
        room_id: string;
        check_in_date: string;
        check_out_date: string;
        num_guests: number;
        offer_code?: string | null;
      }
    >({
      query: (body) => ({
        url: "/bookings/create",
        method: "POST",
        body,
      }),
    }),
    getUserBookings: builder.query<any, string>({
     query: (user_id) => ({
    url: `/bookings/user/${user_id}`, // matches backend route
    method: "GET",
     }),
     providesTags: ["Profile"],
     }),

  }),

  overrideExisting: false,
});

// Hooks
export const {
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useCheckAvailabilityMutation,
  useValidateCodeMutation,
  useCreateBookingMutation,
  useLazyGetUserBookingsQuery,
} = bookingApi;
