import { AppBar, Button, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/App/hooks";
import {
  setDeletePostId,
  updatePostState,
} from "../Redux/features/postFeature/postSlice";
import { deletePost, getAllPost } from "../services/api";
import Post from "./Post";
import Search from "./Search";


export default function Home() {
  // const [allPosts,setAllPost]= useState<any[]>([]);
  const { post, deletePostId } = useAppSelector((store) => store.postReducer);
  const dispatch = useAppDispatch();
  const fetchPostHanlder = () => {
    getAllPost()
      .then((res) => {
        dispatch(updatePostState(res.data));
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    fetchPostHanlder();
  }, []);

  useEffect(() => {
    if (deletePostId !== null) {
      deletePost({ id: deletePostId })
        .then((post) => {
          console.log("post deleted", post);
          fetchPostHanlder();
          dispatch(setDeletePostId(null));
        })
        .catch((error) => {
          console.log("error while deleting post", error);
        });
    }
  }, [deletePostId]);

  
  return (
    <>
      <AppBar sx={{ backgroundColor: "green", color: "white" }}>
        <Toolbar>
         <Typography> React with TypeScript</Typography>
         
          <Link
            to={"/create-new-post"}
            style={{ marginLeft: "auto", textDecoration: "none" }}
          >
            {" "}
            <Button variant="contained">Create New </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Search />
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
          gridGap: "1rem",
          marginTop: "7rem",
        }}
      >
        {post &&
          post.map((post) => {
            return (
              <Post title={post.title} description={post.body} id={post.id} />
            );
          })}
      </Container>
    </>
  );
}
