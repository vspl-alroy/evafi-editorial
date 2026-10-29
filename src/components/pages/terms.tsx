import * as React from "react"
import type { PageView } from "."
import { LegalPage, Section } from "../legal-page"

// /terms/ (footer "Terms"). Copied from EvaFi src/ui/landing/Terms.tsx (origin/main 281f599). Keep the wording 1:1;
// only these are swapped (EVA-354): the name EvaFi (also in "Nationwide Financial Group LLC d/b/a …"), the site
// www.evafi.com, the email info@evafi.com and the phone; EvaFi's vanity number "(877) EVA-FI22" is dropped.
// Layout and styles: LegalPage (Debt Advice 101 design system); header, footer and <head> come from templates/page.tsx.
// TODO: placeholder until Debt Advice 101 has its own number (EVA-328). Replace before launch.
// TODO: Tori to confirm "Chat with Eva" (section 17), the Utah venue (6, 9), the SMS program (10) and the
// Advertiser Disclosure (19) apply to Debt Advice 101.
const PHONE = "(877) 382-3422"
const EMAIL = "privacy@debtadvice101.com"
const Email = () => <a className="el-plain" href={`mailto:${EMAIL}`}>{EMAIL}</a>

const SECTIONS = [
  { id: "ownership-of-site-acceptance-of-terms", label: "Ownership of Site; Acceptance of Terms" },
  { id: "eligibility-minors", label: "Eligibility; Minors" },
  { id: "no-unlawful-or-prohibited-use-intellectual-property", label: "No Unlawful or Prohibited Use/Intellectual Property" },
  { id: "international-users", label: "International Users" },
  { id: "indemnification", label: "Indemnification" },
  { id: "arbitration", label: "Arbitration" },
  { id: "class-action-waiver", label: "Class Action Waiver" },
  { id: "liability-disclaimer-limitation-of-liability", label: "Liability Disclaimer; Limitation of Liability" },
  { id: "termination-access-restriction-jurisdiction-and-venue", label: "Termination/Access Restriction/Jurisdiction and Venue" },
  { id: "sms-terms", label: "SMS Terms" },
  { id: "changes-to-terms-modifications", label: "Changes to Terms; Modifications" },
  { id: "privacy", label: "Privacy" },
  { id: "links", label: "Links" },
  { id: "security-of-your-personal-information", label: "Security of your Personal Information" },
  { id: "email-communications", label: "E-mail Communications" },
  { id: "external-data-storage-sites", label: "External Data Storage Sites" },
  { id: "electronic-disclosures-signatures-and-consent", label: "Electronic Disclosures, Signatures, and Consent (aka “E-Sign Consent”)" },
  { id: "reasonable-accommodation", label: "Reasonable Accommodation" },
  { id: "advertiser-disclosure", label: "Advertiser Disclosure" },
  { id: "contact-information", label: "Contact Information" },
]

