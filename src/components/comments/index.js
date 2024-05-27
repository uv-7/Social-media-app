import { Box } from '@chakra-ui/react'
import Post from 'components/post'
import NewComment from './NewComment'
import { usePost } from 'hooks/post'
import React from 'react'
import { useParams } from 'react-router-dom'
import CommentList from './CommentList'

const Comments = () => {
  const { id } = useParams();
  const { post, isLoading} = usePost({id});

  if(isLoading) return "Loading...";

  return (
    <Box align={"center"} pt={"50"}>
      <Post post={post}/>
      <NewComment post={post}/>
      <CommentList post={post}/>
    </Box>
    )
}

export default Comments