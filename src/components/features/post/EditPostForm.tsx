"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PostSchema, TPostSchema } from "@/lib/validators/post-validator";
import { Post } from "@/types";
import { updatePost } from "@/lib/api";
import { toast } from "sonner";

import Editor from "@/components/shared/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";


interface EditPostFormProps {
  post: Post;
}


export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();

  const methods = useForm<TPostSchema>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post.title,
      communityId: post.community.id,
      content: post.content,
    }
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: TPostSchema) => {
    try {
      await updatePost(post.id, { title: data.title, content: data.content });
      toast.success("Post updated successfully!");
      router.push(`/p/${post.id}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update post.");
    }
  }

  return (
    <FormProvider { ...methods }>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Post</CardTitle>
            <CardDescription>Make changes to your post in <span className="font-semibold text-primary">c/{ post.community.slug }</span>.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" { ...register("title") } />
              { errors.title && <p className="text-xs text-destructive">{ errors.title.message }</p> }
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Editor name="content" />
              { errors.content && <p className="text-xs text-destructive">{ (errors.content as any).message }</p> }
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="ghost" onClick={ () => router.back() }>Cancel</Button>
            <Button type="submit" disabled={ isSubmitting }>
              { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
