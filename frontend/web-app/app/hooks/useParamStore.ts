import { create } from 'zustand';

type State = {
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    searchTerm: '';
};

type Action = {
    setParams: (params: Partial<State>) => void;
    reset: () => void;
}

const initialState: State = {
    pageCount: 0,
    pageNumber: 1,
    pageSize: 4,
    searchTerm: '',
}

export const useParamStore = create<State & Action>()((set) => ({
    ...initialState,
    setParams: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageNumber) {
                return {
                    ...state,
                    pageNumber: newParams.pageNumber,
                }
            }
            else {
                return {
                    ...state,
                    ...newParams,
                    pageNumber: 1
                }
            }
        });
    },
    reset: () => set(initialState),
}))

