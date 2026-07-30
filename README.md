# METALCRAFT landing page

Production-ready Czech landing page built with Next/Vinext and Tailwind CSS.

## Run locally

Install dependencies with `npm install`, then run `npm run dev`. Create a production build with `npm run build`.

## Edit company information

All placeholder company details, contact data, navigation, metrics, services, projects, process steps and benefits live in `app/content.ts`. Replace the placeholder canonical URL, address, phone, email and IČO there before launch.

## Edit services and case studies

Update the `services` and `projects` arrays in `app/content.ts`. Repeated UI is rendered automatically from these objects. The project model already keeps title, category, summary, image position and layout span together.

## Connect the quote form

`QuoteForm` in `app/components.tsx` currently provides UI and validation only. Replace its `submit` handler with a call to your API, e-mail service or CRM. For file uploads, use multipart form data and server-side file validation.

## Add a case-study detail page

Add a `slug` plus future `problem`, `solution`, `process`, `materials`, `gallery` and `result` fields to each project object. Create `app/realizace/[slug]/page.tsx`, find the matching project by slug and render those fields. Change the card link from `#kontakt` to `/realizace/${project.slug}`.
