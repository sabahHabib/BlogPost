import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchBlogById, editBlog, loading } = useBlogs();

  const fetchBlog = async () => {
  if (!id) {
    setError("Invalid blog ID.");
    return;
  }

  try {
    const blog = await fetchBlogById(Number(id));
    if (!blog) {
      setError("Blog not found or you are not authorized to edit this blog.");
      return;
    }
    setForm({ title: blog.title, body: blog.body });
  } catch (error: any) {
    setError(error.message || "An error occurred while fetching the blog.");
  }
};


  React.useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { success, message } = await editBlog(Number(id), form);

      if (success) {
        navigate("/blog");
      } else {
        setError(message || "Failed to update blog. Please try again.");
      }
    } catch (error: any) {
      setError("An error occurred while updating the blog.");
    }
  };

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="body"
            rows={5}
            value={form.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
