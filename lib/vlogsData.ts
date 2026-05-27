export interface Vlog {
  slug: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  duration: string;
  uploadDate: string;
  thumbnail: string;
  author: string;
  tags: string[];
  transcript: string;
}

export const vlogsData: Vlog[] = [
  {
    slug: "understanding-fir-india",
    title: "Understanding FIR (First Information Report) in India",
    description: "A comprehensive legal guide on filing an FIR, police duties under Section 154 CrPC, and options if a police station refuses your report.",
    videoUrl: "https://www.youtube.com/embed/i0aL1vYQGsw",
    category: "Criminal Law",
    duration: "12:45",
    uploadDate: "2026-04-10",
    thumbnail: "/vlogs/fir-guide.jpg",
    author: "Adv. Pooja Patil",
    tags: ["FIR", "CrPC", "Police Rights", "Criminal Justice"],
    transcript: `
# Understanding FIR (First Information Report) in India

A First Information Report (FIR) is the initial document prepared by the police when they receive information about the commission of a **cognizable offence**. It initiates the process of criminal justice and investigation in India.

## What is a Cognizable Offence?
Under Section 2(c) of the Criminal Procedure Code (CrPC), a cognizable offence is one in which a police officer can arrest the accused without a warrant and can start an investigation without the permission of a magistrate. Examples include:
*   Theft or Burglary
*   Murder or Manslaughter
*   Kidnapping
*   Assault with grievous hurt

For non-cognizable offences, police cannot register an FIR directly or make arrests without a magistrate's order. Instead, a NCR (Non-Cognizable Report) is registered.

## Your Rights When Filing an FIR
1.  **Right to a Free Copy**: Under Section 154(2) CrPC, the informant is entitled to receive a copy of the FIR free of cost immediately.
2.  **Language**: The FIR must be written down in a language understood by you. If you give oral information, the police officer must write it down and read it back to you.
3.  **Zero FIR**: If a crime occurred outside the jurisdiction of the police station you visited, they *must* still record the information and register a "Zero FIR", which they will later transfer to the competent police station.

## What if the Police Refuse to Register your FIR?
If a police officer refuses to write down your report:
*   **Approach the SP**: Under Section 154(3) CrPC, you can send the substance of the information in writing, by post, to the Superintendent of Police (SP).
*   **Magistrate Route**: If the SP fails to act, you can file a private complaint before the Judicial Magistrate under Section 156(3) CrPC, ordering the police to register the FIR and investigate.
    `
  },
  {
    slug: "free-legal-aid-nalsa",
    title: "How to Claim Free Legal Aid in India (NALSA Scheme)",
    description: "Learn about Article 39A of the Indian Constitution, the role of DLSA/NALSA, and how economically weaker sections can get free advocates.",
    videoUrl: "https://www.youtube.com/embed/n4K_z7rO9eM",
    category: "Constitutional Rights",
    duration: "10:15",
    uploadDate: "2026-04-25",
    thumbnail: "/vlogs/legal-aid.jpg",
    author: "Adv. Amish Aggarwala",
    tags: ["Legal Aid", "NALSA", "Constitutional Rights", "DLSA"],
    transcript: `
# How to Claim Free Legal Aid in India (NALSA Scheme)

Access to justice is a fundamental right. Article 39A of the Indian Constitution directs the State to provide free legal aid to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.

## The Legal Services Authorities Act, 1987
To execute Article 39A, the Government of India enacted the Legal Services Authorities Act, creating:
1.  **NALSA** (National Legal Services Authority) - At the national level
2.  **SLSA** (State Legal Services Authority) - At the state level
3.  **DLSA** (District Legal Services Authority) - At the district level in every court complex.

## Who is Eligible for Free Legal Aid?
Section 12 of the Act outlines eligible groups:
*   Women and Children
*   Members of Scheduled Castes (SC) or Scheduled Tribes (ST)
*   Industrial workers
*   Victims of natural disasters, ethnic violence, or floods
*   Disabled persons
*   Persons in custody or in a psychiatric hospital
*   Individuals whose annual income is below the state-specified limit (typically ₹1,00,000 to ₹3,00,000 depending on the state).

## What Services are Free?
If you qualify, the Authority will pay for:
*   Advocate representation in court.
*   Drafting of petitions, appeals, and legal documents.
*   Court fees, drafting charges, and translation expenses.
*   Obtaining certified copies of judgments.
    `
  },
  {
    slug: "divorce-child-custody-india",
    title: "Divorce and Child Custody Laws for Beginners in India",
    description: "An educational overview of mutual consent divorce, contested divorce grounds, and how courts decide child custody under Indian personal laws.",
    videoUrl: "https://www.youtube.com/embed/J778zZ8tUes",
    category: "Family Law",
    duration: "15:20",
    uploadDate: "2026-05-02",
    thumbnail: "/vlogs/family-law.jpg",
    author: "Adv. Pooja Patil",
    tags: ["Divorce", "Child Custody", "Family Court", "Hindu Marriage Act"],
    transcript: `
# Divorce and Child Custody Laws for Beginners in India

Family law disputes can be emotionally draining. Understanding the basic legal procedures for divorce and custody can help navigate these circumstances with clarity.

## 1. Types of Divorce in India
Divorce procedures vary by personal laws (Hindu Marriage Act, Special Marriage Act, Christian Marriage Act, etc.), but generally fall into two categories:

### A. Mutual Consent Divorce (Section 13B of HMA)
This is the fastest and least adversarial path.
*   **Requirements**: Both partners must agree to separate and live apart for at least one year.
*   **Procedure**: A joint petition is filed. The court grants a minimum 6-month "cooling-off" period (which can sometimes be waived) before the second motion and final decree.

### B. Contested Divorce
If one partner does not agree, the other must file on specific legal grounds:
*   **Cruelty** (Physical or Mental)
*   **Adultery**
*   **Desertion** (For at least 2 years)
*   **Conversion** to another religion
*   **Mental Disorder** or communicable disease

## 2. Child Custody Guidelines
In India, the paramount consideration of the court is the **welfare of the child**. Personal laws do not override the child's best interests.
*   **Physical Custody**: One parent is awarded primary residency, while the other gets visitation rights.
*   **Joint Custody**: Both parents share equal responsibility for decisions regarding education, health, and welfare, while physical custody lies with one.
*   **Legal Custody**: Gives the parent rights to make decisions for the child but doesn't necessarily mean living with them.
    `
  },
  {
    slug: "consumer-protection-act-rights",
    title: "Consumer Rights & How to File a Forum Complaint",
    description: "A complete guide on the Consumer Protection Act 2019, your rights against misleading ads, and how to file a case online using E-Daakhil.",
    videoUrl: "https://www.youtube.com/embed/6iW_lJ-4xsk",
    category: "Consumer Rights",
    duration: "11:30",
    uploadDate: "2026-05-15",
    thumbnail: "/vlogs/consumer-rights.jpg",
    author: "Adv. Aditya Chauhan",
    tags: ["Consumer Protection", "E-Daakhil", "Product Liability", "Consumer Rights"],
    transcript: `
# Consumer Rights & How to File a Forum Complaint

The Consumer Protection Act, 2019 (CPA) replaced the older 1986 Act, introducing stronger measures for digital transactions, product liability, and misleading advertisements.

## The Six Core Consumer Rights
1.  **Right to Safety**: Protection against hazardous goods.
2.  **Right to Information**: Right to know price, quality, purity, and potency of products.
3.  **Right to Choose**: Access to competitive prices and varieties.
4.  **Right to be Heard**: Right to voice grievances at appropriate forums.
5.  **Right to Seek Redressal**: Right to seek legal remedies against unfair trade practices.
6.  **Right to Consumer Education**: Acquiring knowledge to remain an informed consumer.

## Filing a Complaint (Pecuniary Jurisdiction)
Depending on the value of the goods or services bought, you file at different levels:
*   **District Commission**: Up to ₹50 Lakhs.
*   **State Commission**: ₹50 Lakhs to ₹2 Crores.
*   **National Commission (NCDRC)**: Above ₹2 Crores.

## How to File Online (E-Daakhil)
The CPA 2019 introduced the **E-Daakhil portal** (edaakhil.nic.in), allowing consumers to file grievances online from their home. You do not strictly need an advocate; a consumer can present their case personally.
    `
  },
  {
    slug: "bail-procedure-india",
    title: "Bail Procedure in India: Bailable vs Non-Bailable Offences",
    description: "Understanding Section 437, 438, and 439 of CrPC. Learn how courts evaluate regular bail, interim bail, and anticipatory bail.",
    videoUrl: "https://www.youtube.com/embed/nryqC7oH9z4",
    category: "Criminal Law",
    duration: "14:10",
    uploadDate: "2026-05-20",
    thumbnail: "/vlogs/bail-guide.jpg",
    author: "Adv. Mandeep Baisla",
    tags: ["Bail", "Anticipatory Bail", "CrPC", "Criminal Courts"],
    transcript: `
# Bail Procedure in India: Bailable vs Non-Bailable Offences

Bail is a security given to court for the temporary release of an accused person awaiting trial. The fundamental principle of criminal law is that an accused is **innocent until proven guilty**.

## 1. Bailable vs Non-Bailable Offences
*   **Bailable Offences**: Under Section 436 CrPC, bail is a matter of **right**. The police or court is bound to release the accused if they furnish a bail bond. Examples include simple hurt, cheating, and defamation.
*   **Non-Bailable Offences**: Under Section 437 and 439 CrPC, bail is **not a right**, but a judicial discretion. The court decides whether or not to grant bail based on factors like gravity of crime, tampering of evidence, or flight risk.

## 2. Types of Bail
*   **Regular Bail**: Applied for after arrest when the accused is in police or judicial custody.
*   **Anticipatory Bail (Section 438 CrPC)**: Applied for before arrest if a person apprehends that they might be arrested for a non-bailable offence. Granted by Sessions Court or High Court only.
*   **Interim Bail**: Temporary bail granted for a short period before the hearing of regular or anticipatory bail.

## Factors Evaluated by Courts for Bail
1.  **Nature & Gravity** of the offence.
2.  **Severity of punishment** if convicted.
3.  **Position & influence** of the accused (to evaluate witness tampering).
4.  **Flight Risk**: Likelihood of escaping trial.
5.  **Clean record**: Previous criminal history.
    `
  }
];
