import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IUser } from '@/types/user.type'

interface IAuthStore {
	user: IUser | null
	setUser: (user: IUser | null) => void
}

export const useAuthStore = create<IAuthStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{
			name: 'userStorage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)