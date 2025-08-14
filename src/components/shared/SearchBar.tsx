"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";


const SearchSchema = z.object({
  query: z.string().min(1, { message: "Search query cannot be empty." }),
});
type TSearchSchema = z.infer<typeof SearchSchema>;


export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm<TSearchSchema>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      query: searchParams.get("q") || "",
    }
  });

  const onSubmit = (data: TSearchSchema) => {
    router.push(`/search?q=${encodeURIComponent(data.query)}`);
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="relative w-full max-w-lg">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          { ...register("query") }
          placeholder="Search communities and posts..."
          className="pl-9"
        />
      </div>
    </form>
  );
}
