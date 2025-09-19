"use client";

import Link from "next/link";
import React from "react";
import { Card } from "@/Components/ui/card";
import { CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function error({ error }: { error: Error }) {
  return (
    <>
      <section className="flex h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-2xl shadow-lg border border-gray-200">
          <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
            <AlertTriangle className="w-16 h-16 text-red-500" />
            <h1 className="text-6xl font-bold text-gray-800">
              Something went wrong
            </h1>
            <p className="text-lg text-gray-600">{error.message}</p>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
              <Button variant="outline" onClick={() => location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
