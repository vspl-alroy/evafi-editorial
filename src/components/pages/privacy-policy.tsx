import * as React from "react"
import type { PageView } from "."
import { LegalPage, Section } from "../legal-page"

const PHONE = "(877) 382-3422"
const EMAIL = "privacy@debtadvice101.com"

const SECTIONS = [
  { id: "your-rights-as-a-consumer", label: "Your Rights as a Consumer" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "use-of-personal-information", label: "Use of Personal Information" },
  { id: "sharing-personal-information", label: "Sharing Personal Information" },
  { id: "basic-categories-of-rights", label: "Basic Categories of Rights" },
  { id: "Access-to-Specific-information-and-data-portability-rights", label: "Access to Specific Information and Data Portability Rights" },
  { id: "deletion-request-rights", label: "Deletion Request Rights" },
  { id: "exercising-access", label: "Exercising Access, Data Portability, and Deletion Rights" },
  { id: "response-time-format", label: "Response Time and Format" },
  { id: "personal-information-sales-opt-out-and-opt-in-rights", label: "Personal Information Sales Opt-Out and Opt-In Rights" },
  { id: "minors", label: "Minors" },
  { id: "non-discrimination", label: "Non-Discrimination" },
  { id: "right-to-opt-in-processing-of-sensitive-data", label: "Right to Opt-In for the Processing of Sensitive Data" },
  { id: "public-service-members", label: "Public Service members" },
  { id: "changes-to-privay-policy", label: "Changes to this Privacy Policy" },
  { id: "other-california-rights", label: "Other California Rights" },
  { id: "data-privacy-demand-statistics", label: "Data-Privacy Demand Statistics" },
  { id: "contact-information", label: "Contact Information" },
]

