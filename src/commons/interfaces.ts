// HOME PAGE

import { SortOption } from "./types";

// Event interface for home page
export interface Event {
  eventId: string;
  creatorId: string;
  firstName: string;
  lastName: string;
  description: string;
  groupId: string;
  status: string;
  eventType: string;
}

// Interface InProgressEventCardProps for that component that contains event and activeUser that is loged in in app.
export interface InProgressEventCardProps {
  event: EventEvent;
  activeUser: any;
}

// Order food props is interface that is used in OrderFoodComponent and it carries all needed defined atributes
export interface OrderFoodProps {
  event: EventEvent;
  activeUser: any;
  onOrderSuccess: () => void;
}

//-----------------------------------------------------------------------------------------
// LEADERBOARD INTERFACES

// Sort Selector interface
export interface SortSelectorProps {
  sortOption: SortOption;
}

// Interface for UserProfile in leaderboard
export interface User {
  firstName: string;
  lastName: string;
  coffeeCounter: number;
  coffeeRating: number;
}

//-----------------------------------------------------------------------------------
// interfaces for orders
//Order interface
export interface Order {
  userProfileId: string;
  eventType: string;
  status: "IN_PROGRESS" | "READY" | "DELIVERED" | "CANCELLED";
  additionalOptions: any;
  rating: number;
  createdAt: string | Date;
}

export interface StarProps {
  value: number;
  handleClick: (value: number) => void;
  isFull: boolean;
}

export interface OrdersOrderModalComponentProps {
  coffeeOrderId: string;
  onClose: () => void;
  accessToken: string;
  setRating: any;
}

//-------------------------------------------------------------------
// Statistics page
// Statistics data interface
export interface StatisticsData {
  completed: number;
  canceled: number;
  ordersPerMonth: number[];
  ordersPerType: {
    coffee: number;
    drinks: number;
    food: number;
    mix: number;
  };
}

// ----------------------------------------------------------------------------------
// Events page interfaces

export interface EventOrder {
  orderId: string;
  userProfileId: string;
  firstName: string;
  lastName: string;
  additionalOptions: { orderDetails: string; description: string };
  status: string;
  createdAt: string;
}

// Event for events
export interface EventEvent {
  eventId: string;
  userProfileID: string;
  userProfileLastName: string;
  title: string;
  description: string;
  groupId: string;
  status: string;
  eventType: string;
  createdAt: string;
  pendingUntil: string;
}

//----------------------------------------------------------------------
// Statistics interfaces

export interface MockedData {
  _id: string;
  createdAt: Date;
  completedAt: string | null;
  status: string;
  orderType: string;
  additionalOptions: string;
  rating: number | null | undefined;
}

export interface OrderModalComponentProps {
  description: string;
  onClose: () => void;
}

//---------------------------------------------------------------------------------------------
// User for profile component

export interface ProfileUser {
  email: string;
  firstName: string;
  lastName: string;
  groupName: string;
  score: number;
  profilePhoto: any;
}

export interface ProfileGroup {
  name: string;
  description: string;
}

export interface GroupUser {
  photoUrl: string;
  firstName: string;
  lastName: string;
  score: number;
  orderCount: number;
}

export type GroupUsers = GroupUser[];

export interface SortOptionsProps {
  sortOption: SortOption;
  onSortChange: (newSortOption: SortOption) => void;
  users: GroupUsers;
}

// Profile page stats
export interface OrderStats {
  status: string;
  type: string;
  count: number;
}
