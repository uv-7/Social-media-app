import { arrayRemove, arrayUnion, collection, doc, orderBy, where, query, setDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "lib/firebase";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

export function useAddPost(){
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function addPost(post){
        setLoading(true);
        const id = uuidv4();
        setDoc(doc(db, "posts", id), {
            ...post,
            id,
            date: Date.now(),
            likes: []
        });
        toast({
            title: "Post added successfully",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000
        })
        setLoading(false);
    }

    return {addPost, isLoading};
}

// For all the posts
export function usePosts(uid = null) {
    const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));

    const [posts, isLoading, error] = useCollectionData(q);
    if(error) throw error;
    return {posts, isLoading};
}

// for singular post
export function usePost({id}){
    const q = doc(db, "posts", id);
    const [post, isLoading] = useDocumentData(q);

    return { post, isLoading };
}

export function useToggleLike({ id, isLiked, uid }){
    const[isLoading, setLoading] = useState(false);

    async function toggleLike(){
        setLoading(true);
        const docRef = doc(db, "posts", id);

        await updateDoc(docRef, {
            likes: isLiked? arrayRemove(uid) : arrayUnion(uid),
        })
        setLoading(false);
    }

    return {toggleLike, isLoading};
}

export function useDeletePost({id}){
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function deletePost(){
        const res = window.confirm("Are you sure you want to delete this post?");
        if(res){
            setLoading(true);

            // Delete Post document
            await deleteDoc(doc(db, "posts", id));
             

            // Delete comments
            const q = query(collection(db, "comments"), where("postID", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async(doc) => deleteDoc(doc.ref));

            toast({
                title: "Post deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            setLoading(false);
        }
    }
    return {deletePost, isLoading};
}


