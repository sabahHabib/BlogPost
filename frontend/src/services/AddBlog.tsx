import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const AddBlog: React.FC = () => {
  const [form, setForm] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  const { addBlog, error, loading } = useBlogs();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, blog, message } = await addBlog(form);

    if (success) {
      navigate("/blog");
    } else {
      alert(message || "Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add New Blog</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
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
            rows={4}
            value={form.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Save Blog"}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddBlog;
