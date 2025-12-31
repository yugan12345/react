import React, { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();

  // 🔒 ALWAYS read auth from Redux
  const userData = useSelector((state) => state.auth.userData);

  // 🚫 HARD BLOCK UI until auth is READY
  if (!userData || !userData.$id) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Please login to create a post
      </div>
    );
  }

  // ---------------- SUBMIT (SAFE AGAINST STALE CLOSURE) ----------------
  const submit = useCallback(
    async (data) => {
      // 🔐 Re-check at submit time (absolute guarantee)
      if (!userData?.$id) {
        console.error("USER NOT READY");
        return;
      }

      if (post) {
        // UPDATE FLOW
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        // CREATE FLOW
        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) return;

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: file.$id,
          userId: userData.$id, // ✅ GUARANTEED
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    },
    [userData, post, navigate]
  );

  // ---------------- SLUG AUTO-GENERATION ----------------
  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // ---------------- UI ----------------
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* LEFT */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value))
          }
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* RIGHT */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg mb-4"
          />
        )}

        {/* ✅ Select MUST use Controller */}
        <Controller
          name="status"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Status"
              options={["active", "inactive"]}
              className="mb-4"
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
