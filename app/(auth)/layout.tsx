import React, { FC } from "react";

type props = {
  children: React.ReactNode;
};

const layout: FC<props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh - 4rem)]">
      {children}
    </div>
  );
};

export default layout;