export const PrivacyPolicy: PageView = () => (
  <LegalPage title="Privacy Policy" updated="August 2026" sections={SECTIONS} intro={<>
      <p className="el-lead">
        WE RESPECT YOUR PRIVACY. WE DO NOT COLLECT, USE, SELL OR SHARE
        YOUR INFORMATION EXCEPT AS AUTHORIZED BY YOU, AS DESCRIBED IN
        THIS PRIVACY POLICY, AND AS ALLOWED OR REQUIRED BY LAW. WE DO
        NOT MONITOR, COLLECT, STORE OR SHARE YOUR DATA EXCEPT AS SET
        FORTH BELOW.
      </p>
      <p className="el-lead">
        This Privacy Policy supersedes all prior versions and sets forth
        the data privacy practices of Nationwide Financial Group LLC
        d/b/a Debt Advice 101 (&quot;Debt Advice 101,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and applies solely
        to our clients, visitors and users (&quot;consumers&quot; or &quot;you&quot;) doing
        business with us, and our website and other online applications
        owned and operated by us, including our existing customers who
        make any use of the same. This policy does not apply to any
        third-party websites we may link to and we assume no
        responsibility or liability regarding the same.
      </p>
      <p className="el-lead">
        Our websites may at times record your interactions with it,
        including for example your interactions with our online
        consent/opt-in forms and webchat features. Do not make any use
        of our sites if you do not consent for us to engage in this
        practice. Our websites currently lack the ability to recognize
        and honor Do-Not-Track browser signaling.
      </p>
      <p className="el-lead">
        If you are an existing customer, your use of our websites and
        other services is also governed by the Terms of Use and any
        other agreed upon terms which existed at the time of your
        initial contact and use of our services, along with any
        addendums and written modifications thereto.{" "}
      </p>
      <p className="el-lead">
        We adopt this policy to comply with state data privacy statutes
        in CA, CO, CT, DE, IN, IA, KY, MD, MN, MT, NE, NH, NJ, OR, RI,
        TN, TX, UT and VA, most of which are new and some of which have
        not yet taken effect. We also adopt this policy to comply with
        the federal Gramm-Leach-Bliley Act (&quot;GLBA&quot;). Additional
        GLBA-related disclosures are located in our federal{" "}
        Privacy Notice{" "}
        at{" "}
          www.debtadvice101.com/privacy-notice
        . Nothing herein may be construed as creating any obligations
        for us beyond what is required by the law, but we will not ask
        or require you to waive any of your statutory privacy rights.
        Individuals with disabilities who need these disclosures
        presented in an alternate medium may contact us at the email
        address or telephone number listed further below.
      </p>
  </>}>
      <Section id="your-rights-as-a-consumer" title="1. Your Rights as a Consumer">
        <p>
          Depending upon where you live and as more fully explained
          below, you may have significant rights related to the privacy
          of your personal information, including:
        </p>
        <ul className="el-list-disc">
          <li>Right to access your data.</li>
          <li>Right to correct your data.</li>
          <li>Right to have your data deleted.</li>
          <li>
            Right to opt-out of certain forms of processing of your
            data.
          </li>
          <li>Right to portability of your data.</li>
          <li>Right to opt-out from the sale of your data.</li>
          <li>
            Right to opt-in for certain sensitive data processing.
          </li>
          <li>
            Right against certain forms of automated decision-making
            about your data.
          </li>
          <li>
            And, in California, the right to bring a private action to
            protect your data.
          </li>
        </ul>
        <p>
          You also have specific rights related to your privacy under
          the Federal Gramm-Leach-Bliley Act (GLBA), as amended. Our
          federal{" "}
          Privacy Notice{" "}
          is located at www.debtadvice101.com, but if you are a customer
          of ours, you will also receive a copy of that notice via email
          at the beginning of the customer relationship and if
          applicable, to existing customers at least annually.
        </p>
      </Section>

      <Section id="information-we-collect" title="2. Information We Collect">
        <p>
          We collect your personal information on our websites in order
          to contact you with the information you request. We also
          collect your information in order to allow us and our
          conspicuously listed/disclosed partners to contact you with
          the marketing offers you have requested or which we believe
          you may be interested in based upon the information you submit.
        </p>
        <p>
          As more fully set forth below, and by way of example only, we
          affirmatively collect various categories of information about
          you, including your first and last name, address, telephone
          number, email address, date of birth, Social Security number,
          income, pay frequency, rent, housing type, names of creditors,
          outstanding balances on debt, status of the payment of debt,
          personal expenses, amount of debt, employment information,
          credit score, data from credit reports, bank account
          information, military status, marital status, data collected
          through recorded calls and other interactions with our
          website, cookies, pixels, session replay, IP address and other
          geolocation data, and other personal information.
        </p>
        <p>
          When you type your name and telephone number into our website
          or otherwise submit the same to us, you agree that this shall
          act as your electronic signature and express written consent
          that Debt Advice 101, along with its agents, assigns and listed
          partners, may call and text you at the number(s) provided (or
          provided later), with marketing offers and other information,
          including possibly using an automatic telephone dialing
          system, prerecorded messages, and artificial/AI voices.
          Consent is not a condition of purchase and you may opt out
          later. Standard rates apply and all calls may be recorded and
          monitored. By consenting, you are specifically requesting that
          we share your information in this manner and for these
          purposes. You agree to do business with us electronically and
          to receive copies of these terms electronically. You can
          withdraw your electronic signature or request a paper copy by
          emailing us at{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <p>
          We collect information that identifies, relates to, describes,
          references, is capable of being associated with, or could
          reasonably be linked, directly or indirectly, with a
          particular consumer or device (&quot;personal information&quot;).
          Specifically, we have collected the following categories of
          personal information within the last twelve (12) months:
        </p>

        <table className="el-table">
          <colgroup>
            <col />
            <col />
          </colgroup>

          <tbody>
            <tr>
              <td>Category</td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>Examples</td>
                      <td>Collected</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>A. Identifiers.</p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          A real name, alias, postal address, unique
                          personal identifier, online identifier,
                          Internet Protocol address, and email address.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>
                          Social Security number, driver&apos;s license
                          number, passport number, or other similar
                          identifiers.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                  B. Personal information categories listed in the
                  California Customer Records statute (Cal. Civ. Code §
                  1798.80(e)).
                </p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          A name, address, telephone number, and
                          education. Some personal information included
                          in this category may overlap with other
                          categories.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>
                          Signature, Social Security number, physical
                          characteristics or description, passport
                          number, driver&apos;s license or state
                          identification card number, insurance policy
                          number, employment, employment history, bank
                          account number, credit card number, debit card
                          number, or any other financial information,
                          medical information, or health insurance
                          information.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                  C. Protected classification characteristics under
                  state or federal law.
                </p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Age (40 years or older), race, color,
                          ancestry, national origin, citizenship,
                          religion or creed, marital status, sex
                          (including gender, gender identity), and
                          veteran or military status.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>
                          Medical condition, physical or mental
                          disability, gender expression, pregnancy or
                          childbirth and related medical conditions,
                          sexual orientation, and genetic information
                          (including familial genetic information).
                        </p>
                      </td>
                      <td>
                        <p>
                          NO, except for the health information of
                          employees.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>D. Commercial information.</p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Records of personal property, products or
                          services purchased, obtained, or considered,
                          or other purchasing or consuming histories or
                          tendencies.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>E. Biometric information.</p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Genetic, physiological, behavioral, and
                          biological characteristics, or activity
                          patterns used to extract a template or other
                          identifier or identifying information, such as
                          fingerprints, faceprints, and voiceprints,
                          iris or retina scans, keystroke, gait, or
                          other physical patterns, and sleep, health, or
                          exercise data.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                  F. Internet or other similar network activity.
                </p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Browsing history, search history, information
                          on a consumer&apos;s interaction with a website,
                          application, or advertisement.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>G. Geolocation data.</p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Physical location or movements.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>H. Sensory data.</p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Audio, electronic, visual, thermal, olfactory,
                          or similar information.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                  I. Professional or employment-related information.
                </p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p></p>
                        Current or past job history or performance
                        evaluations.
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                  J. Non-public education information (per the Family
                  Educational Rights and Privacy Act (20 U.S.C. Section
                  1232g, 34 C.F.R. Part 99)).
                </p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          {" "}
                          Education records directly related to a
                          student maintained by an educational
                          institution or party acting on its behalf,
                          such as grades, transcripts, class lists,
                          student schedules, student identification
                          codes, student financial information, or
                          student disciplinary records.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                  K. Inferences drawn from other personal information.
                </p>
              </td>
              <td>
                <table className="el-table-inner">
                  <colgroup>
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          Profile reflecting a person&apos;s preferences,
                          characteristics, psychological trends,
                          predispositions, behavior, attitudes,
                          intelligence, abilities, and aptitudes.
                        </p>
                      </td>
                      <td>
                        <p>YES</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          We obtain the categories of personal information listed above
          from the following sources:
        </p>
        <ul className="el-list-disc">
          <li>
            Directly from individuals through activity on our website,
            including information provided via web opt-in forms and
            through our Chat with Eva feature.
          </li>
          <li>
            From third-party lead vendors who collect permission from
            individuals to share their information with us.
          </li>
          <li>
            From credit reporting agencies and data aggregators, which
            may include both aggregate and individual data, used solely
            for providing requested services.
          </li>
          <li>
            From third parties that support our services, including
            advertising networks, consumer data resellers, data
            analytics providers, internet service providers, social
            networks, and operating systems and platforms. We also
            gather information from government entities, publicly
            available records, and databases when necessary for service
            fulfillment.{" "}
          </li>
        </ul>

        <p>
          We ensure that all personal information obtained is used
          exclusively to provide the services requested by our
          customers. Opt-in data, including phone numbers, names, and
          addresses, is never shared or sold to third parties.  No
          mobile information will be shared with third
          parties/affiliates for marketing/promotional purposes. All
          other categories exclude text messaging originator opt-in data
          and consent; this information will not be shared with any
          third parties.
        </p>
      </Section>

      <Section id="use-of-personal-information" title="3. Use of Personal Information">
        <p>
          We may use or disclose the personal information we collect for
          one or more of the following business purposes:
        </p>
        <ul className="el-list-disc">
          <li>To fulfill our obligations to existing customers.</li>
          <li>To document our compliance with the law.</li>
          <li>
            To provide services to the party or parties listed in the
            website form on which you provided your information, per
            your request.
          </li>
          <li>
            To fulfill or meet the reason you provided the information.
            For example, if you share your name and contact information
            to apply for a loan or other financial services or products,
            or ask a question about our products or services, we will
            use that personal information to respond to your inquiry. If
            you provide your personal information to purchase a product
            or service, we will use that information to process your
            payment and facilitate delivery. We may also save your
            information to facilitate new product orders or process
            cancellations.
          </li>
          <li>
            To provide you with support and to respond to your
            inquiries, including to investigate and address your
            concerns and monitor and improve our responses.
          </li>
          <li>
            To provide you with information, products or services that
            you request from us.
          </li>
          <li>
            To carry out our obligations and enforce our rights arising
            from any contracts entered into between you and us,
            including for billing and collections.
          </li>
          <li>
            To improve our website and present its contents to you.
          </li>
          <li>
            For testing, research, analysis and product development.
          </li>
          <li>
            As necessary or appropriate to protect the rights, property
            or safety of us, our clients or others.
          </li>
          <li>
            To respond to law enforcement requests and as required by
            applicable law, court order, or governmental regulations.
          </li>
          <li>
            As described to you when collecting your personal
            information or as otherwise set forth in the various state
            data privacy statutes and regulations.
          </li>
        </ul>
        <p>
          We will not collect additional categories of personal
          information or use the personal information we collected for
          materially different, unrelated, or incompatible purposes
          without providing you notice.
        </p>
      </Section>

      <Section id="sharing-personal-information" title="4. Sharing Personal Information">
        <p>
          Debt Advice 101 is committed to protecting your personal information. We
          do not sell, share, or disclose opt-in data—including phone
          numbers, names, and addresses—to any third party for any
          purpose, except to the Financial Service Providers with whom
          you have asked us to connect you.{" "}
        </p>
        <p>
          {" "}
          We may disclose your personal information to service providers
          who assist us in delivering our products and services, and to
          the Financial Service Providers with whom you have asked us to
          connect you. These service providers are contractually bound
          to use your information only for the specific services they
          provide to Debt Advice 101 and are required to maintain the
          confidentiality and security of your data.{" "}
        </p>
        <p>
          {" "}
          In the preceding twelve (12) months, we have disclosed the
          following categories of personal information for business
          operations and, at your request, to Financial Service
          Providers: unique personal identifiers, protected
          classification characteristics, commercial information,
          internet or other electronic network activity information,
          geolocation information, sensory data (including recordings
          and transcriptions), professional or employment information,
          and inferences or conclusions drawn from personal
          information.{" "}
        </p>
        <p>
          {" "}
          We do not sell opt-in data to marketing partners, corporate
          affiliates, or unaffiliated third parties for their own
          marketing purposes. All opt-in data remains confidential and
          is used solely to provide the services requested by our
          customers.{" "}
        </p>
      </Section>

      <Section id="basic-categories-of-rights" title="5. Basic Categories of Rights">
        <p>
          As set forth herein, if you live in CA, CO, CT, DE, IN, IA,
          KY, MD, MN, MT, NE, NH, NJ, OR, RI, TN, TX, UT or VA, you may
          have most or all of the following rights related to the
          privacy of your personal information, including:
        </p>
        <ul className="el-list-disc">
          <li>Right to access your data.</li>
          <li>Right to correct your data.</li>
          <li>Right to have your data deleted.</li>
          <li>
            Right to opt out of certain forms of processing of your
            data.
          </li>
          <li>Right to portability of your data.</li>
          <li>Right to opt out of the sale of your data.</li>
          <li>
            Right to opt in for certain sensitive data processing.
          </li>
          <li>
            Right against certain forms of automated decision-making
            about your data.
          </li>
          <li>
            And, only in California currently, a right to bring a
            private action to protect your data.
          </li>
        </ul>
      </Section>
      <Section id="Access-to-Specific-information-and-data-portability-rights" title="6. Access to Specific Information and Data Portability Rights">
        <p>
          Residents of applicable data privacy states have the right to
          request that we disclose certain information about our
          collection and use of your personal information over the past
          12 months. Once we receive and verify your consumer request
          (if possible), we will provide the following:
        </p>
        <ul className="el-list-disc">
          <li>
            The categories of personal information we collected about
            you.
          </li>
          <li>
            The categories of sources from which we collected your
            personal information.
          </li>
          <li>
            Our business or commercial purpose for collecting that
            personal information.
          </li>
          <li>
            The categories of third parties, if any, with whom we have
            shared your personal information.
          </li>
          <li>
            The specific pieces of personal information we collected
            about you (also known as a data portability request).
          </li>
          <li>
            If we disclosed your personal information for a business
            purpose, a list identifying the categories of personal
            information disclosed and the categories of recipients.
          </li>
        </ul>
        <p>
          {" "}
          <span className="el-medium">Please note:</span> Nationwide
          Financial Group LLC d/b/a Debt Advice 101 does{" "}
          <span className="el-medium">not</span> sell personal
          information.
        </p>
        <p>
          In some cases, we may be unable to verify your identity or
          disclose certain information if it is too sensitive or if
          legal exemptions apply. If we are unable to fulfill your
          request, we will inform you of the reason.
        </p>
      </Section>
      <Section id="deletion-request-rights" title="7. Deletion Request Rights">
        <p>
          After we have verified your identity and that you reside in
          one of the current, active data privacy states, you have the
          right to request that we delete any of your personal
          information that we collected from you and retained, subject
          to certain exceptions. Once we receive and confirm your
          verifiable consumer request, we will delete (and direct our
          service providers to delete) your personal information from
          our records, unless an exception applies. We may deny your
          deletion request if retaining the information is necessary for
          us or our service providers to:
        </p>
        <ul className="el-list-disc">
          <li>
            Complete the transaction for which we collected the personal
            information, provide a good or service that you requested,
            take actions reasonably anticipated within the context of
            our ongoing business relationship with you, or otherwise
            perform our contract with you.
          </li>
          <li>
            Detect security incidents, protect against malicious,
            deceptive, fraudulent, or illegal activity, or prosecute
            those responsible for such activities.
          </li>
          <li>
            Debug products to identify and repair errors that impair
            existing intended functionality.
          </li>
          <li>
            Exercise free speech, ensure the right of another consumer
            to exercise their free speech rights, or exercise another
            right provided for by law.
          </li>
          <li>Comply with the law.</li>
          <li>
            Engage in public or peer-reviewed scientific, historical, or
            statistical research in the public interest that adheres to
            all other applicable ethics and privacy laws, when the
            information&apos;s deletion may likely render impossible or
            seriously impair the research&apos;s achievement, if you
            previously provided informed consent.
          </li>
          <li>
            Enable solely internal uses that are reasonably aligned with
            consumer expectations based on your relationship with us.
          </li>
          <li>Comply with a legal obligation.</li>
          <li>
            Make other internal and lawful uses of that information that
            are compatible with the context in which you provided it.
          </li>
        </ul>
      </Section>
      <Section id="exercising-access" title="8. Exercising Access, Data Portability, and Deletion Rights">
        <p>
          To exercise the access, data portability, and deletion rights
          described above, please submit a verifiable consumer request
          to us by calling us at {PHONE}, or by emailing the
          request to:{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <p>
          Please note that only you or a person properly registered that
          you authorize to act on your behalf, may make a verifiable
          consumer request related to your personal information. You may
          also make a verifiable consumer request on behalf of your
          minor child.
        </p>

        <p>
          You may only make a verifiable consumer request for access or
          data portability twice within a 12-month period.
        </p>

        <p>
          We cannot respond to your request or provide you with personal
          information if we cannot verify your identity or authority to
          make the request and confirm the personal information relates
          to you. Making a verifiable consumer request does not require
          you to create an account with us. We will only use personal
          information provided in a verifiable consumer request to
          verify the requestor&apos;s identity or authority to make the
          request.{" "}
        </p>

        <p>
          When proving your identity to us, you will need to either
          provide a legible copy of your government-issued photo ID, or
          if not, then by providing at a minimum at least 3 specific
          data points which we already maintain about you. Often
          additional data points will need to be provided and possibly a
          signed affidavit. We will try not to collect more personal
          information than is necessary to successfully verify your
          identity.
        </p>
      </Section>
      <Section id="response-time-format" title="9. Response Time and Format">
        <p>
          We will generally confirm receipt of your Request within 10
          days and fulfill your request within 45 days, or up to 90 days
          if we notify you as to why we need more time.
        </p>
        <p>
          We will deliver our written response by mail or
          electronically. Any disclosures we provide will only cover the
          12-month period preceding the verifiable consumer request&apos;s
          receipt. The response we provide will also explain the reasons
          we cannot comply with a request, if applicable. For data
          portability requests, we will select a format to provide your
          personal information that is readily useable and should allow
          you to transmit the information from one entity to another
          entity without hindrance.
        </p>
        <p>
          We do not charge a fee to process or respond to your
          verifiable consumer request unless it is excessive,
          repetitive, or manifestly unfounded. If we determine that the
          request warrants a fee, we will tell you why we made that
          decision and provide you with a cost estimate before
          completing your request.
        </p>
      </Section>
      <Section id="personal-information-sales-opt-out-and-opt-in-rights" title="10. Personal Information Sales Opt-Out and Opt-In Rights">
        <p>
          If you are 16 years of age or older, you have the right to
          direct us not to share your personal information with third
          parties for purposes beyond providing our services (the &quot;right
          to opt-out&quot;). We do not share or sell the personal information
          of consumers we know are under 18 years of age.
        </p>
        <br />
        <p>
          Consumers who have previously consented to information sharing
          may opt out at any time. To exercise your right to opt-out,
          you (or your authorized representative) may submit a request
          by calling us at {PHONE} or by emailing us at{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <br />
        <p>
          Once you make an opt-out request, we will honor it unless you
          choose to opt back in by contacting us using the same methods
          above. We will only use the personal information provided in
          an opt-out request to review and process your request.
        </p>
      </Section>
      <Section id="minors" title="11. Minors">
        <p>
          Minors may not use our websites or submit information to us.
          We do not intentionally collect information about minors.
        </p>
      </Section>
      <Section id="non-discrimination" title="12. Non-Discrimination">
        <p>
          We will not discriminate against you for exercising any of your privacy rights.
        </p>
      </Section>
      <Section id="right-to-opt-in-processing-of-sensitive-data" title="13. Right to Opt-In for the Processing of Sensitive Data">
        <p>
          We will ask for your permission (opt-in), through your
          agreement to this Privacy Policy and otherwise, before we
          process any of your sensitive personal information, including:
        </p>
        <ul className="el-list-disc">
          <li>Account log-in.</li>
          <li>Financial account.</li>
          <li>
            Debit card or credit card number in combination with any
            required security or access code, password, or credentials
            allowing access to an account.
          </li>
          <li>
            The contents of a consumer&apos;s communications where the
            business is not the recipient.
          </li>
          <li>
            Government ID information (e.g., Social Security, driver&apos;s
            license, state ID, or passport number).
          </li>
          <li>Philosophical beliefs.</li>
          <li>Union membership.</li>
        </ul>
      </Section>
      <Section id="public-service-members" title="14. Public Service members">
        <p>
          We value the privacy of public service members and do not
          publish or otherwise make available the information related to
          the same to the public. If you are a public service member
          including for example a current or retired judge, prosecutor
          or police officer, do not submit any private, non-public
          contact information to us. If you do, you agree that, to the
          extent your non-public contact information is protected by
          applicable state law (like New Jersey&apos;s &quot;Daniels Law&quot; or West
          Virginia Code Section 5A-8-24), you will exercise your right
          to opt-out (a non-disclosure request) only by emailing your
          request to{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>, and
          you will allow us a reasonable period to recognize and honor
          your request.
        </p>
      </Section>
      <Section id="changes-to-privay-policy" title="15. Changes to this Privacy Policy">
        <p>
          We reserve the right to amend this Privacy Policy and our
          federal{" "}
          Privacy Notice{" "}
          at our discretion and at any time. When we make changes to
          this Privacy Policy or our federal{" "}
          Privacy Notice
          , we will post the updated Privacy Policy or federal{" "}
          Privacy Notice{" "}
          on the Website and update the notice&apos;s effective date. Your
          continued use of our website following the posting of changes
          constitutes your acceptance of such changes.
        </p>
      </Section>
      <Section id="other-california-rights" title="16. Other California Rights">
        <p>
          California&apos;s &quot;Shine the Light&quot; law (Civil Code § 1798.83)
          provides California residents with the right to request
          information regarding our disclosure of personal information
          to third parties for their direct marketing purposes. To make
          a request, please contact us at the following email address or
          phone number: {PHONE}, or by making a request using the
          following email:{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </Section>
      <Section id="data-privacy-demand-statistics" title="17. Data-Privacy Demand Statistics">
        <p>
          We disclose the following information in compliance with the
          California Consumer Privacy Act (CCPA) and other applicable
          privacy regulations:
        </p>
        <ul className="el-list-disc">
          <li>
            The number of requests received during the previous calendar
            year to delete, know, access, opt-out of data transfers, or
            limit the use of a consumer&apos;s personal information, along
            with the number of requests fulfilled (in whole or in part)
            and denied.
          </li>
          <li>
            The median and mean number of days within which Debt Advice 101
            substantively responded to these requests.
          </li>
          <li>
            The number of requests where deletion was not completed due
            to a valid statutory exemption.{" "}
          </li>
        </ul>
        <p>
          Debt Advice 101 shares personal information with Financial Service
          Providers at your request and upholds strict data privacy
          practices in line with all applicable regulations. You may opt
          out at any time as described in Section 10.
        </p>
      </Section>
      <Section id="contact-information" title="18. Contact Information">
        <p>
          If you have any questions or comments about this Privacy
          Policy, the ways in which we collect and use your personal
          information, your choices and rights regarding such use, or
          wish to exercise your rights under applicable privacy laws,
          please do not hesitate to contact us at:
        </p>
        <p>
          Attn: Privacy Officer <br />
          Nationwide Financial Group LLC d/b/a Debt Advice 101
          <br />
          898 S State St, Ste 310, #920, Orem, UT 84097
          <br />
          Email:{" "}
          <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <br />
          Phone: {PHONE}
          <br />
        </p>
      </Section>
  </LegalPage>
)
PrivacyPolicy.ownLayout = true
