import Image from "next/image";
import { ArrowUpRight, Cloud, Github, Linkedin, MapPin } from "lucide-react";
import { AchievementsGallery } from "@/components/achievements-gallery";
import { FloatingChatWidget } from "@/components/floating-chat-widget";
import { AnalyticsGallery } from "@/components/analytics-gallery";
import { ProjectsFilter } from "@/components/projects-filter";
import { identity, technologyGroups } from "@/data/portfolio";


export default function Home() {
  return (
    <main>
      <nav className="section-nav shell" aria-label="Portfolio sections">
        <a href="#qualifications">Qualifications</a>
        <a href="#experience">Experiences</a>
        <a href="#skills">Skills</a>
        <a href="#achievements">Achievements</a>
        <a href="#projects">Projects</a>
      </nav>

      <section className="profile shell" aria-labelledby="profile-title">
        <div className="profile-logo">
          <Image src="/n-monogram.png" alt="Nejood monogram" width={800} height={800} priority />
        </div>
        <div className="profile-copy">
          <p className="profile-name">{identity.name}</p>
          <h1 id="profile-title"><strong>AI Engineer</strong> · <strong>Business & Data Analysis</strong><br /><strong>Automation</strong> · <strong>AI Researcher</strong></h1>
          <p>{identity.summary}</p>
          <div className="availability"><span aria-hidden="true" /> Open to work <small><MapPin size={14} /> {identity.location}</small></div>
          <div className="profile-actions">
            <a className="contact-link" href={`mailto:${identity.email}`}>Contact me</a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={identity.github} target="_blank" rel="noreferrer" aria-label="GitHub: njoudae" title="GitHub: njoudae"><Github /></a>
            <a className="cv-link" href="https://drive.google.com/file/d/139YHYtsb523d_vm5AELJFg4htKAaFF-b/view?usp=drive_link" target="_blank" rel="noreferrer">CV <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section qualification-section shell" id="qualifications" aria-labelledby="qualification-title">
        <div className="section-title"><h2 id="qualification-title">Qualifications</h2></div>
        <div className="qualification-panel">
          <section className="qualification-block academic-block" aria-labelledby="academic-title">
            <div className="qualification-block-title"><span>01</span><h3 id="academic-title">Academic Degrees</h3></div>
            <div className="degree-list">
              <article className="degree-row"><div className="degree-logo"><Image src="/kku.png" alt="King Khalid University" width={503} height={397} /></div><div><strong>Bachelor of Computer Science</strong><p>King Khalid University · GPA 4.95 / 5.00 · 2019-2023</p></div></article>
            </div>
          </section>

          <section className="qualification-block scores-block" aria-labelledby="scores-title">
            <div className="qualification-block-title"><span>02</span><h3 id="scores-title">Test Scores</h3></div>
            <div className="score-grid">
              <article className="score-card"><div className="score-logo ielts"><Image src="/ielts.png" alt="IELTS" width={713} height={429} /></div><strong>IELTS</strong><span>6.0</span></article>
              <article className="score-card"><div className="score-logo qias"><Image src="/qias.png" alt="Qiyas" width={250} height={202} /></div><strong>STEP</strong><span>84</span></article>
              <article className="score-card"><div className="score-logo qias"><Image src="/qias.png" alt="Qiyas" width={250} height={202} /></div><strong>University Graduates Aptitude Test</strong><span>92%</span></article>
            </div>
          </section>

          <section className="qualification-block certifications-block" aria-labelledby="certifications-title">
            <div className="qualification-block-title"><span>03</span><h3 id="certifications-title">Professional Certifications</h3></div>
            <div className="certificate-grid">
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-oracle.png" alt="Oracle Certified Professional badge" width={152} height={174} /></div><strong>Oracle Certified Professional</strong></article>
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-oracle-ai.png" alt="Oracle AI Foundations Associate badge" width={155} height={192} /></div><strong>Oracle AI Foundations Associate</strong></article>
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-pcep.png" alt="PCEP certification badge" width={157} height={165} /></div><strong>PCEP - Certified Entry-Level Python Programmer</strong></article>
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-ecba.jpg" alt="ECBA certification badge" width={157} height={165} /></div><strong>ECBA - Entry Certified Business Analyst</strong></article>
            </div>
          </section>

          <section className="qualification-block courses-block" aria-labelledby="courses-title">
            <div className="qualification-block-title"><span>04</span><h3 id="courses-title">Specialized Courses</h3></div>
            <ul className="course-list">
              <li><strong>Associate Certified Analytics Professional (CAP)</strong><span>LEORON Institute</span></li>
              <li><strong>Machine Learning Specialization</strong><span>Stanford University</span></li>
              <li><strong>Deep Learning Specialization</strong><span>DeepLearning.AI</span></li>
              <li><strong>Data Analysis Using Excel</strong><span>Tuwaiq Academy</span></li>
              <li><strong>Microsoft Office Specialist (MOS)</strong><span>King Khalid University</span></li>
              <li><strong>SQL for Data Analysis</strong><span>Udacity</span></li>
            </ul>
          </section>
        </div>
      </section>


      <section className="section experience-section shell" id="experience" aria-labelledby="experience-title">
        <div className="section-title">
          <h2 id="experience-title">Experience</h2>
        </div>

        <div className="experience-timeline">

          <article className="experience-entry">
            <span className="experience-dot" aria-hidden="true" />

            <div className="experience-header">
              <div>
                <h3>AI & Automation Engineer</h3>
                <p className="experience-company">Independent / Freelance</p>
              </div>
              <time>April 2026 – Present</time>
            </div>

            <ul>
              <li>Gathered, analyzed, and documented business and functional requirements through direct stakeholder discussions.</li>
              <li>Recommended process, automation, and software improvements to reduce manual effort, optimize costs, and improve operational efficiency.</li>
              <li>Managed solution development from initial business analysis and requirement definition through design and implementation.</li>
            </ul>
          </article>

          <article className="experience-entry">
            <span className="experience-dot" aria-hidden="true" />

            <div className="experience-header">
              <div>
                <h3>Artificial Intelligence Engineer <span>(Internship)</span></h3>
                <p className="experience-company">Deanship of Electronic Services, King Khalid University</p>
              </div>
              <time>Sep 2025 – Mar 2026</time>
            </div>

            <ul>
              <li>Built and deployed predictive models for solar power forecasting using real-world datasets.</li>
              <li>Designed data pipelines, web scraping systems, and Agentic AI workflows integrating LLMs.</li>
              <li>Delivered training programs on research & digital transformation.</li>
            </ul>
          </article>

        </div>
      </section>


      <section className="section skills-section shell" id="skills" aria-labelledby="skills-title">
        <div className="section-title"><h2 id="skills-title">Skills</h2></div>
        <div className="skills-panel">
          {technologyGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="tag-row">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </section>



      <section className="section achievements-section shell" id="achievements" aria-labelledby="achievements-title">
        <div className="section-title"><h2 id="achievements-title">Achievements</h2></div>
        <AchievementsGallery />
      </section>


      
      <section
          className="section projects-section shell"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="section-title">
            <h2 id="projects-title">Projects</h2>
          </div>

          <ProjectsFilter />
        </section>

      <footer><div className="shell simple-footer"><div><strong>{identity.name}</strong><div className="footer-links"><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${identity.email}`}>{identity.email}</a><a href={identity.github} target="_blank" rel="noreferrer">GitHub</a></div></div><p>AI engineering · business & data analysis · automation · AI research</p></div></footer>

      <FloatingChatWidget />
    </main>
  );
}
