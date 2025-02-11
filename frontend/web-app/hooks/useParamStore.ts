import { create } from 'zustand';

type State = {
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
    searchValue: string;
    orderBy: string;
    filterBy: string;
    seller?: string | null;
    winner?: string;
};

type Action = {
    setParams: (params: Partial<State>) => void;
    reset: () => void;
    setSearchValue: (value: string) => void;
}

const initialState: State = {
    pageCount: 0,
    pageNumber: 1,
    pageSize: 12,
    searchTerm: '',
    searchValue: '',
    orderBy: 'make',
    filterBy: 'live',
    seller: undefined,
    winner: undefined
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
    setSearchValue: (value: string) => set({ searchValue: value })
}))

