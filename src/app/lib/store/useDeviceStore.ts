import { create } from "zustand";

interface DeviceState {
    isMobile: boolean;
    setIsMobile: (value: boolean) => void;
    detectDevice: () => () => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
    isMobile: false,
    setIsMobile: (value) => set({ isMobile: value }),
    detectDevice: () => {
        const check = () => {
            const match = window.matchMedia("(max-width: 768px)").matches;
            set({ isMobile: match });
        };

        check(); 
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    },
}));
