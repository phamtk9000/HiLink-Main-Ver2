import { createBrowserRouter, redirect, type LoaderFunctionArgs } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
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
import { NotFoundPage } from './pages/NotFoundPage';
import { isLang } from './lib/i18n';

// /:lang must be en or vi. Anything else is a path without a language —
// e.g. /about or an old bookmark — so send it to the English version.
function langGuard({ params, request }: LoaderFunctionArgs) {
  if (isLang(params.lang)) return null;
  const url = new URL(request.url);
  throw redirect(`/en${url.pathname}${url.search}${url.hash}`);
}

// Old slugs keep working.
const moved = (to: string) => ({ params }: LoaderFunctionArgs) => redirect(`/${params.lang}${to}`);

export const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/en') },
  {
    path: '/:lang',
    loader: langGuard,
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'solutions', Component: SolutionsPage },
      { path: 'workspace-leasing', Component: WorkspacePage },
      { path: 'properties/:propertyId', Component: PropertyDetailPage },
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

      { path: 'services', loader: moved('/solutions') },
      { path: 'concierge', loader: moved('/concierge-services') },
      { path: 'business-consulting', loader: moved('/business-services') },
      { path: 'workspace/quarter-house', loader: moved('/properties/quarter-house') },
      { path: 'workspace/:locationId', loader: moved('/workspace-leasing') },

      { path: '*', Component: NotFoundPage },
    ],
  },
]);
