(function () {
  "use strict";
  var C = window.MF_CONFIG || {};
  var PRIX = {
    createur: { lancement: 19900, normal: 35000 },
    createurPlus: { lancement: 27900, normal: 50000 },
    studio: { lancement: 54900, normal: 90000 },
  };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fcfa = function (n) { return n.toLocaleString("fr-FR").replace(/ | /g, " ") + " F"; };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; };

  // --- Offre de lancement : se termine d'elle-même à la date fixée ---
  var lancement = C.lancement || {};
  var fin = lancement.fin ? new Date(lancement.fin) : null;
  if (fin && isNaN(fin)) fin = null;
  var enLancement = !fin || fin > new Date();

  $$("[data-places-total]").forEach(function (el) { el.textContent = lancement.placesTotal || 50; });
  if (enLancement && typeof lancement.placesRestantes === "number") {
    $("#placesTxt").textContent = " · il reste " + lancement.placesRestantes + " place" + (lancement.placesRestantes > 1 ? "s" : "");
  }

  function appliquerPrix() {
    $$("[data-price]").forEach(function (el) {
      var p = PRIX[el.getAttribute("data-price")];
      if (p) el.textContent = fcfa(enLancement ? p.lancement : p.normal);
    });
    $$("[data-launch-only]").forEach(function (el) { el.hidden = !enLancement; });
    $("#topbar").hidden = !enLancement;
    document.body.classList.toggle("has-topbar", enLancement);
  }
  appliquerPrix();

  if (enLancement && fin) {
    var cd = $("#countdown");
    cd.hidden = false;
    var tick = function () {
      var ms = fin - new Date();
      if (ms <= 0) { enLancement = false; appliquerPrix(); clearInterval(timer); return; }
      var j = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      cd.textContent = "Fin dans " + (j ? j + " j " : "") + String(h).padStart(2, "0") + " h " + String(m).padStart(2, "0") + " min " + String(s).padStart(2, "0") + " s";
    };
    tick();
    var timer = setInterval(tick, 1000);
  }

  // --- WhatsApp ---
  var wa = (C.whatsapp || "").replace(/\D/g, "");
  var waLien = function (msg) { return "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg); };
  if (wa) {
    var b = $("#waBtn");
    b.href = waLien("Bonjour, j'ai une question sur MotionForge.");
    b.target = "_blank"; b.rel = "noopener";
    b.hidden = false;
  }

  // --- Boutons d'achat ---
  var NOMS = { createur: "Créateur", createurPlus: "Créateur+", studio: "Studio" };
  $$("[data-buy]").forEach(function (a) {
    var k = a.getAttribute("data-buy");
    var lien = (C.paiement || {})[k];
    if (lien) { a.href = lien; }
    else if (wa) {
      a.href = waLien("Bonjour, je veux l'offre MotionForge " + NOMS[k] + ".");
      a.target = "_blank"; a.rel = "noopener";
    }
  });

  // --- Vidéo de démonstration ---
  var vid = (C.videoDemoYoutube || "").trim();
  if (/^[\w-]{6,20}$/.test(vid)) {
    $("#demoFrame").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '" title="Démonstration MotionForge" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    $("#demo").hidden = false;
  }

  // --- Témoignages (réels uniquement) ---
  var t = Array.isArray(C.temoignages) ? C.temoignages : [];
  if (t.length) {
    $("#testiList").innerHTML = t.map(function (x) {
      var v = /^[\w-]{6,20}$/.test(x.video || "") ? '<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + x.video + '" title="Témoignage de ' + esc(x.nom) + '" loading="lazy" allowfullscreen></iframe></div>' : "";
      return '<figure class="testi">' + v + "<blockquote>« " + esc(x.texte) + " »</blockquote><figcaption><b>" + esc(x.nom) + "</b>" + (x.role ? " · " + esc(x.role) : "") + "</figcaption></figure>";
    }).join("");
    $("#temoignages").hidden = false;
  }

  // --- Liens légaux ---
  var L = C.legal || {};
  var liens = [["cgv", "Conditions de vente"], ["licence", "Licence d'utilisation"], ["confidentialite", "Confidentialité"]]
    .filter(function (p) { return L[p[0]]; })
    .map(function (p) { return '<a href="' + esc(L[p[0]]) + '">' + p[1] + "</a>"; });
  $("#legalLinks").innerHTML = liens.join("");
  $("#year").textContent = new Date().getFullYear();

  // --- Barre d'achat mobile : masquée quand les offres sont à l'écran ---
  var sticky = $("#stickyCta"), offre = $("#offre");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { sticky.classList.toggle("off", e[0].isIntersecting); }, { threshold: 0.15 }).observe(offre);
  }
})();
