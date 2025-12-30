
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Generic Delete
export const deleteItem = mutation({
    args: { id: v.id("any" as any), table: v.string() },
    handler: async (ctx, args) => {
        // We'll cast table to any to allow generic deletion
        await ctx.db.delete(args.id);
    },
});

// Generic Update (limited to common fields for now, or specific ones)
// Since fields vary drastically, specific updates are better.

export const updateJob = mutation({
    args: {
        id: v.id("jobs"),
        title: v.string(),
        organization: v.string(),
        location: v.string(),
        salary: v.optional(v.string()),
        type: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateEvent = mutation({
    args: {
        id: v.id("events"),
        title: v.string(),
        date: v.string(),
        location: v.string(),
        description: v.string(),
        type: v.union(v.literal("webinar"), v.literal("in-person")),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateVolunteer = mutation({
    args: {
        id: v.id("volunteerOpportunities"),
        title: v.string(),
        organization: v.string(),
        commitment: v.string(),
        location: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateForumPost = mutation({
    args: {
        id: v.id("forumPosts"),
        title: v.string(),
        content: v.string(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateBlogPost = mutation({
    args: {
        id: v.id("blogPosts"),
        title: v.string(),
        excerpt: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateInternship = mutation({
    args: {
        id: v.id("internships"),
        title: v.string(),
        organization: v.string(),
        duration: v.string(),
        focus: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateSalaryGuide = mutation({
    args: {
        id: v.id("salaryGuides"),
        role: v.string(),
        experienceLevel: v.string(),
        range: v.string(),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateReading = mutation({
    args: {
        id: v.id("recommendedReadings"),
        title: v.string(),
        author: v.string(),
        year: v.string(),
        description: v.string(),
        link: v.optional(v.string()),
        fileStorageId: v.optional(v.string()),
        fileUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});


export const updateCountry = mutation({
    args: {
        id: v.id("countries"),
        name: v.string(),
        region: v.string(),
        regulators: v.array(v.object({
            name: v.string(),
            url: v.optional(v.string()),
        })),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateQualification = mutation({
    args: {
        id: v.id("qualifications"),
        level: v.string(),
        duration: v.string(),
        description: v.string(),
        nextSteps: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateEthics = mutation({
    args: {
        id: v.id("ethicsGuidelines"),
        title: v.string(),
        content: v.string(),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateTheory = mutation({
    args: {
        id: v.id("theories"),
        name: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateLicensureInfo = mutation({
    args: {
        id: v.id("licensureInfo"),
        category: v.string(),
        content: v.string(),
        type: v.union(v.literal("list"), v.literal("paragraph"), v.literal("notice")),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateResearch = mutation({
    args: {
        id: v.id("research"),
        title: v.string(),
        author: v.string(),
        year: v.string(),
        type: v.union(v.literal("Research Paper"), v.literal("Dissertation"), v.literal("Policy Brief")),
        description: v.string(),
        fileStorageId: v.optional(v.string()),
        fileUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const updateSocialWorkType = mutation({
    args: {
        id: v.id("socialWorkTypes"),
        title: v.string(),
        description: v.string(),
        typicalWorkplaces: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});


