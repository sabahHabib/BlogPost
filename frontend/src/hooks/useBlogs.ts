import { useState } from "react";
import { api } from "../api/api";

export interface Blog {
  id: number;
  title: string;
  body: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleApiError(error: any, defaultMessage: string) {
    console.error(defaultMessage, error);
    setError(defaultMessage);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  async function fetchBlogs() {
    startLoading();
    try {
      const response = await api.get<Blog[]>("/blog");
      setBlogs(response.data);
      setError(null);
    } catch (error: any) {
      handleApiError(error, "Failed to fetch blogs. Please try again.");
    } finally {
      stopLoading();
    }
  }

  async function fetchBlogById(id: number): Promise<Blog | null> {
    startLoading();
    try {
      const response = await api.get<Blog>(`/blog/${id}`);
      setError(null);
      return response.data;
    } catch (error: any) {
      handleApiError(error, "Failed to fetch the blog. Please try again.");
      return null;
    } finally {
      stopLoading();
    }
  }

  async function addBlog(newBlog: { title: string; body: string }) {
    startLoading();
    try {
      const response = await api.post<Blog>("/blog", newBlog);
      setBlogs(function (prevBlogs) {
        return [...prevBlogs, response.data];
      });
      return { success: true, blog: response.data };
    } catch (error: any) {
      handleApiError(error, "Failed to add blog. Please try again.");
      return { success: false, message: error?.response?.data?.message || "An error occurred." };
    } finally {
      stopLoading();
    }
  }

  async function editBlog(id: number, updatedBlog: { title: string; body: string }) {
    startLoading();
    try {
      const response = await api.put<Blog>(`/blog/${id}`, updatedBlog);
      setBlogs(function (prevBlogs) {
        return prevBlogs.map(function (blog) {
          return blog.id === id ? { ...blog, ...response.data } : blog;
        });
      });

      return { success: true, blog: response.data };
    } catch (error: any) {
      console.error("Error response:", error);

      const status = error?.response?.status;
      let errorMessage = "An error occurred.";

      if (status === 403) {
        errorMessage = "You are not authorized to edit this blog.";
      } else if (status === 404) {
        errorMessage = "The requested blog was not found.";
      } else {
        console.error("Unexpected error:", error);
        handleApiError(error, "Failed to edit blog. Please try again.");
        errorMessage = error?.response?.data?.message || errorMessage;
      }

      return { success: false, message: errorMessage };
    } finally {
      stopLoading();
    }
  }

  async function deleteBlog(id: number) {
    startLoading();
    try {
      await api.delete(`/blog/${id}`);
      setBlogs(function (prevBlogs) {
        return prevBlogs.filter(function (blog) {
          return blog.id !== id;
        });
      });
      return { success: true };
    } catch (error: any) {
      handleApiError(error, "You are not authorized to delete this blog.");
      return { success: false, message: error?.response?.data?.message || "An error occurred." };
    } finally {
      stopLoading();
    }
  }

  return {
    blogs,
    error,
    loading,
    fetchBlogs,
    fetchBlogById,
    addBlog,
    editBlog,
    deleteBlog,
    setBlogs,
  };
}
