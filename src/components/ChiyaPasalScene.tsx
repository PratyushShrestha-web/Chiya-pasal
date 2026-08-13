"use client";

import { useEffect, useState } from "react";

export default function ChiyaPasalScene() {
  const [time, setTime] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);

  // =========================================
  // SMALL STORY FRAGMENTS
  // =========================================
const stories = [
  "केही साँझहरू घर पुगेपछि मात्र सम्झना आउँछन्।",

  "पुरानो गीत बज्दा, समय पनि अलि बिस्तारै हिँडेजस्तो लाग्छ।",

  "त्यो बेला पाँच रुपैयाँको चियाले पनि धेरै बेरको संगत दिन्थ्यो।",

  "घर जान हतार थिएन, चिया सकिन मात्रै हतार थियो।",

  "बाजेले नामले होइन, अनुहारले मान्छे चिन्नुहुन्थ्यो।",

  "पानी परेको दिन चिया पसल अलि बढी भरिन्थ्यो।",

  "कसैको छाता ढोकामा हुन्थ्यो, कसैको कथा भित्र।",

  "पुरानो रेडियोको आवाजमा पनि घरजस्तो केही हुन्थ्यो।",

  "स्कुल छुटेपछि सिधै घर जाने चलन कहाँ थियो र।",

  "एउटा चिया, दुई जना साथी, अनि घरबाट आएका तीनवटा मिस्ड कल।",

  "कहिलेकाहीँ चिया खानुभन्दा चिया खान आएको बहाना प्यारो हुन्थ्यो।",

  "त्यो कुनामा बसेर बिताएका साँझहरूको कुनै फोटो छैन।",

  "तर अचम्म, सम्झना भने अझै त्यहीँको जस्तो छ।",

  "पहाडतिरबाट आएको मान्छेको कपडामा बाटोको गन्ध हुन्थ्यो।",

  "टाढा जानेहरू प्रायः चुपचाप जान्थे।",

  "फर्केर आउँछु भन्नेहरू सबै फर्केर आएनन्।",

  "तर उनीहरू बसेको कुर्सीले धेरै कुरा सम्झिरह्यो।",

  "हिउँदको घाममा चिया झन् मिठो लाग्थ्यो।",

  "बिहानको पसलमा मान्छे कम, खबर धेरै हुन्थे।",

  "साँझ पर्न थालेपछि सबैका आवाजहरू अलि नरम हुन्थे।",

  "कुनै दिन ठूलो कुरा भएन, त्यसैले त्यो दिन राम्रो थियो।",

  "कुनै कुनै दिन सम्झन लायक हुन केही विशेष हुनुपर्दैन।",

  "आमाले ढिलो नगर भनेको साँझहरू अहिले छिट्टै सम्झना आउँछन्।",

  "त्यतिबेला घर फर्किनु बाध्यता थियो, अहिले चाहना।",

  "पुरानो बाटो उस्तै थियो, हामी मात्र अलि टाढा पुगिसकेका थियौँ।",

  "गाउँ छोडेर सहर आएको मान्छेले पहिले आफ्नो आवाज हराउँछ।",

  "सहरमा भीड धेरै थियो, चिनेजानेका अनुहार कम।",

  "त्यसैले कहिलेकाहीँ एउटा चिया पसल नै आफ्नो गाउँजस्तो लाग्थ्यो।",

  "बाजेको पसलमा कसैले ठूलो सपना सुनाउँदैनथ्यो।",

  "तर सबैको आँखामा कतै जाने बाटो हुन्थ्यो।",

  "कसैलाई विदेश जानु थियो।",

  "कसैलाई घर फर्किनु थियो।",

  "कसैलाई केवल आजको दिन काट्नु थियो।",

  "चिया सबैका लागि उस्तै तातो हुन्थ्यो।",

  "मान्छेका दुःखहरू मात्र फरक हुन्थे।",

  "कहिलेकाहीँ अपरिचितसँग गरेको पाँच मिनेटको कुरा पनि वर्षौँ सम्झिन्छौँ।",

  "नाम बिर्सिन्छौँ, आवाज सम्झिरहन्छौँ।",

  "अनुहार बिर्सिन्छौँ, हाँसो सम्झिरहन्छौँ।",

  "ठेगाना हराउँछ, बाटो सम्झनामा बाँकी रहन्छ।",

  "पुरानो कपमा लागेको चियाको दागजस्तै केही समयहरू मेटिँदैनन्।",

  "त्यो रेडियो धेरै पुरानो थियो, तर कसैलाई फेर्न मन लागेन।",

  "सायद पुरानो आवाजमा आफ्नै उमेर सुनिन्थ्यो।",

  "बाजे रेडियो सुन्दै चिया बनाउनुहुन्थ्यो।",

  "कहिलेकाहीँ गीतभन्दा रेडियोको खरखर नै मिठो लाग्थ्यो।",

  "बाहिर पानी परिरहेको हुन्थ्यो, भित्र कसैले पुरानो प्रेम सम्झिरहेको।",

  "कसैले केही भनिरहेको हुँदैनथ्यो।",

  "तर चुपचाप बस्नु पनि एउटा किसिमको कुराकानी रहेछ।",

  "त्यो उमेरमा हामीलाई लाग्थ्यो, समय धेरै छ।",

  "अहिले थाहा भयो, समय नै सबैभन्दा कम रहेछ।",

  "पहिले भेट्ने समय मिल्थ्यो।",

  "पछि फोन गर्न समय मिलाउनुपर्‍यो।",

  "अनि एकदिन सम्झन मात्र समय बाँकी रह्यो।",

  "केही साथीहरू सामाजिक सञ्जालमा अझै छन्।",

  "तर उनीहरूसँग बिताएको त्यो साँझ कतै छैन।",

  "पुरानो फोटोले मान्छे देखाउँछ, समय देखाउँदैन।",

  "समय सम्झनलाई कहिलेकाहीँ एउटा गन्ध नै काफी हुन्छ।",

  "भिजेको माटो।",

  "काठको धुवाँ।",

  "तातो चिया।",

  "पुरानो कागज।",

  "यी सबैमा कुनै न कुनै घर लुकेको हुन्छ।",

  "दसैं आउँदा सहर अलि खाली हुन्थ्यो।",

  "बसपार्कमा भीड हुन्थ्यो, तर सबैको मन घरतिर हुन्थ्यो।",

  "कसैले गाउँबाट अचार ल्याउँथ्यो।",

  "कसैले आमाको हातको सेलरोटी।",

  "कसैले केही ल्याएको हुँदैनथ्यो।",

  "तर सबैसँग घरको कुरा हुन्थ्यो।",

  "तिहारको बत्ती निभेपछि पनि केही घरहरू उज्यालै लाग्थे।",

  "सायद घर उज्यालो बनाउने बत्ती थिएन।",

  "भित्र बसेका मान्छे थिए।",

  "कुनै बेला हामी पनि कसैको घरको उज्यालो थियौँ होला।",

  "अहिले आफ्नै कोठामा बसेर पुराना घरहरू सम्झिन्छौँ।",

  "सम्झना पनि अचम्मको घर रहेछ।",

  "ढोका आफैँ खुल्छ।",

  "भित्र जान टिकट चाहिँदैन।",

  "तर फर्किन खोज्दा मन भारी हुन्छ।",

  "कहिलेकाहीँ पुरानो गीतले मान्छेलाई पुरानो बनाइदिन्छ।",

  "त्यो गीत पहिलो पटक कहाँ सुनियो, याद नहुन सक्छ।",

  "तर कसको साथमा सुनियो, त्यो बिर्सन गाह्रो हुन्छ।",

  "केही गीतहरू संगीत होइनन्।",

  "ती त लुकेर बसेका पुराना दिन हुन्।",

  "आज पसल अलि शान्त छ।",

  "सायद मान्छेहरू आफ्ना-आफ्ना जीवनमा व्यस्त छन्।",

  "तर एउटा कुर्सी अझै खाली छ।",

  "कसैको प्रतीक्षा हो कि केवल बानी, थाहा छैन।",

  "बाजेले त्यो कुर्सी हटाउनुहुन्न।",

  "पुराना मान्छेहरूलाई थाहा हुन्छ—सबै खाली ठाउँ भरिनुपर्दैन।",

  "केही खाली ठाउँले नै कथा बचाइराख्छ।",

  "साँझ अझै त्यस्तै पर्छ।",

  "फरक यति हो, हामीसँग हेर्ने फुर्सद कम भएको छ।",

  "पहिले आकाश हेर्थ्यौँ।",

  "अहिले स्क्रिन हेर्छौँ।",

  "पहिले चिया लामो हुन्थ्यो।",

  "अहिले कुराकानी छोटो।",

  "पहिले बिदाइ भन्न गाह्रो हुन्थ्यो।",

  "अहिले 'seen' गरेर पनि मान्छे हराउँछन्।",

  "तर केही सम्बन्धहरूलाई इन्टरनेटले पनि पुरानो बनाउन सकेन।",

  "किनकि ती सम्झनामा बसेका छन्।",

  "कुनै दिन फेरि यही बाटो हिँड्दा",

  "सायद पसल त्यहाँ नहोला।",

  "सायद रेडियो पनि नहोला।",

  "सायद बाजे पनि नहुनुहोला।",

  "तर कुनै साँझ चियाको गन्ध आयो भने",

  "तपाईंलाई यो ठाउँ याद आउला।",

  "त्यसपछि थाहा हुनेछ—",

  "केही ठाउँहरू ठाउँ हुँदैनन्।",

  "ती हाम्रो जीवनको एउटा सानो समय हुन्छन्।",

  "र समय बितेपछि मात्र थाहा हुन्छ,",

  "त्यो समय कति सुन्दर थियो।",
];

  // =========================================
  // NEPAL TIME
  // =========================================

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Convert English digits → Nepali digits
      const nepaliDigits = timeString.replace(/[0-9]/g, (digit) => {
        const digits = "०१२३४५६७८९";
        return digits[Number(digit)];
      });

      // Convert AM / PM → Nepali
      const nepaliTime = nepaliDigits
        .replace("AM", "बिहान")
        .replace("PM", "बेलुका");

      setTime(nepaliTime);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // =========================================
  // STORY ROTATION
  // =========================================
