import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_ACCOUNTS } from "./content";

export type Role = "family" | "volunteer" | "coordinator" | "teacher" | "partner";

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  municipality: string;
};

export type Application = {
  id: string;
  userId: string;
  fullName: string;
  role: Role;
  municipality: string;
  type: string;
  message: string;
  status: "new" | "in_progress" | "done";
  createdAt: string;
};

type State = {
  user: User | null;
  users: User[];
  passwords: Record<string, string>;
  applications: Application[];
  healthDays: Record<string, number>;
  exerciseDone: Record<string, string[]>;
  journal: Record<string, string[]>;
  login: (email: string, password: string) => string | null;
  register: (input: {
    email: string;
    password: string;
    fullName: string;
    role: Role;
    municipality: string;
  }) => string | null;
  logout: () => void;
  addApplication: (type: string, message: string) => void;
  updateStatus: (id: string, status: Application["status"]) => void;
  bumpHealthDay: (userId: string) => void;
  toggleExercise: (userId: string, name: string) => void;
  addJournal: (userId: string, note: string) => void;
};

const seedUsers: User[] = DEMO_ACCOUNTS.map((a, i) => ({
  id: String(i + 1),
  email: a.email,
  fullName: a.fullName,
  role: a.role,
  municipality: a.municipality,
}));

const seedPasswords: Record<string, string> = Object.fromEntries(
  DEMO_ACCOUNTS.map((a) => [a.email, a.password]),
);

const seedApps: Application[] = [
  {
    id: "a1",
    userId: "2",
    fullName: "Семья защитника",
    role: "family",
    municipality: "Новочебоксарск",
    type: "psychology",
    message: "Нужна консультация для матери и ребёнка",
    status: "new",
    createdAt: "2026-03-12",
  },
  {
    id: "a2",
    userId: "3",
    fullName: "Педагог",
    role: "teacher",
    municipality: "Чебоксары",
    type: "lesson",
    message: "Школа просит подключить модуль уроков памяти",
    status: "in_progress",
    createdAt: "2026-03-14",
  },
  {
    id: "a3",
    userId: "2",
    fullName: "Семья защитника",
    role: "family",
    municipality: "Новочебоксарск",
    type: "culture",
    message: "Просьба помочь включить семью в региональный проект памяти",
    status: "done",
    createdAt: "2026-03-08",
  },
];

export const useSession = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      users: seedUsers,
      passwords: seedPasswords,
      applications: seedApps,
      healthDays: { "2": 6 },
      exerciseDone: {},
      journal: {},
      login: (email, password) => {
        const e = email.trim().toLowerCase();
        const found = get().users.find((u) => u.email === e);
        const pass = get().passwords[e];
        if (!found || !pass || pass !== password) {
          return "Неверная почта или пароль.";
        }
        set({ user: found });
        return null;
      },
      register: ({ email, password, fullName, role, municipality }) => {
        const e = email.trim().toLowerCase();
        if (!fullName || !e || !password) return "Заполните обязательные поля.";
        if (get().users.some((u) => u.email === e)) {
          return "Пользователь с такой почтой уже существует.";
        }
        const user: User = {
          id: crypto.randomUUID(),
          email: e,
          fullName,
          role,
          municipality: municipality || "Чебоксары",
        };
        set((s) => ({
          users: [...s.users, user],
          passwords: { ...s.passwords, [e]: password },
        }));
        return null;
      },
      logout: () => set({ user: null }),
      addApplication: (type, message) => {
        const user = get().user;
        if (!user) return;
        const app: Application = {
          id: crypto.randomUUID(),
          userId: user.id,
          fullName: user.fullName,
          role: user.role,
          municipality: user.municipality,
          type,
          message,
          status: "new",
          createdAt: new Date().toISOString().slice(0, 10),
        };
        set((s) => ({ applications: [app, ...s.applications] }));
      },
      updateStatus: (id, status) =>
        set((s) => ({
          applications: s.applications.map((a) =>
            a.id === id ? { ...a, status } : a,
          ),
        })),
      bumpHealthDay: (userId) =>
        set((s) => ({
          healthDays: { ...s.healthDays, [userId]: (s.healthDays[userId] ?? 0) + 1 },
        })),
      toggleExercise: (userId, name) =>
        set((s) => {
          const cur = s.exerciseDone[userId] ?? [];
          const next = cur.includes(name)
            ? cur.filter((n) => n !== name)
            : [...cur, name];
          return { exerciseDone: { ...s.exerciseDone, [userId]: next } };
        }),
      addJournal: (userId, note) =>
        set((s) => ({
          journal: {
            ...s.journal,
            [userId]: [note, ...(s.journal[userId] ?? [])].slice(0, 8),
          },
        })),
    }),
    { name: "svoi-portal-session", skipHydration: true },
  ),
);
