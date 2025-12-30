
import { mutation } from "./_generated/server";

export const seed = mutation({
    handler: async (ctx) => {
        // 1. Countries - Expanded List
        const countries = [
            // Europe
            {
                name: 'United Kingdom',
                region: 'Europe',
                regulators: [
                    { name: 'Social Work England', url: 'https://www.socialworkengland.org.uk' },
                    { name: 'SSSC (Scotland)', url: 'https://www.sssc.uk.com' },
                    { name: 'Social Care Wales', url: 'https://socialcare.wales' },
                    { name: 'NISCC (Northern Ireland)', url: 'https://niscc.info' }
                ]
            },
            {
                name: 'Ireland',
                region: 'Europe',
                regulators: [{ name: 'CORU', url: 'https://www.coru.ie' }]
            },
            {
                name: 'Germany',
                region: 'Europe',
                regulators: [{ name: 'DBSH', url: 'https://www.dbsh.de' }]
            },
            {
                name: 'United States',
                region: 'North America',
                regulators: [{ name: 'Association of Social Work Boards (ASWB)', url: 'https://www.aswb.org' }]
            },
            {
                name: 'Canada',
                region: 'North America',
                regulators: [{ name: 'Canadian Association of Social Workers (CASW)', url: 'https://www.casw-acts.ca' }]
            },
            {
                name: 'Australia',
                region: 'Oceania',
                regulators: [{ name: 'Australian Association of Social Workers (AASW)', url: 'https://www.aasw.asn.au' }]
            },
            {
                name: 'South Africa',
                region: 'Africa',
                regulators: [{ name: 'SACSSP', url: 'https://www.sacssp.co.za' }]
            },
        ];

        // Clear existing to avoid schema mismatch
        const oldCountries = await ctx.db.query("countries").collect();
        for (const c of oldCountries) await ctx.db.delete(c._id);

        for (const c of countries) await ctx.db.insert("countries", c);

        // 2. Qualifications
        const qualCheck = await ctx.db.query("qualifications").first();
        if (!qualCheck) {
            const qualifications = [
                {
                    level: 'Certificate / Access Course',
                    duration: '6-12 Months',
                    description: 'Foundational understanding of social care and human behavior.',
                    nextSteps: 'Leads to Diploma or entry-level care roles.'
                },
                {
                    level: 'Diploma in Social Work',
                    duration: '2 Years',
                    description: 'Technical training for auxiliary social workers or social work assistants.',
                    nextSteps: 'Eligible for certain paraprofessional roles or university bridge.'
                },
                {
                    level: 'Bachelor of Social Work (BSW)',
                    duration: '3-4 Years',
                    description: 'The standard entry-level qualification for professional registration.',
                    nextSteps: 'Eligible for professional licensure in most countries.'
                },
                {
                    level: 'Master of Social Work (MSW)',
                    duration: '2 Years',
                    description: 'Advanced clinical practice and specialized training.',
                    nextSteps: 'Required for private practice or specialized clinical roles.'
                },
                {
                    level: 'PhD / DSW',
                    duration: '3-5 Years',
                    description: 'Research-focused or high-level clinical leadership qualification.',
                    nextSteps: 'University lecturing, policy research, or executive leadership.'
                }
            ];
            for (const q of qualifications) await ctx.db.insert("qualifications", q);
        }

        // 3. Blog Posts
        const blogCheck = await ctx.db.query("blogPosts").first();
        if (!blogCheck) {
            const blogs = [
                {
                    title: 'Self-Care in High-Stress Environments',
                    date: '2024-05-15',
                    excerpt: 'How to maintain your mental health while working on the frontline...',
                    content: 'Social work is inherently stressful. This post explores the importance of professional boundaries and mindfulness practices to prevent burnout.'
                },
                {
                    title: 'Navigating Child Protection Legislation',
                    date: '2024-04-20',
                    excerpt: 'A brief guide to recent changes in international child welfare laws...',
                    content: 'Legislation is constantly evolving. Staying updated on the Children’s Act and its counterparts in other nations is crucial for compliant practice.'
                },
                {
                    title: 'The Future of Social Work: AI and Ethics',
                    date: '2024-03-10',
                    excerpt: 'Can artificial intelligence help with case management?',
                    content: 'We discuss the ethical implications of using AI for documentation and risk assessment in social work settings.'
                }
            ];
            for (const b of blogs) await ctx.db.insert("blogPosts", b);
        }

        // 4. Events
        const evCheck = await ctx.db.query("events").first();
        if (!evCheck) {
            const events = [
                {
                    title: "Trauma-Informed Care Workshop",
                    date: "June 15, 2024",
                    description: "Learn the principles of trauma-informed practice.",
                    location: "Online (Zoom)",
                    type: "webinar" as const
                },
                {
                    title: "Annual Social Work Conference",
                    date: "July 02, 2024",
                    description: "Networking and keynote speakers on future trends.",
                    location: "New York, NY",
                    type: "in-person" as const
                },
                {
                    title: "Ethics in the Digital Age",
                    date: "July 20, 2024",
                    description: "Webinar discussing AI, social media, and boundaries.",
                    location: "Online (Teams)",
                    type: "webinar" as const
                }
            ];
            for (const e of events) await ctx.db.insert("events", e);
        }

        // 5. Volunteer Opportunities
        const volCheck = await ctx.db.query("volunteerOpportunities").first();
        if (!volCheck) {
            const volunteers = [
                {
                    title: "Crisis Hotline Operator",
                    organization: "General",
                    commitment: "4 hrs/week",
                    location: "Remote",
                    description: "Provide active listening and support to callers in distress. Training provided."
                },
                {
                    title: "Youth Mentor",
                    organization: "Local Community Center",
                    commitment: "2 hrs/week",
                    location: "Local",
                    description: "Mentor at-risk youth through after-school programs and activities."
                },
                {
                    title: "Food Bank Coordinator Assistant",
                    organization: "Downtown Shelter",
                    commitment: "Weekends",
                    location: "Local",
                    description: "Assist in organizing and distributing food parcels to families in need."
                }
            ];
            for (const v of volunteers) await ctx.db.insert("volunteerOpportunities", v);
        }

        // 6. Internships
        const intCheck = await ctx.db.query("internships").first();
        if (!intCheck) {
            const internships = [
                {
                    title: "Summer Clinical Rotation",
                    organization: "City Hospital",
                    duration: "June - August",
                    focus: "Medical Social Work",
                    description: "Medical Social Work focus"
                },
                {
                    title: "Child Welfare Advocacy Intern",
                    organization: "Family Services",
                    duration: "Fall Semester",
                    focus: "Policy and Advocacy",
                    description: "Policy and Advocacy focus"
                },
                {
                    title: "Community Outreach Intern",
                    organization: "Urban Alliance",
                    duration: "Spring Semester",
                    focus: "Macro Social Work",
                    description: "Macro Social Work focus"
                },
                {
                    title: "School Social Work Placement",
                    organization: "District 9",
                    duration: "Full Academic Year",
                    focus: "Educational",
                    description: "Educational setting"
                }
            ];
            for (const i of internships) await ctx.db.insert("internships", i);
        }

        // 7. Salary Guide
        const salCheck = await ctx.db.query("salaryGuides").first();
        if (!salCheck) {
            const salaries = [
                { role: "Case Manager", experienceLevel: "Entry Level", range: "$35,000 - $45,000" },
                { role: "School Social Worker", experienceLevel: "2-5 Years", range: "$45,000 - $65,000" },
                { role: "Medical Social Worker", experienceLevel: "Mid-Level", range: "$55,000 - $75,000" },
                { role: "Clinical Therapist (LCSW)", experienceLevel: "Licensed", range: "$60,000 - $90,000+" },
                { role: "Director of Social Services", experienceLevel: "Senior (10+ Yrs)", range: "$80,000 - $120,000+" }
            ];
            for (const s of salaries) await ctx.db.insert("salaryGuides", s);
        }

        // 8. Recommended Reading
        const readCheck = await ctx.db.query("recommendedReadings").first();
        if (!readCheck) {
            const readings = [
                { title: "The Body Keeps the Score", author: "Bessel van der Kolk", year: "2014", description: "Essential reading for understanding trauma and its impact on the body and mind." },
                { title: "Daring Greatly", author: "Brené Brown", year: "2012", description: "Explores the power of vulnerability." },
                { title: "Social Work Treatment", author: "Francis J. Turner", year: "2011", description: "Overview of major theoretical approaches." }
            ];
            for (const r of readings) await ctx.db.insert("recommendedReadings", r);
        }

        // 9. Forum Posts
        const forumCheck = await ctx.db.query("forumPosts").first();
        if (!forumCheck) {
            const forumPosts = [
                { category: "General Discussion", title: "New Legislation in NY", content: "Has anyone reviewed the recent changes?", author: "SW_Jane", postedAt: "2024-05-20" },
                { category: "Case Consultation", title: "Complex Teen Case", content: "Looking for advice on a difficult situation...", author: "ClinicalLead", postedAt: "2024-05-19" },
                { category: "Student Lounge", title: "Studying for ASWB", content: "Anyone want to join a study group?", author: "GradStudent24", postedAt: "2024-05-20" }
            ];
            for (const f of forumPosts) await ctx.db.insert("forumPosts", f);
        }


        // 10. Ethics Guidelines
        const ethicsCheck = await ctx.db.query("ethicsGuidelines").first();
        if (!ethicsCheck) {
            const ethics = [
                {
                    title: 'IFSW Global Ethics',
                    content: 'The International Federation of Social Workers (IFSW) sets the baseline for human rights and social justice globally. All practitioners are mandated to adhere to the core values of integrity, service, and dignity of the person.',
                    category: 'Global Standards'
                },
                {
                    title: 'Confidentiality & Data Integrity',
                    content: 'Protecting client data is paramount in a digital age. Practitioners must navigate the complex ethical balance between individual privacy rights and the legal duty to protect vulnerable individuals from harm (safeguarding).',
                    category: 'Practice'
                },
                {
                    title: 'Professional Boundaries',
                    content: 'Maintaining professional distance while providing empathetic, person-centered support. Dual relationships should be avoided rigorously to prevent conflicts of interest and power imbalances.',
                    category: 'Practice'
                }
            ];
            for (const e of ethics) await ctx.db.insert("ethicsGuidelines", e);
        }

        // 11. Theories
        const theoryCheck = await ctx.db.query("theories").first();
        if (!theoryCheck) {
            const theories = [
                { name: 'Systems Theory', description: 'Understanding individuals through the complex, interconnected systems of family, community, and broader society.' },
                { name: 'Strengths-Based Approach', description: 'Systematically focusing on the inherent resources, resilience, and capabilities of the client rather than just pathology or deficits.' },
                { name: 'Psychosocial Theory', description: 'Examining how psychological internal factors and the social external environment interact to influence mental health and overall wellbeing.' },
                { name: 'Social Constructionism', description: 'The framework suggesting that individuals and groups develop knowledge of the world in a specific social and historical context.' }
            ];
            for (const t of theories) await ctx.db.insert("theories", t);
        }

        // 12. Licensure Info
        const licCheck = await ctx.db.query("licensureInfo").first();
        if (!licCheck) {
            const licInfo = [
                {
                    category: "Exam Categories",
                    content: "Bachelors: Basic generalist practice.\nMasters: Master's level generalist practice.\nAdvanced Generalist: Non-clinical advanced practice.\nClinical: Advanced clinical practice.",
                    type: "list" as const
                },
                {
                    category: "Study Tips",
                    content: "Success on the ASWB exam requires understanding the 'ideal' social work answer. Always prioritize client safety, acknowledge feelings, and start where the client is.\nUse the acronym FAREAFI (Feelings, Assess, Refer, Educate, Advocate, Facilitate, Intervene) for first/next questions.",
                    type: "paragraph" as const
                },
                {
                    category: "Important Notice",
                    content: "Exam requirements vary by state and jurisdiction. Always verify with your local social work board before registering.",
                    type: "notice" as const
                }
            ];
            for (const l of licInfo) await ctx.db.insert("licensureInfo", l);
        }

        // 13. Research
        const researchCheck = await ctx.db.query("research").first();
        if (!researchCheck) {
            const researchItems = [
                {
                    title: 'The Impact of Social Isolation on Elderly Populations Post-Pandemic',
                    author: 'Dr. Sarah Mitchell',
                    year: '2023',
                    type: 'Research Paper' as const,
                    description: 'A comprehensive study examining the long-term psychological effects of isolation on urban elderly residents.',
                },
                {
                    title: 'Sustainable Community Development in Sub-Saharan Africa',
                    author: 'James Okoro',
                    year: '2022',
                    type: 'Dissertation' as const,
                    description: 'Exploring indigenous frameworks for social welfare and community-led infrastructure projects.',
                }
            ];
            for (const r of researchItems) await ctx.db.insert("research", r);
        }

        // 14. Social Work Types
        const swTypeCheck = await ctx.db.query("socialWorkTypes").first();
        if (!swTypeCheck) {
            const types = [
                {
                    title: 'Clinical Social Worker',
                    description: 'Diagnosing and treating mental, behavioral, and emotional issues. Often provides individual or group therapy.',
                    typicalWorkplaces: 'Private Practice, Community Health Centers, Hospitals'
                },
                {
                    title: 'Child and Family Social Worker',
                    description: 'Protecting vulnerable children and helping families in need of assistance. Navigating foster care, adoption, and family court.',
                    typicalWorkplaces: 'State Agencies, Non-Profits, Schools'
                },
                {
                    title: 'Medical Social Worker',
                    description: 'Assisting patients and families in coping with the emotional and social impacts of illness or disability.',
                    typicalWorkplaces: 'Hospitals, Hospice Care, Rehabilitation Centers'
                },
                {
                    title: 'School Social Worker',
                    description: 'Working with teachers, parents, and school administrators to help students overcome barriers to learning.',
                    typicalWorkplaces: 'Primary and Secondary Schools, Educational Boards'
                }
            ];
            for (const t of types) await ctx.db.insert("socialWorkTypes", t);
        }

        return "Seeding Complete!";
    },
});

