"use client";
import { FileType } from "@/types";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "../ui/skeleton";

type props = {
  skeletonFiles: FileType[];
};

const TableWrapper: FC<props> = ({ skeletonFiles }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
      userId: doc.data().userId,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button className="ml-auto w-36 h-10 mb-5" variant={"outline"}>
          <Skeleton className="h-5 w-full" />
        </Button>
        <div className=" rounded-lg">
          <div className=" h-12">
            {skeletonFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-4 p-5 w-full"
              >
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}

            {skeletonFiles.length === 0 && (
              <div className="flex items-center space-x-4 p-5 w-full">
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 px-5">
      <Button
        variant={"outline"}
        className="w-fit ml-auto "
        onClick={() => setSort((sort) => (sort === "desc" ? "asc" : "desc"))}
      >
        Sort by {sort === "desc" ? "newest" : "oldest"}{" "}
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
