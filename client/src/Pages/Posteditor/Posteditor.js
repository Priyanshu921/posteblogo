import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { postActions } from "../../Actions/PostActions";
import "react-toastify/dist/ReactToastify.css";

const Posteditor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const postUploaded = useSelector((state) => {
    console.log(state.postReducer.postUploaded);
    return state.postReducer.postUploaded;
  });
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (postUploaded) {
      if (postUploaded.message) {
        toast.success(postUploaded?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      else if(postUploaded?.error){
        toast.error(postUploaded?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setContent("");
      setTitle("");
      dispatch(postActions.clearPostUploaded());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postUploaded]);

  const handleBlur = (e, type) => {
    switch (type) {
      case "content":
        if (e.index == 0) {
          setError({ ...error, content: "Please enter content" });
        } else if (e.index < 20) {
          setError({
            ...error,
            content: "Please enter at least 20 characters",
          });
        } else {
          setError({ ...error, content: null });
        }
        break;
      case "title":
        if (!e.target.value) {
          setError({ ...error, title: "Please enter Title" });
        } else {
          setError({ ...error, title: null });
        }
        break;
      default:
        break;
    }
  };

  const submitData = () => {
    dispatch(postActions.addPost({ title, content, user }));
  };

  const isSubmitDisabled = !(error.title == null && error.content === null);

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="text-center">Create Post</h1>
      <div className="form-group col-md-12 d-flex mb-2 mt-4">
        <input
          className={`col-md-9 form-control ${
            error.title ? "is-invalid" : ""
          } ${error.title === null ? "is-valid" : ""}`}
          placeholder="Add Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onBlur={(e) => {
            handleBlur(e, "title");
          }}
        />
      </div>
      {error.title && <p className="errorText">{error.title}</p>}
      <div className={"post-container col-md-12 "}>
        <ReactQuill
          className={"col-md-12 mb-2 " + (error.content ? " error" : "")}
          theme="snow"
          value={content}
          onChange={setContent}
          onBlur={(e) => handleBlur(e, "content")}
          name="content"
          placeholder="Start Writing here..."
        />
        {error.content && <p className="errorText mt-2">{error.content}</p>}
        <button
          className="btn btn-primary"
          onClick={submitData}
          disabled={isSubmitDisabled}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Posteditor;
