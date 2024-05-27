import { Flex, IconButton } from "@chakra-ui/react"
import { useAuth } from "hooks/auth";
import { BsSuitHeart, BsSuitHeartFill, BsTrash3Fill } from 'react-icons/bs';
import { FaRegCommentAlt, FaCommentAlt } from 'react-icons/fa';
import { useToggleLike, useDeletePost } from "hooks/post";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import { useComments } from "hooks/comments";


const Actions = ({ post }) => {
  const { id, uid, likes } = post;
  const { user, isLoading: userLoading } = useAuth(); 
  
  const isLiked = likes.includes(user?.id);
  
  const { toggleLike, isLoading: likeLoading } = useToggleLike({id, isLiked, uid: user?.id});
  const { deletePost, isLoading: deleteLoading } = useDeletePost({id});
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <Flex p={"2"}>

    <Flex alignItems={"center"}>
        <IconButton
          onClick={toggleLike} 
          isLoading={likeLoading || userLoading}
          size={"md"}
          colorScheme="red" 
          variant={"ghost"} 
          icon={isLiked ?<BsSuitHeartFill/> : <BsSuitHeart/>}
          isRound
        />
        {likes.length}
    </Flex>

    <Flex alignItems={"center"} ml={"2"}>
        <IconButton
          as={Link} 
          to={`${PROTECTED}/comments/${id}`}
          isLoading={commentsLoading || userLoading}
          size={"md"}
          colorScheme="yellow" 
          variant={"ghost"} 
          icon={comments?.length === 0? <FaRegCommentAlt /> : <FaCommentAlt />}
          isRound
        />
        {comments?.length}
    </Flex>

    {!userLoading && user.id === uid && (
      <Flex alignItems={"center"} ml={"auto"}>
        <IconButton
          onClick={deletePost}
          isLoading={deleteLoading || userLoading}
          size={"md"}
          colorScheme="purple" 
          variant={"ghost"} 
          icon={<BsTrash3Fill />}
          isRound
        />
      </Flex>
    )}

    </Flex>
  )
}

export default Actions