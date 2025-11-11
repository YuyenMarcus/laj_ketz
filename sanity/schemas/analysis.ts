import { defineField, defineType } from "sanity";

const analysis = defineType({
  name: "analysis",
  title: "Analyses",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "date", type: "datetime", title: "Date" }),
    defineField({ name: "summary", type: "text", title: "Summary" }),
    defineField({
      name: "forestLoss",
      type: "number",
      title: "Forest Loss (ha)",
    }),
    defineField({
      name: "activeAlerts",
      type: "number",
      title: "Active Alerts",
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    }),
  ],
});

export default analysis;

