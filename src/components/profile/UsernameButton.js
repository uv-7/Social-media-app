import { Button } from "@chakra-ui/react";
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";

export const UsernameButton = ({user}) => {
  return (
    <Button
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      colorScheme="teal" 
      variant={"link"}
    >
        {user.username}
    </Button>
  )
}
