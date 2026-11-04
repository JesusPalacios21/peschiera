(function () {
  var CFG = {
    wa: "51977964460",
    hero: "img/xdddddddddddd.jpg",
    photos: [
      { p: "img/parque3.jpeg", t: "Nuestra promoción", d: "Inicial 5 años · I.E.I. N° 243 Esperanza Carrillo de Peschiera" },
      { p: "img/parque1.jpeg", t: "Pequeños gigantes", d: "Amigos para siempre" },
      { p: "img/parque2.jpeg", t: "Mentes brillantes", d: "Pequeños Gigantes con Mentes Brillantes 2026" },
    ],
  };

  var MUSIC_SRC = "music/Ed Sheeran - Photograph (Official Lyric Video).mp3";
  var MUSIC_VOL = 0.8; 

  var T = new Date("2026-12-20T20:00:00-05:00").getTime(),
    $ = function (i) {
      return document.getElementById(i);
    },
    MS = 5000;

  if (CFG.hero) {
    $("hbg").style.backgroundImage = "url('" + CFG.hero + "')";
  } else {
    var g = "",
      r,
      k,
      x,
      y,
      hh = document.querySelector(".ph");
    for (r = 0; r < 3; r++)
      for (k = 0; k < 11; k++) {
        x = k * 58 + (r % 2) * 29 + 10;
        y = 240 + r * 72;
        g +=
          '<g fill="#0c4a85" opacity="' +
          (0.3 + r * 0.22) +
          '"><circle cx="' +
          x +
          '" cy="' +
          (y - 12) +
          '" r="' +
          (12 + r * 2) +
          '"/><path d="M' +
          (x - 24) +
          " " +
          (y + 80) +
          'v-46q0-20 24-20t24 20v46z"/></g>';
      }
    hh.insertAdjacentHTML(
      "afterbegin",
      '<svg class="grp" viewBox="0 0 640 460" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
        g +
        '</svg><span class="tag">📷 AQUÍ IRÁ LA FOTO GRUPAL</span>',
    );
  }

  /* reveal */
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".rv").forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 100 + "ms";
    io.observe(el);
  });

  /* cuenta regresiva */
  var last = {};
  function tick() {
    var x = Math.max(0, T - Date.now()),
      v = {
        d: Math.floor(x / 864e5),
        h: Math.floor((x % 864e5) / 36e5),
        m: Math.floor((x % 36e5) / 6e4),
        s: Math.floor((x % 6e4) / 1e3),
      };
    for (var k in v) {
      var el = $(k),
        s = String(v[k]);
      if (last[k] !== s) {
        el.textContent = s;
        el.classList.remove("pop");
        void el.offsetWidth;
        el.classList.add("pop");
        last[k] = s;
      }
    }
  }
  tick();
  setInterval(tick, 1000);

  /* galería de fotos grupales */
  var P = CFG.photos,
    gs = $("gstage"),
    th = $("thumbs"),
    lb = $("lb"),
    i = 0,
    tm,
    sx = null,
    lastSw = 0,
    E = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    };
  P.forEach(function (s, k) {
    var d = document.createElement("div");
    d.className = "gs";
    d.innerHTML =
      (s.p
        ? '<div class="bgb" style="background-image:url(\'' + s.p + '\')"></div><img alt="' + E(s.t) + '" src="' + s.p + '" onerror="this.remove()">'
        : '<div class="ph2">📷</div>') +
      '<div class="gc"><p class="scr">' + E(s.t) + '</p><p class="cap">' + E(s.d || "Pequeños Gigantes con Mentes Brillantes") + "</p></div>";
    gs.appendChild(d);
    var b = document.createElement("button");
    b.className = "th";
    b.setAttribute("aria-label", "Ver foto " + (k + 1));
    b.innerHTML = s.p ? '<img alt="" src="' + s.p + '" onerror="this.remove()">' : "";
    b.onclick = function () {
      go(k);
      auto();
    };
    th.appendChild(b);
  });
  var sl = gs.querySelectorAll(".gs"),
    tb = th.children;
  function go(j, first) {
    var o = sl[i];
    i = (j + sl.length) % sl.length;
    if (!first && o !== sl[i]) {
      o.classList.remove("on");
      o.classList.add("out");
      setTimeout(function () {
        o.classList.remove("out");
      }, 1600);
    }
    sl[i].classList.add("on");
    [].forEach.call(tb, function (t, n) {
      t.classList.toggle("on", n === i);
    });
    $("cnt").textContent = i + 1 + " / " + sl.length;
    var p = $("pbi");
    p.classList.remove("run");
    void p.offsetWidth;
    p.style.setProperty("--ms", MS + "ms");
    p.classList.add("run");
  }
  function auto() {
    clearInterval(tm);
    tm = setInterval(function () {
      go(i + 1);
    }, MS);
  }
  $("pv").onclick = function () {
    go(i - 1);
    auto();
  };
  $("nx").onclick = function () {
    go(i + 1);
    auto();
  };
  gs.addEventListener(
    "touchstart",
    function (e) {
      sx = e.touches[0].clientX;
    },
    { passive: true },
  );
  gs.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) {
      lastSw = Date.now();
      go(i + (dx < 0 ? 1 : -1));
      auto();
    }
    sx = null;
  });
  gs.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { go(i + 1); auto(); }
    if (e.key === "ArrowLeft") { go(i - 1); auto(); }
  });
  /* ampliar foto */
  gs.addEventListener("click", function () {
    if (Date.now() - lastSw < 400 || !P[i].p) return;
    $("lbi").src = P[i].p;
    lb.classList.add("on");
    clearInterval(tm);
  });
  function closeLb() {
    lb.classList.remove("on");
    auto();
  }
  lb.onclick = closeLb;
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lb.classList.contains("on")) closeLb();
  });
  if (sl.length) {
    go(0, true);
    auto();
  }

  /* ====== MENTES BRILLANTES (interactivo) ====== */
  var BL = [
    { t: "Curiosidad", m: "Preguntar “¿por qué?” fue nuestro primer superpoder." },
    { t: "Creatividad", m: "Con colores, manos y risas inventamos mundos enteros." },
    { t: "Valentía", m: "Cada día dimos un paso grande, aunque fuéramos pequeños." },
    { t: "Amistad", m: "Aprendimos que juntos todo es más fácil y más divertido." },
    { t: "Gratitud", m: "Gracias a nuestras familias y maestras por creer en nosotros." },
  ];
  var bw = $("bulbs"),
    bm = $("bmsg"),
    bc = $("bcnt"),
    lit = 0;
  BL.forEach(function (it) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bulb";
    b.setAttribute("aria-label", "Encender idea: " + it.t);
    b.innerHTML = '<span class="em">💡</span><small>' + E(it.t) + "</small>";
    b.onclick = function () {
      if (!b.classList.contains("lit")) {
        b.classList.add("lit");
        lit++;
        bc.textContent = lit + " / " + BL.length + " ideas encendidas";
      }
      bm.classList.remove("done");
      bm.textContent = it.m;
      if (lit === BL.length) {
        setTimeout(function () {
          bm.classList.add("done");
          bm.textContent =
            "¡Mente brillante! Te esperamos el 20 de diciembre para celebrar a nuestros pequeños gigantes. 🌟";
          burst();
        }, 1800);
      }
    };
    bw.appendChild(b);
  });

  /* WhatsApp */
  function wa(ok) {
    var nm = $("nm").value.trim();
    if (!nm) {
      $("nm").focus();
      $("nm").placeholder = "Escribe tu nombre primero";
      return;
    }
    var m = ok
      ? "¡Hola! Soy " +
        nm +
        " y confirmo mi asistencia a la promoción Pequeños Gigantes con Mentes Brillantes (20 de diciembre). Asistiremos " +
        $("ng").value +
        " persona(s). 🎓"
      : "Hola, soy " +
        nm +
        ". Lamentablemente no podré asistir a la promoción Pequeños Gigantes con Mentes Brillantes. ¡Les deseo lo mejor! 💙";
    window.open(
      "https://wa.me/" + CFG.wa + "?text=" + encodeURIComponent(m),
      "_blank",
    );
  }
  $("yes").onclick = function () {
    wa(true);
  };
  $("no").onclick = function () {
    wa(false);
  };
  $("sh").onclick = function () {
    var d = {
      title: "Pequeños Gigantes con Mentes Brillantes",
      text: "Estás invitado a la promoción Pequeños Gigantes con Mentes Brillantes 🎓",
      url: location.href,
    };
    if (navigator.share) {
      navigator.share(d).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href).then(function () {
        $("sh").textContent = "¡Enlace copiado!";
      });
    }
  };

  /* ====== MÚSICA PROPIA (archivo mp3) ====== */
  var audio = new Audio(MUSIC_SRC),
    on = false;
  audio.loop = true; // se repite sola
  audio.volume = MUSIC_VOL;
  audio.preload = "auto";

  function setM(v) {
    on = v;
    $("mus").textContent = v ? "🔊" : "🔇";
    $("mus").className = v ? "" : "off";
    if (v) {
      audio.play().catch(function () {});
    } else {
      audio.pause();
    }
  }
  $("mus").onclick = function () {
    setM(!on);
  };
  /* ====== INTRO: logo → máquina de escribir → parpadeo → tráiler → sobre ====== */
  var TXT = "PEQUEÑOS GIGANTES CON MENTES BRILLANTES",
    TS = [
      ["Hace cinco años comenzó nuestra aventura…", 3200, CFG.hero || CFG.photos[0].p, "pa"],
      ["Entre juegos, risas y abrazos", 3200, CFG.photos[1].p, "pb"],
      ["aprendimos a soñar y a brillar", 3200, CFG.photos[2].p, "pc"],
      ["y hoy somos gigantes", 2600, CFG.photos[0].p, "pd"],
      ["20 · Diciembre · 2026", 3000, "", "", "Pequeños Gigantes con Mentes Brillantes"],
    ],
    tk = [];
  function at(f, ms) { tk.push(setTimeout(f, ms)); }
  function stage(n) {
    ["s0", "s1", "s2"].forEach(function (id, k) { $(id).classList.toggle("on", k === n); });
  }
  function envelope() { tk.forEach(clearTimeout); stage(2); }
  function typeIt(done) {
    var k = 0;
    (function nx() {
      $("ty").textContent = TXT.slice(0, ++k);
      if (k < TXT.length) setTimeout(nx, TXT[k - 1] === " " ? 150 : 70 + Math.random() * 60);
      else { $("ty").classList.add("fin"); setTimeout(done, 2000); }
    })();
  }
  function blink(done) {
    var f = $("fk"), k = 0,
      seq = [[1, 900], [0, 900], [1, 700], [0, 700], [1, 60], [0, 60], [1, 60], [0, 60], [1, 60], [0, 60], [1, 60]];
    (function nx() {
      if (k >= seq.length) return done();
      var s = seq[k++], slow = s[1] > 100;
      f.style.transitionDuration = (slow ? s[1] : 30) + "ms";
      f.style.opacity = s[0];
      setTimeout(nx, s[1] + (slow ? 150 : 0));
    })();
  }
  function trailer() {
    var g = $("gate"), s = $("s1"), t = 400, tot = 0, tb = $("tb");
    TS.forEach(function (l) { tot += l[1]; });
    g.classList.add("cut");
    stage(1);
    $("fk").style.transitionDuration = "150ms";
    $("fk").style.opacity = 0;
    setTimeout(function () { g.classList.remove("cut"); }, 200);
    $("tp").style.transition = "width " + tot + "ms linear";
    setTimeout(function () { $("tp").style.width = "100%"; }, 50);
    TS.forEach(function (l) {
      at(function () {
        var pl = $("pl"), tt = $("tt"), ts = $("ts");
        ts.className = ""; pl.className = ""; tt.className = "";
        void ts.offsetWidth;
        ts.className = "in" + (l[4] ? " dt" : "");
        ts.style.animationDuration = l[1] + "ms";
        ts.textContent = l[0];
        s.classList.remove("flsh");
        void s.offsetWidth;
        s.classList.add("flsh");
        tb.classList.remove("on");
        if (l[2]) {
          $("pli").src = l[2];
          pl.className = l[3];
          pl.style.animationDuration = l[1] + "ms";
          at(function () { tb.style.backgroundImage = "url('" + l[2] + "')"; tb.classList.add("on"); }, 350);
        }
        if (l[4]) {
          tt.className = "a ti";
          tt.style.animationDuration = l[1] + "ms";
          tt.textContent = l[4];
          s.classList.add("boom");
        }
      }, t);
      t += l[1];
    });
    at(envelope, t);
  }
  function reveal() {
    $("gate").classList.add("open");
    document.body.classList.add("go");
    burst();
  }
  $("seal").onclick = function () {
    this.classList.add("br");
    burst();
    setTimeout(function () { $("env").classList.add("open"); }, 700);
    setTimeout(reveal, 3300);
  };
  for (var pi = 0; pi < 30; pi++) {
    var pe = document.createElement("i"), ps = 3 + Math.random() * 5;
    pe.className = "pt";
    pe.style.cssText = "left:" + Math.random() * 100 + "%;width:" + ps + "px;height:" + ps + "px;animation-duration:" + (6 + Math.random() * 8) + "s;animation-delay:-" + Math.random() * 10 + "s";
    $("s1").appendChild(pe);
  }
  // la música intenta sonar sola; si el celular la bloquea, empieza con el primer toque
  setM(true);
  ["pointerdown", "keydown"].forEach(function (ev) {
    addEventListener(ev, function () {
      if (on && audio.paused && !document.hidden) audio.play().catch(function () {});
    });
  });
  setTimeout(function () { typeIt(function () { blink(trailer); }); }, 2600);

  /* lista para la gran noche */
  var ck = document.querySelectorAll(".ck button");
  [].forEach.call(ck, function (b) {
    b.onclick = function () {
      b.classList.toggle("ok");
      var n = document.querySelectorAll(".ck .ok").length;
      $("ckm").textContent = n === ck.length ? "¡Todo listo! Nos vemos el 20 de diciembre 🌟" : n + " de " + ck.length + " listos";
      if (n === ck.length) burst();
    };
  });

  /* libro de mensajes */
  var KEY = "lm_pgmb";
  function ld() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function rend() {
    var a = ld();
    $("bl").innerHTML = a.length
      ? a.map(function (m) { return '<div class="note"><p>“' + E(m.t) + '”</p><b>— ' + E(m.n) + "</b></div>"; }).join("")
      : '<p class="emp">Aún no hay mensajes. ¡Sé el primero en escribir!</p>';
  }
  function gd() {
    var n = $("bn").value.trim(), t = $("bt").value.trim();
    if (!n || !t) { (n ? $("bt") : $("bn")).focus(); return null; }
    return { n: n, t: t };
  }
  $("bs").onclick = function () {
    var d = gd();
    if (!d) return;
    var a = ld();
    a.unshift(d);
    try { localStorage.setItem(KEY, JSON.stringify(a.slice(0, 50))); } catch (e) {}
    $("bt").value = "";
    rend();
  };
  $("bw").onclick = function () {
    var d = gd();
    if (!d) return;
    window.open("https://wa.me/" + CFG.wa + "?text=" + encodeURIComponent("📖 Dedicatoria para los Pequeños Gigantes, de parte de " + d.n + ":\n“" + d.t + "”"), "_blank");
  };
  rend();

  // pausa la música al salir de la pestaña y la reanuda al volver
  document.addEventListener("visibilitychange", function () {
    if (on) {
      document.hidden ? audio.pause() : audio.play().catch(function () {});
    }
  });

  /* destellos y confeti */
  var cv = $("fx"),
    cx = cv.getContext("2d"),
    F = [],
    B = [],
    W,
    H,
    dpr = Math.min(devicePixelRatio || 1, 2),
    cl = ["#fff", "#d9f1ff", "#8ec5ff", "#f6c026", "#ffe58a"];
  function rs() {
    W = innerWidth;
    H = innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  rs();
  addEventListener("resize", rs);
  function mk(y) {
    return {
      x: Math.random() * W,
      y: y === undefined ? Math.random() * H : y,
      r: Math.random() * 2.2 + 0.8,
      v: Math.random() * 0.5 + 0.2,
      w: Math.random() * 6,
    };
  }
  for (var q = 0; q < Math.min(60, W / 12); q++) F.push(mk());
  function burst() {
    for (var q = 0; q < 130; q++) {
      var a = Math.random() * Math.PI * 2,
        s = Math.random() * 10 + 3;
      B.push({
        x: W / 2,
        y: H / 2,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 5,
        c: cl[q % cl.length],
        l: 1,
        z: Math.random() * 6 + 3,
      });
    }
  }
  function dr() {
    cx.clearRect(0, 0, W, H);
    F.forEach(function (p) {
      p.y += p.v;
      p.w += 0.03;
      p.x += Math.sin(p.w) * 0.4;
      if (p.y > H + 6) Object.assign(p, mk(-6));
      cx.globalAlpha = 0.35 + 0.35 * Math.sin(p.w * 2);
      cx.fillStyle = "#fff";
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, 7);
      cx.fill();
    });
    B = B.filter(function (c) {
      return c.l > 0;
    });
    B.forEach(function (c) {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.22;
      c.vx *= 0.985;
      c.l -= 0.012;
      cx.globalAlpha = Math.max(c.l, 0);
      cx.fillStyle = c.c;
      cx.fillRect(c.x, c.y, c.z, c.z * 0.6);
    });
    cx.globalAlpha = 1;
    requestAnimationFrame(dr);
  }
  /* estela de destellos al mover el dedo o el mouse */
  var lt = 0;
  addEventListener("pointermove", function (e) {
    var n = Date.now();
    if (n - lt < 45) return;
    lt = n;
    B.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 1.5, vy: Math.random() * 1.5, c: "#f6c026", l: 0.7, z: Math.random() * 4 + 2 });
  });
  dr();
})();