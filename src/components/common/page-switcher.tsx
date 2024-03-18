"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/button";

export default function PageSwitcher({
  links,
}: {
  links: {
    href: string;
    text: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex justify-between space-x-4 px-3">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="w-full">
          <Button
            className="h-11 w-full rounded-3xl"
            variant={pathname === link.href ? "default" : "ghost"}
          >
            {link.text}
          </Button>
        </Link>
      ))}
    </div>
  );
}
