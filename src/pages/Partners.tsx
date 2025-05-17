
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';

const Partners = () => {
  const partnerTypes = [
    {
      title: "Gyms & Fitness Studios",
      description: "Partner with us to offer your members enhanced digital experiences and expand your reach.",
      benefits: [
        "Co-branded workout plans for your members",
        "Member management integration",
        "Revenue sharing opportunities",
        "Cross-promotion to our user base"
      ],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Fitness Professionals",
      description: "Create and monetize your custom workout plans on our platform and reach a wider audience.",
      benefits: [
        "Creator revenue share program",
        "Professional profile and branding",
        "Analytics and performance tracking",
        "Dedicated support team"
      ],
      image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Health & Wellness Brands",
      description: "Integrate your products and services with our platform to create seamless user experiences.",
      benefits: [
        "API integration capabilities",
        "Co-marketing opportunities",
        "Exclusive member discounts",
        "Featured product placement"
      ],
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1374&auto=format&fit=crop"
    }
  ];

  const currentPartners = [
    "GymCorp", "FitLife Centers", "NutriWell", "PeakPerformance", 
    "ActiveGear", "Vitality Foods", "MindBody Studios", "CardioTech"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-fitness-dark py-20 md:py-28">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop" 
            alt="Business partnership" 
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
              Partner With FitnessFreaks
            </h1>
            <p className="text-xl text-gray-300">
              Join forces with us to expand your reach and create exceptional fitness experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              Opportunities
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Why Partner With Us
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              By partnering with FitnessFreaks, you'll gain access to our rapidly growing community of fitness enthusiasts and industry-leading technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-fitness-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-fitness-primary">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Reach Our Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with our 1M+ active users who are passionate about fitness and wellness.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-fitness-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-fitness-primary">
                  <path d="M12 2v4"></path>
                  <path d="m16.24 7.76 2.83-2.83"></path>
                  <path d="M21 12h-4"></path>
                  <path d="m16.24 16.24 2.83 2.83"></path>
                  <path d="M12 18v4"></path>
                  <path d="M7.76 16.24 4.93 19.07"></path>
                  <path d="M3 12H7"></path>
                  <path d="m7.76 7.76-2.83-2.83"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Cutting-Edge Technology</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leverage our advanced platform, APIs, and analytics to enhance your business.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-fitness-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-fitness-primary">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">New Revenue Streams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Unlock new business opportunities through co-branding, integrations, and revenue sharing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Partnership Types Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              Programs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Partnership Options
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              We offer flexible partnership models tailored to different types of businesses and professionals.
            </p>
          </div>
          
          <div className="space-y-12">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-cover rounded-2xl aspect-video" 
                  />
                </div>
                
                <div className="md:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold dark:text-white">{type.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {type.description}
                  </p>
                  
                  <div className="pt-2 space-y-3">
                    {type.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mr-2 mt-1">
                          <Check className="h-5 w-5 text-fitness-primary" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Current Partners Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              Our Network
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Trusted Partners
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Join the growing network of businesses and professionals partnering with FitnessFreaks.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {currentPartners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center h-32"
              >
                <span className="text-xl font-bold text-gray-700 dark:text-gray-200">{partner}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">
              Partner Testimonials
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Hear from businesses and professionals who have partnered with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl"
            >
              <div className="flex flex-col h-full">
                <blockquote className="flex-1 mb-6">
                  <p className="text-gray-600 dark:text-gray-300 italic text-lg">
                    "Partnering with FitnessFreaks has significantly expanded our reach. We've seen a 40% increase in new member sign-ups through the platform integration."
                  </p>
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="font-bold">JF</span>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">Jennifer Foster</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CEO, FitLife Centers</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl"
            >
              <div className="flex flex-col h-full">
                <blockquote className="flex-1 mb-6">
                  <p className="text-gray-600 dark:text-gray-300 italic text-lg">
                    "As a personal trainer, the FitnessFreaks platform has allowed me to scale my business beyond in-person sessions. I now reach clients worldwide with my custom programs."
                  </p>
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="font-bold">MT</span>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">Marcus Thompson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fitness Professional</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-fitness-dark">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Fill out our partnership application to get started. Our team will reach out to discuss opportunities.
            </p>
            <Button size="lg" className="bg-fitness-primary hover:bg-fitness-secondary">
              Apply for Partnership
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
