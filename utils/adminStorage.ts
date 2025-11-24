import { PROJECTS_DATA, ACHIEVEMENTS, BLOG_POSTS } from "../data";

const KEYS = {
  PROJECTS: "admin_projects",
  CERTS: "admin_certs",
  BLOGS: "admin_blogs",
  MESSAGES: "admin_messages",
};

// Initialize or Load Data
export const getAdminData = () => {
  if (typeof window === "undefined")
    return { projects: [], certs: [], blogs: [], messages: [] };

  const p = localStorage.getItem(KEYS.PROJECTS);
  const c = localStorage.getItem(KEYS.CERTS);
  const b = localStorage.getItem(KEYS.BLOGS);
  const m = localStorage.getItem(KEYS.MESSAGES);

  return {
    projects: p
      ? JSON.parse(p)
      : PROJECTS_DATA.map((x) => ({ ...x, published: true })),
    certs: c
      ? JSON.parse(c)
      : ACHIEVEMENTS.map((x) => ({ ...x, published: true })),
    blogs: b
      ? JSON.parse(b)
      : BLOG_POSTS.map((x) => ({ ...x, published: true })),
    messages: m ? JSON.parse(m) : [],
  };
};

export const getSingleItem = (type: string, id: string) => {
  const data = getAdminData();
  if (type === "project") return data.projects.find((i: any) => i.id === id);
  if (type === "cert") return data.certs.find((i: any) => i.id === id);
  if (type === "blog") return data.blogs.find((i: any) => i.id === id);
  return null;
};

export const saveAdminItem = (type: string, item: any) => {
  const data = getAdminData();
  let list = [];
  let key = "";

  if (type === "project") {
    list = data.projects;
    key = KEYS.PROJECTS;
  } else if (type === "cert") {
    list = data.certs;
    key = KEYS.CERTS;
  } else if (type === "blog") {
    list = data.blogs;
    key = KEYS.BLOGS;
  } else return;

  const index = list.findIndex((i: any) => i.id === item.id);
  if (index >= 0) {
    list[index] = item;
  } else {
    list.unshift(item);
  }

  localStorage.setItem(key, JSON.stringify(list));
};

export const saveMessage = (message: any) => {
  const m = localStorage.getItem(KEYS.MESSAGES);
  const messages = m ? JSON.parse(m) : [];
  messages.unshift({
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    submittedAt: new Date().toISOString(),
    status: "pending",
  });
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
};

export const deleteAdminItem = (type: string, id: string) => {
  const data = getAdminData();
  let list = [];
  let key = "";

  if (type === "project") {
    list = data.projects;
    key = KEYS.PROJECTS;
  } else if (type === "cert") {
    list = data.certs;
    key = KEYS.CERTS;
  } else if (type === "blog") {
    list = data.blogs;
    key = KEYS.BLOGS;
  } else if (type === "message") {
    list = data.messages;
    key = KEYS.MESSAGES;
  } else return;

  const newList = list.filter((i: any) => i.id !== id);
  localStorage.setItem(key, JSON.stringify(newList));
};
