import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../index";
import Input from "../Input/Input";
import Select from "../Select/Select";
import services from "../../Authentication/Configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PostForm = ({ post }) => {
  const { control, handleSubmit, register, getValues, watch, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const useData = useSelector((state) => state.useData);
  const handelSubmit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await services.uploadeImage(data.image[0])
        : null;
      file ? services.deleteFile(post.featuredImage) : null;
      const updateDataBasePost = await services.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });
      updateDataBasePost ? navigate(`/post/${updateDataBasePost.$id}`) : null;
    } else {
      const file = data.image[0]
        ? await services.updateImage(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const updateDataBasePost = await services.createPost({
          ...data,
          userId: useData.$id,
        });
        updateDataBasePost ? navigate(`/post/${updateDataBasePost.$id}`) : null;
      }
    }
  };

  return <div>PostForm</div>;
};
