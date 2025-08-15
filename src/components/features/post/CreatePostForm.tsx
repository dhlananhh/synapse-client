"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PostSchema, TPostSchema } from "@/lib/validators/post-validator";
import { mockPosts } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";
import Editor from "@/components/shared/Editor";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


export default function CreatePostForm() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const methods = useForm<TPostSchema>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      communityId: "nextjs",
      content: "",
    }
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: TPostSchema) => {
    if (!currentUser) return;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPost: Post = {
      id: `p${Math.random().toString(36).substr(2, 9)}`,
      title: data.title,
      content: data.content,
      author: currentUser,
      community: {
        id: data.communityId,
        slug: data.communityId,
        name: `${data.communityId.charAt(0).toUpperCase() + data.communityId.slice(1)} Community`,
      },
      createdAt: new Date().toISOString(),
      votes: 1,
      comments: [],
    };

    mockPosts.unshift(newPost);

    toast.success("Post Created!", {
      description: "Your new post is now live and ready for discussion.",
      duration: 3000,
    });

    setTimeout(() => router.push(`/p/${newPost.id}`), 500);
  }

  return (
    <FormProvider { ...methods }>
      <form onSubmit={ handleSubmit(onSubmit) } className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <Input id="title" { ...register("title") } placeholder="An interesting title" />
          { errors.title && <p className="text-xs text-destructive">{ errors.title.message }</p> }
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Editor name="content" />
          { errors.content && <p className="text-xs text-destructive">{ (errors.content as any).message }</p> }
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={ isSubmitting }>
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Create Post
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
