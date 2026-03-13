export const metadata = {
  title: "Privacy Policy — SoloDeck",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold text-charcoal">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-muted">Last updated: March 2026</p>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            1. Who We Are
          </h2>
          <p>
            SoloDeck (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            operates the website solodeck.co. We are the data controller
            responsible for your personal data.
          </p>
          <p className="mt-2">
            If you have any questions about this privacy policy or how we handle
            your data, please contact us at{" "}
            <a
              href="mailto:hello@solodeck.co"
              className="text-accent hover:text-accent-hover underline"
            >
              hello@solodeck.co
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            2. What Data We Collect
          </h2>
          <p>We collect the following personal data:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>When you make a purchase:</strong> your name, email
              address, billing address, and payment information. Payment card
              details are processed securely by Stripe and are never stored on
              our servers.
            </li>
            <li>
              <strong>When you contact us:</strong> your name, email address,
              and any information you include in your message.
            </li>
            <li>
              <strong>When you visit our website:</strong> technical data such
              as your IP address, browser type, operating system, and pages
              visited. This is collected automatically through cookies and
              similar technologies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            3. How We Use Your Data
          </h2>
          <p>We use your personal data for the following purposes:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>To fulfil your order:</strong> processing payment, sending
              confirmation emails, and providing download links for your
              purchased products. (Legal basis: performance of a contract)
            </li>
            <li>
              <strong>To respond to your enquiries:</strong> replying to
              messages sent via our contact form or email. (Legal basis:
              legitimate interest)
            </li>
            <li>
              <strong>To comply with legal obligations:</strong> maintaining
              records for tax and accounting purposes as required by HMRC.
              (Legal basis: legal obligation)
            </li>
            <li>
              <strong>To improve our website:</strong> understanding how
              visitors use our site so we can improve the experience. (Legal
              basis: legitimate interest)
            </li>
          </ul>
          <p className="mt-2">
            We will never sell, rent, or share your personal data with third
            parties for their marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            4. Who We Share Your Data With
          </h2>
          <p>
            We only share your data with third parties where it is necessary to
            provide our services or where we are legally required to do so:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Stripe:</strong> our payment processor. Stripe processes
              your payment details securely in accordance with PCI DSS
              standards. See{" "}
              <a
                href="https://stripe.com/gb/privacy"
                className="text-accent hover:text-accent-hover underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Vercel:</strong> our website hosting provider. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-accent hover:text-accent-hover underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Email provider:</strong> we use a transactional email
              service to send order confirmations and download links. Your email
              address is shared with this provider solely for the purpose of
              delivering these emails.
            </li>
            <li>
              <strong>HMRC and legal authorities:</strong> where required by law
              for tax, legal, or regulatory purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            5. How Long We Keep Your Data
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Order records:</strong> we retain order information
              (including your name, email, and purchase details) for 6 years
              after the date of purchase, as required by HMRC for tax and
              accounting purposes.
            </li>
            <li>
              <strong>Contact form messages:</strong> we retain messages for up
              to 12 months after the enquiry has been resolved, unless a longer
              retention period is required for legal reasons.
            </li>
            <li>
              <strong>Website analytics data:</strong> anonymised usage data is
              retained for up to 26 months.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            6. Cookies
          </h2>
          <p>Our website uses cookies for the following purposes:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Essential cookies:</strong> required for the website to
              function, including maintaining your shopping cart. These cannot be
              disabled.
            </li>
            <li>
              <strong>Analytics cookies:</strong> help us understand how visitors
              use our website so we can improve it. These are only set with your
              consent.
            </li>
          </ul>
          <p className="mt-2">
            You can manage your cookie preferences through your browser
            settings. Disabling essential cookies may affect the functionality
            of our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            7. Your Rights
          </h2>
          <p>
            Under UK data protection law (UK GDPR and the Data Protection Act
            2018), you have the following rights:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Right of access:</strong> you can request a copy of the
              personal data we hold about you.
            </li>
            <li>
              <strong>Right to rectification:</strong> you can ask us to correct
              inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to erasure:</strong> you can ask us to delete your
              personal data, subject to our legal obligations to retain certain
              records.
            </li>
            <li>
              <strong>Right to restrict processing:</strong> you can ask us to
              limit how we use your data in certain circumstances.
            </li>
            <li>
              <strong>Right to data portability:</strong> you can request your
              data in a structured, commonly used, machine-readable format.
            </li>
            <li>
              <strong>Right to object:</strong> you can object to our processing
              of your data where we rely on legitimate interest as our legal
              basis.
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:hello@solodeck.co"
              className="text-accent hover:text-accent-hover underline"
            >
              hello@solodeck.co
            </a>
            . We will respond within 30 days.
          </p>
          <p className="mt-2">
            If you are not satisfied with our response, you have the right to
            lodge a complaint with the Information Commissioner&apos;s Office
            (ICO) at{" "}
            <a
              href="https://ico.org.uk"
              className="text-accent hover:text-accent-hover underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            8. Data Security
          </h2>
          <p>
            We take appropriate technical and organisational measures to protect
            your personal data against unauthorised access, alteration,
            disclosure, or destruction. Payment processing is handled entirely
            by Stripe using industry-standard encryption.
          </p>
          <p className="mt-2">
            However, no method of transmission over the internet is 100% secure.
            While we strive to protect your data, we cannot guarantee its
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            9. International Transfers
          </h2>
          <p>
            Some of our third-party service providers (such as Stripe and
            Vercel) may process your data outside the UK. Where this occurs,
            we ensure that appropriate safeguards are in place, including
            adequacy decisions, standard contractual clauses, or other approved
            transfer mechanisms under UK data protection law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            10. Children&apos;s Privacy
          </h2>
          <p>
            Our website and products are not directed at individuals under the
            age of 18. We do not knowingly collect personal data from children.
            If you believe we have inadvertently collected data from a child,
            please contact us and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with the &ldquo;last updated&rdquo;
            date revised accordingly. We encourage you to review this page
            periodically.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-charcoal">
            12. Contact Us
          </h2>
          <p>
            If you have any questions about this privacy policy or wish to
            exercise your data protection rights, please contact us at{" "}
            <a
              href="mailto:hello@solodeck.co"
              className="text-accent hover:text-accent-hover underline"
            >
              hello@solodeck.co
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
