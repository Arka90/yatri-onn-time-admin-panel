import { create } from "zustand";
import type { TState, TStoreValues } from "@/types/store";

export const initialState: TState = {
  api: {
    isLoading: false,
    response: {
      status: "IDLE",
      message: "",
    },
  },
  auth: {
    authState: "IDLE",
    admin: {
      userId: "",
      email: "",
      isAdmin: false,
    },
  },
  userManagement: {
    users: [],
    
  },
  reminderManagement: {
    reminders: [],
  },
  faqManagement: {
    faqs: [],
  },
  contactManagement: {
    contacts: [],
  },
  transactionManagement: {
    transactions: [],
  },
  advertisementManagement: {
    advertisements: [],
  },
  subscrptionManagement: {
    subscriptions: [],
  },
};

const useStore = create<TStoreValues>((set, get) => ({
  ...initialState,
  // actions //
  actions: {
    startLoading: () =>
      set((state) => ({
        ...state,
        api: {
          ...state.api,
          isLoading: true,
        },
      })),
    stopLoading: () =>
      set((state) => ({
        ...state,
        api: {
          ...state.api,
          isLoading: false,
        },
      })),
    setSuccessResponse: (message: string) => {
      set((state) => ({
        ...state,
        api: {
          ...state.api,
          response: {
            status: "SUCCESS",
            message,
          },
        },
      }));
    },
    setErrorResponse: (message: string) => {
      set((state) => ({
        ...state,
        api: {
          ...state.api,
          response: {
            status: "ERROR",
            message,
          },
        },
      }));
    },
    resetResponse: () => {
      set((state) => ({
        ...state,
        api: {
          ...state.api,
          response: initialState.api.response,
        },
      }));
    },
    setAdmin: (authState, admin) => {
      set((state) => ({
        ...state,
        auth: {
          authState,
          admin,
        },
      }));
    },
    resetAdmin: () => {
      set((state) => ({
        ...state,
        auth: initialState.auth,
      }));
    },
    setUsers: (users) => {
      set((state) => ({
        ...state,
        userManagement: {
          ...state.userManagement,
          users,
        },
      }));
    },
    resetUsers: () => {
      set((state) => ({
        ...state,
        userManagement: {
          ...state.userManagement,
          users: initialState.userManagement.users,
        },
      }));
    },
    setReminders: (reminders) => {
      set((state) => ({
        ...state,
        reminderManagement: {
          ...state.reminderManagement,
          reminders,
        },
      }));
    },
    resetReminders: () => {
      set((state) => ({
        ...state,
        reminderManagement: {
          ...state.reminderManagement,
          users: initialState.reminderManagement.reminders,
        },
      }));
    },
    setFaqs: (faqs) => {
      set((state) => ({
        ...state,
        faqManagement: {
          ...state.faqManagement,
          faqs,
        },
      }));
    },
    pushFaq: (faq) => {
      set((state) => ({
        ...state,
        faqManagement: {
          ...state.faqManagement,
          faqs: [...state.faqManagement.faqs, faq],
        },
      }));
    },
    resetFaqs: () => {
      set((state) => ({
        ...state,
        faqManagement: {
          ...state.faqManagement,
          faqs: initialState.faqManagement.faqs,
        },
      }));
    },
    deleteFaqsById: (id) => {
      set((state) => ({
        ...state,
        faqManagement: {
          ...state.faqManagement,
          faqs: state.faqManagement.faqs.filter((faq) => faq._id !== id),
        },
      }));
    },
    setContacts: (contacts) => {
      set((state) => ({
        ...state,
        contactManagement: {
          ...state.contactManagement,
          contacts,
        },
      }));
    },
    resetContacts: () => {
      set((state) => ({
        ...state,
        contactManagement: {
          ...state.contactManagement,
          contacts: initialState.contactManagement.contacts,
        },
      }));
    },
    deleteContactById: (id) => {
      set((state) => ({
        ...state,
        contactManagement: {
          ...state.contactManagement,
          contacts: state.contactManagement.contacts.filter(
            (contact) => contact._id !== id
          ),
        },
      }));
    },
    setTransactions: (transactions) => {
      set((state) => ({
        ...state,
        transactionManagement: {
          ...state.transactionManagement,
          transactions,
        },
      }));
    },
    resetTransactions: () => {
      set((state) => ({
        ...state,
        transactionManagement: {
          ...state.transactionManagement,
          transactions: initialState.transactionManagement.transactions,
        },
      }));
    },
    setAdvertisements: (advertisements) => {
      set((state) => ({
        ...state,
        advertisementManagement: {
          ...state.advertisementManagement,
          advertisements,
        },
      }));
    },
    resetAdvertisements: () => {
      set((state) => ({
        ...state,
        advertisementManagement: {
          ...state.advertisementManagement,
          advertisements: initialState.advertisementManagement.advertisements,
        },
      }));
    },
    pushAdvertisement: (advertisement) => {
      set((state) => ({
        ...state,
        advertisementManagement: {
          ...state.advertisementManagement,
          advertisements: [
            ...state.advertisementManagement.advertisements,
            advertisement,
          ],
        },
      }));
    },
    deleteAdvertisemenById: (advertisementId) => {
      set((state) => ({
        ...state,
        advertisementManagement: {
          ...state.advertisementManagement,
          advertisements: state.advertisementManagement.advertisements.filter(
            (advertisement) => advertisement._id !== advertisementId
          ),
        },
      }));
    },
    setSubcriptions: (subscriptions) => {
      set((state) => ({
        ...state,
        subscrptionManagement: {
          ...state.subscrptionManagement,
          subscriptions,
        },
      }));
    },
    resetSubcriptions: () => {
      set((state) => ({
        ...state,
        subscrptionManagement: {
          ...state.subscrptionManagement,
          subscriptions: initialState.subscrptionManagement.subscriptions,
        },
      }));
    },
    pushSubcription: (subscription) => {
      set((state) => ({
        ...state,
        subscrptionManagement: {
          ...state.subscrptionManagement,
          subscriptions: [
            ...state.subscrptionManagement.subscriptions,
            subscription,
          ],
        },
      }));
    },
    deleteSubcriptionsById: (subscriptionId) => {
      set((state) => ({
        ...state,
        subscrptionManagement: {
          ...state.subscrptionManagement,
          subscriptions: state.subscrptionManagement.subscriptions.filter(
            (subscription) => subscription._id !== subscriptionId
          ),
        },
      }));
    },
  },
}));

export default useStore;
