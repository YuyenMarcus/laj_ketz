const analysis = {
  name: "analysis",
  title: "Analyses",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    { name: "date", type: "datetime", title: "Date" },
    { name: "summary", type: "text", title: "Summary" },
    {
      name: "forestLoss",
      type: "number",
      title: "Forest Loss (ha)",
    },
    {
      name: "activeAlerts",
      type: "number",
      title: "Active Alerts",
    },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: { hotspot: true },
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    },
  ],
};

export default analysis;