export const Terms: PageView = () => (
  <LegalPage title="Terms of Use" updated="June 2026" sections={SECTIONS} intro={<>
      <p className="el-lead">
        IMPORTANT – BEFORE INSTALLING, ACCESSING, OR USING ANY PART OF
        THE DEBT ADVICE 101 WEBSITE LOCATED AT WWW.DEBTADVICE101.COM OR ANY LINKED
        WEBSITES AND MOBILE APPLICATIONS (COLLECTIVELY, THE &quot;SITE&quot;) AND
        ANY PROGRAMS, SERVICES, PRODUCTS, MATERIALS, DOCUMENTATION, AND
        INFORMATION AVAILABLE THROUGH THE SITE OR USED IN CONNECTION
        THEREWITH (COLLECTIVELY, THE &quot;SERVICES&quot;), YOU SHOULD READ THE
        FOLLOWING TERMS AND CONDITIONS CONTAINED IN THIS TERMS OF USE
        AGREEMENT (THE &quot;TERMS&quot;) CAREFULLY AS THEY GOVERN YOUR ACCESS TO
        AND USE OF THIS SITE AND THE SERVICES AND ARE LEGALLY BINDING ON
        YOU. DEBT ADVICE 101 IS WILLING TO LICENSE THE USE OF THE SITE TO YOU ONLY
        ON THE CONDITION THAT YOU ACCEPT ALL OF THE TERMS AND CONDITIONS
        CONTAINED IN THE TERMS. IF YOU DO NOT AGREE WITH THE TERMS AND
        CONDITIONS, YOU ARE NOT GRANTED PERMISSION TO ACCESS OR
        OTHERWISE USE THIS SITE OR THE SERVICES AND ARE INSTRUCTED TO
        EXIT THIS SITE IMMEDIATELY. YOUR USE OF THE SITE SHALL BE DEEMED
        TO BE YOUR AGREEMENT TO EACH OF THE TERMS AND CONDITIONS STATED
        IN THE TERMS.
      </p>
      <p className="el-lead">
        ARBITRATION NOTICE: This Agreement contains a binding
        arbitration agreement. The Terms affect your legal rights,
        including an agreement to resolve disputes that may arise
        between us by arbitration on an individual basis instead of by
        class actions or jury trials. As a condition of using this Site,
        you agree that any disputes pertaining to information presented
        herein and use of the Site shall be resolved through binding
        arbitration and not in a court pursuant to the Arbitration and
        Class Action Waiver provisions stated below.
      </p>
    </>}>
      <Section id="ownership-of-site-acceptance-of-terms" title="1. Ownership of Site; Acceptance of Terms">
        <p>
          The Site is owned and operated by Debt Advice 101 and referred to in the
          Terms collectively as &quot;Debt Advice 101,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; and
          &quot;our.&quot; By accessing or using the Site or Services, you agree
          to be bound by the terms and conditions in the Terms and our
          Privacy Policy. If you do not agree with any part of these
          terms and conditions, you must not use the Site or Services.
          The Terms are a legal contract between you and Debt Advice 101.
        </p>
      </Section>

      <Section id="eligibility-minors" title="2. Eligibility; Minors">
        <p>
          The Services are not available to persons generally under the
          age of 18 (unless other minimum age requirements apply based
          on applicable state law) or to persons who are not legal
          residents of the United States. Debt Advice 101 does not knowingly
          solicit or collect, either online or offline, information from
          persons under the age of eighteen. Visitors under eighteen
          (18) years of age are not permitted to use and/or submit their
          personal information at the Site. BY USING THE SITE OR
          APPLYING FOR OR USING ANY OF THE SERVICES, YOU REPRESENT AND
          WARRANT THAT YOU ARE AT LEAST 18 YEARS OF AGE OR THAT YOU ARE
          AT LEAST THE MINIMUM AGE REQUIRED IN YOUR STATE OF RESIDENCE
          AND ARE A LEGAL RESIDENT OF THE UNITED STATES.
        </p>
        <p>
          Minors. Debt Advice 101 does not knowingly solicit or collect, either
          online or offline, information from persons under the age of
          thirteen. Debt Advice 101 encourages parents and guardians to spend time
          online with their children and to participate and monitor the
          interactive activities of their children.
        </p>
      </Section>

      <Section id="no-unlawful-or-prohibited-use-intellectual-property" title="3. No Unlawful or Prohibited Use/Intellectual Property">
        <p>
          You are granted a non-exclusive, non-transferable, revocable
          license to access and use the Site strictly in accordance with
          the Terms. As a condition of your use of the Site, you warrant
          to Debt Advice 101 that you will not use the Site for any purpose that
          is unlawful or prohibited by the Terms. You may not use the
          Site in any manner which could damage, disable, overburden, or
          impair the Site or interfere with any other party&apos;s use and
          enjoyment of the Site. You may not obtain or attempt to obtain
          any materials or information through any means not
          intentionally made available or provided for use through the
          Site.
        </p>
        <p>
          All content included as part of the Site, such as text,
          graphics, logos, images, as well as the compilation thereof,
          and any software used on the Site, is the property of Debt Advice 101 or
          its service providers and protected by copyright and other
          laws that protect intellectual property and proprietary
          rights. You agree to observe and abide by all copyright and
          other proprietary notices, legends or other restrictions
          contained in any such content and will not make any changes
          thereto.
        </p>
        <p>
          You will not modify, publish, transmit, reverse engineer,
          participate in the transfer or sale, create derivative works,
          or in any way exploit any of the content, in whole or in part,
          found on the Site. Debt Advice 101 content is not for resale. Your use
          of the Site does not entitle you to make any unauthorized use
          of any protected content, and in particular you will not
          delete or alter any proprietary rights or attribution notices
          in any content. You will use protected content solely for your
          personal use and will make no other use of the content without
          the express written permission of Debt Advice 101 and the copyright
          owner. You agree that you do not acquire any ownership rights
          in any protected content. We do not grant you any licenses,
          express or implied, to the intellectual property of Debt Advice 101 or
          our licensors except as expressly authorized by these Terms.
        </p>
      </Section>

      <Section id="international-users" title="4. International Users">
        <p>
          The Site and the Services are controlled, operated, offered,
          and administered by Debt Advice 101 from our offices within the United
          States. If you access the Site or Services from a location
          outside the United States, you are responsible for compliance
          with all applicable laws, restrictions, or regulations,
          including without limitation United States export laws and
          regulations.
        </p>
      </Section>

      <Section id="indemnification" title="5. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Debt Advice 101, its
          officers, directors, employees, agents, and third party
          providers, for any losses, costs, liabilities, and expenses
          (including reasonable attorney&apos;s fees) relating to or arising
          out of your use of or inability to use the Site or Services,
          any user postings made by you, your violation of any terms of
          the Terms or your violation of any rights of a third party, or
          your violation of any applicable laws, rules, or
          regulations. Debt Advice 101 reserves the right, at its own cost, to
          assume the exclusive defense and control of any matter
          otherwise subject to indemnification by you, in which event
          you will fully cooperate with Debt Advice 101 in asserting any available
          defenses.
        </p>
      </Section>

      <Section id="arbitration" title="6. Arbitration">
        <p>
          THIS ARBITRATION SECTION DOES NOT APPLY IF (1) YOU ARE A MEMBER OF THE ARMED FORCES OR A DEPENDENT OF SUCH A MEMBER COVERED BY THE FEDERAL MILITARY LENDING ACT AND (2) OUR DISPUTE INVOLVES THE EXTENSION OF CONSUMER CREDIT.
        </p>
        <p>
          In the event the parties are not able to resolve any dispute between them arising out of or concerning the Terms or any provisions hereof, the Sites, or Services, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator&apos;s award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding, or arbitration arises out of or concerns the Terms, the Sites, or Services, the prevailing party shall be entitled to recover its costs and reasonable attorney&apos;s fees. The parties agree to arbitrate all disputes and claims in regard to the Terms, the Sites, or the Services, or any disputes arising as a result of the Terms, the Sites, or the Services, whether directly or indirectly, including tort claims that are a result of the Terms, the Sites, or the Services. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of the Terms, the Sites, and the Services. Notwithstanding the foregoing, either party may bring a qualifying claim or dispute in small claims court in Orem, Utah. Accordingly, both you and Debt Advice 101 consent to the exclusive personal jurisdiction and venue of Orem, Utah.
        </p>
      </Section>

      <Section id="class-action-waiver" title="7. Class Action Waiver">
        <p>
          Any arbitration related to and under the Terms will take place
          on an individual basis; class arbitrations and
          class/representative/collective actions are not permitted. THE
          PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER
          ONLY IN EACH&apos;S INDIVIDUAL CAPACITY. Further, unless both you
          and Debt Advice 101 agree otherwise, the arbitrator may not consolidate
          more than one person&apos;s claims.
        </p>
      </Section>

      <Section id="liability-disclaimer-limitation-of-liability" title="8. Liability Disclaimer; Limitation of Liability">
        <p>
          THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN
          OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR
          TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE
          INFORMATION HEREIN. DEBT ADVICE 101 AND ITS THIRD-PARTY SERVICE
          PROVIDERS MAY MAKE IMPROVEMENTS AND CHANGES IN THE SITE AT ANY
          TIME. DEBT ADVICE 101 AND ITS SERVICE PROVIDERS MAKE NO REPRESENTATIONS
          ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS,
          AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES
          AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO
          THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH
          INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS
          ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OR CONDITION OF ANY
          KIND. DEBT ADVICE 101 AND ITS THIRD-PARTY SERVICE PROVIDERS HEREBY
          DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS
          INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED
          GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
          NON-INFRINGEMENT. TO THE MAXIMUM EXTENT PERMITTED BY
          APPLICABLE LAW, IN NO EVENT SHALL DEBT ADVICE 101 AND ITS THIRD PARTY
          SERVICE PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT,
          PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY
          DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR
          LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY
          CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE
          DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE
          PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY
          INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS
          OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE
          OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE,
          STRICT LIABILITY OR OTHERWISE, EVEN IF DEBT ADVICE 101 OR ANY OF ITS
          THIRD-PARTY SERVICE PROVIDERS HAS BEEN ADVISED OF THE
          POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO
          NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR
          CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY
          NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF
          THE SITE, OR WITH ANY OF THIS TERMS OF USE AGREEMENT, YOUR
          SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.
        </p>
      </Section>

      <Section id="termination-access-restriction-jurisdiction-and-venue" title="9. Termination/Access Restriction/Jurisdiction and Venue">
        <p>
          Debt Advice 101 reserves the right, in its sole discretion, to terminate your access to the Site and the Services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of Utah, where Debt Advice 101&apos;s principal place of business is located, and you hereby consent to the exclusive jurisdiction and venue of courts in Utah in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of the Terms, including, without limitation, this section.
        </p>
        <p>
          You agree that no joint venture, partnership, employment, or agency relationship exists between you and Debt Advice 101 as a result of the Terms or use of the Site. Debt Advice 101&apos;s performance of the Terms is subject to existing laws and legal process, and nothing contained in the Terms is in derogation of Debt Advice 101&apos;s right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by Debt Advice 101 with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect. Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and Debt Advice 101 with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and Debt Advice 101 with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to the Terms to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that the Terms and all related documents be written in English.
        </p>
      </Section>

      <Section id="sms-terms" title="10. SMS Terms">
        <p>
          Consent: By providing your phone number, you become a &quot;Subscriber&quot; and consent to receive calls and text messages from Debt Advice 101, including those made using an automatic telephone dialing system or prerecorded voice. Message and data rates may apply. No purchase is necessary. You may opt-out at any time by following the instructions provided in the messages or via email at <Email />.
        </p>
        <p>
          Message Frequency Disclosure: Subscribers will receive an average of 2 SMS messages per day, depending on the Service you may opt into. Message frequency may vary based on the user&apos;s interaction with Debt Advice 101&apos;s services and promotions.
        </p>
        <p>
          SMS Program Description: Debt Advice 101&apos;s SMS program provides updates, reminders, promotional offers, and important account-related information to Subscribers. Messages may include notifications about loan application statuses, repayment reminders, marketing or exclusive offers for Debt Advice 101&apos;s products and services.
        </p>
        <p>
          &quot;Message and Data Rates May Apply&quot; Disclosure: Message and data rates may apply to SMS communications, depending on your mobile service provider and plan. Check with your mobile provider for details.
        </p>
        <p>
          Opt-Out Information: You may opt-out of and unsubscribe from receiving SMS messages from Debt Advice 101 at any time by replying STOP to any message you receive. After opting out, you will receive one final confirmation message confirming your choice. You may also contact our Customer Service team to unsubscribe and opt-out from Debt Advice 101&apos;s SMS program via email at <Email />, via telephone at {PHONE}, or by mail to Nationwide Financial Group LLC d/b/a Debt Advice 101 898 S STATE ST, STE 310, #920 Orem, UT 84097.
        </p>
      </Section>

      <Section id="changes-to-terms-modifications" title="11. Changes to Terms; Modifications">
        <p>
          Debt Advice 101 reserves the right, in its sole discretion, to change or
          modify the Terms under which the Site is offered. Any
          modifications shall be effective immediately upon posting to
          the Site unless some other effective date is expressly stated
          and will supersede all previous versions. Debt Advice 101 encourages you
          to periodically review the Terms to stay informed of our
          updates. Your use of this Site shall constitute and be deemed
          your unconditional acceptance of the Terms and any changes or
          modifications.
        </p>
      </Section>

      <Section id="privacy" title="12. Privacy">
        <p>
          Your use of the Site is subject to Debt Advice 101&apos;s Privacy Policy and
          federal Privacy Notice. Please review our Privacy Policy,
          which also governs the Site, and informs users of our data
          collection practices, and federal and state privacy rights.
          For California Residents only, please also review our
          California Privacy Policy which supplements the information
          contained in our Online Privacy Policy and Privacy Policy.
        </p>
      </Section>

      <Section id="links" title="13. Links">
        <p>
          This website contains links to other sites. Please be aware
          that we are not responsible for the content or privacy
          practices of such other sites. We encourage our users to be
          aware when they leave our site and to read the privacy
          statements of any other site that collects personally
          identifiable information.
        </p>
      </Section>

      <Section id="security-of-your-personal-information" title="14. Security of your Personal Information">
        <p>
          Debt Advice 101 secures your personal information from unauthorized
          access, use, or disclosure. Debt Advice 101 uses the following methods
          for this purpose:
        </p>
        <p>
          SSL Protocol <br />When personal information (such as a
          credit card number) is transmitted to other websites, it is
          protected through the use of encryption, such as the Secure
          Sockets Layer (SSL) protocol. We strive to take appropriate
          security measures to protect against unauthorized access to or
          alteration of your personal information. Unfortunately, no
          data transmission over the Internet or any wireless network
          can be guaranteed to be 100% secure. As a result, while we
          strive to protect your personal information, you acknowledge
          that: (a) there are security and privacy limitations inherent
          to the Internet which are beyond our control; and (b)
          security, integrity, and privacy of any and all information
          and data exchanged between you and us through this Site cannot
          be guaranteed.
        </p>
      </Section>

      <Section id="email-communications" title="15. E-mail Communications">
        <p>
          From time to time, Debt Advice 101 may contact you via email for the
          purpose of providing announcements, promotional offers,
          alerts, confirmations, surveys, and/or other general
          communication. In order to improve our Services, we may
          receive a notification when you open an email from Debt Advice 101 or
          click on a link therein.
        </p>
        <p>
          If you would like to stop receiving marketing or promotional
          communications via email from Debt Advice 101, you may opt out of such
          communications by replying STOP or clicking on the UNSUBSCRIBE
          button.
        </p>
      </Section>

      <Section id="external-data-storage-sites" title="16. External Data Storage Sites">
        <p>
          We may store your data on servers provided by third party
          hosting vendors with whom we have contracted.
        </p>
      </Section>

      <Section id="electronic-disclosures-signatures-and-consent" title="17. Electronic Disclosures, Signatures, and Consent (aka “E-Sign Consent”)">
        <p>
          Please read this information carefully and print a copy and/or
          retain this information for future reference. By utilizing
          this website and clicking &quot;Chat with Eva&quot; or any similar box
          or submission button, you are submitting a request to be
          connected with one of our third-party advertisers or lenders,
          collectively &quot;third parties.&quot; In order to attempt to connect
          you with a third-party, that may offer you financial products
          or services, the third parties need your consent to use and
          accept electronic signatures, records, and disclosures (our
          &quot;Disclosure and Consent for Electronic Communication Policy&quot;).
          This Policy notifies you of your rights when receiving
          electronic disclosures, notices, information and other forms
          of communication. By submitting your information on our Sites,
          you acknowledge that you have received and reviewed this
          Policy, and that you consent to conduct transactions using
          electronic signatures, electronic disclosures, electronic
          records, and electronic contract documents as further detailed
          in the Disclosure and Consent for Electronic Communication
          Policy linked above.
        </p>
      </Section>

      <Section id="reasonable-accommodation" title="18. Reasonable Accommodation">
        <p>
          Individuals with disabilities who require an accommodation to
          access our Services should contact us using one of the contact
          methods listed below. Certain accommodations may require you
          to provide us with advance notice.
        </p>
      </Section>

      <Section id="advertiser-disclosure" title="19. Advertiser Disclosure">
        <p><b>How Debt Advice 101 works, and how we keep it free</b></p>
        <p>
          Debt Advice 101 shops for you. When you tell us what you&apos;re looking for, our Financial Matching Technology searches our network of financial partners (personal loan lenders, banks, credit unions, and other financial service providers) and presents you with the offers that best fit your request. You see your options in one place, and you decide which one to pursue.
        </p>
        <p>
          There&apos;s no cost to you for this service. To keep it free, Debt Advice 101 may be compensated by the financial partners in our network when we refer you to them or when you take an offer. That compensation is how we pay for the technology and the people who shop on your behalf.
        </p>
        <p>
          A few things to know about our role. Nationwide Financial Group LLC d/b/a Debt Advice 101 is a FinTech company, not a lender. We don&apos;t issue loans or financial products, accept loan applications, or make credit decisions. We find and present offers from our partners; the partner you choose handles the application, the approval, and the loan itself. Because of that, Debt Advice 101 can&apos;t promise an approval, a commitment, or any particular outcome, and the rates, fees, and terms you see on our platform are estimates provided by the partners that can change at their discretion until they finalize your application. Some of the options we present may not be loans. For those, Debt Advice 101 may help you understand the product and complete your enrollment, but the program itself is administered and serviced by the financial service partner under their license and compliance requirements, and under that partner&apos;s terms, and your relationship for that product is with them.
        </p>
        <p>
          Offers vary by partner and may not be available in every state or for every product type. The offers we present may also differ in amount or type from what you requested, because partners make their own decisions about what they can extend to you. Each partner also has its own privacy policy and security practices, which may differ from Debt Advice 101&apos;s, so it&apos;s worth reviewing them before you apply for or accept any loan or service.
        </p>
        <p>
          Our network is made up of partners we&apos;ve chosen to work with, but it isn&apos;t every lender or financial institution in the market. Other options exist outside our platform, and some of them may offer better rates or terms than what you see here. We&apos;ll always present the best offers we find in our network, but we can&apos;t guarantee they&apos;re the best available to you anywhere. Take the time to compare, read the full terms, and choose what works for your situation before you commit.
        </p>
        <p>
          Debt Advice 101 complies with the federal Equal Credit Opportunity Act and applicable state and local anti-discrimination laws, and we work only with partners who are required to do the same. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, receipt of public assistance income, or the good-faith exercise of rights under the Consumer Credit Protection Act.
        </p>
      </Section>

      <Section id="contact-information" title="20. Contact Information">
        <p>
          <b>Nationwide Financial Group LLC d/b/a Debt Advice 101</b><br />
          898 S STATE ST, STE 310, #920<br />
          Orem, UT 84097<br /><br />
          {PHONE}<br />
          <Email />
        </p>
      </Section>
  </LegalPage>
)
Terms.ownLayout = true
