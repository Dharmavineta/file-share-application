"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, storage } from "@/lib/firebase";
import { store } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "sonner";

export function DeleteModal() {
  const { user } = useUser();
  const [
    setFileId,
    fileId,
    setDeleteModalIsOpen,
    deleteModalIsOpen,
    setRenameModalIsOpen,
    setFilename,
    filename,
  ] = store((state) => [
    state.setFileId,
    state.fileId,
    state.setDeleteModalIsOpen,
    state.deleteModalIsOpen,
    state.setRenameModalIsOpen,
    state.setFilename,
    state.filename,
  ]);

  const deleteFile = async () => {
    if (!user || !fileId) return;
    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
    try {
      deleteObject(fileRef).then(async () => {
        console.log("Deleted file");
      });
      deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
        toast.success("File deleted successfully");
      });
    } catch (error) {
      console.log(error);
      toast.error("Oops, something went wrong, please try again later");
    } finally {
      setDeleteModalIsOpen(false);
    }
  };
  return (
    <Dialog
      open={deleteModalIsOpen}
      onOpenChange={(open) => setDeleteModalIsOpen(open)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-3">
            Are you sure you want to delete?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove the file.
          </DialogDescription>
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
            onClick={() => deleteFile()}
            variant={"destructive"}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
