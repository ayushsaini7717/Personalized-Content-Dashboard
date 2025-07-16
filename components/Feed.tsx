'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import feedDataState from '@/recoil/feedDataAtom';
import ContentCard from './Card';
import CardSkeleton from './CardSkeleton';

const mockData = [
  {
    "status": "success",
    "totalResults": 700,
    "results": [
        {
            "article_id": "e5b5f7b24d05a3a14dbb8f716fbd2119",
            "title": "Italian restaurant in Burns Harbor closes its doors as ownership dispute lands in court",
            "link": "https://www.chicagotribune.com/2025/07/15/italian-restaurant-in-burns-harbor-closes-its-doors-as-ownership-dispute-lands-in-court/",
            "keywords": [
                "post-tribune",
                "business",
                "local news"
            ],
            "creator": [
                "Jim Woods"
            ],
            "description": "The Pizza Terra restaurant in Burns Harbor abruptly closed its doors Monday as part of an ownership dispute between business partners.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:37:35",
            "pubDateTZ": "UTC",
            "image_url": "https://www.chicagotribune.com/wp-content/uploads/2025/07/PTB-L-BH-PIZZA-0716-03.jpg?strip=all&w=1400px",
            "video_url": null,
            "source_id": "chicagotribune",
            "source_name": "Chicago Tribune",
            "source_priority": 2123,
            "source_url": "https://www.chicagotribune.com",
            "source_icon": "https://n.bytvi.com/chicagotribune.jpg",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "business"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "9a68ce620a5abb7f053e40a6c4dad340",
            "title": "Pizza Hut's $2 Tuesdays Are Back. Here’s How You Can Claim The Limited Time Deal",
            "link": "https://www.timesnownews.com/world/us/us-buzz/pizza-huts-2-tuesdays-are-back-heres-how-you-can-claim-the-limited-time-deal-article-152285906",
            "keywords": null,
            "creator": [
                "Yuvraj Tyagi"
            ],
            "description": "Pizza Hut is shaking up Tuesdays in July 2025 with a sizzling $2 Personal Pan Pizza deal, launched on July 8 and running through the month. Available for carryout only at participating US locations, this steal, capped at four per customer while supplies last, hits the app or in-store with no extras needed.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:30:19",
            "pubDateTZ": "UTC",
            "image_url": "https://images.timesnownews.com/thumb/msid-152285933,thumbsize-1533765,width-1280,height-720,resizemode-75/152285933.jpg",
            "video_url": null,
            "source_id": "timesnownews",
            "source_name": "Times Now News",
            "source_priority": 2243,
            "source_url": "https://www.timesnownews.com",
            "source_icon": "https://n.bytvi.com/timesnownews.png",
            "language": "english",
            "country": [
                "india"
            ],
            "category": [
                "top"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "1f31a88ac1ce3632b4b9e90bb3cbdfd7",
            "title": "Where Is The Equality in Law? Pune Porsche Case Victim’s Father Questions JJBs Decision To Try Main Accused As Minor",
            "link": "https://www.republicworld.com/india/where-is-the-equality-in-law-pune-porsche-case-victims-father-questions-jjb-s-decision-to-try-main-accused-as-minor",
            "keywords": [
                "pune ,pune porsche case ,pune porsche accident case ,maharashtra ,breaking news"
            ],
            "creator": null,
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:24:58",
            "pubDateTZ": "UTC",
            "image_url": "https://img.republicworld.com/all_images/pune-porsche-case-1752603891618-16_9.webp?format=webp&h=720&q=75&w=1280",
            "video_url": null,
            "source_id": "republicworld",
            "source_name": "Republic World",
            "source_priority": 17361,
            "source_url": "https://www.republicworld.com",
            "source_icon": "https://n.bytvi.com/republicworld.png",
            "language": "english",
            "country": [
                "india"
            ],
            "category": [
                "top"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "dddf2b29b3de17e682c9d5d35297cd92",
            "title": "A Bay Area ‘culinary rummage sale’ has Alice Waters items, 1790s bar tools",
            "link": "https://www.mercurynews.com/2025/07/15/a-bay-area-culinary-rummage-sale-has-alice-waters-items-1790s-bar-tools/",
            "keywords": [
                "lifestyle",
                "latest headlines",
                "events",
                "food",
                "drink",
                "travel",
                "restaurants, food and drink",
                "celebrities",
                "local news",
                "home and garden",
                "restaurants",
                "history",
                "things to do"
            ],
            "creator": [
                "John Metcalfe"
            ],
            "description": "On July 19, Les Dames d’Escoffier-San Francisco will sell off hundreds of culinary items with unique history and cultural value.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:19:49",
            "pubDateTZ": "UTC",
            "image_url": "https://www.mercurynews.com/wp-content/uploads/2025/07/SJM-L-RUMMAGE-0715-01_19d4b1.jpg?strip=all&w=1400px",
            "video_url": null,
            "source_id": "mercurynews",
            "source_name": "The Mercury News",
            "source_priority": 2968,
            "source_url": "https://www.mercurynews.com",
            "source_icon": "https://n.bytvi.com/mercurynews.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "sports"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "0fc14d327289c241d577bd0b5322afed",
            "title": "A Bay Area ‘culinary rummage sale’ has Alice Waters items, 1790s bar tools",
            "link": "https://www.eastbaytimes.com/2025/07/15/a-bay-area-culinary-rummage-sale-has-alice-waters-items-1790s-bar-tools/",
            "keywords": [
                "drink",
                "lifestyle",
                "events",
                "local news",
                "history",
                "restaurants, food and drink",
                "home and garden",
                "food",
                "celebrities",
                "travel",
                "things to do",
                "restaurants",
                "latest headlines"
            ],
            "creator": [
                "John Metcalfe"
            ],
            "description": "On July 19, Les Dames d’Escoffier-San Francisco will sell off hundreds of culinary items with unique history and cultural value.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:19:49",
            "pubDateTZ": "UTC",
            "image_url": "https://www.eastbaytimes.com/wp-content/uploads/2025/07/SJM-L-RUMMAGE-0715-01_19d4b1.jpg?h=768&w=1024",
            "video_url": null,
            "source_id": "eastbaytimes",
            "source_name": "East Bay Times",
            "source_priority": 22217,
            "source_url": "https://www.eastbaytimes.com",
            "source_icon": "https://n.bytvi.com/eastbaytimes.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "tourism"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": true
        },
        {
            "article_id": "ee4a96830243f86f952bd7441af55f50",
            "title": "Does Ireland have \"Open Borders\"?",
            "link": "https://politics.ie/threads/does-ireland-have-open-borders.286325/",
            "keywords": [
                "health and social affairs"
            ],
            "creator": [
                "Kevin Parlon",
                "invalid@example.com (Kevin Parlon)"
            ],
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:11:59",
            "pubDateTZ": "UTC",
            "image_url": null,
            "video_url": null,
            "source_id": "politics",
            "source_name": "Politics",
            "source_priority": 311214,
            "source_url": "https://politics.ie",
            "source_icon": "https://n.bytvi.com/politics.jpg",
            "language": "english",
            "country": [
                "ireland"
            ],
            "category": [
                "top",
                "politics"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "5f59c9fbaadb424f2fa055811f9d35a3",
            "title": "COMMUNITY DIGEST: July 16, 2025",
            "link": "https://www.citizensvoice.com/2025/07/15/community-digest-july-16-2025-2/",
            "keywords": [
                "local news",
                "community"
            ],
            "creator": [
                "Submitted To The Citizens Voice"
            ],
            "description": "Bazaars, picnics and festivals Big Tent Bazaar: 6 to 11 p.m. Friday, July 18; 5 to midnight (following 4 p.m. Mass) Saturday, July 19; 5 to 11 p.m. Sunday, July 20. Exaltation of the Holy Cross Parish, 420 Main Road, Hanover Twp. Homemade potato pancakes, halushki, clam chowder, whimpies, potato pierogi, farmer’s cheese pierogi, piggies, pulled pork, funnel cakes, homemade baked goods, and much more. Fun for all ages including a Mega Raffle (with thousands of dollars in prizes), nightly 50/50, lottery frame stand, money board, stuffed animals, Vera Bradley purse stand, instant bingo, wagon of cheer and over 150 [...]",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:10:45",
            "pubDateTZ": "UTC",
            "image_url": null,
            "video_url": null,
            "source_id": "citizensvoice",
            "source_name": "Citizens' Voice",
            "source_priority": 29495,
            "source_url": "https://www.citizensvoice.com",
            "source_icon": "https://n.bytvi.com/citizensvoice.jpg",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "top"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": true
        },
        {
            "article_id": "13946505d16d062f9bd19d2776d1639d",
            "title": "COMMUNITY DIGEST: July 16, 2025",
            "link": "https://www.standardspeaker.com/2025/07/15/community-digest-july-16-2025/",
            "keywords": [
                "community",
                "local news"
            ],
            "creator": [
                "Submitted To The Standard Speaker"
            ],
            "description": "Greater Hazleton Area The Wyoming Trail Council of Pennsylvania’s Native Americans hosts Pow-Wow: 10 a.m. to TBD Saturday, July 19; 10 a.m. to 5 p.m. Sunday, July 20. Camp Rotawanis, Drums. Open to the public. Native Americans of many tribes will be representing their style of ancient and modern dance while wearing the beautiful regalia associated with the various dances and tribal customs. Grand entry at noon each day begins with all dancers entering the dance arena led by flag bearers and followed by more dances. Native American vendors selling handmade crafts and food vendors. Tomahawk throw, petting zoo, and [...]",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:09:05",
            "pubDateTZ": "UTC",
            "image_url": null,
            "video_url": null,
            "source_id": "standardspeaker",
            "source_name": "Standardspeaker",
            "source_priority": 73351,
            "source_url": "https://www.standardspeaker.com",
            "source_icon": "https://n.bytvi.com/standardspeaker.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "top"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "3a8c7ece14816f00d404e8ca735e072f",
            "title": "Police deliver customer’s Little Caesars order after arresting Grubhub driver",
            "link": "https://www.dexerto.com/food/police-deliver-customers-little-caesars-order-after-arresting-grubhub-driver-3226704/",
            "keywords": [
                "food",
                "entertainment"
            ],
            "creator": [
                "Michael Gwilliam"
            ],
            "description": "Tempe police officers made sure one Arizona resident still got their Hot-N-Ready after arresting the Grubhub driver delivering it.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:05:49",
            "pubDateTZ": "UTC",
            "image_url": "https://www.dexerto.com/cdn-image/wp-content/uploads/2025/07/15/police-deliver-grubhub-arrest.jpg?format=auto&quality=75&width=1080",
            "video_url": null,
            "source_id": "dexerto",
            "source_name": "Dexerto",
            "source_priority": 1197,
            "source_url": "https://www.dexerto.com",
            "source_icon": "https://n.bytvi.com/dexerto.png",
            "language": "english",
            "country": [
                "united kingdom"
            ],
            "category": [
                "food"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        },
        {
            "article_id": "423ff1f1c80972cd1a02a794155c4ba7",
            "title": "Peck CDC kids visit Murph & Mary’s",
            "link": "https://www.newtondailynews.com/news/local/2025/07/15/peck-cdc-kids-visit-murph-marys/",
            "keywords": null,
            "creator": [
                "Newton Daily News"
            ],
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2025-07-15 18:03:00",
            "pubDateTZ": "UTC",
            "image_url": "https://www.newtondailynews.com/resizer/gbczwi2qRP9wUyCfKRwhVLF70dY=/cloudfront-us-east-1.images.arcpublishing.com/shawmedia/MM3HL3KHHVDPLNYJLP2RP7F5MM.jpg",
            "video_url": null,
            "source_id": "newtondailynews",
            "source_name": "Newtondailynews",
            "source_priority": 344781,
            "source_url": "https://www.newtondailynews.com",
            "source_icon": "https://n.bytvi.com/newtondailynews.jpg",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "top"
            ],
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
        }
    ],
    "nextPage": "1752602580415232474"
}
];

const Feed = () => {
    const [feed, setFeed] = useRecoilState(feedDataState);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setFeed(mockData[0].results); 
        setLoading(false);
      }, 2000);
    
      return () => clearTimeout(timer);
    }, [setFeed]);
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Personalized Feed</h2>
        <div className="relative top-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {loading ? (
            Array(24).fill(0).map((_, index) => (
             <div className='min-w-[300px]'>
                 <CardSkeleton key={`skeleton-${index}`} />
             </div>
            ))
          ) : (
            feed.map((item) => (
              <ContentCard
                key={item.article_id}
                title={item.title}
                description={item.description}
                imageUrl={item.image_url}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  export default Feed;