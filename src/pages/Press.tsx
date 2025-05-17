
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Download } from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      title: "FitnessFreaks Raises $10M Series A to Expand Personalized Fitness Platform",
      date: "May 15, 2024",
      excerpt: "Funding will accelerate product development and international expansion as the company continues to revolutionize the digital fitness landscape."
    },
    {
      title: "FitnessFreaks Launches New AI-Powered Nutrition Planning Feature",
      date: "March 2, 2024",
      excerpt: "The new feature leverages machine learning to create highly personalized meal plans based on users' goals, preferences, and dietary restrictions."
    },
    {
      title: "FitnessFreaks Surpasses 1 Million Active Users",
      date: "January 10, 2024",
      excerpt: "The milestone comes just two years after the platform's launch, highlighting rapid growth in the digital fitness space."
    },
    {
      title: "FitnessFreaks Partners with Celebrity Trainer Alex Davis",
      date: "November 5, 2023",
      excerpt: "The partnership will bring exclusive workout programs from the renowned fitness expert to the platform's growing user base."
    },
  ];

  const mediaFeatures = [
    {
      source: "TechCrunch",
      title: "How FitnessFreaks is Disrupting the Online Fitness Industry",
      date: "April 12, 2024",
      logo: "TC"
    },
    {
      source: "Forbes",
      title: "The Future of Fitness: FitnessFreaks Leads Digital Transformation",
      date: "March 25, 2024",
      logo: "FB"
    },
    {
      source: "Men's Health",
      title: "We Tried FitnessFreaks for 30 Days: Here's What Happened",
      date: "February 18, 2024",
      logo: "MH"
    },
    {
      source: "Women's Fitness",
      title: "The App That's Changing How Women Approach Strength Training",
      date: "January 30, 2024",
      logo: "WF"
    },
    {
      source: "Business Insider",
      title: "Meet the Founders Behind FitnessFreaks' Meteoric Rise",
      date: "December 15, 2023",
      logo: "BI"
    },
    {
      source: "The Verge",
      title: "FitnessFreaks Review: The Most Comprehensive Fitness App Yet",
      date: "November 22, 2023",
      logo: "TV"
    },
  ];

  const logos = ["ESPN", "CNN", "TechCrunch", "Forbes", "Men's Health", "Women's Fitness", "Business Insider", "The Verge"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-fitness-dark py-20 md:py-28">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop" 
            alt="Press conference" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark via-fitness-dark/90 to-fitness-dark/70"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
              Press & Media
            </h1>
            <p className="text-xl text-gray-300">
              Latest news, media resources, and company information for journalists and media professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
                Latest News
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-2">
                Press Releases
              </h2>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-300">
                Stay up-to-date with the latest announcements and news from FitnessFreaks.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 group">
              View All Press Releases
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all hover:shadow-md">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {release.date}
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-fitness-primary transition-colors dark:text-white">
                      <a href="#">{release.title}</a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {release.excerpt}
                    </p>
                    <Button variant="ghost" className="w-full sm:w-auto text-fitness-primary hover:text-fitness-secondary hover:bg-fitness-primary/10">
                      Read Full Release
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Features Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              In The News
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Media Features
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              FitnessFreaks has been featured in leading publications around the world.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full transition-all group-hover:shadow-md">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {feature.date}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-800 dark:text-gray-200">
                        {feature.logo}
                      </div>
                    </div>
                    <div className="mb-2 font-medium text-fitness-primary">
                      {feature.source}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-fitness-primary transition-colors dark:text-white">
                      <a href="#">{feature.title}</a>
                    </h3>
                    <div className="mt-auto pt-4">
                      <Button variant="link" className="p-0 text-fitness-primary hover:text-fitness-secondary">
                        Read Article <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Featured In
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-70">
            {logos.map((logo) => (
              <div key={logo} className="flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold dark:text-white">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Resources Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              Resources
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Media Kit
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Download official FitnessFreaks logos, product images, and executive photos for media use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white">Company Logos</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Download our logo in various formats and resolutions.
              </p>
              <Button className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                <Download className="mr-2 h-4 w-4" />
                Download Logos
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white">Product Images</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                High-resolution screenshots and product imagery.
              </p>
              <Button className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                <Download className="mr-2 h-4 w-4" />
                Download Images
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white">Executive Photos</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Professional headshots of our leadership team.
              </p>
              <Button className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                <Download className="mr-2 h-4 w-4" />
                Download Photos
              </Button>
            </motion.div>
          </div>
          
          <div className="mt-16 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Company Facts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 dark:text-white">About FitnessFreaks</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  FitnessFreaks is a leading digital fitness platform offering personalized workout plans, nutrition guidance, and a supportive community. Founded in 2020, the company has grown to serve over 1 million users worldwide with its innovative approach to fitness and wellbeing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 dark:text-white">Quick Facts</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Founded: 2020</li>
                  <li>Headquarters: San Francisco, CA</li>
                  <li>Active Users: 1M+</li>
                  <li>Employees: 85+</li>
                  <li>Available in: 25 countries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="py-16 md:py-24 bg-fitness-dark">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-6">
              Press Contact
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              For press inquiries, please contact our media relations team.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-white">
                <p className="font-medium text-lg mb-2">Media Relations</p>
                <p>press@fitnessfreaks.com</p>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Press;
