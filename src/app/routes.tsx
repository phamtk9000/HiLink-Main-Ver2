import { createBrowserRouter, redirect } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { WorkspaceDetailPage } from './pages/WorkspaceDetailPage';
import { PropertyManagementPage } from './pages/PropertyManagementPage';
import { ConciergePage } from './pages/ConciergePage';
import { ContactPage } from './pages/ContactPage';
import { NewsPage } from './pages/NewsPage';
import { BusinessConsultingPage } from './pages/BusinessConsultingPage';
import { IndustrialPage } from './pages/IndustrialPage';
import { PartnersPage } from './pages/PartnersPage';
import { CareersPage } from './pages/CareersPage';
import { BookConsultationPage } from './pages/BookConsultationPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'solutions', Component: SolutionsPage },
      { path: 'workspace-leasing', Component: WorkspacePage },
      { path: 'workspace/:locationId', Component: WorkspaceDetailPage },
      { path: 'property-management', Component: PropertyManagementPage },
      { path: 'concierge-services', Component: ConciergePage },
      { path: 'business-services', Component: BusinessConsultingPage },
      { path: 'industrial-logistics', Component: IndustrialPage },
      { path: 'partners', Component: PartnersPage },
      { path: 'careers', Component: CareersPage },
      { path: 'news', Component: NewsPage },
      { path: 'contact', Component: ContactPage },
      { path: 'book-consultation', Component: BookConsultationPage },
      { path: 'privacy-policy', Component: PrivacyPolicyPage },
      { path: 'terms', Component: TermsPage },

      // Redirects from old slugs (no 404s for existing links/bookmarks)
      { path: 'services', loader: () => redirect('/solutions') },
      { path: 'concierge', loader: () => redirect('/concierge-services') },
      { path: 'business-consulting', loader: () => redirect('/business-services') },
    ],
  },
]);
