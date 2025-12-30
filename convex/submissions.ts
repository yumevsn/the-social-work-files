
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a Job Listing
export const createJob = mutation({
    args: {
        title: v.string(),
        organization: v.string(),
        location: v.string(),
        salary: v.optional(v.string()),
        type: v.string(), // Full-time, Part-time
        description: v.string(),
        postedAt: v.string(),
    },
    handler: async (ctx, args) => {
        // In a real app, we would check ctx.auth.getUserIdentity() here
        await ctx.db.insert("jobs", args);
    },
});

// Create a Volunteer Opportunity
export const createVolunteer = mutation({
    args: {
        title: v.string(),
        organization: v.string(),
        commitment: v.string(),
        location: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("volunteerOpportunities", args);
    },
});

// Create an Event
export const createEvent = mutation({
    args: {
        title: v.string(),
        date: v.string(),
        location: v.string(),
        description: v.string(),
        type: v.union(v.literal("webinar"), v.literal("in-person")),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("events", args);
    },
});
// Create an Internship
export const createInternship = mutation({
    args: {
        title: v.string(),
        organization: v.string(),
        duration: v.string(),
        focus: v.string(),
        description: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("internships", args);
    },
});

// Create a Blog Post
export const createBlogPost = mutation({
    args: {
        title: v.string(),
        date: v.string(),
        excerpt: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("blogPosts", args);
    },
});

// Create a Forum Post
export const createForumPost = mutation({
    args: {
        category: v.string(),
        title: v.string(),
        content: v.string(),
        author: v.string(),
        postedAt: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("forumPosts", args);
    },
});

// Create a Salary Guide Entry
export const createSalaryGuide = mutation({
    args: {
        role: v.string(),
        experienceLevel: v.string(),
        range: v.string(),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("salaryGuides", args);
    },
});

// Create a Recommended Reading Entry
export const createReading = mutation({
    args: {
        title: v.string(),
        author: v.string(),
        year: v.string(),
        description: v.string(),
        link: v.optional(v.string()),
        fileStorageId: v.optional(v.string()),
        fileUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("recommendedReadings", args);
    },
});

// Create a Country Profile
export const createCountry = mutation({
    args: {
        name: v.string(),
        region: v.string(),
        regulators: v.array(v.object({
            name: v.string(),
            url: v.optional(v.string()),
        })),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("countries", args);
    },
});

// Create a Qualification Entry
export const createQualification = mutation({
    args: {
        level: v.string(),
        duration: v.string(),
        description: v.string(),
        nextSteps: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("qualifications", args);
    },
});

export const createEthics = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("ethicsGuidelines", args);
    },
});

export const createTheory = mutation({
    args: {
        name: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("theories", args);
    },
});

export const createLicensureInfo = mutation({
    args: {
        category: v.string(),
        content: v.string(),
        type: v.union(v.literal("list"), v.literal("paragraph"), v.literal("notice")),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("licensureInfo", args);
    },
});

export const createResearch = mutation({
    args: {
        title: v.string(),
        author: v.string(),
        year: v.string(),
        type: v.union(v.literal("Research Paper"), v.literal("Dissertation"), v.literal("Policy Brief")),
        description: v.string(),
        fileStorageId: v.optional(v.string()),
        fileUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("research", args);
    },
});

export const createSocialWorkType = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        typicalWorkplaces: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("socialWorkTypes", args);
    },
});


