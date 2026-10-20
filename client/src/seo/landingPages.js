// Pure data file. No JSX, no asset imports, so Node (prerender script) and React can both import it.
// Only claims that are true of the product today. Edit text freely, but keep it truthful.

export const LANDING_PAGES = [
    // ───────────────────────────────────────────────────────────────────────────
    {
      path: '/school-management-software',
      name: 'School Management Software',
      title: 'School Management Software for India | CampusSafar AMMS',
      description:
        'Complete school management software: attendance, exams and marks, report cards, fees, admissions enquiries, syllabus tracking and parent portal in one login. Free demo.',
      h1: 'School Management Software That Runs Your Whole School From One Login',
      eyebrow: 'CampusSafar AMMS · Academic & Management System',
      intro:
        'CampusSafar AMMS replaces paper registers, WhatsApp groups and Excel sheets with one platform for students, attendance, exams and marks, report cards, fees, admission enquiries, study notes, the academic calendar and teacher performance. One installation serves many schools, and every school sees only its own data.',
      schema: { kind: 'SoftwareApplication', category: 'BusinessApplication' },
      sections: [
        {
          id: 'problems',
          heading: 'Problems most schools still live with',
          items: [
            { title: 'Late attendance news', text: 'Teachers mark on paper and parents learn about an absence days later.' },
            { title: 'Silent mark changes', text: 'Marks are edited after submission with no record of who changed what.' },
            { title: 'Fee registers and lost receipts', text: 'Dues are tracked by hand and two counters can collect the same fee.' },
            { title: 'Forgotten admission enquiries', text: 'Leads are noted on paper, follow-ups are missed and nobody knows which source works.' },
            { title: 'Hand-typed report cards', text: 'Hours of manual work every exam cycle, with errors and disputes.' },
            { title: 'No syllabus visibility', text: 'The principal cannot see whether teaching is on pace until exams are close.' },
          ],
        },
        {
          id: 'features',
          heading: 'What you get in one platform',
          intro: 'Every module below is built and working in the product today.',
          items: [
            { title: 'Subject-wise attendance', text: 'Each teacher marks only their own period and section. Parents get an in-app alert when a child is marked absent, and the admin sees a defaulter list for attendance below 75%.' },
            { title: 'Exams and marks with lock and correction', text: 'Define exam types with maximum and passing marks, lock marks per subject, class or session, and route later changes through a correction request with a reason. Every step is written to the audit log.' },
            { title: 'One-click report cards', text: 'Generate a PDF report card per student, or a ZIP for a whole class.' },
            { title: 'Fee management', text: 'Fee heads, class-wise fee structures, automatic dues, numbered receipts, late fee, concessions and receipt cancellation with a reason. A second counter cannot collect the same due twice.' },
            { title: 'Admissions and reception', text: 'A seven-stage enquiry pipeline with follow-ups, duplicate detection and one-click conversion of an admitted enquiry into a student. A digital visitor register stores only the last digits of ID proof.' },
            { title: 'Syllabus tracker', text: 'Plan chapters per subject, let teachers update progress, and see exam-readiness risk by section.' },
            { title: 'Teacher reports', text: 'A health score for every teacher: 40% attendance marking, 30% marks entry and 30% syllabus progress, with reminders for pending work.' },
            { title: 'Study notes', text: 'Rich-text notes with scheduled publishing, delivery to sections or selected students, and read tracking. Available as an add-on with a storage quota.' },
            { title: 'Academic calendar', text: 'Holidays, exams and events for the whole school or specific classes, with a working-day count.' },
            { title: 'Students, CSV import and promotion', text: 'Import students from CSV with a preview of errors and duplicates before saving. Year-end promotion creates a new enrollment, so earlier years stay intact.' },
            { title: 'Parent portal', text: 'Parents see only their own child: attendance, marks, fees and receipts, syllabus progress, calendar and notes.' },
            { title: 'Audit trail', text: 'Sensitive actions are logged with user, time and details.' },
          ],
        },
        {
          id: 'roles',
          heading: 'Six roles, each sees only what they need',
          items: [
            { title: 'Super Admin', text: 'Onboards schools, manages plans, subscriptions and renewals.' },
            { title: 'School Admin', text: 'Full control of one school: sessions, classes, students, faculty, exams, reports.' },
            { title: 'Faculty', text: 'Attendance, marks, syllabus progress and notes for assigned classes only.' },
            { title: 'Fee Collector', text: 'Collects fees, issues and cancels receipts, views dues and fee analytics.' },
            { title: 'Receptionist', text: 'Handles enquiries, follow-ups and the visitor register.' },
            { title: 'Parent', text: 'Read-only view of their own child.' },
          ],
        },
      ],
      steps: [
        { title: 'Book a free demo', text: 'We walk you through the modules on a demo school so you can judge fit before committing.' },
        { title: 'Set up your structure', text: 'Create the academic session, classes, sections and subjects, then add faculty and their assignments.' },
        { title: 'Import students', text: 'Upload a CSV, review the preview, fix errors and confirm.' },
        { title: 'Go live module by module', text: 'Most schools start with attendance and marks, then add fees and reception when the team is comfortable.' },
      ],
      faqs: [
        { q: 'How much does school management software cost in India?', a: 'CampusSafar AMMS is sold as a subscription with plans for different school sizes. Book a free demo or check the pricing page and we will share the plan that fits your school.' },
        { q: 'Can one school see another school’s data?', a: 'No. Every record carries a school identifier and the server filters by it, so each school sees only its own data.' },
        { q: 'Can we import our existing student list?', a: 'Yes. Upload a CSV and review a preview of errors and duplicates before anything is saved.' },
        { q: 'Do parents get notifications?', a: 'Parents receive in-app alerts, for example when a child is marked absent. SMS and email alerts are not part of the platform today.' },
        { q: 'Can parents pay fees online?', a: 'Not yet. Staff record payments at the fee counter and the system issues numbered receipts that parents can view.' },
        { q: 'Does it include a timetable module?', a: 'A timetable module is not part of AMMS today. Attendance is marked subject-wise per teacher and section.' },
        { q: 'Can coaching institutes use it?', a: 'Yes, by configuring batches as sections. See our coaching institute software page for how the mapping works.' },
      ],
      cta: {
        heading: 'See AMMS on a demo school',
        text: 'Tell us your school size and what hurts most today. We will show you the modules that fix it.',
        source: 'landing_school_software',
      },
      related: [
        { label: 'Coaching institute software', to: '/coaching-institute-software' },
        { label: 'Exam seating arrangement software', to: '/products/exam-seating-arrangement-software' },
        { label: 'School fee & admission system', to: '/products/school-fee-admission-management-system' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
  
    // ───────────────────────────────────────────────────────────────────────────
    {
      path: '/coaching-institute-software',
      name: 'Coaching Institute Software',
      title: 'Coaching Institute Management Software | CampusSafar',
      description:
        'Run batches, attendance, tests, fee installments and enquiry-to-admission follow-ups for your coaching institute in one system. See what works today and book a free demo.',
      h1: 'Coaching Institute Management Software for Batches, Tests and Admissions',
      eyebrow: 'Built on CampusSafar AMMS',
      intro:
        'Coaching institutes juggle batch-wise attendance, test results, fee installments and a constant stream of admission enquiries. CampusSafar AMMS was designed for schools, and its structure maps cleanly onto coaching. This page is upfront about what works today and what does not.',
      schema: { kind: 'SoftwareApplication', category: 'BusinessApplication' },
      sections: [
        {
          id: 'mapping',
          heading: 'How coaching maps onto the platform',
          items: [
            { title: 'Batches', text: 'Use a class as the course level (for example JEE 11th) and a section as the batch (Batch A). This is a configuration approach, not a separate coaching mode.' },
            { title: 'Batch attendance', text: 'Subject-wise attendance per batch, with in-app alerts to parents when a student is absent.' },
            { title: 'Tests and results', text: 'Set exam types as weekly or monthly tests and use the report card as a progress report for each student.' },
            { title: 'Fee installments', text: 'Fee heads and dues per student with a numbered receipt for every payment. Automatic installment reminders to students are not included yet.' },
            { title: 'Enquiry to admission', text: 'The reception pipeline has seven stages including test scheduled and interview, duplicate detection and one-click conversion to a student. This is a strong fit for coaching.' },
            { title: 'Study material by batch', text: 'Publish or schedule notes to a batch or selected students and see who has read them.' },
          ],
        },
        {
          id: 'gaps',
          heading: 'What is not included yet',
          items: [
            { title: 'Timetable', text: 'No timetable module today.' },
            { title: 'Online payments', text: 'Staff record payments; parents and students cannot pay online yet.' },
            { title: 'SMS to students', text: 'Alerts are in-app only. Student-facing SMS is not available.' },
          ],
        },
      ],
      steps: [
        { title: 'Tell us your batch structure', text: 'Courses, batches, subjects and how many students per batch.' },
        { title: 'We configure it', text: 'Classes become courses, sections become batches, subjects stay subjects.' },
        { title: 'Import students and fee structure', text: 'Bulk CSV import with a preview, then fee heads and dues per student.' },
        { title: 'Start with enquiries and attendance', text: 'These two modules usually show results fastest.' },
      ],
      faqs: [
        { q: 'Is there a dedicated coaching mode?', a: 'No. Coaching runs on the school structure through configuration: class as course level, section as batch.' },
        { q: 'Can I track enquiries from first call to admission?', a: 'Yes. Enquiries move through new lead, follow-up, interested, test scheduled, interview, admitted and lost, with follow-up dates and notes.' },
        { q: 'Can parents see test results?', a: 'Yes. Parents see their own child’s attendance, marks, fees and notes in the parent portal.' },
        { q: 'Does it handle fee installments?', a: 'You can create dues per student and record each payment with a numbered receipt. Automatic reminders for installments are not included yet.' },
      ],
      cta: {
        heading: 'Check fit for your coaching institute',
        text: 'Share your batches and fee process on a quick call and we will tell you honestly whether AMMS fits.',
        source: 'landing_coaching_software',
      },
      related: [
        { label: 'School management software', to: '/school-management-software' },
        { label: 'Custom development', to: '/custom-development' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
  
    // ───────────────────────────────────────────────────────────────────────────
    {
      path: '/services/website-development',
      name: 'Website Development',
      title: 'Website Development Company in India | CampusSafar',
      description:
        'Custom websites, web portals and admin dashboards for schools, colleges, institutes and businesses across India. Built on React and Node.js. Free discovery call.',
      h1: 'Website Development Company in India for Institutes and Businesses',
      eyebrow: 'Custom websites · Portals · Dashboards',
      intro:
        'CampusSafar builds fast, custom websites and web applications for schools, colleges, coaching institutes and local businesses. We build our own products on the same stack, so you get a team that ships real software, not template sites.',
      schema: { kind: 'Service', serviceType: 'Website development' },
      sections: [
        {
          id: 'services',
          heading: 'What we build',
          items: [
            { title: 'Business and institute websites', text: 'Fast, mobile-friendly websites with your branding, content and lead forms.' },
            { title: 'Custom web portals', text: 'Client portals, internal tools and institute portals built around your workflow.' },
            { title: 'Admin dashboards', text: 'Role-based dashboards to manage students, staff, fees and content from one screen.' },
            { title: 'Student and parent portals', text: 'Attendance, results, notices and fee status in real time.' },
            { title: 'API and integrations', text: 'Payment gateways, WhatsApp or SMS, biometric devices and third-party tools.' },
            { title: 'Workflow automation', text: 'Automate admissions, certificates, reminders and reports.' },
            { title: 'Document and certificate systems', text: 'Generate bonafide letters, ID cards and transfer certificates on demand.' },
            { title: 'Custom dashboards and reports', text: 'Live analytics around the metrics that matter to you.' },
          ],
        },
        {
          id: 'proof',
          heading: 'Work we have already delivered',
          items: [
            { title: 'Admit-card portal', text: 'A subscription portal with online payment and auto-generated admit cards.' },
            { title: 'Certificate management system', text: 'A full-stack system that automates registration, verification and result publishing.' },
            { title: 'Our own product suite', text: 'AMMS, CampusSeating, CampusCMS, CampusDocs and more, running in real institutes.' },
          ],
        },
        {
          id: 'models',
          heading: 'How we work with you',
          items: [
            { title: 'Fixed price', text: 'Clear cost upfront, fixed timeline and milestone-based delivery for a defined scope.' },
            { title: 'Dedicated team', text: 'Your own developers for long-term products, scaling up or down as you grow.' },
            { title: 'Hourly or retainer', text: 'Pay for actual work on small iterations and ongoing support.' },
          ],
        },
      ],
      steps: [
        { title: 'Discovery call', text: 'Free, no obligation. We understand your requirement.' },
        { title: 'Design and planning', text: 'Wireframes and a clear scope shared before development starts.' },
        { title: 'Development', text: 'Built in sprints with regular progress updates.' },
        { title: 'Testing and launch', text: 'QA across devices, then deployment and handover.' },
        { title: 'Ongoing support', text: 'Updates, fixes and new features as you grow.' },
      ],
      faqs: [
        { q: 'How much does a website cost?', a: 'It depends on pages, features and integrations. After a free discovery call we give you a fixed-scope quote, so there are no surprise invoices.' },
        { q: 'Do you build only for institutes?', a: 'No. We build for schools, colleges and coaching institutes first, and also for clinics, hotels, event vendors, shops and startups.' },
        { q: 'Which technology do you use?', a: 'Modern React front ends with Node.js and Express back ends, with database choices based on the project.' },
        { q: 'Will my site be built for search engines?', a: 'We build with clean page structure, fast loading and proper meta tags so that your site can be found. Ranking itself depends on competition and content over time.' },
        { q: 'Do you provide support after launch?', a: 'Yes. Ongoing support for updates, fixes and new features is part of how we work.' },
      ],
      cta: {
        heading: 'Tell us what you want to build',
        text: 'Share your idea and we will reply with scope, timeline and cost.',
        source: 'landing_website_development',
      },
      related: [
        { label: 'Website development in Khargone', to: '/website-development-khargone' },
        { label: 'Custom development', to: '/custom-development' },
        { label: 'School management software', to: '/school-management-software' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
  
    // ───────────────────────────────────────────────────────────────────────────
    {
      path: '/website-development-khargone',
      name: 'Website Development in Khargone',
      title: 'Website Development Company in Khargone, MP | CampusSafar',
      description:
        'Khargone-based website and software development company. Websites for schools, clinics, hotels and shops in Khargone, Barwani, Khandwa, Burhanpur, Dhar and Indore.',
      h1: 'Website Development Company in Khargone, Madhya Pradesh',
      eyebrow: 'Based in Khargone · Serving Nimar and Malwa',
      intro:
        'CampusSafar Technologies is a software company based in Khargone, Madhya Pradesh. We build websites, web portals and management software for local schools, colleges, coaching institutes and businesses, so you can talk to a team in your own region instead of a faceless agency.',
      schema: { kind: 'Service', serviceType: 'Website development', local: true },
      sections: [
        {
          id: 'who',
          heading: 'Who we build for in Khargone and nearby',
          items: [
            { title: 'Schools and colleges', text: 'School websites, admission enquiry forms and our AMMS school management software.' },
            { title: 'Coaching institutes', text: 'Batch management, enquiry tracking and result sharing.' },
            { title: 'Clinics and hospitals', text: 'Clear service pages, doctor profiles and appointment enquiry forms.' },
            { title: 'Hotels, banquet halls and event vendors', text: 'Photo galleries, enquiry forms and WhatsApp booking buttons.' },
            { title: 'Shops and local brands', text: 'A professional website so customers find you on Google.' },
            { title: 'Startups', text: 'MVP web apps and dashboards built on React and Node.js.' },
          ],
        },
        {
          id: 'areas',
          heading: 'Areas we serve',
          intro: 'We work with clients in and around the region, in person where practical and over video or WhatsApp elsewhere.',
          items: [
            { title: 'Khargone', text: 'Our home city.' },
            { title: 'Barwani and Sanawad', text: 'Nearby towns in the Nimar region.' },
            { title: 'Khandwa and Burhanpur', text: 'Across the Nimar belt.' },
            { title: 'Dhar, Mandleshwar and Maheshwar', text: 'Western Madhya Pradesh.' },
            { title: 'Indore', text: 'Madhya Pradesh’s largest business hub.' },
            { title: 'All over India', text: 'Most projects are delivered remotely.' },
          ],
        },
        {
          id: 'what',
          heading: 'What you get',
          items: [
            { title: 'A custom design, not a template', text: 'Built around your brand and the way your customers decide.' },
            { title: 'Fast and mobile-friendly', text: 'Most visitors will open your site on a phone.' },
            { title: 'Lead forms and WhatsApp buttons', text: 'So every visitor can reach you in one tap.' },
            { title: 'Clear fixed-scope quote', text: 'You know cost and timeline before we start.' },
          ],
        },
      ],
      steps: [
        { title: 'Call or WhatsApp us', text: 'Tell us about your business and what you want the website to do.' },
        { title: 'Get a scope and quote', text: 'We reply with pages, features, timeline and cost.' },
        { title: 'See the design', text: 'Review wireframes and the design before development.' },
        { title: 'Launch and support', text: 'We deploy your site and stay available for updates.' },
      ],
      faqs: [
        { q: 'How much does a website cost in Khargone?', a: 'The price depends on pages and features. We share a fixed-scope quote after a short call, so you know the cost before work starts.' },
        { q: 'Can we meet in person?', a: 'For Khargone and nearby, call or WhatsApp us to arrange a meeting. For other cities we work over video and WhatsApp.' },
        { q: 'Can you build a website for my school or coaching institute?', a: 'Yes. We also offer management software for schools, so your website and your admin system can work together.' },
        { q: 'Do you provide support after the website is live?', a: 'Yes. We help with updates, fixes and new features after launch.' },
      ],
      cta: {
        heading: 'Get a website quote in Khargone',
        text: 'Share your business and what you need. We will reply with scope and cost.',
        source: 'landing_website_khargone',
      },
      related: [
        { label: 'Website development in India', to: '/services/website-development' },
        { label: 'School management software', to: '/school-management-software' },
        { label: 'Contact us', to: '/contact' },
      ],
    },
  ]
  
  export const getLandingPage = (path) => LANDING_PAGES.find((p) => p.path === path)