// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  convertFromRaw,
  convertFromHTML,
} from "draft-js";

import Toolbar from "../Toolbar";
import { Button } from "../ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";
import { convertToHTML } from "draft-convert";

interface TextEditorProps {
  onPostCreated?: any;
  update?: boolean;
  postId?: string; // New prop to receive postId for updating
  setOpen?: any; // New prop to close the dialog
}

const TextEditor = ({
  onPostCreated,
  update,
  postId,
  setOpen,
}: TextEditorProps) => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            key: "3eesq",
            text: "",
            type: "unstyled",
            depth: 0,
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      })
    )
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const editor = useRef(null);
  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    focusEditor();
  }, []);

  useEffect(() => {
    if (update && postId) {
      // Fetch the content of the post for update
      fetchPostContent(postId);
    }
  }, [update, postId]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    console.log(html);
  }, [editorState]);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: "0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
  };

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "text-left";
      case "rightAlign":
        return "text-right";
      case "centerAlign":
        return "text-center";
      case "justifyAlign":
        return "text-justify";
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const post = {
      userId: user?.id,
      author: user?.given_name,
      profileImage: user?.picture,
      stats: {
        likes: {
          likedBy: [],
          count: 0,
        },
        shares: 0,
      },
      content: convertedContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: comments,
    };

    const endpoint = update
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/updatePost/${postId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/createPost`;

    try {
      fetch(endpoint, {
        method: update ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: post,
          userId: user?.id,
        }),
      })
        .then((res) => {
          if (update) {
            setOpen(false);
          }
          toast.success(
            update ? "Post updated successfully" : "Post created successfully"
          );
          setEditorState(EditorState.createEmpty());
          onPostCreated();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const convertFromHTMLCustom = (html: string) => {
    const blocksFromHTML = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return contentState;
  };

  const fetchPostContent = async (postId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/getPost/${postId}`
      );
      if (response.ok) {
        const postData = await response.json();
        if (postData.content) {
          // If content exists, convert HTML to Draft.js content
          const contentState = convertFromHTMLCustom(postData.content); // You'll need to implement convertFromHTML function
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
          setComments(postData.comments);
        }
      } else {
        throw new Error("Failed to fetch post content");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch post content");
    }
  };

  return (
    <div
      className="max-w-[34rem] mx-auto mt-3 border border-gray-400 rounded-md p-4 shadow"
      onClick={focusEditor}
    >
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <div className="w-full p-2">
        <Editor
          ref={editor}
          // readOnly
          placeholder="Write your story"
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          customStyleMap={styleMap}
          defaultContentState={contentState}
          blockStyleFn={myBlockStyleFn}
          onContentStateChange={setContentState}
          onChange={(editorState) => {
            // const contentState = editorState.getCurrentContent();
            // console.log(convertToRaw(contentState));
            setEditorState(editorState);
          }}
        />
      </div>
      {editorState.getCurrentContent().hasText() && (
        <Button onClick={handleSubmit}>{update ? "Update" : "Create"}</Button>
      )}
    </div>
  );
};

export default TextEditor;
