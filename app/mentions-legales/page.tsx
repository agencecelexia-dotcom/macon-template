import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Mentions Légales & Politique de Confidentialité",
  description: `Mentions légales, politique de confidentialité et conditions générales d'utilisation du site ${company.name}.`,
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-br from-primary-800 to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Mentions légales
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Informations légales, politique de confidentialité et conditions
            d&apos;utilisation.
          </p>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          {/* Mentions légales */}
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-primary">
              1. Mentions légales
            </h2>

            <div className="space-y-4 text-neutral-600">
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Éditeur du site
                </h3>
                <p>
                  Le site est édité par <strong>{company.name}</strong>,
                  entreprise individuelle de maçonnerie.
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <strong>Adresse :</strong> {company.address.street},{" "}
                    {company.address.postalCode} {company.address.city}
                  </li>
                  <li>
                    <strong>Téléphone :</strong> {company.phone}
                  </li>
                  <li>
                    <strong>Email :</strong> {company.email}
                  </li>
                  <li>
                    <strong>SIRET :</strong> Disponible sur demande
                  </li>
                  <li>
                    <strong>Directeur de la publication :</strong> Le dirigeant de {company.name}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Hébergeur</h3>
                <p>
                  Le site est hébergé par <strong>Vercel Inc.</strong>
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <strong>Adresse :</strong> 440 N Barranca Ave #4133,
                    Covina, CA 91723, États-Unis
                  </li>
                  <li>
                    <strong>Site web :</strong> https://vercel.com
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Propriété intellectuelle
                </h3>
                <p>
                  L&apos;ensemble du contenu du site (textes, images, logos,
                  graphismes) est la propriété exclusive de {company.name} ou de
                  ses partenaires. Toute reproduction, même partielle, est
                  interdite sans autorisation préalable écrite.
                </p>
              </div>
            </div>
          </div>

          {/* Politique de confidentialité */}
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-primary">
              2. Politique de confidentialité (RGPD)
            </h2>

            <div className="space-y-4 text-neutral-600">
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Responsable du traitement
                </h3>
                <p>
                  Le responsable du traitement des données personnelles est{" "}
                  {company.name}, joignable à l&apos;adresse {company.email}.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Données collectées
                </h3>
                <p>
                  Nous collectons les données suivantes dans le cadre du
                  formulaire de contact et de demande de devis :
                </p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse postale (si nécessaire pour le devis)</li>
                  <li>Description du projet</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Finalité du traitement
                </h3>
                <p>
                  Les données collectées sont utilisées exclusivement pour :
                </p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                  <li>Répondre à vos demandes de contact et de devis</li>
                  <li>Vous envoyer des informations relatives à votre projet</li>
                  <li>Améliorer la qualité de nos services</li>
                </ul>
                <p className="mt-2">
                  Vos données ne sont jamais vendues ni transmises à des tiers à
                  des fins commerciales.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Durée de conservation
                </h3>
                <p>
                  Les données personnelles sont conservées pendant une durée
                  maximale de 3 ans à compter du dernier contact, conformément
                  aux recommandations de la CNIL.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Cookies</h3>
                <p>
                  Le site utilise des cookies strictement nécessaires au
                  fonctionnement du site. Des cookies de mesure d&apos;audience
                  (anonymisés) peuvent être utilisés pour améliorer
                  l&apos;expérience utilisateur. Vous pouvez gérer vos
                  préférences via le bandeau cookies affiché lors de votre
                  première visite.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Vos droits</h3>
                <p>
                  Conformément au Règlement Général sur la Protection des
                  Données (RGPD) et à la loi Informatique et Libertés, vous
                  disposez des droits suivants :
                </p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                  <li>
                    <strong>Droit d&apos;accès :</strong> obtenir la
                    confirmation que vos données sont traitées et en demander
                    une copie
                  </li>
                  <li>
                    <strong>Droit de rectification :</strong> demander la
                    correction de données inexactes
                  </li>
                  <li>
                    <strong>Droit à l&apos;effacement :</strong> demander la
                    suppression de vos données
                  </li>
                  <li>
                    <strong>Droit d&apos;opposition :</strong> vous opposer au
                    traitement de vos données
                  </li>
                  <li>
                    <strong>Droit à la portabilité :</strong> récupérer vos
                    données dans un format structuré
                  </li>
                </ul>
                <p className="mt-2">
                  Pour exercer ces droits, contactez-nous à{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-accent hover:underline"
                  >
                    {company.email}
                  </a>
                  . Vous pouvez également introduire une réclamation auprès de
                  la CNIL (www.cnil.fr).
                </p>
              </div>
            </div>
          </div>

          {/* CGU */}
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-primary">
              3. Conditions Générales d&apos;Utilisation
            </h2>

            <div className="space-y-4 text-neutral-600">
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Objet du site
                </h3>
                <p>
                  Le présent site a pour objet de présenter les activités de{" "}
                  {company.name} et de permettre aux visiteurs de demander des
                  devis pour des travaux de maçonnerie.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Accès au site
                </h3>
                <p>
                  L&apos;accès au site est gratuit. Les frais de connexion à
                  Internet sont à la charge de l&apos;utilisateur.{" "}
                  {company.name} met tout en oeuvre pour assurer
                  l&apos;accessibilité du site 24h/24 et 7j/7, mais ne peut
                  garantir une disponibilité sans interruption.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Responsabilité
                </h3>
                <p>
                  Les informations fournies sur le site le sont à titre
                  indicatif. Bien que nous nous efforcions de maintenir des
                  informations exactes et à jour, {company.name} ne saurait
                  être tenu responsable des erreurs, omissions ou des résultats
                  obtenus suite à l&apos;utilisation de ces informations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Liens hypertextes
                </h3>
                <p>
                  Le site peut contenir des liens vers d&apos;autres sites web.{" "}
                  {company.name} ne peut être tenu responsable du contenu de ces
                  sites externes ni des éventuels dommages découlant de leur
                  utilisation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Droit applicable
                </h3>
                <p>
                  Les présentes conditions sont régies par le droit français.
                  Tout litige relatif à l&apos;utilisation du site sera soumis à
                  la compétence des tribunaux français compétents.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-400">
                  Dernière mise à jour : mars 2026
                </p>
              </div>
            </div>
          </div>

          {/* Crédit Agence Celexia */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">
              4. Conception du site
            </h2>

            <div className="space-y-4 text-neutral-600">
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Création et développement
                </h3>
                <p>
                  Ce site a été conçu et développé par{" "}
                  <strong>Agence Celexia</strong>, agence web spécialisée dans
                  la création de sites internet pour les artisans et
                  professionnels du bâtiment.
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <strong>Site web :</strong>{" "}
                    <a
                      href="https://agencecelexia.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      agencecelexia.com
                    </a>
                  </li>
                  <li>
                    <strong>Email :</strong>{" "}
                    <a
                      href="mailto:contact@agencecelexia.com"
                      className="text-accent hover:underline"
                    >
                      contact@agencecelexia.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
