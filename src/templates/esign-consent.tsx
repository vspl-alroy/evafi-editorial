import * as React from "react"
import { LegalHead, LegalPage, Section } from "../components/legal-page"

// Copied from EvaFi src/ui/landing/EConsent.tsx (origin/main 5f00afd). Keep the wording 1:1; only the
// name EvaFi and its phone and email are swapped (EVA-350).
// TODO: placeholder until Debt Advice 101 has its own number (EVA-328). Replace before launch.
const PHONE = "(877) 382-3422"
const EMAIL = "privacy@debtadvice101.com"

const SECTIONS = [
  { id: "access-to-electronic-communications", label: "Access to Electronic Communications" },
  { id: "no-right-to-paper-or-non-electronic-records", label: "No Right to Paper or Non-Electronic Records" },
  { id: "withdrawing-your-consent", label: "Withdrawing Your Consent" },
  { id: "updating-your-contact-information", label: "Updating Your Contact Information" },
  { id: "federal-law", label: "Federal Law" },
]
const TITLE = "Disclosure and Consent to Electronic Communication"

export default function EConsent() {
  return (
    <LegalPage title={TITLE} updated="August 2026" sections={SECTIONS} intro={<>
      <p>
        You understand that in order to submit a request to and engage
        in loans and related transactions with Debt Advice 101, our Lending
        Partners and their service providers, as well as other Service
        Partners (collectively referred to herein as &quot;we&quot;, &quot;us&quot;, &quot;our&quot;
        or the &quot;Company&quot; unless otherwise indicated) and to view and
        retain a copy of the notices, disclosures, agreements,
        authorizations, acknowledgements, terms and conditions, and
        other documents during the course of our relationship with you
        (collectively, &quot;Electronic Communications&quot;), you must consent to
        receive Electronic Communications and engage in transactions and
        enter into contracts and agreements electronically.
      </p>
      <p>
        <b>
          Nationwide Financial Group LLC d/b/a Debt Advice 101 (&quot;Debt Advice 101&quot;)
        </b>{" "}
        and its affiliates and third-party service providers process and
        communicate information electronically with consumers and
        customers. Therefore, in order for you to use the Company&apos;s
        services, you must consent to receiving all communications
        electronically as described below. By communicating with the
        Company, using the Company&apos;s website, inquiring about or
        applying for any product or service the Company markets or
        provides, you agree to receive all documents, disclosures and
        notices electronically from the Company. The purpose of the
        Electronic Communications may relate to, but are not limited to,
        responding to your inquiry about our services, your application
        for any services and products, any resulting services or
        products offered to you, suspected fraud, and identity theft or
        verification and includes documents, consents and disclosures
        such as this consent to electronic communications, change in
        terms notices, fee and transaction information, statements,
        consumer disclosures, state-mandated brochures and disclosures,
        adverse action notices, and any other information related to the
        services and products provided to you. We may contact you by
        telephone, artificial or prerecorded voice messages and
        automatic dialing technology, electronic message/SMS or email to
        process your request, for account servicing, to tell you about
        financial products and services, and for other business
        purposes. Message and data rates may apply.
      </p>
      <p>
        The Electronic Communications may be made available to you
        through our website (referred to as the &quot;Site&quot;), emails,
        texting, or other electronic communications. All Electronic
        Communications to you from the Company will be considered to
        have been made &quot;in writing.&quot; You should print or download a copy
        of this consent, the Terms of Use, and any other Electronic
        Communication that is important to you for your records.
      </p>
      <p>
        This consent applies to all interactions, whether through a
        telephone or online concerning you and the Site and includes
        those interactions engaged in on any mobile device, including
        phones, smart-phones, and tablets. By agreeing to this Consent
        for Electronic Communications, you agree that the Company will
        interact with you and process your information electronically.
        The Company will also send you notices electronically related to
        our interactions and transactions. Electronic Communications may
        be provided online or through your designated e-mail address,
        text message to your cell phone, or the Site.
      </p>
      <p>
        Notwithstanding your consent to Electronic Communications, the
        Company may send you paper copies of documents, disclosures and
        notices.
      </p>
    </>}>
      <Section id="access-to-electronic-communications" title="1. Access to Electronic Communications">
        <p>
          In order to access certain personalized Electronic
          Communications, you will be required to have access to your
          email account, the ability to open emails with attachments,
          and the ability to open, save and print documents in a .pdf
          format, and access to the Site or a customer portal. Other
          Electronic Communications may be accessible on the public
          portion of our Site. To access and retain Electronic
          Communications, at a minimum you will need to use the
          following computer software and hardware: A PC or Mac
          compatible computer or other device capable of accessing the
          Internet, access to an e-mail account and supported Web
          browsing software (Chrome version 32.0 or higher, Firefox
          version 26.0 or higher, Internet Explorer version 8.0 or
          higher, or Safari version 7.0 or higher). You will also need
          software capable of running this software and reading PDF
          files and have sufficient electronic storage capacity on your
          hard drive or other data storage facility, or a means to print
          or store notices and information through your browser
          software. You are agreeing and confirming that each device you
          use to access the Site satisfies each of these requirements.
          If these requirements change while you are maintaining an
          active relationship with us and the change creates a material
          risk that you may not be able to receive Electronic
          Communications, we will notify you of these changes. To
          install the free version of Adobe Reader, go to{" "}
          https://get.adobe.com/reader/otherversions/
          .
        </p>
      </Section>

      <Section id="no-right-to-paper-or-non-electronic-records" title="2. No Right to Paper or Non-Electronic Records">
        <p>
          Electronic Communications are generally not available on paper
          or in a non-electronic form from us. If you do not consent to
          the use of Electronic Communications, our products and
          services will not be available to you. However, we may, at our
          option, provide a copy of an Electronic Communication in
          paper-based media as requested by you. We will consider a
          request for a paper copy of any Electronic Communication by
          contacting us at: Nationwide Financial Group LLC d/b/a Debt Advice 101,
          Attn: Customer Service, 898 S State St, Ste 310, #920, Orem,
          UT 84097; via email at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>; via phone,
          toll-free at {PHONE}; or through any other reasonable
          means. If we agree to provide the requested paper copy of an
          Electronic Communication, we may charge you our fees and
          charges then in effect for providing the paper copy.
        </p>
      </Section>

      <Section id="withdrawing-your-consent" title="3. Withdrawing Your Consent">
        <p>
          You may withdraw your consent to receive Electronic
          Communications or to the use of electronic signatures in
          connection with any future transactions with us at any time by
          following the instructions below. We will not charge you any
          fees for withdrawing your consent. If you decide you do not
          want to receive Electronic Communications, or do not want to
          use electronic signatures in connection with any future
          transactions with us, you may withdraw your consent by
          contacting us at: Nationwide Financial Group LLC d/b/a Debt Advice 101,
          Attn: Customer Service, 898 S State St, Ste 310, #920, Orem,
          UT 84097; via email at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>; or via
          phone, toll-free at {PHONE}. In your email or written
          communication, please provide the following: (1) in the
          subject line state, &quot;Withdraw electronic consent&quot;, and (2)
          provide your full name, U.S. postal address, email address,
          and telephone number. The legal effectiveness, validity, and
          enforceability of prior electronic disclosures will not be
          affected if you withdraw your consent.
        </p>
        <p>
          You may withdraw your consent to receive future Electronic
          Communications from any affiliate, Services Partner or a
          lender in a Lending Partner&apos;s lending network by contacting
          the affiliate, Services Partner, or the lender in the Lending
          Partner&apos;s lending network directly.
        </p>
        <p>
          At our discretion, we may treat your failure to provide us
          with a valid e-mail address or the malfunction of a previously
          valid e-mail address as a withdrawal of your consent to
          receive electronic documents.
        </p>
        <p>
          Your withdrawal of consent will be effective only after we
          have had a reasonable period of time to process your request.
        </p>
      </Section>

      <Section id="updating-your-contact-information" title="4. Updating Your Contact Information">
        <p>
          To ensure you receive all Electronic Communications in a
          timely manner, you should promptly notify us of any change in
          your email address, telephone number, or home mailing address.
          You may update such information by calling us toll-free at
          {" "}{PHONE} or via email at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or
          accessing the Site and providing the updated information. You
          may also contact us at: Nationwide Financial Group LLC d/b/a
          Debt Advice 101, Attn: Customer Service, 898 S State St, Ste 310, #920,
          Orem, UT 84097.
        </p>
      </Section>

      <Section id="federal-law" title="5. Federal Law">
        <p>
          All Electronic Communications we provide to you in either
          electronic or paper format will be considered &quot;in writing&quot;.
          You should print or download for your records a copy of this
          Disclosure and Consent to Electronic Communication and any
          other Disclosures, Notices, Consents, and Policies that we
          provide you. You agree and we both intend the federal
          Electronic Signatures in Global and National Commerce Act to
          apply to (i) this Disclosure and Consent to Electronic
          Communication and (ii) our ability to conduct business with
          you by electronic means.
        </p>
        <p>
          <b>
            ACKNOWLEDGING YOUR ACCESS AND CONSENT TO RECEIVE MATERIALS
            ELECTRONICALLY AND TO CONDUCT BUSINESS ELECTRONICALLY.
          </b>{" "}
          You agree to these terms of this Disclosure and Consent to
          Electronic Communication and: (i) confirm your consent to
          receive Disclosures in electronic format and conduct
          transactions electronically; (ii) affirmatively demonstrate
          your ability to access and read, and also print or save, this
          Disclosure and Consent to Electronic Communication and the
          Disclosures or any related documents and communications that
          we have provided to you; (iii) confirm that you have provided
          a valid e-mail address at which we can send electronic
          Disclosures to you; (iv) have access to software and hardware
          that satisfies the above requirements; (v) agree to the terms
          and conditions of this Disclosure and Consent to Electronic
          Communication including the telephone consent above; and (vi)
          by continuing with any transaction and communication including
          clicking any box or pressing any key on your telephone or key
          pad with a tone to provide your consent and acknowledgement to
          this Disclosure and Consent to Electronic Communication and
          any other Consent and Disclosure, you agree and acknowledge
          that you are affixing your electronic signature to any such
          disclosure, consent, document and agreement.
        </p>
        <p>
          <b>
            PLEASE PRINT OR SAVE THIS CONSENT FOR ELECTRONIC
            COMMUNICATIONS FORM AND RETAIN A COPY FOR YOUR RECORDS.
          </b>
        </p>
      </Section>
    </LegalPage>
  )
}

export const Head = () => <LegalHead title={TITLE} slug="esign-consent" />
