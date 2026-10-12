/*
 * ============================================================
 *  RÉGLAGES DE LA PAGE — c'est le seul fichier à modifier.
 * ============================================================
 * Tant qu'un lien de paiement est vide, son bouton ouvre WhatsApp
 * (ou, sans numéro, ramène à la section des offres).
 */
window.MF_CONFIG = {
  // Liens de paiement Chariow (ou autre) de chaque offre
  paiement: {
    createur: "",      // 19 900 F
    createurPlus: "",  // 27 900 F
    studio: "",        // 54 900 F
  },

  // Numéro WhatsApp au format international, sans + ni espaces (ex. "237690000000")
  whatsapp: "",

  // Offre de lancement.
  //   fin : date de fin "AAAA-MM-JJTHH:MM" (heure locale du visiteur). Vide = pas de compte à rebours.
  //         Une fois la date passée, la page affiche automatiquement les prix normaux.
  //   placesRestantes : nombre à mettre à jour à la main (null = non affiché). Ne jamais inventer.
  lancement: {
    fin: "",
    placesTotal: 50,
    placesRestantes: null,
  },

  // Identifiant de la vidéo de démonstration YouTube (ce qui suit "v=" dans le lien). Vide = section masquée.
  videoDemoYoutube: "",

  // Témoignages RÉELS uniquement. Section masquée tant que la liste est vide.
  // Exemple : { nom: "Awa K.", role: "Coach, Abidjan", texte: "…", video: "ID_YOUTUBE (facultatif)" }
  temoignages: [],

  // Liens des pages légales (conditions de vente, licence d'utilisation, confidentialité)
  legal: {
    cgv: "",
    licence: "",
    confidentialite: "",
  },
};
