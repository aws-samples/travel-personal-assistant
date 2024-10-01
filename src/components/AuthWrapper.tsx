"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return <Authenticator>{children}</Authenticator>;
}
