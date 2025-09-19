import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="mb-10">
          <h1 className="text-[6.875rem]">404 Not Found</h1>
          <p className="font-light">
            Your visited page not found. You may go home page
          </p>
        </div>
        <Link href="/" className="btn">
          Back to Home Page
        </Link>
      </div>
    </>
  );
}
