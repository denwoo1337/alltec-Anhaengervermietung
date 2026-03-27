import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: 'Anbieter',
    content: (
      <>
        <p>Hochstatter Lukas</p>
        <p>ALLTEC Anhängervermietung</p>
        <p>Metzlerstraße 14</p>
        <p>D-87527 Sonthofen</p>
        <p>Deutschland</p>
      </>
    ),
  },
  {
    title: 'Kontakt',
    content: (
      <>
        <p>
          Telefon:{' '}
          <a href="tel:+4917670590669" className="text-zinc-300 hover:text-white transition-colors">
            +49 176 70590669
          </a>
        </p>
        <p>
          E-Mail:{' '}
          <a href="mailto:hochstatter.lukas@web.de" className="text-zinc-300 hover:text-white transition-colors">
            hochstatter.lukas@web.de
          </a>
        </p>
      </>
    ),
  },
  {
    title: 'Steuernummer',
    content: (
      <p>Steuernummer: [XXX/XXX/XXXXX]</p>
    ),
  },
  {
    title: 'Verantwortlich für den Inhalt',
    content: (
      <>
        <p>Hochstatter Lukas</p>
        <p>Metzlerstraße 14</p>
        <p>D-87527 Sonthofen</p>
      </>
    ),
  },
  {
    title: 'Streitschlichtung',
    content: (
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht
        verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    ),
  },
  {
    title: 'Haftung für Inhalte',
    content: (
      <>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
          zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p className="mt-3">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
          Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    title: 'Haftung für Links',
    content: (
      <>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
          Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>
        <p className="mt-3">
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
          Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
          Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
          zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    title: 'Urheberrecht',
    content: (
      <>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
          Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
        <p className="mt-3">
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
          Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
          auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </>
    ),
  },
];

export default function Impressum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar impressumPage />
      <main
        className="min-h-screen pt-32 pb-24"
        style={{ background: '#0a0a0a' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-10"
          >
            <Link
              to="/"
              className="text-xs tracking-[0.12em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>Zurück zur Homepage</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-3">
              Rechtliche Informationen
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Impressum</h1>
            <p className="text-zinc-500 text-sm">Angaben gemäß § 5 TMG.</p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
              >
                <div
                  className="pb-3 mb-5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400">
                    {section.title}
                  </h2>
                </div>
                <div className="text-zinc-500 text-sm leading-relaxed space-y-1">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
