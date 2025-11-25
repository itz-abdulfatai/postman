import type { CollectionType } from "../../types";

const aiAppTests: CollectionType = {
  id: "col-ai-app-tests",
  name: "ai app tests",
  createdAt: new Date(),
  updatedAt: new Date(),
  description: "Sample AI endpoints for testing model and inference APIs",
  folders: [],
  variables: [],
  requests: [
    {
      id: "req-generate-text",
      name: "generate text",
      url: "https://api.example.com/ai/generate-text",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "json",
        value: { prompt: "hello world" },
      },
      params: {},
    },
    {
      id: "req-summarize-text",
      name: "summarize text",
      url: "https://api.example.com/ai/summarize",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "json",
        value: { text: "lorem ipsum..." },
      },
      params: {},
    },
  ],
  isFavourite: true,
};

const socialMediaMicroservices: CollectionType = {
  isFavourite: false,
  id: "col-social-media-microservices",
  name: "social media app microservices",

  createdAt: new Date(),
  updatedAt: new Date(),
  description: "Microservice endpoints for my social media app",
  folders: [],
  variables: [],
  requests: [
    {
      id: "req-register-user",
      name: "register a user",
      url: "https://api.example.com/auth/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "json",
        value: {
          email: "test@example.com",
          password: "password123",
        },
      },
    },
    {
      id: "req-login-user",
      name: "login a user",
      url: "https://api.example.com/auth/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "json",
        value: { email: "test@example.com", password: "password123" },
      },
    },
    {
      id: "req-create-post",
      name: "create post",
      url: "https://api.example.com/posts",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "json",
        value: { caption: "Hello world!", mediaUrl: "" },
      },
    },
    {
      id: "req-get-all-post",
      name: "get all post",
      url: "https://api.example.com/posts",
      method: "GET",
      headers: {},
    },
    {
      id: "req-get-single-post",
      name: "get single post",
      url: "https://api.example.com/posts/1",
      method: "GET",
      headers: {},
    },
    {
      id: "req-search-post",
      name: "search post",
      url: "https://api.example.com/posts/search",
      method: "GET",
      params: { q: "hello" },
      headers: {},
    },
    {
      id: "req-delete-post",
      name: "delete a post",
      url: "https://api.example.com/posts/1",
      method: "DELETE",
      headers: {},
    },
    {
      id: "req-upload-media",
      name: "upload media",
      url: "https://api.example.com/media/upload",
      method: "POST",
      headers: {},
      body: {
        type: "form-data",
        value: [{ key: "file", value: "", isFile: true }],
      },
    },
    {
      id: "req-fetch-media",
      name: "fetch all media",
      url: "https://api.example.com/media/fetch",
      method: "POST",
      headers: {},
    },
  ],
};

export const collections: CollectionType[] = [
  socialMediaMicroservices,
  aiAppTests,
];
