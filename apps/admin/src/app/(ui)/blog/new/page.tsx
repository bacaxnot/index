import { BlogCreateForm } from "@/components/blog-create-form";
import { BreadcrumbAuto } from "@/components/breadcrumb-auto";
import React from "react";

const breadcrumbItems = [{ name: "blog" }, { name: "new" }];

export default function BlogNewPage() {
  return (
    <main className="standalone:pb-6 grid pt-4 standalone:px-2">
      <section className="w-full max-w-7xl justify-self-center grid gap-8 relative">
        <BreadcrumbAuto items={breadcrumbItems} />
        <BlogCreateForm />
      </section>
    </main>
  );
}
