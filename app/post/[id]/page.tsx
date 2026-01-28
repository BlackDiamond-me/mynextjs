import Parser from 'rss-parser';

const parser = new Parser();

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const FEED_URL = 'https://project-econews.blogspot.com/feeds/posts/default?alt=rss';
  const feed = await parser.parseURL(FEED_URL);
  
  // Αναζήτηση του άρθρου που περιέχει το ID στο guid του
  const post = feed.items.find(item => item.guid?.endsWith(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Το άρθρο δεν βρέθηκε.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <a href="/" className="text-green-600 hover:text-green-700 font-medium mb-4 inline-block">
            ← Επιστροφή στην αρχική
          </a>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            {post.title}
          </h1>
          <div className="text-gray-500">
            Δημοσιεύτηκε στις {new Date(post.pubDate!).toLocaleDateString('el-GR')}
          </div>
        </header>

        {/* Εδώ εμφανίζεται το πλήρες κείμενο του Blogger */}
        <div 
          className="prose prose-green prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content || '' }} 
        />
        
        <footer className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 italic">
            Πηγή: <a href={post.link} target="_blank" className="underline">Blogger</a>
          </p>
        </footer>
      </article>
    </div>
  );
}
