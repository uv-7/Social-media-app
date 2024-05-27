import { Box, Text } from "@chakra-ui/react"
import Post from "./index"

const PostLists = ({posts}) => {
  return (
    <Box px={"4"} align={"center"}>
      { posts?.length===0 ? 
        (<Text textAlign={"center"} fontSize={"xl"}>Why so empty?? 😢😢</Text>)
        :
        (posts?.map(post => <Post key={post.id} post={post} />))}
    </Box>
  )
}

export default PostLists