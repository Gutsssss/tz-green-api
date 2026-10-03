import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { children, title } = props;
  return (
    <section className="grow p-5 h-screen w-full shrink-100 overflow-auto">
      <p className="mb-2 font-medium text-4xl">{title}</p>
      {children}
    </section>
  );
};
