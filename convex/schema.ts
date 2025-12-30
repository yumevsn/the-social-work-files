
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),

    // Blog Posts (Community > Blog)
    blogPosts: defineTable({
        title: v.string(),
        date: v.string(),
        excerpt: v.string(),
        content: v.string(), // HTML/Markdown
        authorId: v.optional(v.id("users")), // Optional for now
    }),

    // Events & Webinars (Community > Events)
    events: defineTable({
        title: v.string(),
        date: v.string(),
        location: v.string(),
        description: v.string(),
        type: v.union(v.literal("webinar"), v.literal("in-person")),
    }),

    // Jobs (Community > Job Board)
    jobs: defineTable({
        title: v.string(),
        organization: v.string(),
        location: v.string(),
        salary: v.optional(v.string()),
        type: v.string(), // Full-time, Part-time
        description: v.string(),
        postedAt: v.string(),
    }),

    // Volunteer Opportunities
    volunteerOpportunities: defineTable({
        title: v.string(),
        organization: v.string(),
        commitment: v.string(),
        location: v.string(),
        description: v.string(),
    }),

    // Internships
    internships: defineTable({
        title: v.string(),
        organization: v.string(),
        duration: v.string(),
        focus: v.string(),
        description: v.optional(v.string())
    }),

    // Salary Guide
    salaryGuides: defineTable({
        role: v.string(),
        experienceLevel: v.string(),
        range: v.string(),
        category: v.optional(v.string()),
    }),

    // Recommended Reading
    recommendedReadings: defineTable({
        title: v.string(),
        author: v.string(),
        year: v.string(),
        description: v.string(),
        link: v.optional(v.string()),
        fileStorageId: v.optional(v.string()),
        fileUrl: v.optional(v.string()),
    }),


    // Regulated Countries (Directory)
    countries: defineTable({
        name: v.string(),
        region: v.string(),
        regulators: v.array(v.object({
            name: v.string(),
            url: v.optional(v.string()),
        })),
    }),

    // Qualifications
    qualifications: defineTable({
        level: v.string(),
        duration: v.string(),
        description: v.string(),
        nextSteps: v.string(),
    }),

    // Forum Posts
    forumPosts: defineTable({
        category: v.string(),
        title: v.string(),
        content: v.string(),
        author: v.string(),
        postedAt: v.string(),
    }),

    // Ethics Guidelines
    ethicsGuidelines: defineTable({
        title: v.string(),
        content: v.string(),
        category: v.optional(v.string()),
    }),

    // Theoretical Frameworks
    theories: defineTable({
        name: v.string(),
        description: v.string(),
    }),

    // Licensure Exam Info
    licensureInfo: defineTable({
        category: v.string(), // e.g., "Exam Categories", "Study Tips"
        content: v.string(),
        type: v.union(v.literal("list"), v.literal("paragraph"), v.literal("notice")),
    }),

    // Research Papers & Dissertations
    research: defineTable({
        title: v.string(),
        author: v.string(),
        year: v.string(),
        type: v.union(v.literal("Research Paper"), v.literal("Dissertation"), v.literal("Policy Brief")),
        description: v.string(),
        fileStorageId: v.optional(v.string()), // Convex Storage ID
        fileUrl: v.optional(v.string()),
    }),

    // Social Work Types
    socialWorkTypes: defineTable({
        title: v.string(),
        description: v.string(),
        typicalWorkplaces: v.string(), // "Hospitals, Schools, etc."
    }),
});
