"use client";

import Image from "next/image";
import { ArrowUpRight, Github, Globe2, Linkedin, MapPin } from "lucide-react";
import { AchievementsGallery } from "@/components/achievements-gallery";
import { FloatingChatWidget } from "@/components/floating-chat-widget";
import { ProjectsFilter } from "@/components/projects-filter";
import { useLanguage } from "@/components/language-provider";
import { arabicSkillCategories, homeCopy } from "@/data/i18n";
import { identity, technologyGroups } from "@/data/portfolio";


export default function Home() {
  const { language, isArabic, toggleLanguage } = useLanguage();
  const copy = homeCopy[language];
  const skillGroups = technologyGroups.map((group, index) => ({
    ...group,
    label: isArabic ? arabicSkillCategories[index] : group.label,
  }));

  return (
    <main>
      <nav className="section-nav shell" aria-label="Portfolio sections">
        <a href="#qualifications">{copy.sections[0]}</a>
        <a href="#experience">{copy.sections[1]}</a>
        <a href="#skills">{copy.sections[2]}</a>
        <a href="#achievements">{copy.sections[3]}</a>
        <a href="#projects">{copy.sections[4]}</a>
        <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={copy.switchLanguage} title={copy.switchLanguage}>
          <Globe2 aria-hidden="true" /> <span>{copy.languageButton}</span>
        </button>
      </nav>

      <section className="profile shell" aria-labelledby="profile-title">
        <div className="profile-logo">
          <Image src="/n-monogram.png" alt="Nejood monogram" width={500} height={500} priority />
        </div>
        <div className="profile-copy">
          <p className="profile-name">{copy.profileName}</p>
          <h1 id="profile-title"><strong>{copy.headline[0]}</strong> · <strong>{copy.headline[1]}</strong><br /><strong>{copy.headline[2]}</strong> · <strong>{copy.headline[3]}</strong></h1>
          <p>{copy.summary}</p>
          <div className="availability"><span aria-hidden="true" /> {copy.available} <small><MapPin size={14} /> {copy.location}</small></div>
          <div className="profile-actions">
            <a className="contact-link" href={`mailto:${identity.email}`}>{copy.contact}</a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={identity.github} target="_blank" rel="noreferrer" aria-label="GitHub: njoudae" title="GitHub: njoudae"><Github /></a>
            <a className="cv-link" href="https://drive.google.com/file/d/139YHYtsb523d_vm5AELJFg4htKAaFF-b/view?usp=drive_link" target="_blank" rel="noreferrer">CV <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section qualification-section shell" id="qualifications" aria-labelledby="qualification-title">
        <div className="section-title"><h2 id="qualification-title">{copy.qualification.title}</h2></div>
        <div className="qualification-panel">
          <section className="qualification-block academic-block" aria-labelledby="academic-title">
            <div className="qualification-block-title"><span>01</span><h3 id="academic-title">{copy.qualification.academic}</h3></div>
            <div className="degree-list">
              <article className="degree-row"><div className="degree-logo"><Image src="/kku.png" alt="King Khalid University" width={503} height={397} /></div><div><strong>{copy.qualification.degree}</strong><p>{copy.qualification.degreeDetail}</p></div></article>
            </div>
          </section>

          <section className="qualification-block scores-block" aria-labelledby="scores-title">
            <div className="qualification-block-title"><span>02</span><h3 id="scores-title">{copy.qualification.scores}</h3></div>
            <div className="score-grid">
              <article className="score-card"><div className="score-logo ielts"><Image src="/ielts.png" alt="IELTS" width={713} height={429} /></div><strong>IELTS</strong><span>6.0</span></article>
              <article className="score-card"><div className="score-logo qias"><Image src="/qias.png" alt="Qiyas" width={250} height={202} /></div><strong>STEP</strong><span>84</span></article>
              <article className="score-card"><div className="score-logo qias"><Image src="/qias.png" alt="Qiyas" width={250} height={202} /></div><strong>{copy.qualification.graduateTest}</strong><span>92%</span></article>
            </div>
          </section>

          <section className="qualification-block certifications-block" aria-labelledby="certifications-title">
            <div className="qualification-block-title"><span>03</span><h3 id="certifications-title">{copy.qualification.certifications}</h3></div>
            <div className="certificate-grid">
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-oracle.png" alt="Oracle Certified Professional badge" width={152} height={174} /></div><strong>Oracle Certified Professional</strong></article>
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-oracle-ai.png" alt="Oracle AI Foundations Associate badge" width={155} height={192} /></div><strong>Oracle AI Foundations Associate</strong></article>
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-pcep.png" alt="PCEP certification badge" width={157} height={165} /></div><strong>PCEP - Certified Entry-Level Python Programmer</strong></article>
              <article className="certificate-item"><div className="certificate-badge"><Image src="/cert-badges/professional-ecba.jpg" alt="ECBA certification badge" width={157} height={165} /></div><strong>ECBA - Entry Certified Business Analyst</strong></article>
            </div>
          </section>

          <section className="qualification-block courses-block" aria-labelledby="courses-title">
            <div className="qualification-block-title"><span>04</span><h3 id="courses-title">{copy.qualification.courses}</h3></div>
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
          <h2 id="experience-title">{copy.experience.title}</h2>
        </div>

        <div className="experience-timeline">

          <article className="experience-entry">
            <span className="experience-dot" aria-hidden="true" />

            <div className="experience-header">
              <div>
                <h3>{copy.experience.freelanceRole}</h3>
                <p className="experience-company">{copy.experience.freelanceCompany}</p>
              </div>
              <time>{copy.experience.freelanceDate}</time>
            </div>

            <ul>
              {copy.experience.freelanceDuties.map((duty) => <li key={duty}>{duty}</li>)}
            </ul>
          </article>

          <article className="experience-entry">
            <span className="experience-dot" aria-hidden="true" />

            <div className="experience-header">
              <div>
                <h3>{copy.experience.internshipRole} <span>({copy.experience.internshipLabel})</span></h3>
                <p className="experience-company">{copy.experience.internshipCompany}</p>
              </div>
              <time>{copy.experience.internshipDate}</time>
            </div>

            <ul>
              {copy.experience.internshipDuties.map((duty) => <li key={duty}>{duty}</li>)}
            </ul>
          </article>

        </div>
      </section>


      <section className="section skills-section shell" id="skills" aria-labelledby="skills-title">
        <div className="section-title"><h2 id="skills-title">{copy.skills}</h2></div>
        <div className="skills-panel">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="tag-row">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </section>



      <section className="section achievements-section shell" id="achievements" aria-labelledby="achievements-title">
        <div className="section-title"><h2 id="achievements-title">{copy.achievements}</h2></div>
        <AchievementsGallery />
      </section>


      
      <section
          className="section projects-section shell"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="section-title">
            <h2 id="projects-title">{copy.projects}</h2>
          </div>

          <ProjectsFilter />
        </section>

      <footer><div className="shell simple-footer"><div><strong>{identity.name}</strong><div className="footer-links"><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${identity.email}`}>{identity.email}</a><a href={identity.github} target="_blank" rel="noreferrer">GitHub</a></div></div><p>{copy.footer}</p></div></footer>

      <FloatingChatWidget />
    </main>
  );
}
