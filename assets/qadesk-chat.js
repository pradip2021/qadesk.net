/*
 * QAdesk Assistant — a self-contained, click-to-answer FAQ widget.
 * No dependencies, no network, nothing is sent anywhere. Answers are built in.
 * Injects its own styles + DOM; include once per page: <script src="assets/qadesk-chat.js" defer></script>
 */
(function () {
  'use strict';
  if (window.__qdChatLoaded) return;
  window.__qdChatLoaded = true;

  // --- Q&A content (kept in sync with qadesk.net copy) ----------------------
  var FAQ = [
    { q: 'What is QAdesk?',
      a: 'QAdesk is a private, offline Windows desktop app that runs 32 quality checks on your bilingual translation files, scores them against LQA profiles, and helps you fix errors fast — no account, no cloud, no telemetry.' },
    { q: 'Is QAdesk free?',
      a: "Yes — it's <strong>free during Early Access</strong>, with no account and no subscription. Future versions will require a paid license, and Early Access users get advance notice before any commercial release." },
    { q: 'Which systems does it run on?',
      a: 'Windows 10 or 11, 64-bit. About 4&nbsp;GB RAM. No GPU required.' },
    { q: 'Do I need an account or internet?',
      a: 'No account, ever. QAdesk is offline-first — no cloud and no telemetry. The only optional network call is a quick version check that reads just the latest version number (and can be turned off in Settings).' },
    { q: 'How do I install it?',
      a: 'Download the installer from the <a href="download.html">Download</a> page and run it. It’s a standard Windows installer that installs per-user — no admin rights needed.' },
    { q: 'How do I get updates?',
      a: 'QAdesk checks for a newer version on startup (optional, off-switch in Settings) and offers a one-click download. You can also re-download anytime from the <a href="download.html">Download</a> page.' },
    { q: 'Where is my data stored?',
      a: 'Only on your computer, under <code>%APPDATA%\\qadesk</code> — projects, glossaries, memories and settings. Nothing leaves your machine.' },
    { q: 'What file formats does it support?',
      a: 'SDLXLIFF (Trados), memoQ (MQXLIFF), Phrase/Memsource, Wordfast, TMX, TBX, SDLTB, SDLTM, Excel (XLSX), CSV, PO, JSON, SRT and Trados RTF.' },
    { q: 'What QA checks does it run?',
      a: '32 language-neutral checks: numbers, inline tags &amp; placeholders, punctuation, URLs, consistency, terminology, length, whitespace, Unicode — plus Hunspell spell-checking. Critical issues surface first.' },
    { q: 'What are the Agents and auto-fix?',
      a: 'Six offline QA agents propose fixes, show their confidence, and — with your permission — apply the safe ones and verify their own work. Deterministic fixes (double spaces, doubled punctuation) can be applied in one click. Nothing changes without you.' },
    { q: 'What is LQA?',
      a: 'Localization Quality Assessment: grade a file against a quality profile and get a straight PASS/FAIL verdict with a category breakdown — a report you can hand a client.' },
    { q: 'Which languages does it support?',
      a: 'Any language pair — the checks are language-neutral. Spell-checking works for any language you load a Hunspell dictionary for.' },
    { q: 'Is there AI? Is it private?',
      a: 'Core QA is fully deterministic and offline. There’s an optional local AI assist via Ollama for tricky judgments — it only advises, never changes files on its own, and runs entirely on your machine.' },
    { q: 'How do I report a bug or suggest a feature?',
      a: 'Inside the app there’s a <strong>“Have an idea?”</strong> note (in the startup tips) that lets you copy your feedback to share. Every message shapes future releases.' }
  ];

  var MARK = '<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true"><defs><linearGradient id="qdcg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a9bff"/><stop offset="1" stop-color="#1f6fe5"/></linearGradient></defs><circle cx="27" cy="27" r="17.5" fill="none" stroke="url(#qdcg)" stroke-width="8.5"/><rect x="34" y="26" width="9.5" height="30" rx="4.75" fill="url(#qdcg)" transform="rotate(45 38.75 41)"/></svg>';
  var MARK_WHITE = '<svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true"><circle cx="27" cy="27" r="17.5" fill="none" stroke="#fff" stroke-width="8.5"/><rect x="34" y="26" width="9.5" height="30" rx="4.75" fill="#fff" transform="rotate(45 38.75 41)"/></svg>';

  var CSS = [
    '.qd-launch{position:fixed;right:20px;bottom:20px;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;z-index:2147483000;',
    'background:linear-gradient(135deg,#2f8bff,#1257c9);box-shadow:0 8px 24px rgba(18,87,201,.42);display:flex;align-items:center;justify-content:center;transition:transform .18s ease, box-shadow .18s ease;padding:0}',
    '.qd-launch:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 12px 30px rgba(18,87,201,.5)}',
    '.qd-launch svg{width:30px;height:30px}',
    '.qd-launch .qd-x{display:none;color:#fff;font-size:26px;line-height:1;font-family:system-ui,sans-serif}',
    '.qd-open .qd-launch .qd-ic{display:none}.qd-open .qd-launch .qd-x{display:block}',
    '.qd-panel{position:fixed;right:20px;bottom:92px;width:360px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);',
    'background:#101019;border:1px solid #23233a;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);z-index:2147483000;',
    'display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .2s ease, transform .2s ease;',
    'font-family:-apple-system,"Segoe UI",system-ui,Roboto,sans-serif}',
    '.qd-open .qd-panel{opacity:1;transform:none;pointer-events:auto}',
    '.qd-hd{display:flex;align-items:center;gap:11px;padding:14px 14px;background:#151521;border-bottom:1px solid #23233a}',
    '.qd-hd .qd-badge{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#2f8bff,#1257c9);display:flex;align-items:center;justify-content:center;flex:none}',
    '.qd-hd h3{margin:0;font-size:14px;font-weight:700;color:#e9e9f1;letter-spacing:.01em}',
    '.qd-hd p{margin:1px 0 0;font-size:11.5px;color:#8a8a9c}',
    '.qd-hd .qd-close{margin-left:auto;background:none;border:none;color:#8a8a9c;font-size:22px;cursor:pointer;line-height:1;padding:4px 8px;border-radius:6px}',
    '.qd-hd .qd-close:hover{background:#23233a;color:#e9e9f1}',
    '.qd-body{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;background:#0e0e14}',
    '.qd-msg{max-width:85%;padding:10px 13px;border-radius:14px;font-size:13px;line-height:1.55;word-wrap:break-word}',
    '.qd-bot{align-self:flex-start;background:#1b1b28;color:#e2e2ee;border-bottom-left-radius:5px}',
    '.qd-user{align-self:flex-end;background:linear-gradient(135deg,#2f8bff,#1f6fe5);color:#fff;border-bottom-right-radius:5px}',
    '.qd-msg a{color:#7fb2ff;font-weight:600}.qd-msg code{background:#2a2a3c;padding:1px 5px;border-radius:4px;font-size:12px}',
    '.qd-qwrap{border-top:1px solid #23233a;background:#101019;padding:10px 12px;max-height:200px;overflow-y:auto}',
    '.qd-qlabel{font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:#6c6c7e;margin:0 0 8px;font-weight:700}',
    '.qd-chip{display:block;width:100%;text-align:left;background:#181826;border:1px solid #26263a;color:#d7d7e6;font-size:12.5px;',
    'padding:9px 12px;border-radius:9px;margin-bottom:6px;cursor:pointer;transition:background .14s, border-color .14s;font-family:inherit}',
    '.qd-chip:hover{background:#20203180;border-color:#4a9bff;color:#fff}',
    '.qd-foot{padding:7px 12px;font-size:10px;color:#5c5c6e;text-align:center;background:#101019;border-top:1px solid #1c1c2a}',
    '@media (max-width:480px){.qd-panel{right:12px;left:12px;width:auto;bottom:84px}.qd-launch{right:14px;bottom:14px}}'
  ].join('');

  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function build() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var root = document.createElement('div');
    root.className = 'qd-root';

    var launch = document.createElement('button');
    launch.className = 'qd-launch';
    launch.setAttribute('aria-label', 'Open QAdesk help');
    launch.setAttribute('aria-expanded', 'false');
    launch.innerHTML = '<span class="qd-ic">' + MARK_WHITE + '</span><span class="qd-x">×</span>';

    var panel = document.createElement('div');
    panel.className = 'qd-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'QAdesk Assistant');
    panel.innerHTML =
      '<div class="qd-hd"><span class="qd-badge">' + MARK_WHITE + '</span>' +
      '<div><h3>QAdesk Assistant</h3><p>Tap a question for an instant answer</p></div>' +
      '<button class="qd-close" aria-label="Close">×</button></div>' +
      '<div class="qd-body" id="qd-body"></div>' +
      '<div class="qd-qwrap"><p class="qd-qlabel">Questions</p><div id="qd-chips"></div></div>' +
      '<div class="qd-foot">Instant answers, built in — nothing you tap is sent anywhere.</div>';

    root.appendChild(panel);
    root.appendChild(launch);
    document.body.appendChild(root);

    var body = panel.querySelector('#qd-body');
    var chips = panel.querySelector('#qd-chips');
    var greeted = false;

    function addMsg(html, who) {
      var m = document.createElement('div');
      m.className = 'qd-msg ' + (who === 'user' ? 'qd-user' : 'qd-bot');
      m.innerHTML = html;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
      return m;
    }

    FAQ.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'qd-chip';
      b.type = 'button';
      b.textContent = item.q;
      b.addEventListener('click', function () {
        addMsg(esc(item.q), 'user');
        setTimeout(function () { addMsg(item.a, 'bot'); }, 180);
      });
      chips.appendChild(b);
    });

    function open() {
      if (!greeted) {
        addMsg('Hi! I’m the QAdesk assistant. Pick a question below and I’ll answer right away.', 'bot');
        greeted = true;
      }
      document.body.classList.add('qd-open');
      launch.setAttribute('aria-expanded', 'true');
    }
    function close() {
      document.body.classList.remove('qd-open');
      launch.setAttribute('aria-expanded', 'false');
    }
    function toggle() { document.body.classList.contains('qd-open') ? close() : open(); }

    launch.addEventListener('click', toggle);
    panel.querySelector('.qd-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('qd-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
