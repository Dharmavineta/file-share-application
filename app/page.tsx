import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import share from "./public/fileshare.jpg";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex flex-col lg:flex-row justify-between">
      <div className="p-10 flex flex-col lg:flex-1 mt-40 space-y-10 text-center items-center lg:text-start lg:items-start ">
        <h1 className="text-2xl font-bold max-w-xl">
          Welcome to Samudra <br /> <br />
          <span className="">
            Dive into endless storage. Your ocean of files, always at your
            fingertips.
          </span>
        </h1>
        <Link
          href={"/dashboard"}
          className="flex items-center justify-center w-full md:w-fit"
        >
          <Button className="flex items-center justify-center w-full md:w-fit">
            Try for Free <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="flex-1 flex w-full items-center mt-40 ">
        <div className=" w-[90%] h-[100%] relative">
          <Image
            className="object-cover"
            src={
              "https://www.sodapdf.com/blog/wp-content/uploads/2019/06/file-sharing.jpg"
            }
            fill
            alt="share"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
