"use client";

import { store } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

const RenameModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [
    setFileId,
    fileId,
    setDeleteModalIsOpen,
    deleteModalIsOpen,
    setRenameModalIsOpen,
    renameModalIsOpen,
    setFilename,
    filename,
  ] = store((state) => [
    state.setFileId,
    state.fileId,
    state.setDeleteModalIsOpen,
    state.deleteModalIsOpen,
    state.setRenameModalIsOpen,
    state.renameModalIsOpen,
    state.setFilename,
    state.filename,
  ]);

  const renameFile = async () => {
    if (!user || !fileId) return;
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });

    toast.success("Name edited successfully");
    setInput("");

    setRenameModalIsOpen(false);
  };
  return (
    <Dialog
      open={renameModalIsOpen}
      onOpenChange={(open) => setRenameModalIsOpen(open)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-3">Edit name</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          <Button
            size={"sm"}
            className="px-3 "
            variant={"ghost"}
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size={"sm"}
            className="px-3"
            onClick={() => renameFile()}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
