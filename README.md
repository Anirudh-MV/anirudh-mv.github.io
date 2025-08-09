# Simple Resume Website

A clean, responsive single-page resume website built with Next.js App Router and Tailwind CSS. Features dark/light mode toggle, minimal dependencies, and easy content management through a single configuration file.

## Features

- 🎨 **Clean Design**: Professional, responsive layout that works on all devices
- 🌙 **Dark/Light Mode**: Built-in theme toggle with system preference detection
- ⚡ **Fast Performance**: Built with Next.js App Router for optimal performance
- 📱 **Mobile Friendly**: Fully responsive design with mobile-first approach
- ♿ **Accessible**: Semantic HTML, ARIA labels, and keyboard navigation support
- 🔧 **Easy to Configure**: Single data file to update all content
- 📦 **Minimal Dependencies**: Only uses Next.js and Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ installed on your machine
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If you have the code in a repository
   git clone <your-repo-url>
   cd resume-website
   
   # Or download and extract the files to a folder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Update your information**
   
   Edit the \`data/resume.ts\` file with your personal information:
   - Name, title, and summary
   - Contact links (GitHub, LinkedIn, email, website, SoundCloud)
   - Work experience
   - Projects
   - Skills
   - Education

4. **Add your profile photo**
   
   Replace \`public/images/profile.png\` with your own photo, or update the \`imageSrc\` in \`data/resume.ts\` to point to your image URL.

### Development

Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see your resume website.

The page will automatically reload when you make changes to the code.

### Building for Production

1. **Build the application**
   \`\`\`bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   \`\`\`

2. **Test the production build locally** (optional)
   \`\`\`bash
   npm run start
   # or
   yarn start
   # or
   pnpm start
   \`\`\`

3. **Deploy**
   
   The \`out\` folder (or \`.next\` folder) contains your built application ready for deployment.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically build and deploy your site
4. Get a custom domain or use the provided vercel.app URL

### Netlify

1. Build your project: \`npm run build\`
2. Drag and drop the \`out\` folder to [Netlify](https://netlify.com)
3. Or connect your Git repository for automatic deployments

### GitHub Pages

1. Add this to your \`next.config.mjs\`:
   \`\`\`javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   export default nextConfig
   \`\`\`

2. Build: \`npm run build\`
3. Push the \`out\` folder contents to your \`gh-pages\` branch

### Other Hosting Providers

The built application is a static site that can be hosted on any web server or CDN:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any traditional web hosting service

## Customization

### Updating Content

All content is managed through the \`data/resume.ts\` file. Simply edit this file to update:

- Personal information
- Work experience
- Projects
- Skills
- Education
- Social links

### Styling

The website uses Tailwind CSS for styling. You can customize:

- Colors in \`tailwind.config.ts\`
- Layout and spacing in the component files
- Add new sections by creating components in \`app/ClientPage.tsx\`

### Adding New Sections

To add a new section (e.g., certifications, awards):

1. Add the data structure to \`data/resume.ts\`
2. Create a new component function in \`app/ClientPage.tsx\`
3. Add it to the main layout in the \`ClientPage\` component

## Project Structure

\`\`\`
├── app/
│   ├── ClientPage.tsx    # Main client component with all sections
│   ├── page.tsx         # Server component and metadata
│   ├── layout.tsx       # Root layout (provided by Next.js)
│   └── globals.css      # Global styles (provided by shadcn/ui)
├── data/
│   └── resume.ts        # Your resume data and configuration
├── public/
│   └── images/
│       └── profile.png  # Your profile photo
├── components/ui/       # UI components (provided by shadcn/ui)
├── lib/
│   └── utils.ts        # Utility functions (provided by shadcn/ui)
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
\`\`\`

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **shadcn/ui**: High-quality UI components

## Browser Support

This website works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Tailwind CSS
\`\`\`
