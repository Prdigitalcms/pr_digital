import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { Music, Youtube, Globe, Facebook, Instagram, Twitter, Linkedin, Phone ,Video ,FileText ,Monitor ,User,BarChart3, YoutubeIcon, Disc, Crown  } from 'lucide-react';
import VideoFooter from '../components/VideoFooter';
import { button, div, source } from 'framer-motion/client';
import Marquee from '../components/Marquee';
import OurServices from './OurServices';




export default function Home() {
  const platforms = [       
    {
      name: 'Spotify',
      logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png',
      width: 120
    },
    {
      name: 'Apple Music',
      logo: 'https://www.apple.com/v/apple-music/s/images/overview/logo_apple_music__ejr5wigxqduq_large_2x.png',
      width: 120
    },
    {
      name: 'YouTube',
      logo: 'https://www.youtube.com/img/desktop/yt_1200.png',
      width: 120
    },
    {
      name: 'Beatport',
      logo: 'https://cdn.beatport.com/static/web/83c0d4b-119/images/logo-white.svg',
      width: 120
    },
    {
      name: 'JioSaavn',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/JioSaavn_Logo.svg/2560px-JioSaavn_Logo.svg.png',
      width: 120
    },
    {
      name: 'Gaana',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Gaana_logo.svg/2560px-Gaana_logo.svg.png',
      width: 120
    }
  ];



//   const features = [
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow">
//         <Music className="w-6 h-6" />
//       </div>
//     ),
//     title: "Global Music Distribution",
//     description: "Release your music worldwide across major platforms"
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-red-500 text-white shadow">
//         <Youtube className="w-6 h-6" />
//       </div>
//     ),
//     title: "Content ID",
//     description: "Protect your music and monetize your content"
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-purple-500 text-white shadow">
//         <Video className="w-6 h-6" />
//       </div>
//     ),
//     title: "VEVO Video Distribution",
//     description: "Get your music videos on VEVO and reach millions of viewers worldwide."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-green-500 text-white shadow">
//         <Phone className="w-6 h-6" />
//       </div>
//     ),
//     title: "Callertune Distribution",
//         colorClass: "text-black-600",
//     description: "Make your music ring on millions of phones with our global callertune distribution network."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-yellow-400 text-white shadow">
//         <FileText className="w-6 h-6" />
//       </div>
//     ),
//     title: "Lyrics Distribution",
//     description: "Distribute your song lyrics across major platforms and reach new fans."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-indigo-500 text-white shadow">
//         <Monitor className="w-6 h-6" />
//       </div>
//     ),
//     title: "Channel Management",
//     description: "Professional management of your YouTube and social media channels."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-pink-500 text-white shadow">
//         <User className="w-6 h-6" />
//       </div>
//     ),
//     title: "Artist Management",
//     description: "Comprehensive artist management services to grow your career."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-teal-500 text-white shadow">
//         <BarChart3 className="w-6 h-6" />
//       </div>
//     ),
//     title: "Dashboard Development",
//     description: "Custom music distribution dashboards for labels and artists."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-sky-600 text-white shadow">
//         <Monitor className="w-6 h-6" />
//       </div>
//     ),
//     title: "Website Development",
//     description: "Professional website development for artists and music businesses."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-red-600 text-white shadow">
//         <YoutubeIcon className="w-6 h-6" />
//       </div>
//     ),
//     title: "Join Channel in MCN",
//     description: "Join our MCN network and get access to premium features and support."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-gray-700 text-white shadow">
//         <Disc className="w-6 h-6" />
//       </div>
//     ),
//     title: "White Label Solution",
//     description: "Custom branded music distribution platform with your own branding and features."
//   },
//   {
//     icon: (
//       <div className="p-2 rounded-full bg-blue-100 shadow-md w-fit">
//         <Crown className="w-6 h-6 text-yellow-500" />
//       </div>
//     ),
//     title: "Master Dashboard Creation",
//     description: "Comprehensive master dashboard for managing multiple artists, labels, and distribution channels."
//   }
// ];


  const team = [
    {
      name: "Rahul Lodhi",
      role: "Owner",
      image: "https://i.pinimg.com/736x/e2/54/52/e254524205172a4716c61e6bbe6fc060.jpg"
  
      

    },
    {
      name: "Pintu Yadav",
      role: "CEO",
      image: "https://i.pinimg.com/474x/88/e4/96/88e496b4ce6289cfb79cbe9457f52218.jpg"
    },
    {
      name: "Adil Khan",
      role: "Director",
      image: "https://i.pinimg.com/736x/b0/55/d9/b055d95ead9c365f7f21d87872699f77.jpg"
    },
    {
      name: ".com",
      role: "Digital Manager",
      image: "https://i.pinimg.com/736x/24/ca/e5/24cae5ddd03c1d2ca233664f1826fe27.jpg"
    },
    {
      name: "Param Mundi",
      role: "Label Manager",
      image: "https://i.pinimg.com/474x/1d/a7/74/1da774b2c5bee09b74ca79c01c9c5fc7.jpg"
      
    
    },
    {
      name: "Sandeep Raja",
      role: "Digital Manager",
      image: "https://mahakaldigital.in/assets/images/sandeep-sajan.jpg"
    },
    {
      name: "Ankit Sharma",
      role: "Manager",
      image: "https://i.pinimg.com/736x/bf/c2/41/bfc2415e3935b2ec47067ee644e9afee.jpg"
    },
     {
      name: " KAMLESH LAL YADAV",
      role: "DIGITAL",
      image: "https://i.pinimg.com/736x/8c/df/d1/8cdfd1709534bdb5f9abae6674f7ffb4.jpg"
    } ,
      {
      name: " Aqsa Khan",
      role: "Label Manager",
      image: "https://i.pinimg.com/736x/11/a7/1a/11a71a18126bba59ecfe82d17405eb98.jpg"
    }
    
  ];

  const latestReleases = [
    {
      title: "Unmesh Tayade",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Mann Mohini",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Mala Lagan",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Shrichalla",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const services = [
    {
      title: "Special Discount",
      description: "We Give 20% Discount On Bulk Song, But When In A Month You Give Us Minimum 10 Songs",
      icon: "percentage"
    },
    {
      title: "Artist Instagram Profile Link",
      description: "We can link your Instagram profile to your audio",
      icon: "instagram"
    },
    {
      title: "No extra charges for Content Id",
      description: "We can claim your official artist channel for you on youtube",
      icon: "youtube"
    },
    {
      title: "Official Artist Channel",
      description: "We can claim your official artist channel for you on youtube",
      icon: "youtube"
    },
    {
      title: "Social Media",
      description: "No one is aggressive as YoungTunez when it comes to promoting your releases on today's social media outlets",
      icon: "facebook"
    },
    {
      title: "Rights Protection",
      description: "Protect your work online and earn more from the use of your music on YouTube, Facebook and Instagram",
      icon: "shield"
    }
  ];

  const indianStores = [
    {
      name: "Gaana",
      logo: "https://ask2human.com/wp-content/uploads/2020/07/gaana.com-customer-care-number.jpg"
    },
    {
      name: "JioSaavn",
      logo: "https://logowik.com/content/uploads/images/jiosaavn7727.logowik.com.webp"
    },
    {
      name: "Wynk Music",
      logo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3"
    },
    {
      name: "Hungama",
      logo: "https://i0.wp.com/musically.com/wp-content/uploads/2019/01/hungama_logo-1.jpg?fit=1000%2C493&ssl=1"
    }
  ];
  

  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      <Hero />
    
      {/* Features Section */}
      {/* <section className="py-20  ">
       <div className="container mx-auto px-6">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="grid md:grid-cols-4 gap-8"
  >
    {features.map((feature, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500
 text-black rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300"
      > <div className={` ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
            
        <div className="mb-4  bg from-blue-400 to-blue-600">
          {feature.icon}
        </div>
        </div>
        
<h3 className={`text-xl font-extrabold mb-2 tracking-wide ${feature.colorClass}`}>
  {feature.title}
</h3>
        <p className="text-white ">{feature.description}</p>
      </div>
    ))}
  </motion.div>
</div>

        
      </section> */}

      {/* Latest Releases Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-display"
          >
            Latest Releases
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {latestReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-black rounded-lg overflow-hidden group shadow-lg"
              >
                <div className="relative aspect-w-3 aspect-h-4">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{release.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-display"
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
                {/* npm */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white font-display">Other Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Pay Less and get more. Check out our awesome services other than music distribution.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-black rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-display"
          >
            Our Partners
          </motion.h2>
          <div className="text-center mb-12">
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              PR DIGITAL CMS is partnered with 150 digital music services and counting, available across 200 countries and territories globally. Sell your music on every major digital store.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {indianStores.map((store, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center shadow-lg"
              >
                <img
                  src={store.logo}
                  alt={store.name}
                  className="h-12 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoFooter />
    </div>
  );
}