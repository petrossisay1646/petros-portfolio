import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profileJpg = path.resolve(__dirname, '../public/profile.jpg');
const profileBase64 = fs.readFileSync(profileJpg).toString('base64');
const dataUri = `data:image/jpeg;base64,${profileBase64}`;

const cvHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Petros Sisay Gelan — CV & Resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: #e2e8f0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      padding: 2rem;
      color: #1e293b;
    }

    .cv-wrapper {
      display: flex;
      width: 794px;
      min-height: 1123px;
      background: #ffffff;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      position: relative;
    }

    /* ── LEFT SIDEBAR ── */
    .sidebar {
      width: 270px;
      min-height: 100%;
      background: #111827;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 1.5rem;
      flex-shrink: 0;
    }

    .photo-wrap {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 3.5px solid #3b82f6;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
      overflow: hidden;
      margin-bottom: 1.25rem;
      background: #1e293b;
    }

    .photo-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    .sidebar-name {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      text-align: center;
      margin-bottom: 0.25rem;
      letter-spacing: -0.02em;
    }

    .sidebar-title {
      font-size: 0.78rem;
      color: #60a5fa;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1.75rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .sidebar-section {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .sidebar-section-title {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #ffffff;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 0.35rem;
      margin-bottom: 0.85rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.76rem;
      color: #94a3b8;
      margin-bottom: 0.55rem;
      line-height: 1.4;
    }

    .contact-item .icon {
      font-size: 0.85rem;
      color: #3b82f6;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .contact-item a {
      color: #94a3b8;
      text-decoration: none;
      word-break: break-all;
    }

    .skill-item, .hobby-item {
      font-size: 0.78rem;
      color: #cbd5e1;
      margin-bottom: 0.4rem;
      padding-left: 1rem;
      position: relative;
    }

    .skill-item::before, .hobby-item::before {
      content: '○';
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
    }

    .lang-item {
      display: flex;
      justify-content: space-between;
      padding-left: 1rem;
      font-size: 0.78rem;
      color: #cbd5e1;
      margin-bottom: 0.4rem;
      position: relative;
    }

    .lang-item::before {
      content: '○';
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
    }

    .lang-item span {
      font-weight: 600;
      color: #60a5fa;
    }

    /* ── RIGHT MAIN CONTENT ── */
    .main-content {
      flex: 1;
      padding: 2.25rem 2.25rem;
      background: #ffffff;
    }

    .main-section {
      margin-bottom: 1.5rem;
    }

    .main-section-title {
      font-size: 0.95rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #0f172a;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 0.35rem;
      margin-bottom: 0.85rem;
    }

    .profile-text {
      font-size: 0.825rem;
      color: #334155;
      line-height: 1.65;
      text-align: justify;
    }

    .exp-item {
      margin-bottom: 1.1rem;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.1rem;
    }

    .exp-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: #0f172a;
    }

    .exp-date {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
      white-space: nowrap;
    }

    .exp-company {
      font-size: 0.78rem;
      color: #2563eb;
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    .exp-bullets {
      padding-left: 1.15rem;
    }

    .exp-bullets li {
      font-size: 0.78rem;
      color: #334155;
      margin-bottom: 0.25rem;
      line-height: 1.45;
    }

    .edu-item {
      margin-bottom: 0.85rem;
    }

    .edu-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.1rem;
    }

    .edu-date {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
      margin-bottom: 0.15rem;
    }

    .edu-institution {
      font-size: 0.78rem;
      color: #475569;
      font-style: italic;
    }

    .print-btn {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      background: #2563eb;
      color: #ffffff;
      border: none;
      padding: 0.7rem 1.4rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
      z-index: 100;
      font-family: 'Inter', sans-serif;
    }

    .print-btn:hover { background: #1d4ed8; }

    @media print {
      body { background: none; padding: 0; }
      .cv-wrapper { box-shadow: none; width: 100%; }
      .print-btn { display: none; }
    }
  </style>
</head>
<body>

<button class="print-btn" onclick="window.print()">⬇ Download / Print PDF</button>

<div class="cv-wrapper">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="photo-wrap">
      <img
        src="${dataUri}"
        alt="Petros Sisay Gelan"
      />
    </div>

    <h1 class="sidebar-name">Petros Sisay Gelan</h1>
    <p class="sidebar-title">Software Engineering Student</p>

    <!-- CONTACT -->
    <div class="sidebar-section">
      <h2 class="sidebar-section-title">Contact</h2>
      <div class="contact-item">
        <span class="icon">✉</span>
        <a href="mailto:petrossisay1646@gmail.com">petrossisay1646@gmail.com</a>
      </div>
      <div class="contact-item">
        <span class="icon">⌂</span>
        <span>Adama, Ethiopia</span>
      </div>
      <div class="contact-item">
        <span class="icon">⌘</span>
        <a href="https://github.com/petrossisay1646" target="_blank">github.com/petrossisay1646</a>
      </div>
      <div class="contact-item">
        <span class="icon">in</span>
        <a href="https://linkedin.com/in/petros-sisay-gelan" target="_blank">linkedin.com/in/petros-sisay-gelan</a>
      </div>
      <div class="contact-item">
        <span class="icon">✈</span>
        <span>@Petros_sisay (Telegram)</span>
      </div>
    </div>

    <!-- SKILLS -->
    <div class="sidebar-section">
      <h2 class="sidebar-section-title">Skills</h2>
      <div class="skill-item">HTML5 / CSS3 / Tailwind</div>
      <div class="skill-item">JavaScript (ES6+) / TypeScript</div>
      <div class="skill-item">React.js / Vite</div>
      <div class="skill-item">Node.js / Express.js</div>
      <div class="skill-item">MongoDB / Mongoose</div>
      <div class="skill-item">Java Core / OOP</div>
      <div class="skill-item">JDBC / Java Swing</div>
      <div class="skill-item">MySQL / SQL Relational DB</div>
      <div class="skill-item">REST API Engineering</div>
      <div class="skill-item">Git / GitHub Version Control</div>
      <div class="skill-item">Responsive Web Architecture</div>
    </div>

    <!-- LANGUAGES -->
    <div class="sidebar-section">
      <h2 class="sidebar-section-title">Languages</h2>
      <div class="lang-item">Amharic <span>Native</span></div>
      <div class="lang-item">English <span>Proficient</span></div>
      <div class="lang-item">Afaan Oromo <span>Proficient</span></div>
    </div>

    <!-- INTERESTS -->
    <div class="sidebar-section">
      <h2 class="sidebar-section-title">Interests</h2>
      <div class="hobby-item">Full-Stack System Design</div>
      <div class="hobby-item">Open Source Development</div>
      <div class="hobby-item">Software Engineering Best Practices</div>
      <div class="hobby-item">Problem Solving & Algorithms</div>
    </div>
  </aside>

  <!-- RIGHT MAIN CONTENT -->
  <main class="main-content">

    <!-- PROFILE -->
    <section class="main-section">
      <h2 class="main-section-title">Profile</h2>
      <p class="profile-text">
        I am a 3rd Year Software Engineering student at Adama Science and Technology University (ASTU), Ethiopia,
        focused on developing practical web applications, full-stack systems, and robust desktop software.
        Experienced across TypeScript, React, the MERN stack (MongoDB, Express, React, Node.js), Java, and MySQL.
        Disciplined in writing clean, structured code and actively seeking software engineering internships, junior developer roles,
        and freelance opportunities to contribute to high-impact products.
      </p>
    </section>

    <!-- EDUCATION -->
    <section class="main-section">
      <h2 class="main-section-title">Education</h2>

      <div class="edu-item">
        <div class="edu-title">B.Sc. in Software Engineering</div>
        <div class="edu-date">2023 – Present (Expected Graduation 2027)</div>
        <div class="edu-institution">Adama Science and Technology University (ASTU), Adama, Ethiopia</div>
      </div>

      <div class="edu-item">
        <div class="edu-title">Ethiopian University Entrance Certificate</div>
        <div class="edu-date">2022</div>
        <div class="edu-institution">Ethiopia</div>
      </div>
    </section>

    <!-- WORK & PROJECTS -->
    <section class="main-section">
      <h2 class="main-section-title">Engineering Projects & Experience</h2>

      <div class="exp-item">
        <div class="exp-header">
          <div class="exp-title">AdamaMaterials E-Commerce Platform</div>
          <div class="exp-date">2025</div>
        </div>
        <div class="exp-company">TypeScript · React · State Management · E-Commerce</div>
        <ul class="exp-bullets">
          <li>Engineered a full-featured construction materials marketplace with strict TypeScript type definitions</li>
          <li>Implemented real-time product search, multi-category filtering, and interactive cart drawer calculations</li>
        </ul>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <div class="exp-title">MERN Todo Pro — Productivity Suite</div>
          <div class="exp-date">2025</div>
        </div>
        <div class="exp-company">MongoDB · Express.js · React · Node.js · REST API</div>
        <ul class="exp-bullets">
          <li>Architected a full-stack sprint management system with RESTful Express API and MongoDB persistence</li>
          <li>Implemented CRUD operations, task priority tagging, sprint status columns, and reactive UI updates</li>
        </ul>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <div class="exp-title">ACE Meklit — Business Website</div>
          <div class="exp-date">2024</div>
        </div>
        <div class="exp-company">Freelance Client Project · HTML5, CSS3, JavaScript</div>
        <ul class="exp-bullets">
          <li>Designed and built a mobile-first responsive commercial site for ACE Meklit with smooth navigation</li>
          <li>Optimized performance and deployed to Netlify with fast cross-browser loading times</li>
        </ul>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <div class="exp-title">Java Multi-Client Group Chat Application</div>
          <div class="exp-date">2024</div>
        </div>
        <div class="exp-company">Academic & Personal Project · Java, TCP Sockets, Multithreading</div>
        <ul class="exp-bullets">
          <li>Built a real-time TCP socket server with dedicated thread handling for concurrent client communication</li>
          <li>Implemented message broadcasting, connection management, and Java Swing desktop interface</li>
        </ul>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <div class="exp-title">Student Registration System</div>
          <div class="exp-date">2024</div>
        </div>
        <div class="exp-company">Academic Project · Java, JDBC, MySQL Database</div>
        <ul class="exp-bullets">
          <li>Engineered a Java Swing desktop CRUD system connected to MySQL relational database schema via JDBC</li>
        </ul>
      </div>
    </section>

    <!-- TECHNICAL STACK SUMMARY -->
    <section class="main-section">
      <h2 class="main-section-title">Technical Proficiency Summary</h2>
      <p class="profile-text">
        <strong>Languages & Frameworks:</strong> TypeScript, JavaScript (ES6+), React, Node.js, Express.js, Java Core/OOP, HTML5, CSS3/Tailwind<br/>
        <strong>Databases & Storage:</strong> MongoDB, Mongoose, MySQL, SQL, JDBC, Relational Schema Architecture<br/>
        <strong>Tools & Ecosystem:</strong> Git, GitHub, Vite, REST APIs, VS Code, IntelliJ IDEA, Tomcat, Netlify, Vercel
      </p>
    </section>

  </main>
</div>

</body>
</html>
`;

fs.writeFileSync(path.resolve(__dirname, '../public/cv.html'), cvHtmlContent, 'utf-8');
console.log('✓ Updated public/cv.html with embedded profile picture and updated projects');

async function renderPdf() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(cvHtmlContent, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const pdfPath = path.resolve(__dirname, '../public/cv.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  console.log(`✓ Rendered high quality printable PDF: ${pdfPath}`);
  await browser.close();
}

renderPdf();
