export type Faq = { q: string; a: string };

// Adapted from the reference FAQ. Answers describe how Vistar Cabs actually works (enquiry first, team confirms
// directly, no online payment). Edit freely once the owner confirms policies.
export const generalFaqs: Faq[] = [
  { q: 'How can I book a taxi with VistarCabs?', a: 'Fill in the enquiry form on our website with your pickup and drop locations, travel date and time, and your mobile number. The VistarCabs team will call you to confirm the vehicle and fare. You can also call or WhatsApp us directly.' },
  { q: 'What types of cab services does VistarCabs offer?', a: 'We offer one-way trips, round trips, local cab rentals, airport transfers, outstation taxis and corporate cabs, with Nashik as our home base and journeys across Maharashtra.' },
  { q: 'Are VistarCabs taxi fares affordable and transparent?', a: 'The team confirms the fare with you directly before the trip. Share your route, date and vehicle preference, and we will explain what the fare covers so you know what to expect before you travel.' },
  { q: 'Can I book an airport taxi in advance?', a: 'Yes. You can arrange airport pickups and drops in advance. Share the airport, terminal, pickup time and flight number so the team can plan a timely pickup or drop.' },
  { q: 'What is the cancellation policy for cab bookings?', a: 'Cancellation terms are shared when the team confirms your booking. If your plans change, please call or WhatsApp us as early as possible so we can help.' },
  { q: 'Are the drivers professional and courteous?', a: 'Many customers mention polite, punctual drivers and clean cars in their Google reviews. If you have specific needs, such as travelling alone or with elderly passengers, mention them when you enquire and the team will plan accordingly.' },
  { q: 'Do I need to pay online on the website?', a: 'No. The website only collects your enquiry. Payment is agreed directly with the VistarCabs team.' },
];

export const corporateFaqs: Faq[] = [
  { q: 'What do corporate cab services from VistarCabs cover?', a: 'We can arrange cabs for employee transport, airport transfers, client visits and outstation business travel. Tell us your expected usage and the team will suggest a plan.' },
  { q: 'How do I get a corporate quote?', a: 'Use the Get Started button on this page, share your contact details, city and requirements, and the team will call you with a customised quote.' },
  { q: 'Can you handle regular monthly requirements?', a: 'Yes. Share your expected monthly usage, timings and routes, and we will discuss a plan that suits your business.' },
  { q: 'Do you offer airport pickups for visiting clients?', a: 'Yes. Send the airport, flight details and pickup time, and the team will arrange the transfer.' },
];

export const kumbhFaqs: Faq[] = [
  { q: 'When is the Nashik Kumbh Mela, and what are the main bathing dates?', a: 'The Nashik-Trimbakeshwar Simhastha Kumbh Mela runs from 31 October 2026 to 24 July 2028. The announced Amrit Snan dates are 2 August 2027, 31 August 2027, 11 September 2027 in Nashik and 12 September 2027 in Trimbakeshwar. Please confirm final details with the authorities.' },
  { q: 'Why is it called the Simhastha Kumbh?', a: 'It is named after the period when Jupiter is in Leo (Simha Rashi), which is why it is held once every twelve years.' },
  { q: 'Why are there two locations, Nashik and Trimbakeshwar?', a: 'Nashik centres on Ramkund and the Godavari ghats, while Trimbakeshwar, about 30 km away, is where the river rises and home to the Trimbakeshwar Jyotirlinga. Many pilgrims visit both.' },
  { q: 'Will private cabs be allowed near the main venues?', a: 'Authorities may restrict vehicles near the main ghats on busy days, so you may need to walk or use a shuttle for the last stretch. Ask us to plan a pickup and drop point just outside restricted zones.' },
  { q: 'Which airport should I fly into?', a: 'Nashik Airport at Ozar is the closest, roughly 20 km from the city. Mumbai Airport is a longer drive away, and Shirdi Airport suits pilgrims combining a Shirdi visit with the Mela.' },
  { q: 'Do fares change on Amrit Snan days?', a: 'The team confirms your fare directly when you enquire. Booking early and sharing exact dates helps us plan, especially on the busiest days.' },
  { q: 'How far in advance should I enquire?', a: 'For the Amrit Snan dates and other busy periods, enquire as early as you can, ideally several weeks ahead. For regular days, a few days ahead is a good start.' },
];
