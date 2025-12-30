
import React, { useState, useRef } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useNavigate } from 'react-router-dom';
import { ALL_COUNTRIES, COUNTRY_REGIONS } from '../constants';

type Category = 'job' | 'volunteer' | 'event' | 'internship' | 'blog' | 'salary' | 'reading' | 'country' | 'qualification' | 'ethics' | 'theory' | 'licensure' | 'research' | 'careertypes';

interface CategoryOption {
    id: Category;
    label: string;
    description: string;
    icon: string;
    group: 'Community' | 'Directory' | 'Academic';
}

const CATEGORIES: CategoryOption[] = [
    { id: 'job', label: 'Job Listing', description: 'Post a professional vacancy.', icon: '💼', group: 'Community' },
    { id: 'volunteer', label: 'Volunteer Role', description: 'Offer service opportunities.', icon: '🤝', group: 'Community' },
    { id: 'event', label: 'Event / Webinar', description: 'Promote CPD events.', icon: '📅', group: 'Community' },
    { id: 'internship', label: 'Internship', description: 'List student placements.', icon: '🎓', group: 'Community' },
    { id: 'blog', label: 'Blog Entry', description: 'Write an article or insight.', icon: '✍️', group: 'Academic' },
    { id: 'research', label: 'Research / Paper', description: 'Upload papers or dissertations.', icon: '🔬', group: 'Academic' },
    { id: 'salary', label: 'Salary Guide', description: 'Contribute to salary data.', icon: '💰', group: 'Directory' },
    { id: 'reading', label: 'Recommended Book', description: 'Share must-read literature.', icon: '📚', group: 'Academic' },
    { id: 'country', label: 'Country Regulator', description: 'Add/update a regulator profile.', icon: '🌍', group: 'Directory' },
    { id: 'qualification', label: 'Career Route', description: 'Define educational pathways.', icon: '📜', group: 'Academic' },
    { id: 'careertypes', label: 'SW Roles', description: 'Specialized roles & workplaces.', icon: '👨‍💼', group: 'Academic' },
    { id: 'ethics', label: 'Ethics Guideline', description: 'Code of professional standards.', icon: '⚖️', group: 'Academic' },
    { id: 'theory', label: 'Theoretical Framework', description: 'Social work theories/models.', icon: '🧠', group: 'Academic' },
    { id: 'licensure', label: 'Licensure Info', description: 'ASWB exam categories/tips.', icon: '🛡️', group: 'Directory' },
];

