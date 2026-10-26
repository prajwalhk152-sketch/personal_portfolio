import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash2, Upload, Save } from "lucide-react";

const OWNER = "prajwalhk152-sketch";
const REPO = "personal_portfolio";
const PATH = "public/portfolio.json";
const blankProject = () => ({ category: "Project", title: "", description: "", technologies: "", image: "", github: "", demo: "" });

async function readFileBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Admin() {
  const [content, setContent] = useState(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [resume, setResume] = useState(null);
  const [projectImages, setProjectImages] = useState({});

  useEffect(() => {
    fetch("/portfolio.json").then((r) => r.json()).then(setContent).catch(() => setStatus("Could not load portfolio content."));
  }, []);

  const updateProfile = (key, value) => setContent((c) => ({ ...c, profile: { ...c.profile, [key]: value } }));
  const updateProject = (index, key, value) => setContent((c) => ({ ...c, projects: c.projects.map((p, i) => i === index ? { ...p, [key]: value } : p) }));

  async function save() {
    if (!token.trim()) { setStatus("Enter a GitHub fine-grained token with Contents read/write access."); return; }
    setStatus("Publishing portfolio updates…");
    try {
      let resumePath = content.profile.resume;
      if (resume) {
        const path = `public/resume/${resume.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
        await putFile(path, await readFileBase64(resume), `Update resume: ${resume.name}`);
        resumePath = `/${path.replace(/^public\//, "")}`;
      }
      const projects = [...content.projects];
      for (const [index, file] of Object.entries(projectImages)) {
        const path = `public/images/project-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
        await putFile(path, await readFileBase64(file), `Add project image: ${file.name}`);
        projects[index] = { ...projects[index], image: `/${path.replace(/^public\//, "")}` };
      }
      const toPublish = { ...content, projects, profile: { ...content.profile, resume: resumePath } };
      await putFile(PATH, btoa(unescape(encodeURIComponent(JSON.stringify(toPublish, null, 2)))), "Update portfolio content");
      setContent(toPublish);
      setResume(null);
      setProjectImages({});
      setStatus("Published to GitHub. Your hosting service will rebuild the public portfolio shortly.");
    } catch (e) { setStatus(`Publish failed: ${e.message}`); }
  }

  async function putFile(path, contentBase64, message) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
    const headers = { Authorization: `Bearer ${token.trim()}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" };
    const existing = await fetch(url, { headers });
    let sha;
    if (existing.ok) sha = (await existing.json()).sha;
    else if (existing.status !== 404) throw new Error(`GitHub could not read ${path} (${existing.status}). Check the token and repository access.`);
    const response = await fetch(url, { method: "PUT", headers, body: JSON.stringify({ message, content: contentBase64, ...(sha ? { sha } : {}) }) });
    if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.message || `GitHub save failed (${response.status}).`); }
  }

  if (!content) return <main className="shell min-h-screen py-20 text-zinc-300">Loading editor…</main>;
  const field = "mt-2 w-full border border-line bg-ink p-3 text-sm text-zinc-100 outline-none focus:border-signal";
  const label = "block text-xs font-bold text-zinc-300";

  return <main className="shell min-h-screen py-10 md:py-16">
    <a className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-signal" href="/"><ArrowLeft size={16}/> View portfolio</a>
    <p className="eyebrow mt-10">Portfolio editor</p><h1 className="mt-2 text-5xl font-extrabold tracking-tight">Make it yours.</h1>
    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">Edit the details below and publish them to GitHub. The public site updates after your hosting service finishes its automatic deployment.</p>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <section className="border border-line bg-card p-6 md:p-8"><h2 className="mb-6 text-xl font-bold">Profile details</h2><div className="grid gap-5 sm:grid-cols-2">
          {[["name","Display name"],["email","Email"],["phone","Phone"],["github","GitHub URL"],["linkedin","LinkedIn URL"],["headline","Headline"],["intro","Introduction"]].map(([key,title])=><label className={`${label} ${["intro","headline"].includes(key)?"sm:col-span-2":""}`} key={key}>{title}{key==="intro"?<textarea rows={3} className={field} value={content.profile[key]||""} onChange={e=>updateProfile(key,e.target.value)}/>:<input className={field} value={content.profile[key]||""} onChange={e=>updateProfile(key,e.target.value)}/>}</label>)}
        </div></section>
        <section className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Projects</h2><button className="button ghost !px-3 !py-2" onClick={()=>setContent(c=>({...c,projects:[...c.projects,blankProject()]}))}><Plus size={15}/>Add project</button></div>
          {content.projects.map((project,i)=><article key={i} className="border border-line bg-card p-6"><div className="mb-5 flex items-center justify-between"><h3 className="font-mono text-xs text-signal">PROJECT {String(i+1).padStart(2,"0")}</h3><button aria-label="Remove project" className="p-2 text-zinc-500 hover:text-red-300" onClick={()=>setContent(c=>({...c,projects:c.projects.filter((_,n)=>n!==i)}))}><Trash2 size={16}/></button></div><div className="grid gap-4 sm:grid-cols-2">
            {[["title","Title"],["category","Category"],["technologies","Technologies (comma separated)"],["image","Screenshot path or image URL"],["github","GitHub URL"],["demo","Live demo URL"],["description","Description"]].map(([key,title])=><label className={`${label} ${key==="description"?"sm:col-span-2":""}`} key={key}>{title}{key==="description"?<textarea rows={3} className={field} value={project[key]||""} onChange={e=>updateProject(i,key,e.target.value)}/>:<input className={field} value={project[key]||""} onChange={e=>updateProject(i,key,e.target.value)}/>}</label>)}
            <label className={`${label} sm:col-span-2`}>Upload project screenshot<input type="file" accept="image/*" className={`${field} file:mr-4 file:border-0 file:bg-zinc-800 file:px-3 file:py-2`} onChange={e=>setProjectImages(files=>({...files,[i]:e.target.files?.[0]}))}/>{projectImages[i]&&<span className="mt-2 block text-xs text-signal">Selected: {projectImages[i].name}</span>}</label>
          </div></article>)}
        </section>
        <section className="border border-line bg-card p-6"><h2 className="text-xl font-bold">Resume</h2><p className="mt-2 text-sm text-zinc-400">Upload a PDF to replace the resume linked on your portfolio.</p><label className="mt-4 flex cursor-pointer items-center gap-3 border border-dashed border-zinc-700 p-4 text-sm hover:border-signal"><Upload size={17} className="text-signal"/>{resume?.name || "Choose a PDF"}<input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={e=>setResume(e.target.files?.[0]||null)}/></label></section>
      </div>
      <aside className="h-fit border border-line bg-card p-6 lg:sticky lg:top-8"><h2 className="text-lg font-bold">Publish changes</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">Use a GitHub fine-grained personal access token with access to <span className="text-zinc-200">{OWNER}/{REPO}</span> and Contents read/write permission. It stays in this tab and is never saved to the site.</p><label className={`${label} mt-5`}>GitHub token<input type="password" autoComplete="off" className={field} placeholder="github_pat_…" value={token} onChange={e=>setToken(e.target.value)}/></label><button className="button solid mt-5 w-full" onClick={save}><Save size={15}/>Publish updates</button>{status&&<p role="status" className="mt-4 text-xs leading-relaxed text-signal">{status}</p>}</aside>
    </div>
  </main>;
}

export default Admin;
