import * as React from "react"
import { Link } from "gatsby"
import type { PageView } from "."
import { LegalPage, Section } from "../legal-page"
import { localePath } from "../../i18n"

// /california-policy/ (footer "CA Privacy Policy"). Copied from EvaFi src/ui/landing/CaliforniaPolicy.tsx
// (~/codeBase/EvaFi main 281f599). Keep the wording 1:1; only these are swapped: the name EvaFi in
// "Nationwide Financial Group LLC d/b/a …", the opt-out URL (EvaFi's /opt-out -> our /do-not-sell-or-share/),
// the phone number and the privacy email. Layout and styles: LegalPage (Debt Advice 101 design system).
// TODO: placeholder until Debt Advice 101 has its own number (EVA-328). Replace before launch.
// TODO: Tori to confirm the mailing address (section 10) and "Chat with Eva" (section 3) apply to Debt Advice 101.
const PHONE = "(877) 382-3422"
const EMAIL = "privacy@debtadvice101.com"

const SECTIONS = [
  { id: "key-terms", label: "Key Terms" },
  { id: "personal-information-we-collect-about-you", label: "Personal Information We Collect About You" },
  { id: "how-your-personal-information-is-collected", label: "How Your Personal Information is Collected" },
  { id: "why-we-use-your-personal-information", label: "Why We Use Your Personal Information" },
  { id: "who-we-are", label: "Who we are" },
  { id: "categories-of-personal-information-we-sold-or-shared", label: "Categories of Personal Information We Sold or Shared" },
  { id: "definitions", label: "Definitions" },
  { id: "how-long-your-personal-information-will-be-kept", label: "How Long Your Personal Information Will Be Kept" },
  { id: "your-rights-under-the-ccpa", label: "Your Rights Under the CCPA/CPRA" },
  { id: "how-to-exercise-your-rights", label: "How to Exercise Your Rights" },
]

