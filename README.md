# NTC EDGE Portal (Electronic Data Governance and Evaluation System)

The **NTC EDGE Portal** is a professional, official-looking, fast, and mobile-friendly government website designed for the National Telecommunications Commission (NTC). It serves as a digital public service platform for regulatory and telecommunications-related services.

## 🚀 Features

- **Formal Government Design**: Navy blue, white, and light gray color palette with a clean layout and strong visual hierarchy.
- **Service Directory**: Categorized listings for Certificates, Permits and Licenses, Equipment Registration, and more.
- **Interactive Application Portal**: A multi-step application flow guiding users from service selection to submission.
- **Real-time Tracking**: Application status tracking using Reference Numbers (ARN).
- **Responsive Layout**: Optimized for both desktop and mobile devices.
- **Announcements & Advisories**: Dedicated section for public notices and system maintenance updates.
- **Support & FAQs**: Comprehensive FAQ section and contact information.

## 📁 Project Structure

- `content/`: Markdown files for all pages (About, Services, Apply, Track, Announcements, FAQ, Contact).
- `layouts/`: Hugo HTML templates.
    - `_default/`: Base templates.
    - `page/`: Custom page layouts.
    - `partials/`: Reusable components (Header, Footer, Hero, Service Cards, etc.).
    - `services/`: Templates for service listings and detail pages.
    - `announcements/`: Templates for news and advisories.
- `assets/css/`: Centralized CSS styling (`main.css`).
- `data/`: Mock data for application tracking (`mock_tracking.yaml`).
- `static/`: Static assets like images and robots.txt.
- `hugo.toml`: Site configuration and navigation menu.

## 🛠️ Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version recommended)

### Local Development

1. Clone the repository.
2. Run the development server:
   ```bash
   hugo server -D
   ```
3. Access the site at `http://localhost:1313`.

### Build

To generate the static site in the `public/` directory:
```bash
hugo
```

## 🚢 Deployment

The project is configured for deployment to **GitHub Pages** using GitHub Actions. The workflow is located in `.github/workflows/hugo.yml`. Any push to the `main` branch will automatically trigger a build and deployment.

## 📜 License

Official Digital Service Portal of the Republic of the Philippines.
