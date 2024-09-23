"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Header } from "./Header";
import { BackButton } from "./Back-button";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,

}) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <CardHeader className="mb-4 text-center">
        <Header label={headerLabel} />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      
      
      <CardFooter className="mt-4 flex justify-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

