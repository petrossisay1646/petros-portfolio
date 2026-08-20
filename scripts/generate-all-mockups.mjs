import { chromium } from 'playwright';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../public/projects');

async function generateAll() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  // 1. Adama Materials E-Commerce Mockup
  const pageMaterials = await context.newPage();
  await pageMaterials.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background: #090d16; color: #f8fafc; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .app-window { width: 1000px; height: 640px; background: #0f172a; border-radius: 12px; border: 1px solid #1e293b; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); overflow: hidden; display: flex; flex-direction: column; }
        .nav { height: 56px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
        .logo { font-size: 16px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
        .nav-links { display: flex; gap: 20px; font-size: 13px; color: #94a3b8; font-weight: 500; }
        .nav-links span.active { color: #38bdf8; font-weight: 600; }
        .nav-right { display: flex; align-items: center; gap: 14px; }
        .search-bar { background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 6px 12px; font-size: 12px; color: #fff; width: 220px; }
        .cart-btn { background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .hero-banner { background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 24px 30px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; }
        .banner-text h2 { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .banner-text p { font-size: 13px; color: #93c5fd; }
        .badge-ts { background: #3178c6; color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 4px; font-weight: 700; }
        .main-content { padding: 20px 30px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; flex: 1; overflow-y: auto; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
        .card-img { height: 100px; background: #334155; display: flex; align-items: center; justify-content: center; font-size: 28px; }
        .card-body { padding: 12px; display: flex; flex-direction: column; flex: 1; justify-content: space-between; }
        .card-title { font-size: 13px; font-weight: 700; color: #f8fafc; margin-bottom: 4px; }
        .card-cat { font-size: 11px; color: #64748b; margin-bottom: 8px; }
        .card-price-row { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
        .card-price { font-size: 14px; font-weight: 800; color: #38bdf8; }
        .btn-add { background: #0f172a; border: 1px solid #38bdf8; color: #38bdf8; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="app-window">
        <div class="nav">
          <div class="logo">🏗️ AdamaMaterials <span style="font-size:11px; color:#94a3b8; font-weight:normal;">| ASTU Region</span></div>
          <div class="nav-links">
            <span class="active">All Products</span>
            <span>Cement & Aggregates</span>
            <span>Steel & Rebar</span>
            <span>Finishing Tiles</span>
            <span>Electrical</span>
          </div>
          <div class="nav-right">
            <input class="search-bar" type="text" placeholder="Search materials (cement, rebar...)" />
            <button class="cart-btn">🛒 Cart (3)</button>
          </div>
        </div>

        <div class="hero-banner">
          <div class="banner-text">
            <h2>Adama Construction & Building Materials E-Commerce</h2>
            <p>Full-Stack TypeScript & React Marketplace for Quality Construction Supplies</p>
          </div>
          <span class="badge-ts">TypeScript 5.x</span>
        </div>

        <div class="main-content">
          <div class="card">
            <div class="card-img" style="background:#1e3a8a;">🧱</div>
            <div class="card-body">
              <div>
                <div class="card-title">Muger OPC Cement (50kg)</div>
                <div class="card-cat">Cement & Aggregates</div>
              </div>
              <div class="card-price-row">
                <div class="card-price">ETB 1,450</div>
                <button class="btn-add">+ Add</button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-img" style="background:#065f46;">🏗️</div>
            <div class="card-body">
              <div>
                <div class="card-title">Deformed Steel Rebar Ø16mm</div>
                <div class="card-cat">Structural Steel</div>
              </div>
              <div class="card-price-row">
                <div class="card-price">ETB 2,200</div>
                <button class="btn-add">+ Add</button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-img" style="background:#831843;">🏠</div>
            <div class="card-body">
              <div>
                <div class="card-title">Porcelain Floor Tiles 60x60</div>
                <div class="card-cat">Finishing Materials</div>
              </div>
              <div class="card-price-row">
                <div class="card-price">ETB 980 / m²</div>
                <button class="btn-add">+ Add</button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-img" style="background:#78350f;">⚡</div>
            <div class="card-body">
              <div>
                <div class="card-title">Copper Conduit Cable 2.5mm</div>
                <div class="card-cat">Electrical & Wiring</div>
              </div>
              <div class="card-price-row">
                <div class="card-price">ETB 4,100 / roll</div>
                <button class="btn-add">+ Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  const matPng = path.join(outDir, 'adama-materials.png');
  await pageMaterials.screenshot({ path: matPng });
  await pageMaterials.close();

  await sharp(matPng)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, 'adama-materials.webp'));
  console.log('✓ Generated adama-materials.webp');

  // 2. MERN Todo Pro Mockup
  const pageMern = await context.newPage();
  await pageMern.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family: 'Inter', system-ui, sans-serif; }
        body { background: #090d16; color: #f8fafc; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .app-window { width: 1000px; height: 640px; background: #0f172a; border-radius: 12px; border: 1px solid #1e293b; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); overflow: hidden; display: flex; flex-direction: column; }
        .nav { height: 56px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
        .logo { font-size: 16px; font-weight: 800; color: #10b981; display: flex; align-items: center; gap: 8px; }
        .nav-badges { display: flex; gap: 8px; }
        .badge-mern { font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 700; }
        .b-mongo { background: #00ed64; color: #001e2b; }
        .b-exp { background: #475569; color: #fff; }
        .b-react { background: #61dafb; color: #000; }
        .b-node { background: #68a063; color: #fff; }
        .board { display: grid; grid-template-columns: 240px 1fr; flex: 1; overflow: hidden; }
        .sidebar { background: #111827; border-right: 1px solid #334155; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .user-profile { display: flex; align-items: center; gap: 10px; padding-bottom: 14px; border-bottom: 1px solid #1f2937; }
        .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .user-info h4 { font-size: 13px; font-weight: 700; color: #fff; }
        .user-info p { font-size: 11px; color: #10b981; }
        .side-item { padding: 8px 12px; border-radius: 6px; font-size: 13px; color: #94a3b8; font-weight: 500; display: flex; justify-content: space-between; }
        .side-item.active { background: #1f2937; color: #38bdf8; font-weight: 600; }
        .main-board { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; background: #0b1120; }
        .board-header { display: flex; justify-content: space-between; align-items: center; }
        .board-title h3 { font-size: 18px; font-weight: 800; color: #fff; }
        .btn-new-task { background: #10b981; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; }
        .columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; flex: 1; }
        .col { background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
        .col-title { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: flex; justify-content: space-between; }
        .task-card { background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
        .task-card h5 { font-size: 13px; font-weight: 600; color: #f8fafc; }
        .task-card p { font-size: 11.5px; color: #94a3b8; line-height: 1.4; }
        .task-tag { font-size: 10px; padding: 2px 6px; border-radius: 3px; width: fit-content; font-weight: 600; }
        .tag-high { background: rgba(239, 68, 68, 0.2); color: #f87171; }
        .tag-med { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        .tag-done { background: rgba(16, 185, 129, 0.2); color: #34d399; }
      </style>
    </head>
    <body>
      <div class="app-window">
        <div class="nav">
          <div class="logo">⚡ MERN Todo Pro <span style="font-size:11px; color:#64748b; font-weight:normal;">| Full-Stack Productivity App</span></div>
          <div class="nav-badges">
            <span class="badge-mern b-mongo">MongoDB</span>
            <span class="badge-mern b-exp">Express</span>
            <span class="badge-mern b-react">React</span>
            <span class="badge-mern b-node">Node.js</span>
          </div>
        </div>

        <div class="board">
          <div class="sidebar">
            <div class="user-profile">
              <div class="user-avatar">PG</div>
              <div class="user-info">
                <h4>Petros Sisay</h4>
                <p>● Online</p>
              </div>
            </div>
            <div class="side-item active"><span>📋 Sprint Board</span> <span>8</span></div>
            <div class="side-item"><span>🚀 Software Dev</span> <span>4</span></div>
            <div class="side-item"><span>🎓 ASTU Projects</span> <span>3</span></div>
            <div class="side-item"><span>✅ Completed</span> <span>12</span></div>
          </div>

          <div class="main-board">
            <div class="board-header">
              <div class="board-title">
                <h3>Engineering Tasks & Milestones</h3>
              </div>
              <button class="btn-new-task">+ Add Task</button>
            </div>

            <div class="columns">
              <div class="col">
                <div class="col-title"><span>To Do</span> <span>3</span></div>
                <div class="task-card">
                  <span class="task-tag tag-high">Priority High</span>
                  <h5>Implement JWT Auth Flow</h5>
                  <p>Secure Express API endpoints with bearer token validation & bcrypt hashing.</p>
                </div>
                <div class="task-card">
                  <span class="task-tag tag-med">Database</span>
                  <h5>MongoDB Schema Indexing</h5>
                  <p>Optimize query execution for user task lookups by creating compound indexes.</p>
                </div>
              </div>

              <div class="col">
                <div class="col-title"><span>In Progress</span> <span>2</span></div>
                <div class="task-card">
                  <span class="task-tag tag-med">Frontend</span>
                  <h5>Drag & Drop Task Reorder</h5>
                  <p>Implement smooth React DnD state updates synced to MongoDB backend.</p>
                </div>
              </div>

              <div class="col">
                <div class="col-title"><span>Completed</span> <span>3</span></div>
                <div class="task-card">
                  <span class="task-tag tag-done">Done</span>
                  <h5>RESTful CRUD API Endpoints</h5>
                  <p>Tested GET, POST, PUT, DELETE routes with Postman and unit tests.</p>
                </div>
                <div class="task-card">
                  <span class="task-tag tag-done">Done</span>
                  <h5>Express CORS Middleware</h5>
                  <p>Configured whitelist headers for secure frontend-backend communication.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  const mernPng = path.join(outDir, 'mern-todo-pro.png');
  await pageMern.screenshot({ path: mernPng });
  await pageMern.close();

  await sharp(mernPng)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, 'mern-todo-pro.webp'));
  console.log('✓ Generated mern-todo-pro.webp');

  await browser.close();
}

generateAll();
