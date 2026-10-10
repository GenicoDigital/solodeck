import { Industry } from "@/lib/types";

/** Long-form copy for an industry landing page: intro, a "how they use AI" guide and FAQs. */
export interface IndustryContent {
  /** Replaces the default one-line subheading under the page heading */
  intro: string;
  guide: {
    heading: string;
    body: string;
    points: { label: string; text: string }[];
    closing?: string;
  };
  faqs: { question: string; answer: string }[];
}

export const INDUSTRY_CONTENT: Partial<Record<Industry, IndustryContent>> = {
  "accountants-bookkeepers": {
    intro:
      "Ready-to-use AI prompts for UK accountants and bookkeepers. Draft client letters, chase missing records, explain Making Tax Digital and prepare advisory reports in minutes — using ChatGPT, Claude, Copilot or any AI tool you already have.",
    guide: {
      heading: "How UK Accountants and Bookkeepers Use AI",
      body: "Most practices don't need new software to benefit from AI — they need to know what to ask it. Every prompt in this toolkit is written for UK practice, with HMRC, VAT, Making Tax Digital, IR35 and CIS built in, so you get a usable first draft rather than generic American advice.",
      points: [
        {
          label: "Client communication",
          text: "engagement letters, fee-increase notices, year-end reminders and late-document chasers",
        },
        {
          label: "Tax and compliance",
          text: "plain-English explainers for clients on self-assessment, VAT, MTD for Income Tax, CIS and IR35",
        },
        {
          label: "Bookkeeping",
          text: "month-end checklists, credit control letters and management accounts packs",
        },
        {
          label: "Practice growth",
          text: "pricing and packaging, onboarding, LinkedIn plans and AML policies",
        },
        {
          label: "Advisory",
          text: "business health checks, cash flow forecasts, KPI dashboards and exit planning",
        },
      ],
      closing:
        "Each prompt has bracketed placeholders to fill in and a Pro Tip based on real UK practice. You stay in control: AI drafts, you review and sign off.",
    },
    faqs: [
      {
        question: "Do I need ChatGPT Plus or special software?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini. Copy a prompt, fill in the bracketed details and paste it in.",
      },
      {
        question: "Is it safe to use AI with client information?",
        answer:
          "Treat AI tools like any other third party — don't paste names, UTRs, NI numbers or bank details unless your firm has approved the tool for client data. The prompts use placeholders, so you can get a strong draft without sharing anything identifiable, then add the details yourself.",
      },
      {
        question: "Are the prompts up to date with UK tax rules?",
        answer:
          "They're built around UK requirements — HMRC, VAT, Making Tax Digital, IR35, CIS, corporation tax and self-assessment. AI tools can still get rates and thresholds wrong, so always check figures and deadlines against HMRC guidance before anything goes to a client.",
      },
      {
        question: "What do I get?",
        answer:
          "A 53-page PDF with 121 prompts across 5 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  trades: {
    intro:
      "Ready-to-use AI prompts for UK builders, plumbers, electricians and construction firms. Write quotes, chase payments, reply to customers and draft risk assessments and method statements in minutes — using ChatGPT or any AI app on your phone or laptop.",
    guide: {
      heading: "How UK Tradespeople Use AI",
      body: "Most tradespeople end up doing the paperwork in the evenings. AI can't fit a boiler, but it can draft the quote, the follow-up and the RAMS in a fraction of the time. Every prompt is written for UK trades, with CDM 2015, COSHH, CIS, RIDDOR and Building Regs in mind — in plain English throughout.",
      points: [
        {
          label: "Quotes and tenders",
          text: "written quotes, variation orders, schedules of works and deposit requests",
        },
        {
          label: "Customers",
          text: "enquiry replies, delay updates, complaint handling, review requests and payment reminders",
        },
        {
          label: "Health and safety",
          text: "risk assessments, method statements, COSHH assessments and toolbox talks",
        },
        {
          label: "Winning work",
          text: "Google Business Profile, Checkatrade and Rated People profiles, leaflets and before-and-after posts",
        },
        {
          label: "Running the business",
          text: "job costing, cash flow, CIS guides, late-payment letters and subcontractor agreements",
        },
      ],
    },
    faqs: [
      {
        question: "I'm not techy — will I be able to use this?",
        answer:
          "Yes. Pick a prompt, fill in the details in square brackets (the job, the price, the customer's name) and paste it into ChatGPT or any AI app. It works on your phone as well as a computer.",
      },
      {
        question: "Can AI write my risk assessments and method statements?",
        answer:
          "It can produce a solid first draft in minutes, structured around UK requirements. You still need to check it against the actual site and job and sign it off yourself — the responsibility stays with you.",
      },
      {
        question: "Will the prompts work for my trade?",
        answer:
          "They're written for builders, general contractors and sole traders across the trades — electricians, plumbers, roofers, plasterers and more. Placeholders let you tailor every prompt to your trade and the job in hand.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever. There's also a Trades & Construction Complete Bundle that adds the customer service and website copy toolkits.",
      },
    ],
  },

  "salons-beauty": {
    intro:
      "Ready-to-use AI prompts for UK salons, hairdressers, beauty therapists and aesthetics clinics. Write treatment menus, booking replies, aftercare messages and a month of social posts in minutes — using ChatGPT or any AI app on your phone or laptop.",
    guide: {
      heading: "How UK Salons and Beauty Businesses Use AI",
      body: "Between clients there's rarely time to write captions, chase no-shows or update your treatment menu. AI can draft all of it in the gaps, so you spend your evenings off rather than on admin. Every prompt is written for UK beauty businesses, in plain English, with your own treatments, prices and tone of voice dropped in.",
      points: [
        {
          label: "Client messages",
          text: "welcome messages, patch test reminders, aftercare follow-ups, review requests and lapsed-client offers",
        },
        {
          label: "Social media",
          text: "Instagram captions, 30-day content plans, Reel and TikTok scripts and Google Business Profile posts",
        },
        {
          label: "Bookings and sales",
          text: "enquiry replies that convert, treatment packages, last-minute availability posts and price-increase notices",
        },
        {
          label: "Treatment menus and website",
          text: "treatment descriptions, SEO treatment pages, FAQs, aftercare pages and price lists",
        },
        {
          label: "Running the salon",
          text: "consultation forms, treatment SOPs, deposit and no-show policies, staff rotas and pricing reviews",
        },
      ],
    },
    faqs: [
      {
        question: "Does this work for my type of beauty business?",
        answer:
          "Yes. It's written for salon owners, hairdressers, self-employed beauty therapists, nail and lash techs, and aesthetics and skin clinics. Bracketed placeholders let you swap in your own treatments, prices and location.",
      },
      {
        question: "Can AI write my consultation forms and aftercare advice?",
        answer:
          "It can produce a clear, well-structured first draft in minutes. Always check treatment advice against your training, your insurer's requirements and the product manufacturer's guidance before giving it to clients.",
      },
      {
        question: "Do I need to pay for ChatGPT?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini, on your phone or computer.",
      },
      {
        question: "What do I get?",
        answer:
          "A 65-page PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  "coaches-consultants": {
    intro:
      "Ready-to-use AI prompts for UK coaches and consultants. Write discovery call scripts, proposals, LinkedIn posts and client follow-ups in minutes — so you spend more time with clients and less time staring at a blank page.",
    guide: {
      heading: "How Coaches and Consultants Use AI",
      body: "Most coaches and consultants are a business of one: delivering the work, winning the next client and doing the admin. AI won't replace your expertise, but it can take the first draft off your plate. Every prompt sets the AI up as a specialist, so the output sounds professional rather than generic.",
      points: [
        {
          label: "Winning clients",
          text: "discovery call scripts, consultancy and retainer proposals, follow-ups and price-objection handling",
        },
        {
          label: "Visibility",
          text: "LinkedIn posts, 30-day content plans, newsletters, lead magnets and podcast guest pitches",
        },
        {
          label: "Delivering the work",
          text: "programme frameworks, workshop plans, client workbooks, question sets and goal-setting sessions",
        },
        {
          label: "Client care",
          text: "onboarding emails, check-ins between sessions, testimonial requests and difficult conversations",
        },
        {
          label: "Running the business",
          text: "coaching contracts, cancellation policies, pricing frameworks and annual planning",
        },
      ],
    },
    faqs: [
      {
        question: "Will clients be able to tell I've used AI?",
        answer:
          "Not if you use it well. The prompts ask for your own details, offer and tone of voice, and you should always edit the draft so it sounds like you. Think of AI as a fast first draft, not the final word.",
      },
      {
        question: "Is it OK to use AI with client session notes?",
        answer:
          "Keep anything confidential or identifying out of AI tools unless you've checked how the tool stores data. The prompts use placeholders, so you can get a strong draft without sharing a client's personal details.",
      },
      {
        question: "Is it for coaches or consultants?",
        answer:
          "Both — executive, business and life coaches, and consultants selling project, retainer and corporate work. It suits solo practitioners and small practices alike.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  "early-years-education": {
    intro:
      "Ready-to-use AI prompts for UK nurseries, childminders and early years settings. Write parent updates, policies, curriculum plans and job adverts in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Nurseries and Childminders Use AI",
      body: "Early years practitioners spend hours on paperwork that takes time away from the children. AI can draft the letters, plans and policies so you only need to check and personalise them. Every prompt uses UK early years terminology and is written in plain English.",
      points: [
        {
          label: "Parents and families",
          text: "welcome letters, settling-in updates, daily reports, transition notes and sensitive behaviour conversations",
        },
        {
          label: "Enrolment",
          text: "setting descriptions, show-around scripts, funding explainers, waiting list replies and social posts",
        },
        {
          label: "Policies and compliance",
          text: "safeguarding policies, SEND statements, EYFS compliance, inspection prep and accident records",
        },
        {
          label: "Curriculum and assessment",
          text: "long-term plans, weekly activities, observations, learning journeys and two-year checks",
        },
        {
          label: "Staff and business",
          text: "job adverts, interview questions, supervisions, appraisals, fee schedules and cash flow planning",
        },
      ],
    },
    faqs: [
      {
        question: "Can AI write our safeguarding policy?",
        answer:
          "It can give you a well-structured first draft, but your policy must reflect your own setting and your local safeguarding partnership's procedures. Your designated safeguarding lead should review and sign off every policy.",
      },
      {
        question: "Is it safe to put children's details into AI?",
        answer:
          "No — never enter children's names, photos or personal information into an AI tool. The prompts use placeholders, so you can write observations and parent updates without sharing anything identifiable, then add the details yourself.",
      },
      {
        question: "Is it suitable for childminders as well as nurseries?",
        answer:
          "Yes. It's written for nursery owners and managers, childminders running their own setting, and tutors and small education businesses.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  retail: {
    intro:
      "Ready-to-use AI prompts for UK online shops, retailers and marketplace sellers. Write product descriptions, customer emails, ads and sale campaigns in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Online Sellers and Retailers Use AI",
      body: "Whether you sell on your own website, Etsy, Amazon or from a shop, the writing never stops — listings, replies, emails and promotions. AI can draft them in seconds, so you can focus on products and customers. Every prompt sets a clear brief so the AI writes in your brand's voice, in UK English.",
      points: [
        {
          label: "Product listings",
          text: "SEO product titles and descriptions for your website, Amazon and Etsy, plus collection pages and size guides",
        },
        {
          label: "Customer service",
          text: "where-is-my-order replies, damaged item complaints, returns, refunds and review responses",
        },
        {
          label: "Marketing and ads",
          text: "Instagram captions, TikTok scripts, Facebook and Google ads, influencer outreach and seasonal sales",
        },
        {
          label: "Email marketing",
          text: "welcome series, abandoned cart and back-in-stock emails, and newsletters",
        },
        {
          label: "Behind the scenes",
          text: "supplier emails, purchase orders, pricing reviews, cash flow forecasts and wholesale pitches",
        },
      ],
    },
    faqs: [
      {
        question: "Will AI-written product descriptions hurt my SEO?",
        answer:
          "Not if they're useful and accurate. Search engines reward helpful content, however it's written. The prompts ask for your real product details, and you should always check every claim, size and material before publishing.",
      },
      {
        question: "Does it work for Etsy and Amazon sellers?",
        answer:
          "Yes. There are prompts written specifically for Amazon and Etsy listings, as well as for your own website, social media and email.",
      },
      {
        question: "Do I need any special software?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini. Copy a prompt, fill in the details and paste it in.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  hospitality: {
    intro:
      "Ready-to-use AI prompts for UK restaurants, cafés, pubs, caterers and food businesses. Write menu descriptions, review replies, event proposals and staff training in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Restaurants, Cafés and Pubs Use AI",
      body: "Running a hospitality business leaves little time for writing. AI can draft the menu copy, the review reply and the private dining proposal while you get on with service. Every prompt is written for UK hospitality, with HACCP, VAT, the FSA and UK employment rules in mind.",
      points: [
        {
          label: "Guests",
          text: "booking confirmations, review responses, complaint handling, no-show messages and special-occasion touches",
        },
        {
          label: "Marketing",
          text: "social media plans, Google Business Profile, seasonal promotions, email campaigns and food blogger outreach",
        },
        {
          label: "Bookings and events",
          text: "private dining and group enquiries, wedding and corporate proposals, deposit policies and festive planning",
        },
        {
          label: "Kitchen and menu",
          text: "menu descriptions, seasonal menu briefs, food waste reduction, prep schedules and GP calculations",
        },
        {
          label: "Staff and admin",
          text: "job adverts, onboarding, service standards, rotas, staff handbooks and cash flow forecasts",
        },
      ],
    },
    faqs: [
      {
        question: "Can I use AI for allergen information?",
        answer:
          "Use it to write clear allergen messages and policies, but the allergen information itself must always come from your own recipes, ingredient labels and records. Never let an AI tool guess what's in a dish.",
      },
      {
        question: "Does it suit my type of business?",
        answer:
          "It's written for independent restaurants, cafés, pubs and bistros, caterers and private dining, hotel food and drink, street food and pop-ups, and food producers.",
      },
      {
        question: "Do I need to pay for ChatGPT?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini, on your phone or computer.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  hr: {
    intro:
      "Ready-to-use AI prompts for HR managers, line managers and small business owners in the UK. Write job adverts, interview questions, performance reviews and HR policies in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Small Businesses Use AI for HR",
      body: "In a small business, HR often falls to the owner, the office manager or a one-person HR team. AI can draft the letters, policies and plans so you start from something solid rather than a blank page. Every prompt is built around UK employment law, including GDPR, the Equality Act 2010, TUPE and the Working Time Regulations.",
      points: [
        {
          label: "Recruitment",
          text: "job adverts, interview question sets, offer letters, reference requests and probation reviews",
        },
        {
          label: "Onboarding and development",
          text: "90-day onboarding plans, induction checklists, training needs analysis and career conversations",
        },
        {
          label: "Performance",
          text: "annual reviews, SMART objectives, 1-2-1 templates, feedback emails and improvement plans",
        },
        {
          label: "Employee relations",
          text: "difficult-conversation briefings, absence management, flexible working responses and announcements",
        },
        {
          label: "Policies",
          text: "staff handbooks, hybrid working, family leave, menopause at work and right-to-work checks",
        },
      ],
    },
    faqs: [
      {
        question: "Can AI handle disciplinaries, dismissals or redundancies?",
        answer:
          "It can help you draft letters and plan conversations, but these are legally sensitive. Follow the ACAS Code of Practice and take professional advice before acting — especially for dismissals, redundancies and settlement agreements.",
      },
      {
        question: "Is it OK to put employee details into AI?",
        answer:
          "Avoid entering names, health information or other personal data unless your business has approved the tool for that use. The prompts use placeholders, so you can get a strong draft and add the specifics yourself.",
      },
      {
        question: "I'm not an HR professional — is it still for me?",
        answer:
          "Yes. It's written for small business owners and line managers handling people issues alongside their day job, as well as solo HR managers.",
      },
      {
        question: "What do I get?",
        answer:
          "A 65-page PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  manufacturing: {
    intro:
      "Ready-to-use AI prompts for UK manufacturers, job shops and subcontractors. Write quotes, tender responses, supplier emails and quality documents in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Manufacturers Use AI",
      body: "In a small manufacturing business, the same few people handle sales, production, quality and admin. AI can draft the tender response, the corrective action report and the credit control letter so they can focus on the shop floor. Every prompt references UK standards such as ISO 9001, HSE, ACAS and the Late Payment Act.",
      points: [
        {
          label: "Winning work",
          text: "capability statements, tender executive summaries, PQQ responses, case studies and quote follow-ups",
        },
        {
          label: "Customers",
          text: "project updates, delivery-delay notices, price increase letters and quality-defect responses",
        },
        {
          label: "Production and suppliers",
          text: "production schedules, shift handovers, supplier non-conformance reports and RFQs",
        },
        {
          label: "Quality and safety",
          text: "corrective action responses, risk assessments, COSHH, method statements and toolbox talks",
        },
        {
          label: "Finance and people",
          text: "credit control letters, job costing, cash flow commentary, job adverts and induction plans",
        },
      ],
    },
    faqs: [
      {
        question: "Is it safe to put customer drawings or pricing into AI?",
        answer:
          "Treat commercially sensitive information with care and check your company's policy first. The prompts use placeholders, so you can get a strong draft without sharing confidential drawings, specifications or prices.",
      },
      {
        question: "Can AI write our risk assessments and method statements?",
        answer:
          "It can produce a structured first draft quickly, but a competent person must check it against the actual process, machinery and site before it's used.",
      },
      {
        question: "Does it suit my type of manufacturing?",
        answer:
          "It's written for small and medium manufacturers, job shops and subcontractors in machining, fabrication and assembly. Placeholders let you add your own machinery, processes and sectors.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  "pet-business-veterinary": {
    intro:
      "Ready-to-use AI prompts for UK vet practices, groomers, dog trainers, boarding and pet businesses. Write appointment reminders, pet owner guides, social posts and policies in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Vets and Pet Businesses Use AI",
      body: "Pet owners expect clear, caring communication — and that takes time to write. AI can draft the reminder, the aftercare guide and the seasonal campaign so your team can focus on the animals. Every prompt uses UK terminology and references such as the RCVS, GDPR, HSE and COSHH.",
      points: [
        {
          label: "Clients and appointments",
          text: "welcome emails, vaccination reminders, post-appointment follow-ups, referral letters and bereavement messages",
        },
        {
          label: "Pet owner education",
          text: "guides on dental health, weight, parasites, post-op care, senior pets and seasonal safety",
        },
        {
          label: "Marketing",
          text: "website copy, social media plans, Google Business Profile, newsletters and seasonal campaigns",
        },
        {
          label: "Practice and business admin",
          text: "SOPs, telephone triage scripts, staff handbooks, GDPR policies and pricing reviews",
        },
        {
          label: "Growth",
          text: "new service launches, community events, charity partnerships and online products",
        },
      ],
    },
    faqs: [
      {
        question: "Can AI write clinical advice for pet owners?",
        answer:
          "It can draft clear, owner-friendly guides quickly, but any clinical content must be checked and approved by a qualified vet before it's shared with clients.",
      },
      {
        question: "Does it suit groomers and dog trainers as well as vets?",
        answer:
          "Yes. It's written for vet practices, groomers and grooming salons, dog trainers and behaviourists, and other pet service businesses such as walkers, boarding and pet shops.",
      },
      {
        question: "Do I need any special software?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini. Copy a prompt, fill in the details and paste it in.",
      },
      {
        question: "What do I get?",
        answer:
          "A 139-page PDF with 150 prompts across 8 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  "social-media": {
    intro:
      "Ready-to-use AI prompts for social media managers, agencies and small businesses doing their own social. Plan content calendars, write captions and scripts, and report on results in a fraction of the time — using ChatGPT or any AI tool.",
    guide: {
      heading: "How Social Media Managers Use AI",
      body: "Feeding several platforms every week is relentless. AI can generate ideas, first drafts and reports so you can spend your time on strategy and engagement. There are two toolkits here: the Social Media Management toolkit for managers and agencies, and the Content Calendar toolkit for planning and creating content across every channel.",
      points: [
        {
          label: "Posts and scripts",
          text: "Instagram captions, LinkedIn posts, TikTok and YouTube scripts, carousels, hooks and bios",
        },
        {
          label: "Planning",
          text: "content strategies, 90-day plans, content pillars and weekly and monthly calendars",
        },
        {
          label: "Ideas",
          text: "idea generators, series formats, myth-busting posts, case studies and seasonal hooks",
        },
        {
          label: "Growth and engagement",
          text: "follower growth plans, comment and DM replies, influencer outreach and lead generation",
        },
        {
          label: "Clients and reporting",
          text: "client onboarding, contracts, monthly reports, analytics reviews and ROI",
        },
      ],
    },
    faqs: [
      {
        question: "Which toolkit should I choose?",
        answer:
          "If you manage social media for clients or an organisation, start with the Social Media Management toolkit. If you're a business owner planning and creating your own content, the Content Calendar toolkit is the better fit. Many people buy both.",
      },
      {
        question: "Will AI make all my posts sound the same?",
        answer:
          "Not if you give it your brand voice. The prompts ask for your audience, tone and examples, and there are prompts for building brand voice guidelines. Always edit before posting so it sounds like you.",
      },
      {
        question: "Which platforms are covered?",
        answer:
          "Instagram, LinkedIn, TikTok, Facebook, YouTube, Pinterest and X, plus email newsletters.",
      },
      {
        question: "What do I get?",
        answer:
          "Each toolkit is a PDF with 150 prompts, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  "wedding-planners": {
    intro:
      "Ready-to-use AI prompts for UK wedding and event planners. Reply to enquiries, write proposals, brief suppliers and build run-of-show timelines in minutes — using ChatGPT or any AI tool you already have.",
    guide: {
      heading: "How UK Wedding and Event Planners Use AI",
      body: "Planning is detail-heavy: every client, venue and supplier needs a clear, personal message. AI can draft the proposal, the supplier brief and the day-of timeline so you can spend more time with clients. There are two toolkits — one for wedding planners and one for corporate, charity and private event planners.",
      points: [
        {
          label: "Clients",
          text: "enquiry replies, discovery call scripts, proposals, booking letters and difficult budget conversations",
        },
        {
          label: "Venues and suppliers",
          text: "venue sourcing, site-visit checklists and briefs for florists, caterers, photographers and AV",
        },
        {
          label: "Design and styling",
          text: "concept briefs, written moodboards, tablescapes, lighting and accessible event design",
        },
        {
          label: "Operations",
          text: "run-of-show timelines, contingency and weather plans, risk assessments and final confirmations",
        },
        {
          label: "Growing your business",
          text: "pricing and packages, Instagram and Pinterest strategy, wedding fairs, awards and referral partners",
        },
      ],
    },
    faqs: [
      {
        question: "Which toolkit should I choose?",
        answer:
          "If you plan weddings, choose the Wedding Planning toolkit — it also includes resources you can produce for couples. If you plan corporate, charity or private events, choose the Events Planning toolkit. Planners who do both often buy both.",
      },
      {
        question: "Can AI help with suppliers and contracts?",
        answer:
          "It can draft clear briefs and help you review contract terms, but always read the final contract yourself and take legal advice on anything unusual.",
      },
      {
        question: "Do I need any special software?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini.",
      },
      {
        question: "What do I get?",
        answer:
          "Each toolkit is a PDF with 150 prompts, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  "all-businesses": {
    intro:
      "Ready-to-use AI prompts for UK small businesses and sole traders, whatever you do. Write emails, website copy, social posts and customer replies in minutes — using ChatGPT or any AI tool you already have. No tech skills needed.",
    guide: {
      heading: "How UK Small Businesses Use AI",
      body: "You don't need to be technical to get real value from AI — you just need to know what to ask. These toolkits cover the jobs every business has, with ready-made prompts you copy, personalise and paste. Every prompt is written in plain English with UK spelling and terminology.",
      points: [
        {
          label: "Emails",
          text: "enquiries, follow-ups, complaints, negotiations and newsletters",
        },
        {
          label: "Customer service",
          text: "complaints, refunds, review responses and difficult customers",
        },
        {
          label: "Marketing and social media",
          text: "content calendars, captions, scripts and campaigns",
        },
        {
          label: "Your website",
          text: "homepage, about and service pages, SEO copy and landing pages",
        },
        {
          label: "Running the business",
          text: "sales, operations, HR, finance and strategy, all in the Complete Small Business toolkit",
        },
      ],
    },
    faqs: [
      {
        question: "Which toolkit should I start with?",
        answer:
          "The Complete Small Business AI Toolkit covers every part of running a business and is the best all-rounder. If one job takes most of your time — emails, customer service, social media or your website — start with the toolkit for that.",
      },
      {
        question: "Do I need to be good with technology?",
        answer:
          "No. Pick a prompt, fill in the details in square brackets and paste it into ChatGPT or any AI app.",
      },
      {
        question: "Is there a toolkit for my industry?",
        answer:
          "There are specialist toolkits for accountants, trades, salons, hospitality, retail, coaches, early years, HR, manufacturing, pet businesses and wedding planners. Browse by industry to find yours.",
      },
      {
        question: "Is there a discount for buying more than one?",
        answer:
          "Yes. Any 3 toolkits cost £60 in total, applied automatically in your cart. There are also ready-made bundles at a discounted price.",
      },
    ],
  },
};
