
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Careers = () => {
  const benefits = [
    "Flexible remote work options",
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Unlimited PTO policy",
    "Paid parental leave",
    "Fitness stipend",
    "Professional development budget",
    "Team retreats and events"
  ];

  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote or San Francisco, CA",
      type: "Full-time",
      description: "We're looking for a Senior Frontend Developer to help build and scale our web applications. You'll work on creating engaging, accessible, and performant user interfaces for our fitness platform."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote or San Francisco, CA",
      type: "Full-time",
      description: "Join our design team to create beautiful, intuitive interfaces for our fitness platform. You'll collaborate with product managers, developers, and users to design seamless experiences."
    },
    {
      title: "Fitness Content Creator",
      department: "Content",
      location: "Remote",
      type: "Full-time",
      description: "Help create engaging, educational fitness content for our platform. You'll work with our training team to develop workout programs, tutorials, and educational resources."
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Drive user acquisition and retention strategies. You'll analyze data, optimize campaigns, and work cross-functionally to grow our user base and improve conversion metrics."
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      description: "Join our customer success team to help members achieve their fitness goals. You'll provide personalized support, troubleshoot issues, and gather valuable feedback."
    },
    {
      title: "Nutrition Coach",
      department: "Coaching",
      location: "Remote",
      type: "Part-time",
      description: "Work with our members to develop personalized nutrition plans. You'll provide guidance, answer questions, and help people make sustainable dietary changes."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-fitness-dark py-20 md:py-28">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop" 
            alt="Team collaboration" 
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
              Join Our Team
            </h1>
            <p className="text-xl text-gray-300">
              Help us transform the fitness industry and make a positive impact on people's lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
                Our Culture
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-6">Why Work With Us</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  At FitnessFreaks, we're not just building a product — we're creating a movement. Our team is passionate about helping people transform their lives through fitness, and we bring that same energy and dedication to our workplace culture.
                </p>
                <p>
                  We believe in collaboration, innovation, and continuous growth. Our team members are encouraged to share ideas, take ownership, and push boundaries. We foster an environment where everyone's voice is heard and valued.
                </p>
                <p>
                  We also practice what we preach — fitness and wellbeing are at the core of our company culture. We offer flexible schedules to accommodate workouts, healthy office snacks, and regular team fitness challenges.
                </p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-fitness-primary mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop" 
                alt="Team working together" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-4">
              Opportunities
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">Open Positions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Join our talented team and help shape the future of fitness. We're always looking for passionate individuals to join our mission.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold dark:text-white">{job.title}</h3>
                        <div className="inline-block px-2 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-xs font-medium">
                          {job.type}
                        </div>
                      </div>
                      <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400">
                        <span className="after:content-['•'] after:mx-2">{job.department}</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                      {job.description}
                    </p>
                    
                    <Button className="bg-fitness-primary hover:bg-fitness-secondary w-full sm:w-auto">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">Our Recruitment Process</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              We've designed our hiring process to be transparent, efficient, and respectful of your time.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Application Review",
                  description: "After you submit your application, our team will review your qualifications and experience to determine if there's a potential match."
                },
                {
                  step: "02",
                  title: "Initial Interview",
                  description: "If selected, you'll have a 30-minute video call with a hiring manager to discuss your background, experience, and interest in the role."
                },
                {
                  step: "03",
                  title: "Skills Assessment",
                  description: "Depending on the role, you may be asked to complete a skills assessment or project to demonstrate your expertise."
                },
                {
                  step: "04",
                  title: "Team Interviews",
                  description: "You'll meet with potential team members and stakeholders to discuss the role in more depth and learn about our culture."
                },
                {
                  step: "05",
                  title: "Offer & Onboarding",
                  description: "If you're selected, we'll extend an offer and work with you to ensure a smooth onboarding process."
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-fitness-primary/10 flex items-center justify-center text-fitness-primary font-bold">
                    {phase.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{phase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-fitness-dark">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6">
              Don't See a Role That Fits?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for talented individuals to join our team. Send us your resume for future opportunities.
            </p>
            <Button size="lg" className="bg-fitness-primary hover:bg-fitness-secondary">
              Submit Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
