export const revalidate = 3600; // Ανανέωση κάθε 1 ώρα (3600 δευτερόλεπτα)
import Parser from 'rss-parser';

const parser = new Parser();

async function getPosts() {
  const FEED_URL = 'https://project-econews.blogspot.com/feeds/posts/default?alt=rss';
  const feed = await parser.parseURL(FEED_URL);
  return feed.items;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            EcoNews Project
          </h1>
          <p className="mt-4 text-xl text-gray-600">Τα τελευταία νέα για το περιβάλλον και την οικονομία</p>
          <div className="mt-6 h-1 w-24 bg-green-500 mx-auto rounded"></div>
        </header>

        <div className="grid gap-8">
          {posts?.map((post: any) => {
            const summary = post.contentSnippet?.substring(0, 180) || 
                           post.content?.replace(/<[^>]*>/g, '').substring(0, 180);

            // Εξαγωγή του ID από το GUID του Blogger (π.χ. tag:blogger.com,1999:blog-XXXX.post-YYYY)
            const postId = post.guid.split('-').pop();

            return (
              <article key={post.guid || post.link} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <div className="flex flex-col">
                  <span className="text-sm text-green-600 font-semibold mb-2">
                    {new Date(post.pubDate).toLocaleDateString('el-GR')}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-green-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {summary}...
                  </p>
                  <div className="mt-auto">
                    <a 
                      href={`/post/${postId}`} 
                      className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Διαβάστε περισσότερα
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        <footer className="mt-16 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} EcoNews Next.js Blog
        </footer>
      </div>
    </div>
  );
}
