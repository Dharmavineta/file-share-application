import { create } from "zustand";

type props = {
  deleteModalIsOpen: boolean;
  setDeleteModalIsOpen: (open: boolean) => void;

  renameModalIsOpen: boolean;
  setRenameModalIsOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string) => void;

  filename: string;
  setFilename: (filename: string) => void;
};

export const store = create<props>((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: "",
  setFilename: (filename: string) => set((state) => ({ filename })),

  deleteModalIsOpen: false,
  setDeleteModalIsOpen: (open) => set((state) => ({ deleteModalIsOpen: open })),

  renameModalIsOpen: false,
  setRenameModalIsOpen: (open) => set((state) => ({ renameModalIsOpen: open })),
}));
