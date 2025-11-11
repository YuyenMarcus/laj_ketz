const vlog = {
  name: "vlog",
  title: "Vlogs",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    {
      name: "videoUrl",
      type: "url",
      title: "Video URL",
    },
    { name: "date", type: "datetime", title: "Date" },
    { name: "summary", type: "text", title: "Summary" },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: { hotspot: true },
    },
  ],
};

export default vlog;

