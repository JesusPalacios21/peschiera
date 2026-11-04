(function () {
  var CFG = {
    wa: "51977964460",
    hero: "img/xdddddddddddd.jpg",
    photos: [
      { p: "img/parque3.jpg", t: "Nuestra promoción", d: "Inicial 5 años · I.E.I. N° 243 Esperanza Carrillo de Peschiera" },
      { p: "img/parque1.jpg", t: "Pequeños gigantes", d: "Amigos para siempre" },
      { p: "img/parque2.jpg", t: "Mentes brillantes", d: "Pequeños Gigantes con Mentes Brillantes 2026" },
      { p: "img/togapeschiera.jpg", t: "Recuerdos inolvidables", d: "Momentos especiales que viviremos por siempre" },
      { p: "img/colegio.avif", t: "Aprendiendo y creciendo", d: "Cada día una nueva aventura llena de alegría" },
    ],
  };

  var MUSIC_SRC = "music/photograph.mp3";
  var MUSIC_VOL = 1.0; // volumen de 0 a 1

  var T = new Date("2026-12-20T18:00:00-05:00").getTime(),
    $ = function (i) {
      return document.getElementById(i);
    },
    MS = 5000;

  $("hbg").style.backgroundImage = "url('" + CFG.hero + "')";

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
      '<img class="bgb" alt="" aria-hidden="true" loading="lazy" decoding="async" src="' + s.p + '" onerror="this.remove()"><img alt="' + E(s.t) + '" loading="lazy" decoding="async" src="' + s.p + '" onerror="this.remove()">' +
      '<div class="gc"><p class="scr">' + E(s.t) + '</p><p class="cap">' + E(s.d || "Pequeños Gigantes con Mentes Brillantes") + "</p></div>";
    gs.appendChild(d);
    var b = document.createElement("button");
    b.className = "th";
    b.setAttribute("aria-label", "Ver foto " + (k + 1));
    b.innerHTML = '<img alt="" loading="lazy" decoding="async" src="' + s.p + '" onerror="this.remove()">';
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
    if (Date.now() - lastSw < 400) return;
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
    // el carrusel solo avanza cuando se ve en pantalla
    new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) auto(); else clearInterval(tm);
    }, { threshold: 0.2 }).observe(gs);
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
  audio.preload = "none";

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
  /* ====== INTRO: logo → máquina de escribir → carta con sello ====== */
  var TXT = "PEQUEÑOS GIGANTES CON MENTES BRILLANTES";
  function stage(n) {
    ["s0", "s2"].forEach(function (id) { $(id).classList.toggle("on", id === "s" + n); });
  }
  function typeIt(done) {
    var k = 0;
    (function nx() {
      $("ty").textContent = TXT.slice(0, ++k);
      if (k < TXT.length) setTimeout(nx, TXT[k - 1] === " " ? 150 : 70 + Math.random() * 60);
      else { $("ty").classList.add("fin"); setTimeout(done, 1500); }
    })();
  }
  function reveal() {
    $("gate").classList.add("open");
    document.body.classList.add("go");
    burst();
    setTimeout(function () { $("gate").remove(); }, 1500);
  }
  $("seal").onclick = function () {
    this.classList.add("br");
    burst();
    setTimeout(function () { $("env").classList.add("open"); }, 700);
    setTimeout(reveal, 3300);
  };
  // la música intenta sonar sola; si el celular la bloquea, empieza con el primer toque
  addEventListener("load", function () { setM(true); });
  ["pointerdown", "keydown"].forEach(function (ev) {
    addEventListener(ev, function () {
      if (on && audio.paused && !document.hidden) audio.play().catch(function () {});
    });
  });
  setTimeout(function () { typeIt(function () { stage(2); }); }, 2600);

  /* ====== MARCO DE FOTO ====== */
  var PW = 1080, PH = 1350, cvm = $("pf"), cm = cvm.getContext("2d"),
    pimg = null, pz = 1, px = 0, py = 0, plogo = new Image();
  function rr(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function pdraw() {
    var c = cm, x = 70, y = 70, w = PW - 140, h = PH - 380, g = c.createLinearGradient(0, 0, 0, PH);
    g.addColorStop(0, "#4aa8e8"); g.addColorStop(1, "#0c4a85");
    c.fillStyle = g; c.fillRect(0, 0, PW, PH);
    c.save(); rr(c, x, y, w, h, 36); c.clip();
    if (pimg) {
      var s = Math.max(w / pimg.width, h / pimg.height) * pz, iw = pimg.width * s, ih = pimg.height * s,
        mx = (iw - w) / 2, my = (ih - h) / 2;
      px = Math.max(-mx, Math.min(mx, px)); py = Math.max(-my, Math.min(my, py));
      c.drawImage(pimg, x + (w - iw) / 2 + px, y + (h - ih) / 2 + py, iw, ih);
    } else {
      c.fillStyle = "rgba(255,255,255,.18)"; c.fillRect(x, y, w, h);
      c.fillStyle = "#fff"; c.textAlign = "center"; c.font = "300 56px 'Cormorant Garamond',serif";
      c.fillText("Tu foto aquí", PW / 2, y + h / 2);
    }
    c.restore();
    c.lineWidth = 10; c.strokeStyle = "#f6c026"; rr(c, x, y, w, h, 36); c.stroke();
    c.lineWidth = 4; c.strokeStyle = "#fff"; rr(c, 30, 30, PW - 60, PH - 60, 52); c.stroke();
    c.textAlign = "center"; c.fillStyle = "#fff";
    c.font = "86px 'Pinyon Script',cursive"; c.fillText("Pequeños Gigantes", PW / 2, PH - 215);
    c.font = "62px 'Pinyon Script',cursive"; c.fillText("con Mentes Brillantes", PW / 2, PH - 150);
    c.fillStyle = "#ffe58a"; c.font = "600 34px 'Cormorant Garamond',serif";
    try { c.letterSpacing = "6px"; } catch (e) {}
    c.fillText("20 · DICIEMBRE · 2026", PW / 2, PH - 85);
    try { c.letterSpacing = "0px"; } catch (e) {}
    if (plogo.complete && plogo.naturalWidth) {
      var lh = 150, lw = lh * plogo.naturalWidth / plogo.naturalHeight;
      if (lw > 150) { lw = 150; lh = lw * plogo.naturalHeight / plogo.naturalWidth; }
      c.drawImage(plogo, PW - 70 - lw, PH - 90 - lh, lw, lh);
    }
  }
  var pq = 0;
  function preq() { if (!pq) { pq = 1; requestAnimationFrame(function () { pq = 0; pdraw(); }); } }
  plogo.onload = pdraw;
  plogo.src = "img/peschieralogo.png";
  pdraw();
  if (document.fonts) {
    document.fonts.load('40px "Pinyon Script"').then(pdraw);
    document.fonts.load('600 34px "Cormorant Garamond"').then(pdraw);
  }
  $("ppick").onclick = function () { $("pfile").click(); };
  $("pfile").onchange = function () {
    var f = this.files[0];
    if (!f) return;
    var im = new Image();
    im.onload = function () {
      var k = Math.min(1, 2000 / Math.max(im.width, im.height)), cc = document.createElement("canvas");
      cc.width = Math.round(im.width * k); cc.height = Math.round(im.height * k);
      cc.getContext("2d").drawImage(im, 0, 0, cc.width, cc.height);
      URL.revokeObjectURL(im.src);
      pimg = cc; pz = 1; px = 0; py = 0; $("pz").value = 1;
      $("pz").disabled = $("pdl").disabled = $("psh").disabled = false;
      $("pfh").hidden = false; cvm.classList.add("has");
      pdraw();
    };
    im.src = URL.createObjectURL(f);
  };
  $("pz").oninput = function () { pz = +this.value; preq(); };
  var pd = null;
  cvm.addEventListener("pointerdown", function (e) { if (pimg) { pd = [e.clientX, e.clientY]; cvm.setPointerCapture(e.pointerId); } });
  cvm.addEventListener("pointermove", function (e) {
    if (!pd) return;
    var k = PW / cvm.clientWidth;
    px += (e.clientX - pd[0]) * k; py += (e.clientY - pd[1]) * k;
    pd = [e.clientX, e.clientY]; preq();
  });
  ["pointerup", "pointercancel"].forEach(function (ev) { cvm.addEventListener(ev, function () { pd = null; }); });
  function pget(cb) { cvm.toBlob(cb, "image/png"); }
  function psave(b) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = "pequenos-gigantes.png"; a.click();
  }
  $("pdl").onclick = function () { pget(psave); };
  $("psh").onclick = function () {
    pget(function (b) {
      var f = new File([b], "pequenos-gigantes.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        navigator.share({ files: [f], title: "Pequeños Gigantes con Mentes Brillantes" }).catch(function () {});
      } else psave(b);
    });
  };

  /* dedicatoria por WhatsApp */
  $("bw").onclick = function () {
    var n = $("bn").value.trim(), t = $("bt").value.trim();
    if (!n || !t) { (n ? $("bt") : $("bn")).focus(); return; }
    window.open("https://wa.me/" + CFG.wa + "?text=" + encodeURIComponent("📖 Dedicatoria para los Pequeños Gigantes, de parte de " + n + ":\n“" + t + "”"), "_blank");
  };

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
    dpr = 1,
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
  for (var q = 0; q < Math.min(40, W / 16); q++) F.push(mk());
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
    if (B.length < 250) B.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 1.5, vy: Math.random() * 1.5, c: "#f6c026", l: 0.7, z: Math.random() * 4 + 2 });
  });
  dr();
})();