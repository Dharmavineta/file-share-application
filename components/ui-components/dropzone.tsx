"use client";
import { db, storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

const DropZoneComponent = () => {
  const [loading, setLoading] = useState(false);

  const maxSize = 20971520;
  const { user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    {
      const uploadFile = async (file: File) => {
        if (loading) return;
        if (!user) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "users", user.id, "files"), {
          userId: user.id,
          filename: file.name,
          profileImg: user.imageUrl,
          timestamp: serverTimestamp(),
          type: file.type,
          size: file.size,
        });
        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
        uploadBytes(imageRef, file).then(async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);

          await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
            downloadUrl: downloadUrl,
          });
        });
        toast.success("File uploaded successfully");
        setLoading(false);
      };
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => toast.error("File reading aborted");
        reader.onerror = () => toast.error("File Reading failed");
        reader.onload = async () => {
          await uploadFile(file);
        };
        reader.readAsArrayBuffer(file);
      });
    }
  };

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="mt-5">
            <div
              {...getRootProps()}
              className={cn(
                " w-full h-40 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-sky-600 mt-2 text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload"}
              {isDragActive && !isDragReject && "Drop to upload this file"}
              {isDragReject && "File type not accepted"}
              {isFileTooLarge && (
                <span className="text-rose-500 mt-2">File Too Large</span>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropZoneComponent;
