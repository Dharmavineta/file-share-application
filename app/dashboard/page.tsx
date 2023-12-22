import DropZoneComponent from "@/components/ui-components/dropzone";
import { db } from "@/lib/firebase";
import { FileType } from "@/types";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { format } from "date-fns";
import TableWrapper from "@/components/table/TableWrapper";

const Dashboard = async () => {
  const { userId } = auth();
  const docResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
    userId: doc.data().userId,
  }));

  return (
    <>
      <div className="border-t">
        <DropZoneComponent />
        <section className="containe space-y-5 ">
          <h2 className="font-bold text-center mt-4">All Files</h2>
          <div>
            <TableWrapper skeletonFiles={skeletonFiles} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