useEffect(() => {
  const interval = setInterval(() => {
    setStoryIndex((current) => {
      if (current >= stories.length - 1) {
        clearInterval(interval);
        return current;
      }

      return current + 1;
    });
  }, 14000);

  return () => clearInterval(interval);
}, [stories.length]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
       
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* =========================================
          BACKGROUND IMAGE
      ========================================== */}

      <img
        src="/images/chiya-pasal.png"
        alt="Nepali chiya pasal"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* =========================================
          SLIGHT DARK OVERLAY
      ========================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18), transparent 35%, rgba(0,0,0,0.12))",

          pointerEvents: "none",

          zIndex: 1,
        }}
      />

      {/* =========================================
          BAJEKO CHIYA PASAL
      ========================================== */}

      <div
        style={{
          position: "absolute",

          top: "38%",
          left: "50%",

          transform: "translate(-50%, -50%)",

          width: "90vw",
          maxWidth: "1000px",

          textAlign: "center",

          fontFamily: "'Yatra One', serif",

          color: "#f8f6f3",

          fontSize: "clamp(50px, 9vw, 130px)",

          fontWeight: 400,

          lineHeight: 0.9,

          letterSpacing: "0",

          textShadow:
            "0 3px 8px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.25)",

          zIndex: 10,

          pointerEvents: "none",
        }}
      >
        <div>बाजेको चिया</div>

        <div>पसल</div>

        {/* =========================================
            STORY LINE
        ========================================== */}

        <div
          key={storyIndex}
          style={{
            marginTop: "22px",

            fontFamily: "'Yatra One', serif",

            fontSize: "clamp(11px, 1.5vw, 18px)",

            fontWeight: 400,

            lineHeight: 1.4,

            color: "rgb(255, 248, 235)",

            letterSpacing: "0.1px",

            textShadow:
              "0 2px 6px rgba(0,0,0,0.45)",

            opacity: 0,

            animation: "storyFade 7s ease-in-out forwards",

            whiteSpace: "nowrap",
          }}
        >
          {stories[storyIndex]}
        </div>
      </div>

      {/* =========================================
          STORY ANIMATION
      ========================================== */}

      <style>
        {`
          @keyframes storyFade {
            0% {
              opacity: 0;
              transform: translateY(5px);
            }

            12% {
              opacity: 0.82;
              transform: translateY(0);
            }

            82% {
              opacity: 0.82;
              transform: translateY(0);
            }

            100% {
              opacity: 0;
              transform: translateY(-4px);
            }
          }

          @media (max-width: 600px) {
            .story-text {
              max-width: 85vw;
            }
          }
        `}
      </style>

      {/* =========================================
          NEPAL TIME - TOP LEFT
      ========================================== */}

      <div
        style={{
          position: "absolute",

          top: "20px",
          left: "22px",

          padding: "7px 11px",

          borderRadius: "10px",

          background: "rgba(0, 0, 0, 0.30)",

          border: "1px solid rgba(255, 255, 255, 0.16)",

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",

          color: "rgba(255, 255, 255, 0.92)",

          fontFamily: "'Yatra One', serif",

          fontSize: "12px",

          fontWeight: 400,

          letterSpacing: "0.3px",

          textShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",

          zIndex: 20,
        }}
      >
        {time}
      </div>

      {/* =========================================
          TOP RIGHT MUSIC NAVIGATION
      ========================================== */}

      <div
        style={{
          position: "absolute",

          top: "18px",
          right: "22px",

          display: "flex",

          alignItems: "center",

          gap: "6px",

          padding: "6px",

          borderRadius: "14px",

          background: "rgba(0, 0, 0, 0.30)",

          border: "1px solid rgba(255, 255, 255, 0.16)",

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",

          zIndex: 20,
        }}
      >
        {/* =========================================
            SPOTIFY
        ========================================== */}

        <a
          href="https://open.spotify.com/playlist/1MuvRJTyvDO236lb2BDMBV?si=5cde686d4a2a4a47"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify playlist"
          title="Spotify playlist"
          style={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            padding: "7px 9px",

            borderRadius: "9px",

            color: "rgba(255,255,255,0.88)",

            textDecoration: "none",

            fontSize: "10px",

            fontWeight: 500,

            letterSpacing: "0.3px",

            background: "rgba(255,255,255,0.06)",
          }}
        >
          {/* Spotify logo */}

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#1DB954"
            aria-hidden="true"
          >
            <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.82 15.15a.87.87 0 0 1-1.2.29c-3.29-2.01-7.43-2.47-12.3-1.35a.87.87 0 1 1-.39-1.69c5.34-1.22 9.91-.7 13.6 1.55.4.24.53.77.29 1.2Zm1.62-3.6a1.09 1.09 0 0 1-1.5.36c-3.76-2.31-9.49-2.98-13.93-1.63a1.09 1.09 0 1 1-.63-2.08c5.08-1.54 11.4-.79 15.72 1.86.51.31.67.98.34 1.49Zm.14-3.75C14.08 6.66 7.27 6.42 3.27 7.63a1.31 1.31 0 0 1-.76-2.5c4.59-1.39 12.24-1.12 16.87 1.63a1.31 1.31 0 0 1-.8 2.54Z" />
          </svg>

          <span>Spotify</span>

          <span
            style={{
              fontSize: "12px",
              opacity: 0.65,
            }}
          >
            ↗
          </span>
        </a>

        {/* =========================================
            YOUTUBE MUSIC
        ========================================== */}

        <a
          href="https://music.youtube.com/playlist?list=PLKWfEwX6uySY&si=Gjlj97QKqEZxXsHn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube Music playlist"
          title="YouTube Music playlist"
          style={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            padding: "7px 9px",

            borderRadius: "9px",

            color: "rgba(255,255,255,0.88)",

            textDecoration: "none",

            fontSize: "10px",

            fontWeight: 500,

            letterSpacing: "0.3px",

            background: "rgba(255,255,255,0.06)",
          }}
        >
          {/* YouTube Music logo */}

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="#FF0000"
            />

            <circle
              cx="12"
              cy="12"
              r="4"
              fill="white"
            />

            <path
              d="M12 5.2a6.8 6.8 0 0 1 5.89 3.4"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            <path
              d="M17.89 15.4A6.8 6.8 0 0 1 12 18.8"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            <path
              d="M8.11 15.4A6.8 6.8 0 0 1 6.11 12"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          <span>YouTube Music</span>

          <span
            style={{
              fontSize: "12px",
              opacity: 0.65,
            }}
          >
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}