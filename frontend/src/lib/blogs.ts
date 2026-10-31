export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogPost = {
  slug: string; title: string; excerpt: string; category: string; date: string; readMinutes: number;
  image: string; sections: BlogSection[];
};

export const blogCategories = ['Travel Guides', 'Kumbh Mela', 'Route Info', 'Cab Tips'];

// Distances and times are approximate and vary with traffic and route. Written for Vistar Cabs.
export const posts: BlogPost[] = [
  {
    slug: 'nashik-to-trimbakeshwar-travel-guide',
    title: 'Nashik to Trimbakeshwar: A Practical Trip Guide',
    excerpt: 'How far it is, how long to allow, what to see on the way and how to plan a comfortable day trip by cab.',
    category: 'Travel Guides', date: 'Oct 31, 2026', readMinutes: 6, image: 'places/trimbakeshwar',
    sections: [
      { heading: 'The route at a glance', paragraphs: [
        'Trimbakeshwar sits roughly 28 to 30 km from Nashik city, and most travellers allow about an hour each way. Morning traffic, festival days and a busy temple queue can add time, so it helps to start early.',
        'The road runs through green hills at the foot of the Brahmagiri range. Many families add a stop on the way back, which turns a short drive into a relaxed day out.' ] },
      { heading: 'What to see', paragraphs: [
        'The Trimbakeshwar Temple is one of the twelve Jyotirlingas and the main reason most pilgrims make the trip. Kushavarta Kund, a short walk from the temple, is an important bathing spot where the Godavari is said to begin its journey.',
        'If you have energy left, the Brahmagiri hill climb offers wide views and is associated with the source of the Godavari. Check the weather and temple timings before you plan the climb.' ] },
      { heading: 'Planning the day by cab', paragraphs: [
        'A cab saves you from juggling parking and local transport near the temple. Share your pickup point, preferred start time and number of passengers, and ask the driver where to wait. On crowded days the last stretch to the temple may need to be on foot.',
        'Carry water, a light cover-up for the temple, and small cash for offerings. If elderly passengers are travelling with you, mention it when you enquire so the team can plan comfortable stops.' ] },
      { heading: 'Make it a longer trip', paragraphs: [
        'Trimbakeshwar combines well with Anjaneri hill, Pandavleni Caves or a Panchavati visit in Nashik. A full-day local rental can cover several of these without rushing. Send an enquiry with your plan and the VistarCabs team will help you shape the day.' ] },
    ],
  },
  {
    slug: 'nashik-travel-guide-first-time-visitors',
    title: 'First Time in Nashik? Where to Go and How to Get Around',
    excerpt: 'A simple first-visit plan covering Ramkund, Panchavati, the caves, the vineyards and the smartest ways to travel between them.',
    category: 'Travel Guides', date: 'Oct 31, 2026', readMinutes: 7, image: 'about-nashik',
    sections: [
      { heading: 'Start with Panchavati and Ramkund', paragraphs: [
        'Panchavati is the heart of religious Nashik. Ramkund on the Godavari, Kalaram Temple and Sita Gufaa sit close together, and the area is best explored on foot in the morning or evening when it is cooler.',
        'Evenings by the river are calm and atmospheric. Ask your driver for the best drop-off and pickup spot because lanes near the ghats can be narrow and crowded.' ] },
      { heading: 'Add history and views', paragraphs: [
        'Pandavleni Caves, a group of ancient rock-cut Buddhist caves on a hill outside the city, reward the short climb with a view over Nashik. Anjaneri, associated with Lord Hanuman, is another popular hill stop.',
        'Nashik is also known for its wineries. Sula and other vineyards offer tours and tastings, usually as a half-day plan.' ] },
      { heading: 'Getting around', paragraphs: [
        'Distances between Nashik Road, Panchavati and the hills add up quickly, and public transport may not match your timings. A local cab on an hourly or full-day basis lets you plan stops freely and carry shopping and luggage easily.',
        'Tell the team how many hours you need, where you are staying and which places matter most. They can suggest a sensible order so you spend less time on the road.' ] },
      { heading: 'Trips beyond the city', paragraphs: [
        'Nashik works as a base for Trimbakeshwar, Igatpuri, Shirdi and Saptashrungi. If you are travelling on to Mumbai, Pune or an airport, an outstation or airport cab can be arranged in advance through the enquiry form.' ] },
    ],
  },
  {
    slug: 'nashik-kumbh-mela-2026-2028-travel-planning',
    title: 'Planning Your Travel for the Nashik Kumbh Mela 2026-2028',
    excerpt: 'Key dates, how to reach Nashik and Trimbakeshwar, and practical tips for moving around during a very busy pilgrimage.',
    category: 'Kumbh Mela', date: 'Oct 31, 2026', readMinutes: 7, image: 'kumbh-mela-nashik',
    sections: [
      { heading: 'The dates to know', paragraphs: [
        'The Nashik-Trimbakeshwar Simhastha Kumbh Mela begins on 31 October 2026 and continues until 24 July 2028. The announced Amrit Snan days in 2027 are 2 August, 31 August and 11 September in Nashik, with the third bath at Trimbakeshwar on 12 September.',
        'Authorities may update schedules, so check official announcements as your dates get closer.' ] },
      { heading: 'Expect crowds and restrictions', paragraphs: [
        'On the busiest days, traffic near the ghats is likely to be diverted and vehicles may be stopped at designated parking zones. Plan to walk the final stretch and wear comfortable footwear.',
        'Fix a landmark for your pickup rather than a spot deep inside the crowd. Share your phone location with your group and agree a meeting point in case you get separated.' ] },
      { heading: 'Reaching Nashik', paragraphs: [
        'Nashik Airport at Ozar is the closest airport, and Mumbai and Shirdi airports are alternatives. Nashik Road is the main railway station. Roads from Mumbai and Pune are well connected, but allow extra time on festival days.',
        'Whichever way you arrive, pre-arranging a pickup means you do not have to look for transport in a crowded arrival area. Send your arrival details through the form and the team will call to confirm.' ] },
      { heading: 'Booking early', paragraphs: [
        'Demand will be highest around the Amrit Snan dates. Enquire early, share exact dates and passenger numbers, and keep your phone reachable so the team can confirm timings. Our Kumbh Mela page has a quick travel guide and the enquiry form.' ] },
    ],
  },
  {
    slug: 'nashik-to-mumbai-and-pune-by-cab',
    title: 'Nashik to Mumbai or Pune by Cab: What to Know Before You Go',
    excerpt: 'Typical distances, how to avoid the worst traffic, and what to share with the team so your intercity trip runs smoothly.',
    category: 'Route Info', date: 'Oct 31, 2026', readMinutes: 5, image: 'cities/mumbai',
    sections: [
      { heading: 'Distances and timing', paragraphs: [
        'Nashik to Mumbai is roughly 165 to 170 km and usually takes three and a half to four and a half hours, depending on traffic near the city and on Kasara ghat. Nashik to Pune is around 210 km and often takes four to five hours.',
        'These are estimates. Weekends, festivals and monsoon showers can all slow things down.' ] },
      { heading: 'Pick the right time', paragraphs: [
        'Leaving early in the morning helps you reach Mumbai or Pune before the heaviest traffic. For flights, build in a comfortable buffer instead of cutting it close.',
        'If you are returning the same day, share your return time up front so the driver can plan rest and waiting.' ] },
      { heading: 'One way or round trip?', paragraphs: [
        'A one-way cab suits travellers who are staying at the other end. A round trip makes sense when you will return within a day or two. Tell the team your plan and they can explain the options.' ] },
      { heading: 'What to share in your enquiry', paragraphs: [
        'Add your exact pickup area, drop location, date, time and number of passengers. If you have large luggage or need a child seat or extra stop, mention it when the team calls you back. The more detail you share, the smoother the trip.' ] },
    ],
  },
  {
    slug: 'how-to-plan-an-airport-cab-pickup',
    title: 'How to Plan a Stress-Free Airport Cab Pickup or Drop',
    excerpt: 'Simple steps that help your airport transfer to Nashik, Mumbai, Pune or Shirdi run on time.',
    category: 'Cab Tips', date: 'Oct 31, 2026', readMinutes: 4, image: 'airports/nashik-ozar',
    sections: [
      { heading: 'Share flight details', paragraphs: [
        'For pickups, give the airport, terminal, flight number and landing time. The team can then plan around delays instead of guessing when you will come out.' ] },
      { heading: 'Allow enough time for drops', paragraphs: [
        'Add the drive, traffic and check-in time. Mumbai and Pune airports need more buffer than smaller airports. If you are travelling from Nashik, plan your departure with a safety margin.' ] },
      { heading: 'Agree a pickup point', paragraphs: [
        'Airports have designated pickup zones and can get crowded. Ask the driver where to meet, and keep your phone on after landing so you can be reached.' ] },
      { heading: 'Mention special needs', paragraphs: [
        'Travelling with elderly family members, young children or lots of luggage? Say so in advance so the right vehicle is arranged. Send your airport transfer enquiry through the form and the VistarCabs team will confirm the details.' ] },
    ],
  },
];

export const getPost = (slug: string) => posts.find(p => p.slug === slug);
