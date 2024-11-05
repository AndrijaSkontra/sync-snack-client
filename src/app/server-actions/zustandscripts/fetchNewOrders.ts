import { create } from 'zustand';

interface StoreState {
    value: boolean;
    setValue: (newValue: boolean) => void;
    getValue: () => boolean;
}

const useNewOrdersStore = create<StoreState>((set, get) => ({
    value: false,
    setValue: (newValue: boolean) => set({ value: newValue }),
    getValue: () => get().value,
}));

export default useNewOrdersStore;
