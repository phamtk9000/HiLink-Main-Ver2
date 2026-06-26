import { Link } from 'react-router';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';

const newsArticles = [
  {
    id: 1,
    category: 'Market Insights',
    title: 'Vietnam Real Estate Market Outlook 2026: Growth Opportunities in Commercial Sector',
    excerpt: 'As Vietnam\'s economy continues its robust growth trajectory, the commercial real estate sector presents unprecedented opportunities for international investors.',
    date: 'April 8, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1768118421365-0052e636eefc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwcmVhbCUyMGVzdGF0ZSUyMG1hcmtldHxlbnwxfHx8fDE3NzU4MTA0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 2,
    category: 'Industry Trends',
    title: 'The Rise of Flexible Workspaces in Hanoi and Ho Chi Minh City',
    excerpt: 'Analyzing the shift towards hybrid work models and what it means for commercial property management in Vietnam\'s major cities.',
    date: 'April 2, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1640109390671-edce15340659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU3MDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    category: 'Investment Guide',
    title: 'Foreign Investment in Vietnamese Property: Legal Framework and Best Practices',
    excerpt: 'A comprehensive guide for international investors navigating property ownership and investment regulations in Vietnam.',
    date: 'March 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1698047681820-f26b00b6c639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBoYW5kc2hha2V8ZW58MXx8fHwxNzc1NzA2MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    category: 'Development News',
    title: 'New Infrastructure Projects Reshaping Vietnam\'s Commercial Landscape',
    excerpt: 'How major infrastructure developments are creating new hotspots for commercial and residential property investment.',
    date: 'March 22, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1772551419713-302fc638b035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwZGV2ZWxvcG1lbnQlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzc1ODEwNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    category: 'Client Success',
    title: 'Case Study: Maximizing ROI Through Strategic Property Management',
    excerpt: 'How our integrated approach helped an international client achieve 23% increase in portfolio performance.',
    date: 'March 15, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzU2NTQyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    category: 'Market Insights',
    title: 'Q1 2026 Vietnam Property Market Report: Key Trends and Statistics',
    excerpt: 'Our quarterly analysis of market performance, rental yields, and investment opportunities across major Vietnamese cities.',
    date: 'March 10, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1761538367870-3a16b25f9bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwY2l0eXNjYXBlJTIwc2t5bGluZXxlbnwxfHx8fDE3NzU4MTAzODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const categories = ['All', 'Market Insights', 'Industry Trends', 'Investment Guide', 'Development News', 'Client Success'];

export function NewsPage() {
  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <HeroBg image="/workspace-photos/a57e2c5781bc65cf0e2a061375bf32119341b3b2-2048x1366.avif" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">News & Insights</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              Market Intelligence & Expert Perspectives
            </h1>
            <p className="text-xl text-[#EAE3D2] leading-relaxed">
              Stay informed with the latest trends, analysis, and insights from Vietnam's real estate market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-24 bg-[#F8F6F1]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              <motion.div 
                className="relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-[#A88F5C] text-white text-xs uppercase tracking-wider">
                  Featured
                </div>
              </motion.div>
              <motion.div>
                <div className="text-sm uppercase tracking-wider text-[#A88F5C] mb-4">
                  {featuredArticle.category}
                </div>
                <h2 className="serif text-4xl lg:text-5xl mb-6">{featuredArticle.title}</h2>
                <p className="text-lg text-[#707070] mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-[#707070] mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {featuredArticle.date}
                  </div>
                  <div>{featuredArticle.readTime}</div>
                </div>
                <Link
                  to={`/news/${featuredArticle.id}`}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#0F0F0F] text-white text-sm uppercase tracking-wider hover:bg-[#A88F5C] transition-colors group"
                >
                  Read Article
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-[#0F0F0F]/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 text-sm uppercase tracking-wider border border-[#0F0F0F]/20 hover:bg-[#0F0F0F] hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
          >
            <TrendingUp size={48} className="mx-auto mb-8 text-[#A88F5C]" />
            <h2 className="serif text-4xl lg:text-5xl mb-6">
              Subscribe to Market Insights
            </h2>
            <p className="text-xl text-[#EAE3D2] mb-12">
              Receive monthly reports, exclusive market analysis, and investment opportunities directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-[#A88F5C]"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ id, category, title, excerpt, date, readTime, image }: {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}) {
  return (
    <motion.article 
      className="group"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/news/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden mb-6">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="text-sm uppercase tracking-wider text-[#A88F5C] mb-3">
          {category}
        </div>
        <h3 className="serif text-2xl mb-4 group-hover:text-[#A88F5C] transition-colors">
          {title}
        </h3>
        <p className="text-[#707070] mb-6 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-6 text-sm text-[#707070]">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {date}
          </div>
          <div>{readTime}</div>
        </div>
      </Link>
    </motion.article>
  );
}
