import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateJavaMockups() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  // 1. Group Chat App Mockup
  const pageChat = await context.newPage();
  await pageChat.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; width: 100vw; padding: 40px; }
        .window { width: 900px; height: 580px; background: #1e293b; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; display: flex; flex-direction: column; }
        .titlebar { background: #0f172a; height: 40px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid #334155; }
        .title-left { display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 13px; font-weight: 600; }
        .window-dots { display: flex; gap: 6px; }
        .dot { width: 11px; height: 11px; border-radius: 50%; }
        .dot-r { background: #ef4444; } .dot-y { background: #f59e0b; } .dot-g { background: #10b981; }
        .main { display: flex; flex: 1; overflow: hidden; }
        .sidebar { width: 240px; background: #111827; border-right: 1px solid #334155; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .sidebar h4 { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .user-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; background: #1e293b; color: #e2e8f0; font-size: 13px; font-weight: 500; }
        .user-item.active { background: #2563eb; color: #fff; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
        .chat-area { flex: 1; display: flex; flex-direction: column; background: #0b1120; }
        .messages { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }
        .msg { display: flex; flex-direction: column; max-width: 70%; }
        .msg.received { align-self: flex-start; }
        .msg.sent { align-self: flex-end; align-items: flex-end; }
        .sender { font-size: 11px; color: #94a3b8; margin-bottom: 4px; }
        .bubble { padding: 10px 16px; border-radius: 12px; font-size: 13.5px; line-height: 1.4; }
        .msg.received .bubble { background: #1e293b; color: #f8fafc; border-bottom-left-radius: 2px; }
        .msg.sent .bubble { background: #3b82f6; color: #fff; border-bottom-right-radius: 2px; }
        .input-bar { padding: 14px 20px; background: #0f172a; border-top: 1px solid #334155; display: flex; gap: 12px; }
        .input-bar input { flex: 1; background: #1e293b; border: 1px solid #475569; border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 13.5px; outline: none; }
        .input-bar button { background: #3b82f6; color: #fff; border: none; border-radius: 8px; padding: 0 20px; font-weight: 600; font-size: 13px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="window">
        <div class="titlebar">
          <div class="title-left">
            <span style="color:#60a5fa; font-weight:bold;">☕ Java Swing</span>
            <span>— Group Chat Application (TCP Sockets)</span>
          </div>
          <div class="window-dots">
            <span class="dot dot-r"></span>
            <span class="dot dot-y"></span>
            <span class="dot dot-g"></span>
          </div>
        </div>
        <div class="main">
          <div class="sidebar">
            <h4>Online Users (4)</h4>
            <div class="user-item active"><span class="status-dot"></span> Petros (You)</div>
            <div class="user-item"><span class="status-dot"></span> Abebe K.</div>
            <div class="user-item"><span class="status-dot"></span> Sara T.</div>
            <div class="user-item"><span class="status-dot"></span> Server Bot</div>
          </div>
          <div class="chat-area">
            <div class="messages">
              <div class="msg received">
                <span class="sender">Server [10:42 AM]</span>
                <div class="bubble">Connected to TCP Socket Server at 127.0.0.1:8080</div>
              </div>
              <div class="msg received">
                <span class="sender">Abebe K. [10:43 AM]</span>
                <div class="bubble">Hey Petros! Did you test the multithreaded socket server?</div>
              </div>
              <div class="msg sent">
                <span class="sender">Petros (You) [10:44 AM]</span>
                <div class="bubble">Yes! Broadcasting works seamlessly with concurrent client threads.</div>
              </div>
              <div class="msg received">
                <span class="sender">Sara T. [10:45 AM]</span>
                <div class="bubble">Awesome! The message handling and UI look super fast. 🚀</div>
              </div>
            </div>
            <div class="input-bar">
              <input type="text" value="Testing realtime message broadcast..." readonly />
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await pageChat.screenshot({ path: path.resolve(__dirname, '../public/projects/group-chat-app.png') });
  console.log('Saved group-chat-app.png');
  await pageChat.close();

  // 2. Student Registration System Mockup
  const pageStudent = await context.newPage();
  await pageStudent.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; width: 100vw; padding: 40px; }
        .window { width: 960px; height: 600px; background: #1e293b; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; display: flex; flex-direction: column; }
        .titlebar { background: #0f172a; height: 40px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid #334155; }
        .title-left { display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 13px; font-weight: 600; }
        .window-dots { display: flex; gap: 6px; }
        .dot { width: 11px; height: 11px; border-radius: 50%; }
        .dot-r { background: #ef4444; } .dot-y { background: #f59e0b; } .dot-g { background: #10b981; }
        .content { display: flex; flex: 1; overflow: hidden; }
        .form-panel { width: 320px; background: #111827; border-right: 1px solid #334155; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .form-panel h3 { color: #38bdf8; font-size: 15px; font-weight: 700; margin-bottom: 8px; }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-group label { color: #94a3b8; font-size: 11.5px; font-weight: 600; text-transform: uppercase; }
        .form-group input, .form-group select { background: #1e293b; border: 1px solid #475569; border-radius: 6px; padding: 7px 10px; color: #f8fafc; font-size: 12.5px; outline: none; }
        .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
        .btn { padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 12px; border: none; cursor: pointer; text-align: center; }
        .btn-add { background: #22c55e; color: #fff; }
        .btn-update { background: #3b82f6; color: #fff; }
        .btn-delete { background: #ef4444; color: #fff; }
        .btn-clear { background: #475569; color: #fff; }
        .table-panel { flex: 1; background: #0b1120; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .table-header { display: flex; justify-content: space-between; align-items: center; }
        .search-box { display: flex; gap: 8px; }
        .search-box input { background: #1e293b; border: 1px solid #475569; border-radius: 6px; padding: 6px 12px; color: #fff; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th { background: #1e293b; color: #94a3b8; font-weight: 600; text-align: left; padding: 10px 12px; border-bottom: 1px solid #334155; }
        td { padding: 10px 12px; border-bottom: 1px solid #1e293b; color: #e2e8f0; }
        tr:hover { background: #1e293b; }
        .badge-status { padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; }
      </style>
    </head>
    <body>
      <div class="window">
        <div class="titlebar">
          <div class="title-left">
            <span style="color:#22c55e; font-weight:bold;">☕ Java + JDBC + MySQL</span>
            <span>— ASTU Student Registration & Record System</span>
          </div>
          <div class="window-dots">
            <span class="dot dot-r"></span>
            <span class="dot dot-y"></span>
            <span class="dot dot-g"></span>
          </div>
        </div>
        <div class="content">
          <div class="form-panel">
            <h3>Student Data Entry</h3>
            <div class="form-group">
              <label>Student ID</label>
              <input type="text" value="UGR/24581/15" readonly />
            </div>
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" value="Petros Sisay Gelan" readonly />
            </div>
            <div class="form-group">
              <label>Department</label>
              <input type="text" value="Software Engineering" readonly />
            </div>
            <div class="form-group">
              <label>Academic Year</label>
              <input type="text" value="3rd Year" readonly />
            </div>
            <div class="btn-row">
              <button class="btn btn-add">➕ Insert</button>
              <button class="btn btn-update">✏️ Update</button>
              <button class="btn btn-delete">🗑️ Delete</button>
              <button class="btn btn-clear">🧹 Reset</button>
            </div>
          </div>
          <div class="table-panel">
            <div class="table-header">
              <h4 style="color:#e2e8f0; font-size:14px;">Database Records (MySQL Connected via JDBC)</h4>
              <div class="search-box">
                <input type="text" placeholder="Search by ID or Name..." />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UGR/24581/15</td>
                  <td>Petros Sisay</td>
                  <td>Software Engineering</td>
                  <td>3rd Year</td>
                  <td><span class="badge-status">Enrolled</span></td>
                </tr>
                <tr>
                  <td>UGR/24582/15</td>
                  <td>Abebe Kebede</td>
                  <td>Computer Science</td>
                  <td>3rd Year</td>
                  <td><span class="badge-status">Enrolled</span></td>
                </tr>
                <tr>
                  <td>UGR/24583/15</td>
                  <td>Sara Tadesse</td>
                  <td>Software Engineering</td>
                  <td>3rd Year</td>
                  <td><span class="badge-status">Enrolled</span></td>
                </tr>
                <tr>
                  <td>UGR/24584/15</td>
                  <td>Dawit Haile</td>
                  <td>Information Systems</td>
                  <td>2nd Year</td>
                  <td><span class="badge-status">Enrolled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  await pageStudent.screenshot({ path: path.resolve(__dirname, '../public/projects/student-registration.png') });
  console.log('Saved student-registration.png');
  await pageStudent.close();

  await browser.close();
}

generateJavaMockups();
