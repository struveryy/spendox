
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Reminder } from '@/utils/types';

interface ReminderStore {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  toggleReminder: (id: string) => void;
  removeReminder: (id: string) => void;
}

export const useReminderStore = create<ReminderStore>()(
  persist(
    (set) => ({
      reminders: [],
      addReminder: (reminder) =>
        set((state) => ({
          reminders: [
            { ...reminder, id: crypto.randomUUID() },
            ...state.reminders,
          ],
        })),
      toggleReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, isCompleted: !r.isCompleted } : r
          ),
        })),
      removeReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'reminder-storage',
    }
  )
);
