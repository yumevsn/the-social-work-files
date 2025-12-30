
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getCountries = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("countries").collect();
    },
});

export const getJobs = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("jobs").order("desc").collect();
    },
});

export const getEvents = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("events").collect();
    },
});

export const getVolunteerOpportunities = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("volunteerOpportunities").collect();
    },
});

export const getInternships = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("internships").collect();
    }
});

export const getSalaryGuides = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("salaryGuides").collect();
    }
});

export const getReadings = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("recommendedReadings").collect();
    }
});

export const getQualifications = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("qualifications").collect();
    },
});

export const getBlogPosts = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("blogPosts").order("desc").collect();
    },
});

export const getForumPosts = query({
    args: { category: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let q = ctx.db.query("forumPosts");
        const posts = await q.order("desc").collect();
        if (args.category) {
            return posts.filter(p => p.category === args.category);
        }
        return posts;
    },
});

export const getEthics = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("ethicsGuidelines").collect();
    },
});

export const getTheories = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("theories").collect();
    },
});

export const getLicensureInfo = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("licensureInfo").collect();
    },
});

export const getResearch = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("research").collect();
    },
});

export const getSocialWorkTypes = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("socialWorkTypes").collect();
    },
});

export const getResearchById = query({
    args: { id: v.id("research") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getReadingById = query({
    args: { id: v.id("recommendedReadings") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});