const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category>('job');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);

    const mutations = {
        job: useMutation(api.submissions.createJob),
        volunteer: useMutation(api.submissions.createVolunteer),
        event: useMutation(api.submissions.createEvent),
        internship: useMutation(api.submissions.createInternship),
        blog: useMutation(api.submissions.createBlogPost),
        salary: useMutation(api.submissions.createSalaryGuide),
        reading: useMutation(api.submissions.createReading),
        country: useMutation(api.submissions.createCountry),
        qualification: useMutation(api.submissions.createQualification),
        ethics: useMutation(api.submissions.createEthics),
        theory: useMutation(api.submissions.createTheory),
        licensure: useMutation(api.submissions.createLicensureInfo),
        research: useMutation(api.submissions.createResearch),
        careertypes: useMutation(api.submissions.createSocialWorkType),
    };

    const [formData, setFormData] = useState({
        title: '',
        organization: '',
        location: '',
        description: '',
        salary: '',
        type: 'Full-time',
        date: '',
        commitment: '',
        eventType: 'webinar' as 'webinar' | 'in-person',
        duration: '',
        focus: 'Clinical' as 'Clinical' | 'Macro' | 'Policy' | 'School',
        excerpt: '',
        author: '',
        experienceLevel: 'Entry Level',
        range: '',
        year: '',
        link: '',
        region: 'Europe',
        level: '',
        nextSteps: '',
        licensureType: 'paragraph' as 'list' | 'paragraph' | 'notice',
        researchType: 'Research Paper' as 'Research Paper' | 'Dissertation' | 'Policy Brief',
        workplaces: '',
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [countryRegulators, setCountryRegulators] = useState<{ name: string; url?: string }[]>([{ name: '', url: '' }]);

    const addRegulatorField = () => {
        setCountryRegulators([...countryRegulators, { name: '', url: '' }]);
    };

    const removeRegulatorField = (index: number) => {
        if (countryRegulators.length > 1) {
            setCountryRegulators(countryRegulators.filter((_, i) => i !== index));
        }
    };

    const updateRegulatorField = (index: number, field: 'name' | 'url', value: string) => {
        const updated = [...countryRegulators];
        updated[index] = { ...updated[index], [field]: value };
        setCountryRegulators(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let fileStorageId: string | undefined = undefined;

            // Handle File Upload if present (Research or Reading)
            if ((category === 'research' || category === 'reading') && selectedFile) {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedFile.type },
                    body: selectedFile,
                });
                const { storageId } = await result.json();
                fileStorageId = storageId;
            }

            switch (category) {
                case 'job':
                    await mutations.job({
                        title: formData.title,
                        organization: formData.organization,
                        location: formData.location,
                        salary: formData.salary,
                        type: formData.type,
                        description: formData.description,
                        postedAt: new Date().toLocaleDateString(),
                    });
                    navigate('/jobs');
                    break;
                case 'volunteer':
                    await mutations.volunteer({
                        title: formData.title,
                        organization: formData.organization,
                        location: formData.location,
                        commitment: formData.commitment,
                        description: formData.description,
                    });
                    navigate('/volunteer');
                    break;
                case 'event':
                    await mutations.event({
                        title: formData.title,
                        date: formData.date,
                        location: formData.location,
                        description: formData.description,
                        type: formData.eventType,
                    });
                    navigate('/events');
                    break;
                case 'internship':
                    await mutations.internship({
                        title: formData.title,
                        organization: formData.organization,
                        duration: formData.duration,
                        focus: formData.focus,
                        description: formData.description,
                    });
                    navigate('/internships');
                    break;
                case 'blog':
                    await mutations.blog({
                        title: formData.title,
                        date: new Date().toLocaleDateString(),
                        excerpt: formData.excerpt,
                        content: formData.description,
                    });
                    navigate('/blog');
                    break;
                case 'salary':
                    await mutations.salary({
                        role: formData.title,
                        experienceLevel: formData.experienceLevel,
                        range: formData.range || formData.salary,
                        category: formData.focus,
                    });
                    navigate('/salary');
                    break;
                case 'reading':
                    await mutations.reading({
                        title: formData.title,
                        author: formData.author,
                        year: formData.year,
                        description: formData.description,
                        link: formData.link,
                        fileStorageId: fileStorageId,
                    });
                    navigate('/reading');
                    break;
                case 'country':
                    await mutations.country({
                        name: formData.title,
                        region: formData.region,
                        regulators: countryRegulators.filter(r => r.name.trim() !== '').map(r => ({
                            name: r.name,
                            url: r.url?.trim() === '' ? undefined : r.url
                        }))
                    });
                    navigate('/regulated-countries');
                    break;
                case 'qualification':
                    await mutations.qualification({
                        level: formData.level || formData.title,
                        duration: formData.duration,
                        description: formData.description,
                        nextSteps: formData.nextSteps,
                    });
                    navigate('/qualifications');
                    break;
                case 'ethics':
                    await mutations.ethics({
                        title: formData.title,
                        content: formData.description,
                        category: 'General',
                    });
                    navigate('/ethics');
                    break;
                case 'theory':
                    await mutations.theory({
                        name: formData.title,
                        description: formData.description,
                    });
                    navigate('/theory');
                    break;
                case 'licensure':
                    await mutations.licensure({
                        category: formData.title,
                        content: formData.description,
                        type: formData.licensureType,
                    });
                    navigate('/licensure');
                    break;
                case 'research':
                    await mutations.research({
                        title: formData.title,
                        author: formData.author,
                        year: formData.year || new Date().getFullYear().toString(),
                        type: formData.researchType,
                        description: formData.description,
                        fileStorageId: fileStorageId,
                    });
                    navigate('/research');
                    break;
                case 'careertypes':
                    await mutations.careertypes({
                        title: formData.title,
                        description: formData.description,
                        typicalWorkplaces: formData.workplaces,
                    });
                    navigate('/career-paths');
                    break;
            }
            alert('Post successful');
        } catch (err) {
            console.error(err);
            alert('Failed to post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Post to the Platform</h2>

            {/* Category Selector */}
            <div className="mb-6 cl-box p-4 bg-gray-50 border border-gray-300">
                <p className="text-xs font-black uppercase mb-3 text-gray-400 tracking-widest">Select Repository Category:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`p-2 border text-[10px] sm:text-xs font-bold transition-all uppercase tracking-tighter
                                ${category === cat.id
                                    ? 'bg-black text-white border-black shadow-[2px_2px_0_0_#991b1b]'
                                    : 'bg-white border-gray-400 text-black hover:bg-gray-100 hover:border-black'}`}
                        >
                            <span className="mr-1">{cat.icon}</span> {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="cl-box p-6 bg-white space-y-4 border-2 border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-black uppercase mb-1">
                            {category === 'salary' ? 'Role Name' :
                                category === 'reading' ? 'Book Title' :
                                    category === 'country' ? 'Country' :
                                        category === 'theory' ? 'Theory Name' :
                                            category === 'licensure' ? 'Section Category' :
                                                category === 'research' ? 'Paper/Dissertation Title' :
                                                    category === 'careertypes' ? 'Role Specification' : 'Title'}
                        </label>
                        {category === 'country' ? (
                            <select
                                required
                                className="w-full border border-gray-400 p-2 text-sm bg-white font-bold"
                                value={formData.title}
                                onChange={e => {
                                    const selectedCountry = e.target.value;
                                    const region = COUNTRY_REGIONS[selectedCountry] || 'Africa';
                                    setFormData({ ...formData, title: selectedCountry, region });
                                }}
                            >
                                <option value="">Select a Country...</option>
                                {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        ) : (
                            <input
                                required
                                type="text"
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={category === 'qualification' ? formData.level : formData.title}
                                onChange={e => category === 'qualification' ? setFormData({ ...formData, level: e.target.value }) : setFormData({ ...formData, title: e.target.value })}
                            />
                        )}
                    </div>

                    {category === 'research' && (
                        <>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Authored By</label>
                                <input required className="w-full border border-gray-400 p-2 text-sm font-bold" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Year</label>
                                <input className="w-full border border-gray-400 p-2 text-sm font-bold" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="2024" />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Type of Research</label>
                                <select className="w-full border border-gray-400 p-2 text-sm font-bold" value={formData.researchType} onChange={e => setFormData({ ...formData, researchType: e.target.value as any })}>
                                    <option>Research Paper</option>
                                    <option>Dissertation</option>
                                    <option>Policy Brief</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1 text-red-800">File Upload (PDF/DOCX)</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="w-full text-xs font-bold"
                                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </>
                    )}

                    {category === 'careertypes' && (
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black uppercase mb-1">Typical Workplaces</label>
                            <input
                                required
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.workplaces}
                                onChange={e => setFormData({ ...formData, workplaces: e.target.value })}
                                placeholder="Hospitals, Schools, Private Practice (comma separated)"
                            />
                        </div>
                    )}

                    {category === 'licensure' && (
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black uppercase mb-1">Display Style</label>
                            <select
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.licensureType}
                                onChange={e => setFormData({ ...formData, licensureType: e.target.value as any })}
                            >
                                <option value="paragraph">Standard Text</option>
                                <option value="list">Bullet Points (one per line)</option>
                                <option value="notice">Warning Box</option>
                            </select>
                        </div>
                    )}

                    {category === 'country' && (
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black uppercase mb-1">Region</label>
                            <select
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.region}
                                onChange={e => setFormData({ ...formData, region: e.target.value })}
                            >
                                <option>Africa</option>
                                <option>Americas</option>
                                <option>Asia</option>
                                <option>Europe</option>
                                <option>Oceania</option>
                            </select>
                        </div>
                    )}

                    {category === 'country' && (
                        <div className="md:col-span-2 space-y-4 border-t pt-4">
                            <label className="block text-sm font-bold">Regulatory Bodies</label>
                            {countryRegulators.map((reg, idx) => (
                                <div key={idx} className="flex flex-wrap gap-2 items-end bg-gray-50 p-3 border border-gray-200">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-xs font-bold mb-1">Body Name *</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full border border-gray-400 p-1 text-sm font-bold"
                                            value={reg.name}
                                            onChange={e => updateRegulatorField(idx, 'name', e.target.value)}
                                            placeholder="e.g. Social Work England"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-xs font-bold mb-1">Website URL (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-400 p-1 text-sm font-bold"
                                            value={reg.url}
                                            onChange={e => updateRegulatorField(idx, 'url', e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    {countryRegulators.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRegulatorField(idx)}
                                            className="text-xs bg-red-50 text-red-700 px-2 py-1 border border-red-200 font-bold hover:bg-red-100"
                                        >
                                            REMOVE
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addRegulatorField}
                                className="text-xs bg-gray-100 px-3 py-1 border border-gray-400 font-bold hover:bg-gray-200"
                            >
                                + ADD ANOTHER REGULATORY BODY
                            </button>
                        </div>
                    )}

                    {(category === 'job' || category === 'volunteer' || category === 'internship') && (
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Organization</label>
                            <input
                                required
                                type="text"
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.organization}
                                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                            />
                        </div>
                    )}

                    {(category === 'job' || category === 'volunteer' || category === 'event') && (
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Location / Venue</label>
                            <input
                                required
                                type="text"
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    )}

                    {category === 'job' && (
                        <>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Salary</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-400 p-2 text-sm font-bold"
                                    value={formData.salary}
                                    onChange={e => setFormData({ ...formData, salary: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Employment Type</label>
                                <select
                                    className="w-full border border-gray-400 p-2 text-sm font-bold"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                        </>
                    )}

                    {category === 'event' && (
                        <>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Scheduled Date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-400 p-2 text-sm font-bold"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Access Type</label>
                                <select
                                    className="w-full border border-gray-400 p-2 text-sm font-bold"
                                    value={formData.eventType}
                                    onChange={e => setFormData({ ...formData, eventType: e.target.value as any })}
                                >
                                    <option value="webinar">Webinar</option>
                                    <option value="in-person">In-Person</option>
                                </select>
                            </div>
                        </>
                    )}

                    {(category === 'reading' || category === 'blog') && (
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Primary Author</label>
                            <input
                                required={category === 'reading'}
                                type="text"
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                            />
                        </div>
                    )}

                    {category === 'reading' && (
                        <>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">Publication Year</label>
                                <input required className="w-full border border-gray-400 p-2 text-sm font-bold" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="2024" />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1">External Link (Optional)</label>
                                <input className="w-full border border-gray-400 p-2 text-sm font-bold" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-1 text-red-800">Support File (PDF/Summary)</label>
                                <input
                                    type="file"
                                    className="w-full text-xs font-bold"
                                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </>
                    )}


                    {category === 'blog' && (
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black uppercase mb-1">Brief Excerpt</label>
                            <input
                                required
                                type="text"
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            />
                        </div>
                    )}

                    {category === 'salary' && (
                        <div>
                            <label className="block text-xs font-black uppercase mb-1">Renumeration Range</label>
                            <input
                                required
                                type="text"
                                className="w-full border border-gray-400 p-2 text-sm font-bold"
                                value={formData.range}
                                onChange={e => setFormData({ ...formData, range: e.target.value })}
                            />
                        </div>
                    )}

                    {category !== 'country' && (
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black uppercase mb-1">
                                {category === 'research' ? 'Abstract / Key Findings' :
                                    category === 'careertypes' ? 'Role Description & Typical Duties' : 'Description / Content'}
                            </label>
                            <textarea
                                required
                                className="w-full border border-gray-400 p-2 text-sm h-32 font-medium"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                    )}
                </div>

                <div className="flex justify-start pt-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-black text-white font-black p-3 px-12 text-sm hover:bg-gray-800 disabled:bg-gray-400 uppercase tracking-widest shadow-[4px_4px_0_0_#991b1b]"
                    >
                        {loading ? 'Transmitting Data...' : 'Submit Entry to Repository'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
