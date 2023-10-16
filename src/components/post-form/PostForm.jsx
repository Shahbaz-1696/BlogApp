/* eslint-disable react/prop-types */
import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/configure'
import { useForm } from 'react-hook-form'
import { Button, Select, Input, RTE } from '../index' 

function PostForm({post}) {
    const {register, handleSubmit, control, watch, getValues, setValue} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || ''
        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData)

    const submit = async(data) => {
        if(data){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(post.$id)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({...data, userId: userData.$id})
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
        return value.trim().toLowerCase().replace(/[^a-zA-z\d\s]+/g, "-").replace(/\s/g, "-")

        return "";
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title, {shouldValidate: true}))
            }
        }) 

        return () => subscription.unsubscribe()

    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)}>
        <div className='w-2/3 px-2'>
            <Input
            label="Title: "
            placeholder="Title"
            className="mb-4"
            {...register("title", {required: true})}
            />
            <Input
            label="Slug: "
            className="mb-4"
            {...register("slug", {required: true})}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value, {shouldValidate: true}))
            }}
            />
            <RTE name="content" label="Content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className='w-1/3 px-2'>
            <Input
            label="Featured Image: "
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            type="file"
            {...register("image", {required: !post})}
            />
            {post && (
                <div className='w-full mb-4'>
                    <img className='rounded-lg'
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title} />
                </div>
            )}
            <Select
            label="Status: "
            className="mb-4"
            options={["active", "inactive"]}
            {...register("status", {required: true})}
            />
            <Button className='w-full' type='submit' bgColor={post ? "bg-green-500" : undefined}>{post ? "Update" : "Submit"}</Button>
        </div>
    </form>
  )
}

export default PostForm
