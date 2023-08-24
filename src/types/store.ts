import { TFaq } from "./faq";
import { TReminder } from "./reminders";
import { TUser } from "./users";
import { TContact } from "./contact";
import { TTransaction } from "./transactions";
import { TAdvertisement } from "./advertisement";
import { TSubcription } from "./subcriptions";

interface TAdmin {
    userId: string;
    email: string;
    isAdmin: boolean;
}

type TAuthState = "IDLE" | "LOGGED_IN" | "LOGGED_OUT";
export type TState = {
    api: {
        isLoading: boolean;
        response: {
            status: "SUCCESS" | "ERROR" | "IDLE";
            message: string;
        };
    };
    auth: {
        authState: TAuthState;
        admin: TAdmin;
    };
    userManagement: {
        users: TUser[];
    };
    reminderManagement: {
        reminders: TReminder[];
    };
    faqManagement: {
        faqs: TFaq[];
    };
    contactManagement: {
        contacts: TContact[];
    };
    transactionManagement: {
        transactions: TTransaction[];
    };
    advertisementManagement: {
        advertisements: TAdvertisement[];
    };
    subscrptionManagement: {
        subscriptions: TSubcription[];
    };
};

export type TActions = {
    actions: {
        setAdmin: (authState: TAuthState, admin: TAdmin) => void;
        resetAdmin: () => void;
        startLoading: () => void;
        stopLoading: () => void;
        resetResponse: () => void;
        setSuccessResponse: (message: string) => void;
        setErrorResponse: (message: string) => void;
        setUsers: (users: TUser[]) => void;
        resetUsers: () => void;
        setReminders: (reminders: TReminder[]) => void;
        resetReminders: () => void;
        setFaqs: (faqs: TFaq[]) => void;
        pushFaq: (faq: TFaq) => void;
        resetFaqs: () => void;
        deleteFaqsById: (id: string) => void;
        setContacts: (contacts: TContact[]) => void;
        resetContacts: () => void;
        deleteContactById: (id: string) => void;
        setTransactions: (transactions: TTransaction[]) => void;
        resetTransactions: () => void;
        setAdvertisements: (advertisements: TAdvertisement[]) => void;
        resetAdvertisements: () => void;
        pushAdvertisement: (advertisement: TAdvertisement) => void;
        deleteAdvertisemenById: (advertisementId: string) => void;
        setSubcriptions: (subscriptions: TSubcription[]) => void;
        resetSubcriptions: () => void;
        pushSubcription: (subscriptionId: TSubcription) => void;
        deleteSubcriptionsById: (subscriptionId: string) => void;
    };
};

export type TStoreValues = TState & TActions;
