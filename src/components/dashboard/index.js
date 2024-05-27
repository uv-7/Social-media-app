import { Box, Button, HStack, Heading, Textarea } from '@chakra-ui/react'
import PostLists from 'components/post/PostsLists';
import { useAuth } from 'hooks/auth';
import { useAddPost, usePosts } from 'hooks/post';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

function NewPost(){
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost(); 
  const { user, isLoading: authLoading } = useAuth();

  function handleAddPost(data){
    addPost({
      uid: user.id,
      text: data.text,
    })
    reset();
  }

  return (
    <Box maxW={"600px"} mx={"auto"} py={"10"}>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justifyContent={"space-between"}>
          <Heading size={"lg"}>New Post</Heading>
          <Button 
            colorScheme='teal'
            type='submit'
            isLoading={ authLoading || addingPost }
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea 
          as={ TextareaAutosize }
          resize={"none"} 
          mt={"5"} 
          minRows={3} 
          placeholder='Create a new post...'
          {...register("text", {required: true})}
        />
      </form>
    </Box>
  )

}

const Dashboard = () => {
  const {posts, isLoading: postsLoading} = usePosts();

  if(postsLoading) return "Loading Posts.....";

  return (
    <>
      <NewPost />
      <PostLists posts={posts} />
    </>
  )
}

export default Dashboard