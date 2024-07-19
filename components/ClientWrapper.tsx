"use client";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  if (typeof window == "undefined") {
    return <main></main>;
  }
  return <>{children}</>;
};
export default ClientWrapper;
