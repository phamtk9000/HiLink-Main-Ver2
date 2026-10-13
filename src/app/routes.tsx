import { createBrowserRouter, redirect, type LoaderFunctionArgs } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { HomePage } from './pages/HomePage';
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

// The home page ships in the first bundle; every other page is its own chunk,
// fetched when it is first visited.
export const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/en') },
  {
    path: '/:lang',
    loader: langGuard,
    Component: RootLayout,
    HydrateFallback: () => null,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', lazy: () => import('./pages/AboutPage').then((m) => ({ Component: m.AboutPage })) },
      { path: 'solutions', lazy: () => import('./pages/SolutionsPage').then((m) => ({ Component: m.SolutionsPage })) },
      { path: 'workspace-leasing', lazy: () => import('./pages/WorkspacePage').then((m) => ({ Component: m.WorkspacePage })) },
      { path: 'workspace/:locationId', lazy: () => import('./pages/WorkspaceDetailPage').then((m) => ({ Component: m.WorkspaceDetailPage })) },
      { path: 'property-management', lazy: () => import('./pages/PropertyManagementPage').then((m) => ({ Component: m.PropertyManagementPage })) },
      { path: 'concierge-services', lazy: () => import('./pages/ConciergePage').then((m) => ({ Component: m.ConciergePage })) },
      { path: 'business-services', lazy: () => import('./pages/BusinessConsultingPage').then((m) => ({ Component: m.BusinessConsultingPage })) },
      { path: 'industrial-logistics', lazy: () => import('./pages/IndustrialPage').then((m) => ({ Component: m.IndustrialPage })) },
      { path: 'business-club', lazy: () => import('./pages/BusinessClubPage').then((m) => ({ Component: m.BusinessClubPage })) },
      { path: 'partners', lazy: () => import('./pages/PartnersPage').then((m) => ({ Component: m.PartnersPage })) },
      { path: 'careers', lazy: () => import('./pages/CareersPage').then((m) => ({ Component: m.CareersPage })) },
      { path: 'news', lazy: () => import('./pages/NewsPage').then((m) => ({ Component: m.NewsPage })) },
      { path: 'contact', lazy: () => import('./pages/ContactPage').then((m) => ({ Component: m.ContactPage })) },
      { path: 'privacy-policy', lazy: () => import('./pages/PrivacyPolicyPage').then((m) => ({ Component: m.PrivacyPolicyPage })) },
      { path: 'terms', lazy: () => import('./pages/TermsPage').then((m) => ({ Component: m.TermsPage })) },

      { path: 'services', loader: moved('/solutions') },
      // Every "book a consultation" button leads to Contact; the old address follows.
      { path: 'book-consultation', loader: moved('/contact') },
      { path: 'concierge', loader: moved('/concierge-services') },
      { path: 'business-consulting', loader: moved('/business-services') },

      { path: '*', lazy: () => import('./pages/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })) },
    ],
  },
]);
