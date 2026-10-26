import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Admin from "./Admin.jsx";
import {
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  GitFork,
} from "lucide-react";
const Github = GitFork;
const Linkedin = ArrowUpRight;

const fallbackContent = {
  profile: { name: "Prajwal H K", email: "prajwalhk152@gmail.com", phone: "+91 6362481047", github: "https://github.com/prajwalhk152-sketch", linkedin: "https://linkedin.com/in/prajwal-h-k-4926a0416", resume: "/resume/Prajwal_H_K_Resume.pdf", headline: "Building practical AI/ML & web applications.", intro: "BCA student focused on AI/ML and Web Development, building practical applications with Python, machine learning, and modern web technologies." },
  projects: [],
};
const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.45 },
};
function Heading({ n, title, note }) {
  return (
    <motion.div
      {...reveal}
      className="mb-12 flex items-end justify-between gap-4"
    >
      <div>
        <p className="eyebrow">// {n}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {note && (
        <p className="mb-1 font-mono text-[.62rem] uppercase tracking-[.12em] text-zinc-500">
          {note}
        </p>
      )}
    </motion.div>
  );
}
function App() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(fallbackContent);
  const menuRef = useRef(null);
  const p = content.profile;
  const projects = content.projects;
  const isAdmin = window.location.pathname === "/admin" || window.location.pathname === "/admin/";
  useEffect(() => { fetch("/portfolio.json").then((r) => r.ok ? r.json() : null).then((data) => { if (data?.profile && Array.isArray(data.projects)) setContent(data); }).catch(() => {}); }, []);
  const links = [
    "Projects",
    "Skills",
    "About",
    "Experience",
    "Education",
    "Learning",
    "Contact",
  ];
  useEffect(() => {
    const handleMenuInteraction = (event) => {
      if (event.key === "Escape" || (event.type === "mousedown" && !menuRef.current?.contains(event.target))) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleMenuInteraction);
    document.addEventListener("mousedown", handleMenuInteraction);
    return () => {
      document.removeEventListener("keydown", handleMenuInteraction);
      document.removeEventListener("mousedown", handleMenuInteraction);
    };
  }, []);
  if (isAdmin) return <Admin />;
  return (
    <>
      <header ref={menuRef} className="fixed inset-x-0 top-0 z-50 border-b border-line/40 bg-ink/80 backdrop-blur-md">
        <nav className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-3 text-xs font-extrabold tracking-[.08em]"
          >
            {p.name.toUpperCase()}{" "}
            <span className="hidden rounded-sm bg-signal px-2 py-1 font-mono text-[.55rem] font-medium text-ink sm:block">
              AI/ML + WEB DEV
            </span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {links.map((x) => (
              <a
                className="text-[.68rem] font-bold text-zinc-400 hover:text-white"
                href={"#" + x.toLowerCase()}
                key={x}
              >
                {x}
              </a>
            ))}
            <a className="button ghost !px-3 !py-2" href={p.resume} download>
              Resume <ArrowUpRight size={14} />
            </a>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div id="mobile-menu" className="border-t border-line bg-ink md:hidden">
            <div className="shell flex flex-col py-3">
              {links.map((x) => (
                <a
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3 text-sm font-bold"
                  href={"#" + x.toLowerCase()}
                  key={x}
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      <main>
        <section
          id="top"
          className="shell flex min-h-screen flex-col justify-center pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="eyebrow mb-7 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              Available for opportunities
            </p>
            <h1 className="max-w-5xl text-[clamp(3.45rem,9.4vw,8.8rem)] font-extrabold leading-[.88] tracking-[-.085em]">
              {p.headline}
            </h1>
            <p className="mt-9 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {p.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="button solid">
                View Projects <ArrowRight size={15} />
              </a>
              <a href={p.resume} download className="button ghost">
                Download Resume <ArrowDown size={15} />
              </a>
            </div>
            <div className="mt-8 flex gap-5">
              <a
                className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-signal"
                href={p.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-signal"
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>
          <div className="mt-16 flex flex-wrap gap-2 border-t border-line pt-7">
            {[
              "Python",
              "C",
              "HTML",
              "CSS",
              "JavaScript",
              "SQL",
              "Git",
              "GitHub",
              "AI/ML",
            ].map((x) => (
              <span className="tag" key={x}>
                {x}
              </span>
            ))}
          </div>
        </section>
        <section id="projects" className="section shell">
          <Heading n="01" title="Projects." note="Selected works" />
          <div className="space-y-5">
            {projects.map((project, index) => {
              const { category: cat, title, description: desc, technologies, image, github, demo } = project;
              const tech = (technologies || "").split(",").map((item) => item.trim()).filter(Boolean);
              const num = String(index + 1).padStart(2, "0");
              return (
              <motion.article
                {...reveal}
                key={num}
                className="group grid overflow-hidden border border-line bg-card md:grid-cols-[.88fr_1.12fr]"
              >
                <div className="flex min-h-[350px] flex-col p-7 md:p-9">
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-signal">{num}</span>
                    <span className="font-mono text-[.59rem] uppercase tracking-wider text-zinc-500">
                      {cat}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {tech.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-extrabold leading-[1.02] tracking-[-.055em] md:text-4xl">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                      {desc}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-5">
                      {github ? (
                        <a
                          className="inline-flex items-center gap-2 text-xs font-bold hover:text-signal"
                          href={github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github size={15} />
                          GitHub <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-zinc-500">
                          GitHub — Coming Soon
                        </span>
                      )}
                      <div className="text-xs font-bold text-zinc-500">
                        {demo ? <a href={demo} target="_blank" rel="noreferrer" className="hover:text-signal">Live Demo <ArrowUpRight size={14}/></a> : "Live Demo — Coming Soon"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[260px] overflow-hidden border-t border-line bg-[#171717] md:border-l md:border-t-0">
                  <img
                    src={image}
                    alt={title + " screenshot"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-[.62rem] uppercase tracking-[.17em] text-signal">
                      Project Preview
                    </span>
                    <span className="mt-2 font-mono text-[.66rem] uppercase tracking-[.12em] text-zinc-500">
                      Screenshot coming soon
                    </span>
                    <span className="mt-8 text-6xl font-extrabold tracking-[-.08em] text-zinc-800">
                      {num}
                    </span>
                  </div>
                </div>
              </motion.article>
            );})}
          </div>
        </section>
        <div className="hidden">
          <a
            className="button ghost"
            href="https://ai-startup-success-pridiction-system-1.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Startup Success Prediction — Live Demo <ArrowUpRight size={14} />
          </a>
          <a
            className="button ghost"
            href="https://ai-prescription-reader-88mt.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Prescription Reader — Live Demo <ArrowUpRight size={14} />
          </a>
          <a
            className="button ghost"
            href="https://ai-data-analyst-assistant-latest-1.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Data Analyst Assistant — Live Demo <ArrowUpRight size={14} />
          </a>
        </div>
        <section id="experience" className="section shell">
          <Heading n="02" title="Experience." />
          <div className="border-t border-line">
            {[
              [
                "01",
                "Cognifiz IT Solutions",
                "ML Intern",
                "July 2026 — August 2026",
                "Worked on machine-learning projects focused on restaurant data and recommendation/prediction use cases.",
                "Restaurant Recommendation System · Restaurant Rating Prediction System · Restaurant Location Prediction System",
              ],
              [
                "02",
                "Zoomindata",
                "AI/ML Intern",
                "June 2026 — July 2026",
                "Worked on practical AI/ML projects involving data analysis, OCR-based processing, and machine-learning prediction systems.",
                "AI Data Analyst Assistant · AI Doctor Prescription Reader · AI Startup Success Prediction System",
              ],
            ].map((x) => (
              <motion.article
                {...reveal}
                className="grid gap-5 border-b border-line py-8 md:grid-cols-[170px_1fr]"
                key={x[0]}
              >
                <p className="font-mono text-[.67rem] text-signal">
                  {x[0]} / {x[3]}
                </p>
                <div>
                  <p className="font-mono text-[.62rem] uppercase tracking-widest text-zinc-500">
                    {x[2]}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-.04em]">
                    {x[1]}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm text-zinc-400">{x[4]}</p>
                  <p className="mt-4 text-xs text-zinc-300">— {x[5]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="about" className="section shell">
          <Heading n="03" title="About." />
          <div className="grid gap-12 md:grid-cols-2">
            <motion.p
              {...reveal}
              className="max-w-md text-5xl font-extrabold leading-[.98] tracking-[-.065em] md:text-6xl"
            >
              Learning by building.
              <br />
              <span className="text-signal">Improving</span> by solving.
            </motion.p>
            <motion.div
              {...reveal}
              className="max-w-xl space-y-5 text-base leading-relaxed text-zinc-400"
            >
              <p>
                I’m Prajwal H K, a BCA student at Presidency College, Bangalore,
                with strong interests in AI/ML and Web Development.
              </p>
              <p>
                I enjoy building practical applications, working with data,
                exploring machine-learning concepts, and developing web-based
                solutions.
              </p>
              <p>
                My goal is to build a career in the IT industry and continue
                growing through real-world projects and professional experience.
              </p>
              <p className="flex items-center gap-2 pt-2 font-mono text-xs text-zinc-500">
                <MapPin size={15} className="text-signal" />
                Bengaluru, Karnataka, India
              </p>
            </motion.div>
          </div>
        </section>
        <section id="skills" className="section shell">
          <Heading n="04" title="Skills." />
          <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Programming", ["Python", "C"]],
              ["Web Technologies", ["HTML", "CSS", "JavaScript"]],
              ["Database", ["SQL"]],
              ["Tools", ["Git", "GitHub", "Microsoft Office", "ChatGPT"]],
              [
                "AI / ML",
                ["AI/ML Concepts", "Machine Learning", "Pandas", "NumPy"],
              ],
            ].map(([title, items], i) => (
              <motion.div
                {...reveal}
                className="min-h-[190px] border-b border-r border-line p-6 hover:bg-card"
                key={title}
              >
                <p className="font-mono text-xs text-signal">0{i + 1}</p>
                <h3 className="mt-8 text-lg font-bold">{title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <p className="eyebrow">Soft skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Adaptability", "Time Management", "Problem Solving"].map(
                (x) => (
                  <span className="tag" key={x}>
                    {x}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
        <section id="learning" className="section shell">
          <Heading n="05" title="Currently learning." note="Next up" />
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Applied AI", "Building useful prediction and recommendation tools."],
              ["Full-stack development", "Connecting polished interfaces to reliable backends."],
              ["Data storytelling", "Turning analysis into clear, practical decisions."],
            ].map(([title, description], i) => (
              <motion.article {...reveal} className="border border-line bg-card p-6" key={title}>
                <p className="font-mono text-xs text-signal">0{i + 1}</p>
                <h3 className="mt-9 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="education" className="section shell">
          <Heading n="06" title="Education." />
          <div className="border-t border-line">
            {[
              [
                "BCA",
                "Presidency College, Bangalore",
                "Pursuing · Average SGPA 8.4",
              ],
              ["II PUC", "Sri Gurukula PU College", "85.5% · 2024"],
              ["SSLC", "PSSEMR School, Davangere", "71.5% · 2022"],
            ].map((x) => (
              <motion.div
                {...reveal}
                className="grid gap-2 border-b border-line py-6 md:grid-cols-[.65fr_1.2fr_1fr]"
                key={x[0]}
              >
                <h3 className="text-xl font-bold">{x[0]}</h3>
                <p className="text-sm text-zinc-300">{x[1]}</p>
                <p className="font-mono text-xs text-signal">{x[2]}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="section shell">
          <Heading n="07" title="Certifications." />
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["ML Internship", "Cognifyz"],
              ["AI & ML Internship", "Zoomindata"],
              ["Data Structures in C", "Simplilearn"],
            ].map((x, i) => (
              <motion.div
                {...reveal}
                className="border border-line bg-card p-6"
                key={x[0]}
              >
                <p className="font-mono text-xs text-signal">0{i + 1}</p>
                <h3 className="mt-9 text-lg font-bold">{x[0]}</h3>
                <p className="mt-1 text-sm text-zinc-500">{x[1]}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section id="contact" className="section shell">
          <div className="rounded-sm border border-line bg-card p-7 md:p-12">
            <p className="eyebrow">// 07 / Contact</p>
            <div className="mt-3 grid gap-12 lg:grid-cols-[1fr_.8fr]">
              <div>
                <h2 className="max-w-xl text-5xl font-extrabold leading-[.91] tracking-[-.07em] sm:text-6xl">
                  Let’s build
                  <br />
                  something <span className="text-signal">useful.</span>
                </h2>
                <p className="mt-7 max-w-lg text-zinc-400">
                  Interested in collaboration, internships, or opportunities in
                  software development and AI/ML? Let’s connect.
                </p>
                <div className="mt-8 flex flex-col gap-3 text-sm">
                  <a
                    className="flex items-center gap-3 hover:text-signal"
                    href={"mailto:" + p.email}
                  >
                    <Mail size={16} className="text-signal" />
                    {p.email}
                  </a>
                  <a
                    className="flex items-center gap-3 hover:text-signal"
                    href={`tel:${p.phone.replace(/[^+\d]/g, "")}`}
                  >
                    <Phone size={16} className="text-signal" />
                    {p.phone}
                  </a>
                </div>
                <a href={"mailto:" + p.email} className="button solid mt-8">
                  Send an Email <ArrowRight size={15} />
                </a>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <label className="block text-xs font-bold">
                  Name
                  <input
                    required
                    className="mt-2 w-full border border-line bg-ink p-3 text-sm outline-none focus:border-signal"
                  />
                </label>
                <label className="block text-xs font-bold">
                  Email
                  <input
                    type="email"
                    required
                    className="mt-2 w-full border border-line bg-ink p-3 text-sm outline-none focus:border-signal"
                  />
                </label>
                <label className="block text-xs font-bold">
                  Message
                  <textarea
                    required
                    rows="5"
                    className="mt-2 w-full resize-y border border-line bg-ink p-3 text-sm outline-none focus:border-signal"
                  />
                </label>
                <p className="font-mono text-[.62rem] leading-relaxed text-zinc-500">
                  Submitting this form opens your email app with the message ready
                  to send.
                </p>
                <button className="button ghost" type="submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-line py-8">
        <div className="shell flex flex-col gap-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold tracking-[.08em] text-zinc-100">
              {p.name.toUpperCase()}
            </p>
            <p className="mt-1">AI/ML Enthusiast · Web Developer</p>
          </div>
          <div className="flex gap-4">
            <a href={p.github}>GitHub</a>
            <a href={p.linkedin}>LinkedIn</a>
            <a href={"mailto:" + p.email}>Email</a>
            <a href="/admin">Edit portfolio</a>
          </div>
          <p>
            © 2026 Prajwal H K<br />
            Built with React.
          </p>
        </div>
      </footer>
    </>
  );
}
export default App;
