// LateLoop station data.
// Coordinates: OpenStreetMap / Nominatim. Travel times: OSRM (routing.openstreetmap.de)
// foot and car tables, fetched 5 Nov 2026. Index 0 is always the station.
// Opening hours are approximate and marked as such in the app.
window.LL_STATIONS = {
  "ambala-cantt": {
    name: { en: "Ambala Cantt Junction", hi: "अम्बाला कैंट जंक्शन" },
    code: "UMB", img: "img/ambala-rs.jpg",
    lat: 30.33824, lon: 76.8287,
    // minutes, rows/cols follow [station, ...places]
    walk: [
      [0, 5, 31, 26, 31, 41, 64, 56],
      [5, 0, 26, 24, 26, 36, 62, 52],
      [31, 26, 0, 33, 19, 29, 54, 41],
      [26, 24, 33, 0, 31, 38, 39, 54],
      [31, 26, 19, 31, 0, 10, 35, 26],
      [41, 36, 29, 38, 10, 0, 30, 16],
      [64, 62, 54, 39, 35, 30, 0, 33],
      [56, 52, 41, 54, 26, 16, 33, 0]
    ],
    drive: [
      [0, 1, 5, 3, 4, 5, 7, 7],
      [1, 0, 4, 3, 3, 5, 7, 6],
      [4, 4, 0, 4, 3, 4, 7, 6],
      [3, 3, 4, 0, 4, 5, 6, 6],
      [4, 3, 3, 4, 0, 1, 5, 3],
      [5, 4, 4, 5, 1, 0, 5, 2],
      [7, 8, 7, 7, 5, 5, 0, 5],
      [7, 6, 6, 6, 3, 2, 5, 0]
    ],
    places: [
      {
        id: "puran-singh", type: "food", lat: 30.34066, lon: 76.82755,
        open: 10, close: 23, visit: 40, score: 7,
        name: { en: "Puran Singh Da Dhaba", hi: "पूरन सिंह दा ढाबा" },
        short: { en: "Famous GT Road dhaba", hi: "जी.टी. रोड का मशहूर ढाबा" },
        story: {
          en: "Right next to the station on the old Grand Trunk Road, Puran Singh's dhaba has fed truck drivers, soldiers and travellers for decades. People drive in from Chandigarh just for its chicken and mutton curry with tandoori roti. If you only have a little time, this is the one stop to make.",
          hi: "स्टेशन के बिल्कुल पास, पुरानी ग्रैंड ट्रंक रोड पर पूरन सिंह का ढाबा दशकों से ट्रक ड्राइवरों, फौजियों और यात्रियों को खाना खिला रहा है। लोग सिर्फ़ इसकी चिकन और मटन करी व तंदूरी रोटी के लिए चंडीगढ़ से आते हैं। समय कम हो, तो यही एक जगह ज़रूर जाइए।"
        }
      },
      {
        id: "st-pauls", type: "heritage", lat: 30.35362, lon: 76.82881,
        open: 8, close: 18, visit: 25, score: 10,
        name: { en: "St. Paul's Church Ruins", hi: "सेंट पॉल चर्च के खंडहर" },
        short: { en: "1857 church, bombed in 1965", hi: "1857 का चर्च, 1965 में बमबारी" },
        story: {
          en: "Consecrated in 1857, St. Paul's was one of the grandest Gothic churches in North India, built for the British cantonment. During the 1965 India–Pakistan war it was hit in an air raid. Today only its walls and tall bell tower stand — a quiet, striking reminder of two chapters of history in one place.",
          hi: "1857 में बना सेंट पॉल चर्च उत्तर भारत के सबसे भव्य गॉथिक चर्चों में से एक था, जिसे अंग्रेज़ी छावनी के लिए बनाया गया था। 1965 के भारत-पाक युद्ध में हवाई हमले में यह टूट गया। आज सिर्फ़ इसकी दीवारें और ऊँचा घंटाघर खड़ा है — एक ही जगह पर इतिहास के दो अध्याय।"
        }
      },
      {
        id: "sadar-bazaar", type: "market", lat: 30.34006, lon: 76.84194,
        open: 10, close: 21, visit: 35, score: 8,
        name: { en: "Sadar Bazaar", hi: "सदर बाज़ार" },
        short: { en: "Old cantonment market", hi: "पुराना छावनी बाज़ार" },
        story: {
          en: "The busy heart of the cantonment. Ambala is known across India as a hub for scientific instruments, and you will find lab-equipment shops beside cloth stores, sweet shops and street food. Try a hot samosa or jalebi and watch everyday Ambala go by.",
          hi: "छावनी का धड़कता दिल। अम्बाला पूरे भारत में वैज्ञानिक उपकरणों के लिए जाना जाता है — यहाँ लैब उपकरणों की दुकानों के साथ कपड़े, मिठाई और स्ट्रीट फ़ूड की दुकानें मिलेंगी। गरम समोसा या जलेबी खाइए और रोज़मर्रा का अम्बाला देखिए।"
        }
      },
      {
        id: "mall-road", type: "heritage", lat: 30.35475, lon: 76.83711,
        open: 6, close: 21, visit: 20, score: 6,
        name: { en: "The Mall Road", hi: "द मॉल रोड" },
        short: { en: "Colonial-era tree-lined avenue", hi: "अंग्रेज़ों के ज़माने की सड़क" },
        story: {
          en: "Ambala Cantonment was set up by the British in 1843, and the Mall Road — now Mahatma Gandhi Marg — was its main avenue. Wide, green and calm, it still has old bungalows and army buildings. A pleasant walk between stops.",
          hi: "अम्बाला छावनी अंग्रेज़ों ने 1843 में बसाई थी और मॉल रोड — अब महात्मा गांधी मार्ग — इसकी मुख्य सड़क थी। चौड़ी, हरी-भरी और शांत, यहाँ आज भी पुराने बंगले और सेना की इमारतें हैं। दो जगहों के बीच एक सुकून भरी सैर।"
        }
      },
      {
        id: "kharga-memorial", type: "heritage", lat: 30.36079, lon: 76.84067,
        open: 9, close: 18, visit: 20, score: 7,
        name: { en: "Kharga War Memorial", hi: "खड़गा युद्ध स्मारक" },
        short: { en: "Tribute to the Kharga Corps", hi: "खड़गा कोर को श्रद्धांजलि" },
        story: {
          en: "Ambala is home to the Indian Army's Kharga Corps. This memorial honours its soldiers who gave their lives for the country. It sits inside the military cantonment, so carry ID and follow the guards' instructions — if the gate is closed, you can pay respects from outside.",
          hi: "अम्बाला भारतीय सेना की खड़गा कोर का घर है। यह स्मारक देश के लिए जान देने वाले इसके सैनिकों को समर्पित है। यह सैन्य छावनी के अंदर है, इसलिए पहचान पत्र साथ रखें और गार्ड के निर्देश मानें — गेट बंद हो तो बाहर से श्रद्धांजलि दे सकते हैं।"
        }
      },
      {
        id: "shiv-mandir", type: "faith", lat: 30.35645, lon: 76.8579,
        open: 5, close: 22, visit: 25, score: 7,
        name: { en: "Rani ka Talab & Prachin Shiv Mandir", hi: "रानी का तालाब और प्राचीन शिव मंदिर" },
        short: { en: "Old temple by a historic pond", hi: "ऐतिहासिक तालाब के पास पुराना मंदिर" },
        story: {
          en: "An old Shiva temple beside Rani ka Talab, a historic water tank. Locals gather here for the evening aarti, when bells and lamps fill the air. A peaceful place to sit, especially at dusk.",
          hi: "ऐतिहासिक रानी का तालाब के किनारे एक पुराना शिव मंदिर। शाम की आरती के समय यहाँ स्थानीय लोग जुटते हैं, घंटियों और दीयों से माहौल भर जाता है। खासकर शाम को बैठने के लिए एक शांत जगह।"
        }
      },
      {
        id: "cantt-lake", type: "nature", lat: 30.36819, lon: 76.84424,
        open: 6, close: 20, visit: 20, score: 5,
        name: { en: "Cantonment Board Lake", hi: "कैंटोनमेंट बोर्ड झील" },
        short: { en: "Green lake park", hi: "हरी-भरी झील और पार्क" },
        story: {
          en: "A calm lake park maintained by the Cantonment Board, popular for morning and evening walks. Good for stretching your legs after a long train journey.",
          hi: "कैंटोनमेंट बोर्ड की देखरेख में एक शांत झील और पार्क, जहाँ लोग सुबह-शाम सैर करते हैं। लंबे सफ़र के बाद पैर सीधे करने के लिए अच्छी जगह।"
        }
      }
    ]
  },

  "kurukshetra": {
    name: { en: "Kurukshetra Junction", hi: "कुरुक्षेत्र जंक्शन" },
    code: "KKDE", img: "img/kkr-station.jpg",
    lat: 29.96986, lon: 76.85171,
    walk: [
      [0, 46, 29, 29, 34, 25, 12, 38], [46, 0, 17, 16, 26, 23, 31, 5], [29, 17, 0, 4, 23, 13, 16, 14],
      [29, 16, 4, 0, 22, 11, 17, 10], [34, 26, 23, 22, 0, 16, 24, 20], [25, 23, 13, 11, 16, 0, 13, 18],
      [12, 31, 16, 17, 24, 13, 0, 25], [38, 5, 14, 10, 20, 18, 25, 0]
    ],
    drive: [
      [0, 5, 4, 3, 5, 4, 2, 4], [5, 0, 3, 2, 4, 4, 3, 1], [4, 3, 0, 1, 3, 2, 2, 2], [3, 2, 1, 0, 3, 2, 2, 1],
      [5, 4, 4, 3, 0, 3, 4, 3], [4, 4, 2, 2, 3, 0, 2, 3], [2, 4, 2, 2, 4, 3, 0, 3], [4, 1, 2, 1, 3, 3, 2, 0]
    ],
    places: [
      {
        id: "brahma-sarovar", type: "faith", img: "img/brahma-sarovar.jpg", lat: 29.96128, lon: 76.8274,
        open: 5, close: 22, visit: 35, score: 10,
        name: { en: "Brahma Sarovar", hi: "ब्रह्म सरोवर" },
        short: { en: "Giant sacred tank, Krishna–Arjun chariot", hi: "विशाल पवित्र सरोवर, कृष्ण-अर्जुन रथ" },
        story: {
          en: "One of the largest man-made sacred tanks in India. Pilgrims believe a dip here during a solar eclipse brings great merit, and every year the International Gita Mahotsav lights up its ghats. Don't miss the huge bronze chariot of Krishna and Arjuna — the moment the Bhagavad Gita was spoken.",
          hi: "भारत के सबसे बड़े मानव-निर्मित पवित्र सरोवरों में से एक। मान्यता है कि सूर्य ग्रहण के समय यहाँ स्नान का बड़ा पुण्य है, और हर साल अंतरराष्ट्रीय गीता महोत्सव इसके घाटों को रोशन करता है। कृष्ण और अर्जुन का विशाल रथ ज़रूर देखें — वही क्षण जब भगवद्गीता कही गई।"
        }
      },
      {
        id: "krishna-museum", type: "heritage", lat: 29.96534, lon: 76.83416,
        open: 10, close: 17, visit: 35, score: 8,
        name: { en: "Shri Krishna Museum", hi: "श्री कृष्ण संग्रहालय" },
        short: { en: "Art and stories of Krishna", hi: "कृष्ण की कला और कथाएँ" },
        story: {
          en: "Run by the Kurukshetra Development Board, this museum brings together sculptures, paintings, manuscripts and dioramas on the life of Krishna and the Mahabharata. A quick, rich introduction to why Kurukshetra matters.",
          hi: "कुरुक्षेत्र विकास बोर्ड द्वारा संचालित यह संग्रहालय कृष्ण के जीवन और महाभारत से जुड़ी मूर्तियाँ, चित्र, पांडुलिपियाँ और झाँकियाँ दिखाता है। कुरुक्षेत्र क्यों खास है, यह समझने का तेज़ और बढ़िया तरीका।"
        }
      },
      {
        id: "panorama", type: "heritage", lat: 29.96584, lon: 76.83342,
        open: 10, close: 18, visit: 35, score: 8,
        name: { en: "Kurukshetra Panorama & Science Centre", hi: "कुरुक्षेत्र पैनोरमा और विज्ञान केंद्र" },
        short: { en: "360° Mahabharata battle panorama", hi: "महाभारत युद्ध का 360° दृश्य" },
        story: {
          en: "Step inside a giant circular painting of the 18-day Mahabharata battle, with sound and light. Downstairs, science exhibits explain the technology of ancient India. Great with kids.",
          hi: "18 दिन के महाभारत युद्ध की विशाल गोलाकार पेंटिंग के बीच खड़े होइए, ध्वनि और रोशनी के साथ। नीचे विज्ञान प्रदर्शनी प्राचीन भारत की तकनीक समझाती है। बच्चों के साथ बढ़िया।"
        }
      },
      {
        id: "sheikh-chilli", type: "heritage", img: "img/sheikh-chilli.jpg", lat: 29.97665, lon: 76.8281,
        open: 9, close: 17, visit: 30, score: 9,
        name: { en: "Sheikh Chilli's Tomb & Harsh ka Tila", hi: "शेख चिल्ली का मकबरा और हर्ष का टीला" },
        short: { en: "Mughal tomb beside an ancient mound", hi: "प्राचीन टीले के पास मुगल मकबरा" },
        story: {
          en: "A graceful Mughal-era marble tomb of the Sufi saint Abdur Rahim, known as Sheikh Chilli, protected by the Archaeological Survey of India. Right next to it is Harsh ka Tila, an ancient mound linked to the time of King Harshavardhana. Two thousand years of history in one short walk.",
          hi: "सूफ़ी संत अब्दुर रहीम, जिन्हें शेख चिल्ली कहा जाता है, का मुगल काल का सुंदर संगमरमर मकबरा, जो भारतीय पुरातत्व सर्वेक्षण द्वारा संरक्षित है। ठीक पास में हर्ष का टीला है, राजा हर्षवर्धन के समय से जुड़ा एक प्राचीन टीला। एक छोटी सैर में दो हज़ार साल का इतिहास।"
        }
      },
      {
        id: "gurdwara-6", type: "faith", lat: 29.96888, lon: 76.83402,
        open: 0, close: 24, visit: 25, score: 7,
        name: { en: "Gurdwara Chhevin Patshahi", hi: "गुरुद्वारा छठी पातशाही" },
        short: { en: "Sikh shrine, langar open to all", hi: "सिख तीर्थ, सबके लिए लंगर" },
        story: {
          en: "This gurdwara marks the visit of Guru Hargobind Sahib, the sixth Sikh Guru, to Kurukshetra. Everyone is welcome — cover your head, remove your shoes, and share a free meal at the langar. A good stop at any hour, even late at night.",
          hi: "यह गुरुद्वारा छठे सिख गुरु, गुरु हरगोबिंद साहिब के कुरुक्षेत्र आगमन की याद में है। सबका स्वागत है — सिर ढकें, जूते उतारें और लंगर में मुफ़्त भोजन करें। किसी भी समय, देर रात भी, अच्छी जगह।"
        }
      },
      {
        id: "chole-bhature", type: "food", lat: 29.96914, lon: 76.84235,
        open: 8, close: 22, visit: 30, score: 7,
        name: { en: "Gulshan Bhai Ke Chole Bhature", hi: "गुलशन भाई के छोले भटूरे" },
        short: { en: "Local chole bhature favourite", hi: "लोकल छोले भटूरे की पसंदीदा दुकान" },
        story: {
          en: "Close to the station, this is where locals go for hot chole bhature — fluffy fried bread with spicy chickpeas, onion and pickle. Quick, filling and very Haryana.",
          hi: "स्टेशन के पास, यहाँ लोग गरमा-गरम छोले भटूरे खाने आते हैं — फूले हुए भटूरे, मसालेदार छोले, प्याज़ और अचार। जल्दी, पेट भरने वाला और पूरा हरियाणवी स्वाद।"
        }
      },
      {
        id: "birla-mandir", type: "faith", lat: 29.96507, lon: 76.82706,
        open: 6, close: 21, visit: 20, score: 6,
        name: { en: "Birla Mandir (Gita Mandir)", hi: "बिड़ला मंदिर (गीता मंदिर)" },
        short: { en: "Marble temple near Brahma Sarovar", hi: "ब्रह्म सरोवर के पास संगमरमर का मंदिर" },
        story: {
          en: "A white marble temple built by the Birla family, with verses of the Bhagavad Gita carved on its walls and a striking chariot sculpture outside. Calm and cool even on a busy day.",
          hi: "बिड़ला परिवार द्वारा बनवाया गया सफ़ेद संगमरमर का मंदिर, जिसकी दीवारों पर भगवद्गीता के श्लोक खुदे हैं और बाहर सुंदर रथ की मूर्ति है। भीड़ में भी शांत और ठंडा।"
        }
      }
    ]
  }
};
