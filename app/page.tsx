import Parser from 'rss-parser';

const parser = new Parser();

async function getPosts() {
  // ΑΝΤΙΚΑΤΑΣΤΗΣΕ το URL παρακάτω με το δικό σου blogspot URL
  const FEED_URL = 'https://dev.blackdiamond.me/feeds/posts/default?alt=rss';
  const feed = await parser.parseURL(FEED_URL);
  return feed.items;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Το Blog μου</h1>
      <hr />
{posts?.map((post: any) => (
  <article key={post.guid} style={{ marginBottom: '40px' }}>
          <h2>{post.title}</h2>
          <small>{post.pubDate}</small>
          <div dangerouslySetInnerHTML={{ __html: post.content || '' }} style={{ marginTop: '20px' }} />
        </article>
      ))}
    </div>
  );
}