export const CaliforniaPolicy: PageView = ({ locale }) => (
  <LegalPage title="California Consumer Privacy Policy" updated="August 2026" sections={SECTIONS} intro={<>
      <p className="el-lead">
        This policy explains the rights of California residents
        regarding the collection, use, sale, and sharing of their
        personal information under the California Consumer Privacy Act
        of 2018 (CCPA), as amended by the California Privacy Rights Act
        of 2020 (CPRA). We may update and make changes to this policy,
        so we encourage you to review it periodically.
      </p>
  </>}>
      <Section id="key-terms" title="1. Key Terms">
        <div className="el-kv">
          <p className="el-medium">
            We, us, our, the Company
          </p>
          <p className="el-medium">
            Nationwide Financial Group LLC d/b/a Debt Advice 101
          </p>
        </div>
        <div className="el-kv">
          <p className="el-medium">
            Personal information
          </p>
          <p>
            Any information that identifies, relates to, describes, is
            reasonably capable of being associated with, or could
            reasonably be linked with a particular consumer or
            household.
          </p>
        </div>
        <div className="el-kv">
          <p className="el-medium">
            Sensitive personal information
          </p>
          <p>
            Personal information revealing a consumer&apos;s Social Security
            number, driver&apos;s license and passport numbers, account
            numbers and credentials, precise geolocation, racial or
            ethnic origin, religious beliefs, or union membership,
            personal information concerning a consumer&apos;s health, sex
            life, or sexual orientation, contents of a consumer&apos;s mail,
            email and text messages where the business is not the
            intended recipient, genetic data, and biometric information.
          </p>
        </div>
        <div className="el-kv">
          <p className="el-medium">
            Biometric information
          </p>
          <p>
            An individual&apos;s physiological, biological, or behavioral
            characteristics, including information pertaining to an
            individual&apos;s deoxyribonucleic acid (DNA), that is used or is
            intended to be used singly or in combination with each other
            or with other identifying data, to establish individual
            identity. Biometric information includes, but is not limited
            to, imagery of the iris, retina, fingerprint, face, hand,
            palm, vein patterns, and voice recordings, from which an
            identifier template, such as a faceprint, a minutiae
            template, or a voiceprint, can be extracted, and keystroke
            patterns or rhythms, gait patterns or rhythms, and sleep,
            health, or exercise data that contain identifying
            information.
          </p>
        </div>
      </Section>

      <Section id="personal-information-we-collect-about-you" title="2. Personal Information We Collect About You">
        <p>
          In the preceding 12 months, we have collected the following
          categories and specific types of consumer personal
          information:
        </p>
        <div className="el-cols">
          <div>
            <p className="el-medium">
              Categories of Personal Information
            </p>
          </div>
          <div>
            <p className="el-medium">
              Specific Types of Personal Information Collected
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Identifiers (e.g., a real name, alias, postal address,
              unique personal identifier, online identifier, Internet
              Protocol address, email address, account name, Social
              Security number, driver&apos;s license number, passport number,
              or other similar identifiers)
            </p>
          </div>
          <div>
            <p>
              Name, alias, postal address, unique personal identifier,
              online identifier, address, access code, email address,
              account name, Social Security number, driver&apos;s license
              number, passport number, or other similar identifiers
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Information that identifies, relates to, describes, or is
              capable of being associated with, a particular individual,
              including, but not limited to, his or her name, signature,
              Social Security number, physical characteristics or
              description, address, telephone number, passport number,
              driver&apos;s license or state identification card number,
              insurance policy number, education, employment, employment
              history, bank account number, credit card number, debit
              card number, or any other financial information, medical
              information, or health insurance information.
            </p>
          </div>
          <div>
            <p>
              Name, signature, social security number,  address,
              telephone number, passport number, driver’s license or
              state identification card number, employment, employment
              history, bank account number, credit card number, debit
              card number, and other financial information. 
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Characteristics of protected classifications under
              California or federal law
            </p>
          </div>
          <div>
            <p>Gender and age</p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Commercial information (e.g., records of products or
              services purchased, obtained, or considered, or other
              purchasing or consuming histories or tendencies)
            </p>
          </div>
          <div>
            <p>
              Credit information including payment history, outstanding
              balance, and credit account status.
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>Biometric information</p>
          </div>
          <div>
            <p>
              Voice information from audio recordings and other
              biometric collected from government IDs and images to
              verify your identity
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Internet or other electronic network activity information
              (e.g., browsing history, search history, and information
              regarding a consumer&apos;s interaction with an Internet Web
              site, application, or advertisement)
            </p>
          </div>
          <div>
            <p>
              BirdEye, CallRail, ClickCease, Crazy Egg, Hotjar, Adroll,
              Meta Ads, Google Analytics, Google Ads, Microsoft Ads,
              Klaviyo, LeadPost, Google Optimize, Rockerbox, Quantcast,
              StackAdapt, TikTok ads, Twitter ads, VWO
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>Geolocation data</p>
          </div>
          <div>
            <p>Postal address</p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Audio, electronic, visual, thermal, olfactory, or similar
              information
            </p>
          </div>
          <div>
            <p>Recordings of telephone calls</p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Professional or employment-related information
            </p>
          </div>
          <div>
            <p>
              Name of employer and current employment status.
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Education information, defined as information that is not
              publicly available personally identifiable information as
              defined in the Family Educational Rights and Privacy Act
              (FERPA)
            </p>
          </div>
          <div>
            <p>None</p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>
              Inferences drawn from any of the information identified
              above to create a profile about a consumer reflecting the
              consumer&apos;s preferences, characteristics, psychological
              trends, predispositions, behavior, attitudes,
              intelligence, abilities, and aptitudes
            </p>
          </div>
          <div>
            <p>
              Qualification for financial services and products and
              future performance related to defaults.
            </p>
          </div>
        </div>
        <div className="el-cols">
          <div>
            <p>Sensitive Personal Information</p>
          </div>
          <div>
            <p>
              Social security number, driver’s license and passport
              numbers, account numbers and credentials, precise
              geolocation,
            </p>
          </div>
        </div>
      </Section>

      <Section id="how-your-personal-information-is-collected" title="3. How Your Personal Information is Collected">
        <p>
          We collect most of this personal information directly from
          you—by telephone, text or email and/or via our website,
          including our Chat with Eva feature. However, we may also
          collect information from the following categories of sources:
        </p>
        <ul className="el-list-disc">
          <li>Publicly accessible sources (e.g., records);</li>
          <li>
            Third party (e.g., sanctions screening providers, credit
            reporting agencies, customer due diligence providers,
            advertising networks, internet service providers, social
            networks, data analytics providers, government entities, and
            data brokers).
          </li>
          <li>
            Third party with your consent (e.g., your bank, Hotjar
            survey, Trustpilot reviews).
          </li>
          <li>Cookies on our website;</li>
          <li>Automated information collection;</li>
          <li>
            Our IT systems, including automated monitoring of our
            websites and other technical systems, such as our computer
            networks and connections, communications systems, email and
            instant messaging systems.
          </li>
        </ul>
      </Section>

      <Section id="why-we-use-your-personal-information" title="4. Why We Use Your Personal Information">
        <p>
          We collect, and sell and share consumer personal information
          for the following business purposes:
        </p>
        <ul className="el-list-disc">
          <li>
            Auditing related to counting ad impressions to unique
            visitors, verifying positioning and quality of ad
            impressions, and auditing compliance with this specification
            and other standards;
          </li>
          <li>
            Helping to ensure security and integrity to the extent the
            use of the consumer&apos;s personal information is reasonably
            necessary and proportionate for these purposes;
          </li>
          <li>
            Debugging to identify and repair errors that impair existing
            intended functionality;
          </li>
          <li>
            Short-term, transient use, including, but not limited to,
            non-personalized advertising shown as part of a consumer&apos;s
            current interaction with the business, provided the
            consumer&apos;s personal information is not disclosed to another
            third party and is not used to build a profile about the
            consumer or otherwise alter the consumer&apos;s experience
            outside the current interaction with the business;
          </li>
          <li>
            Performing services on behalf of the business, including
            maintaining or servicing accounts, providing customer
            service, processing or fulfilling orders and transactions,
            verifying customer information, processing payments,
            providing financing, providing analytic services, providing
            storage, or providing similar services on behalf of the
            business or service provider;
          </li>
          <li>
            Providing advertising and marketing services, except for
            cross-context behavioral advertising, to the consumer;
          </li>
          <li>
            Undertaking internal research for technological development
            and demonstration;
          </li>
          <li>
            Undertaking activities to verify or maintain the quality of
            a service, and to improve, upgrade, or enhance the service;
          </li>
          <li>To comply with our legal and regulatory obligations;</li>
          <li>
            For the performance of our contract with you or to take
            steps at your request before entering into a contract;
          </li>
          <li>
            For our legitimate interests or those of a third party; or
          </li>
          <li>
            Where you have given consent.
          </li>
        </ul>

        <p>
          A legitimate interest is when we have a business or commercial
          reason to use your information, so long as this is not
          overridden by your own rights and interests.
        </p>
        <p>
          The table below explains what we use (process) your personal
          information for and our reasons for doing so:
        </p>
      </Section>

      <Section id="who-we-are" title="5. Who we are">
        <div className="el-cols">
          <p className="el-medium">
            What we use your personal information for
          </p>
          <p className="el-medium">Our reasons</p>
        </div>
        <div className="el-cols">
          <p>
            To provide financial services or products to you
          </p>
          <p>
            For the performance of our contract with you or to take
            steps at your request before entering into a contract
          </p>
        </div>
        <div className="el-cols">
          <p>
            To prevent and detect fraud against you or the Company 
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to minimize fraud that could be damaging for us and
            for you
          </p>
        </div>
        <div className="el-cols">
          <p>
            Conducting checks to identify our customers and verify their
            identity <br />
            <span className="el-block">
              Screening for financial and other sanctions or embargoes

            </span>
            <span className="el-block">
              Other processing necessary to comply with professional,
              legal and regulatory obligations that apply to our business,
              e.g., under regulations or rules issued by our professional
              regulator
            </span>
          </p>
          <p>
            To comply with our legal and regulatory obligations
          </p>
        </div>
        <div className="el-cols">
          <p>
            Gathering and providing information required by or relating
            to audits, inquiries or investigations by regulatory bodies
          </p>
          <p>
            To comply with our legal and regulatory obligations
          </p>
        </div>
        <div className="el-cols">
          <p>
            Ensuring business policies are adhered to, e.g., policies
            covering customer service, compliance, underwriting,
            privacy, security and internet use
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to make sure we are following our own internal
            procedures so we can deliver the best service to you
          </p>
        </div>
        <div className="el-cols">
          <p>
            Operational reasons, such as improving efficiency, training
            and quality control
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to be as efficient as we can so we can deliver the
            best service for you at the best price
          </p>
        </div>
        <div className="el-cols">
          <p>
            Ensuring the confidentiality of commercially sensitive
            information
          </p>
          <div>
            For our legitimate interests or those of a third party,
            i.e., to protect trade secrets and other commercially
            valuable information 
            <p>

            To comply with our legal and regulatory obligations
            </p>
          </div>
        </div>
        <div className="el-cols">
          <p>
            Statistical analysis to help us manage our business, e.g.,
            in relation to our financial performance, customer base,
            services and product range or other efficiency measures
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to be as efficient as we can so we can deliver the
            best service for you at the best price
          </p>
        </div>
        <div className="el-cols">
          <p>
            Preventing unauthorized access and modifications to systems
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to prevent and detect criminal activity that could be
            damaging for us and for you.
            <span className="el-block">
              To comply with our legal and regulatory obligations
            </span>
          </p>
        </div>
        <div className="el-cols">
          <p>
            Updating and enhancing customer records
          </p>
          <p>
            For the performance of our contract with you or to take
            steps at your request before entering into a contract

            <span className="el-block">
              To comply with our legal and regulatory obligations
            </span>

            <span className="el-block">
              For our legitimate interests or those of a third party,
              e.g., making sure that we can keep in touch with our
              customers about existing services and new products and
              services.
            </span>

          </p>
        </div>
        <div className="el-cols">
          <p>Statutory returns</p>
          <p>
            To comply with our legal and regulatory obligations.
          </p>
        </div>
        <div className="el-cols">
          <p>
            Ensuring safe working practices, staff administration and
            assessments
          </p>
          <p>
              To comply with our legal and regulatory obligations
            <span className="el-block">
              For our legitimate interests or those of a third party,
              e.g., to make sure we are following our own internal
              procedures and working efficiently so we can deliver the
              best service to you
            </span>
          </p>
        </div>
        <div className="el-cols">
          <p>
            Marketing our services and those of selected third parties
            to:

            <span className="el-block">
              — existing and former customers;
              — third parties who have previously expressed an interest in
              our services;
              <br />— third parties with whom we have had no previous
              dealings.
            </span>
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to promote our business to existing and former
            customers
          </p>
        </div>
        <div className="el-cols">
        </div>
        <div className="el-cols">
          <p>
            Credit reference checks via external credit reference
            agencies
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to ensure our customers are likely to be able to pay
            for our products and services
          </p>
        </div>
        <div className="el-cols">
          <p>
            External audits and quality checks, e.g., for accreditations
            and the audit of our accounts
          </p>
          <p>
            For our legitimate interests or those of a third party,
            i.e., to maintain our accreditations so we can demonstrate
            we operate at the highest standards.

            <span className="el-block">
              To comply with our legal and regulatory obligations
            </span>
          </p>
        </div>
      </Section>
      <Section id="categories-of-personal-information-we-sold-or-shared" title="6. Categories of Personal Information We Sold or Shared">
        <p>
          In the preceding 12 months, we have sold or shared the
          following categories of personal information:
        </p>
        <ul className="el-list-disc">
          <li>
            Identifiers (e.g., a real name, alias, postal address,
            unique personal identifier, online identifier, Internet
            Protocol address, email address, account name, Social
            Security number, driver&apos;s license number, passport number,
            or other similar identifiers);
          </li>
          <li>
            Information that identifies, relates to, describes, or is
            capable of being associated with, a particular individual,
            including, but not limited to, his or her name, signature,
            Social Security number, physical characteristics or
            description, address, telephone number, passport number,
            driver&apos;s license or state identification card number,
            employment, employment history, bank account number, credit
            card number, debit card number, or any other financial
            information;
          </li>
          <li>
            Characteristics of protected classifications under
            California or federal law.
          </li>
          <li>
            Commercial information (e.g., records of products or
            services purchased, obtained, or considered, or other
            purchasing or consuming histories or tendencies);
          </li>
          <li>Biometric information;</li>
          <li>
            Internet or other electronic network activity information
            (e.g., browsing history, search history, and information
            regarding a consumer&apos;s interaction with an Internet Web
            site, application, or advertisement);
          </li>
          <li>Geolocation data;</li>
          <li>
            Audio, electronic, visual, thermal, olfactory, or similar
            information;
          </li>
          <li>Professional or employment-related information;</li>
          <li>
            Inferences drawn from any of the information identified
            above to create a profile about a consumer reflecting the
            consumer&apos;s preferences, characteristics, psychological
            trends, predispositions, behavior, attitudes, intelligence,
            abilities, and aptitudes; and
          </li>
          <li>Sensitive personal information</li>
        </ul>
      </Section>
      <Section id="definitions" title="7. Definitions">
        <p>
          In the preceding 12 months, we have disclosed the following
          categories of personal information for a business purpose:
        </p>
        <ul className="el-list-disc">
          <li>
            Identifiers (e.g., a real name, alias, postal address,
            unique personal identifier, online identifier, access code,
            email address, account name, Social Security number,
            driver&apos;s license number, passport number, or other similar
            identifiers);
          </li>
          <li>
            Information that identifies, relates to, describes, or is
            capable of being associated with, a particular individual,
            including, but not limited to, his or her name, signature,
            Social Security number, physical characteristics or
            description, address, telephone number, passport number,
            driver&apos;s license or state identification card number,
            insurance policy number, education, employment, employment
            history, bank account number, credit card number, debit card
            number, or any other financial information, medical
            information, or health insurance information;
          </li>
          <li>
            Characteristics of protected classifications under
            California or federal law;
          </li>
          <li>
            Commercial information (e.g., records of products or
            services purchased, obtained, or considered, or other
            purchasing or consuming histories or tendencies);
          </li>
          <li>Biometric information;</li>
          <li>
            Internet or other electronic network activity information
            (e.g., browsing history, search history, and information
            regarding a consumer&apos;s interaction with an Internet Web
            site, application, or advertisement);
          </li>
          <li>Geolocation data;</li>
          <li>
            Audio, electronic, visual, thermal, olfactory, or similar
            information;
          </li>
          <li>Professional or employment-related information;</li>
          <li>
            Inferences drawn from any of the information identified
            above to create a profile about a consumer reflecting the
            consumer&apos;s preferences, characteristics, psychological
            trends, predispositions, behavior, attitudes, intelligence,
            abilities, and aptitudes; and
          </li>
          <li>Sensitive personal information</li>
        </ul>
      </Section>
      <Section id="how-long-your-personal-information-will-be-kept" title="8. How Long Your Personal Information Will Be Kept">
        <p>
          We will keep your personal information while you have an
          account with us or while we are providing products and/or
          services to you. Thereafter, we will keep your personal
          information for as long as is necessary:
        </p>
        <ul className="el-list-disc">
          <li>
            To respond to any questions, complaints or claims made by
            you or on your behalf;
          </li>
          <li>To show that we treated you fairly; or</li>
          <li>To keep records required by law. </li>
        </ul>
        <p>
          We will not retain your personal information for longer than
          necessary for the purposes set out in this policy. Different
          retention periods apply for different types of periods of
          personal information.
        </p>
      </Section>
      <Section id="your-rights-under-the-ccpa" title="9. Your Rights Under the CCPA/CPRA">
        <p>
          You have the right under the California Consumer Privacy Act
          of 2018 (CCPA), as amended by the California Privacy Rights
          Act of 2020 (CPRA), and certain other privacy and data
          protection laws, as applicable, to exercise free of charge:
        </p>
        <div className="el-cols el-cols-stack">
          <div>
            <p className="el-medium">
              Disclosure of Personal Information We Collect About You
            </p>
          </div>
          <div>
            <p>
              You have the right to know, and request disclosure of:
            </p>
            <ul className="el-list-disc">
              <li>
                The categories of personal information we have collected
                about you, including sensitive personal information;
              </li>
              <li>
                The categories of sources from which the personal
                information is collected;
              </li>
              <li>
                Our business or commercial purpose for collecting,
                selling, or sharing personal information;
              </li>
              <li>
                The categories of third parties to whom we disclose
                personal information, if any; and
              </li>
              <li>
                The specific pieces of personal information we have
                collected about you.
              </li>
              <li>Please note that we are not required to:</li>
              <li>
                Retain any personal information about you that was
                collected for a single one-time transaction if, in the
                ordinary course of business, that information about you
                is not retained;
              </li>
              <li>
                Reidentify or otherwise link any data that, in the
                ordinary course of business, is not maintained in a
                manner that would be considered personal information; or
              </li>
              <li>
                Provide the personal information to you more than twice
                in a 12-month period.
              </li>
            </ul>
          </div>
        </div>
        <div className="el-cols el-cols-stack">
          <div>
            <p className="el-medium">
              Disclosure of Personal Information Sold, Shared, or
              Disclosed for a Business Purpose
            </p>
          </div>
          <div>
            <p>
              In connection with any personal information we may sell,
              share, or disclose to a third party for a business
              purpose, you have the right to know:
            </p>
            <p>
              The categories of personal information about you that we
              sold or shared and the categories of third parties to whom
              the personal information was sold or shared; and
            </p>
            <p>
              The categories of personal information that we disclosed
              about you for a business purpose and the categories of
              persons to whom the personal information was disclosed for
              a business purpose.
            </p>
            <p>
              You have the right to opt-out of the sale of your personal
              information or sharing of your personal information for
              the purpose of targeted behavioral advertising. If you
              exercise your right to opt-out of the sale or sharing of
              your personal information, we will refrain from selling or
              sharing your personal information, unless you subsequently
              provide express authorization for the sale or sharing of
              your personal information.
            </p>
            <p>
              To opt-out of the sale or sharing of your personal
              information, visit our homepage and click on the
              &quot;Opt-out/Requests&quot; link here:{" "}
              <Link to={localePath(locale, "do-not-sell-or-share")}>https://www.debtadvice101.com/do-not-sell-or-share</Link>
              .
            </p>
          </div>
        </div>
        <div className="el-cols el-cols-stack">
          <div className="el-medium">
            <p>Right to Limit Use of Sensitive Personal Information</p>
          </div>
          <div>
            <p>
              You have the right to limit the use and disclosure of your
              sensitive personal information to the use which is
              necessary to: Perform the services or provide the services
              reasonably expected by an average consumer who requests
              those services; To perform the following services:
            </p>
            <p>
              Helping to ensure security and integrity to the extent the
              use of the consumer&apos;s personal information is reasonably
              necessary and proportionate for these purposes;
            </p>
            <p>
              Short-term, transient use, including, but not limited to,
              non-personalized advertising shown as part of a consumer&apos;s
              current interaction with the business, provided that the
              consumer&apos;s personal information is not disclosed to
              another third party and is not used to build a profile
              about the consumer or otherwise alter the consumer&apos;s
              experience outside the current interaction with the
              business;
            </p>
            <p>
              Performing services on behalf of the business, including
              maintaining or servicing accounts, providing customer
              service, processing transactions, verifying customer
              information, processing payments, providing consumer
              financial services or products, providing analytic
              services, providing storage, or providing similar services
              on behalf of the business; and Undertaking activities to
              verify or maintain the quality of a service, and to
              improve, upgrade, or enhance the service; and
            </p>
            <p>
              As authorized by further regulations you have a right to
              know if your sensitive personal information may be used,
              or disclosed to a service provider or contractor, for
              additional, specified purposes.
            </p>
            <p>
              To limit the use of your sensitive personal information,
              visit our homepage and click on the &quot;Opt-out/Requests&quot;
              link here:{" "}
              <Link to={localePath(locale, "do-not-sell-or-share")}>https://www.debtadvice101.com/do-not-sell-or-share</Link>
              .
            </p>
          </div>
        </div>
        <div className="el-cols el-cols-stack">
          <div>
            <p className="el-medium">Right to Deletion</p>
          </div>
          <div>
            <p>
              Subject to certain exceptions set out below, on receipt of
              a verifiable request from you, we will:
            </p>
            <p>
              Delete your personal information from our records;
              and
            </p>
            <p>
              Direct any service providers or contractors to delete
              your personal information from their records.
            </p>
            <p>
              Direct third parties to whom the business has sold or
              shared your personal information to delete your personal
              information unless this proves impossible or involves
              disproportionate effort.
            </p>
            <p>
              Please note that we may not delete your personal
              information if it is reasonably necessary to:
            </p>
            <p>
              Complete the transaction for which the personal
              information was collected, provide a service requested by
              you, or reasonably anticipated within the context of our
              ongoing business relationship with you, or otherwise
              perform a contract between you and us;
            </p>
            <p>
              Help to ensure security and integrity to the extent the
              use of the consumer&apos;s personal information is reasonably
              necessary and proportionate for those purposes;
            </p>
            <p>
              Debug to identify and repair errors that impair existing
              intended functionality;
            </p>
            <p>
              Exercise free speech, ensure the right of another consumer
              to exercise his or her right of free speech, or exercise
              another right provided for by law;
            </p>
            <p>
              Comply with the California Electronic Communications
              Privacy Act;
            </p>
            <p>
              Enable solely internal uses that are reasonably aligned
              with your expectations based on your relationship with us;
            </p>
            <p>Comply with an existing legal obligation; or</p>
            <p>
              Otherwise use your personal information, internally, in a
              lawful manner that is compatible with the context in which
              you provided the information.
            </p>
          </div>
        </div>
        <div className="el-cols el-cols-stack">
          <div className="el-medium">
            <p>Right of Correction</p>
          </div>
          <div>
            If we maintain inaccurate personal information about you,
            you have the right to request us to correct that inaccurate
            personal information. Upon receipt of a verifiable request
            from you, we will use commercially reasonable efforts to
            correct the inaccurate personal information.
          </div>
        </div>
        <div className="el-cols el-cols-stack">
          <div className="el-medium">
            Protection Against Retaliation
          </div>
          <div>
            <p>
              You have the right to not be retaliated against by us
              because you exercised any of your rights under the
              CCPA/CPRA. This means we cannot, among other things:
            </p>
            <p>Deny services to you;</p>
            <p>
              Charge different prices or rates for services, including
              through the use of discounts or other benefits or imposing
              penalties;
            </p>
            <p>
              Provide a different level or quality of services to you;
              or<br/>Suggest that you will receive a different price or rate
              for services or a different level or quality of services.
            </p>
            <p>
              Please note that we may charge a different price or rate
              or provide a different level or quality of services to
              you, if that difference is reasonably related to the value
              provided to our business by your personal information. We
              may also offer loyalty, rewards, premium features,
              discounts, or club card programs consistent with these
              rights or payments as compensation, for the collection of
              personal information, the sale of personal information, or
              the retention of personal information.
            </p>
          </div>
        </div>
      </Section>
      <Section id="how-to-exercise-your-rights" title="10. How to Exercise Your Rights">
        <p>
          If you would like to exercise any of your rights as described
          in this Privacy Policy, you can do so here:{" "}
          <Link to={localePath(locale, "do-not-sell-or-share")}>https://www.debtadvice101.com/do-not-sell-or-share</Link>. You may also call us at
          {PHONE} or email us at{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>, or
          write to us at Nationwide Financial Group LLC d/b/a Debt Advice 101,
          ATTN: Privacy, 898 S State St, Ste 310, #920, Orem, UT 84097.


        </p>
        <p>
          Please note that you may only make a CCPA/CPRA-related data
          access or data portability disclosure request twice within a
          12-month period.
        </p>
        <p>
          If you choose to contact us directly by website, email, phone,
          or in writing, you will need to provide us with:
        </p>
        <ul className="el-list-disc">
          <li>
            Enough information to identify you (e.g., your full name,
            address and customer access code or number);
          </li>
          <li>
            Proof of your identity and address (e.g., a copy of your
            driving license or passport and a recent utility or credit
            card bill); and
          </li>
          <li>
            A description of what right you want to exercise and the
            information to which your request relates.
          </li>
        </ul>
        <p>
          We are not obligated to make a data access or data portability
          disclosure if we cannot verify that the person making the
          request is the person about whom we collected information or
          is someone authorized to act on such person&apos;s behalf.
        </p>
        <p>
          Any personal information we collect from you to verify your
          identity in connection with your request will be used solely
          for the purposes of verification.
        </p>
      </Section>
  </LegalPage>
)
CaliforniaPolicy.ownLayout = true
