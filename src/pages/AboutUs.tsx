
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-fitness-dark py-20 md:py-28">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
            alt="Team working out" 
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
              About FitnessFreaks
            </h1>
            <p className="text-xl text-gray-300">
              Our mission is to make fitness accessible, personalized, and enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  FitnessFreaks was founded in 2020 by a team of fitness enthusiasts, certified trainers, and nutrition experts who believed there was a better way to approach fitness. We recognized that many people struggle with generic workout plans that don't account for their unique goals, bodies, and lifestyles.
                </p>
                <p>
                  What began as a small community of like-minded fitness enthusiasts has grown into a comprehensive platform serving thousands of members worldwide. Our approach combines science-based training methods, nutrition expertise, and supportive community to help people achieve sustainable results.
                </p>
                <p>
                  Today, FitnessFreaks offers hundreds of personalized workout plans, nutrition guides, and expert resources to help our community transform their bodies and lives. We're dedicated to continual improvement and innovation, always seeking better ways to serve our members.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1374&auto=format&fit=crop" 
                alt="Fitness team" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              These principles guide everything we do at FitnessFreaks, from how we design our programs to how we interact with our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Science-Based Approach",
                description: "We rely on proven scientific research to create our programs, not fads or trends. Every workout and nutrition plan is grounded in exercise science and physiology."
              },
              {
                title: "Personalization",
                description: "We believe there's no one-size-fits-all solution for fitness. Our programs adapt to your body, goals, and lifestyle to provide truly personalized guidance."
              },
              {
                title: "Inclusivity",
                description: "Fitness is for everyone. We create a welcoming environment for people of all fitness levels, ages, and backgrounds to feel supported in their journey."
              },
              {
                title: "Sustainability",
                description: "We focus on sustainable, long-term results rather than quick fixes. Our approach emphasizes building healthy habits that last a lifetime."
              },
              {
                title: "Community",
                description: "We believe in the power of community to motivate and inspire. Our platform fosters connections between members to create a supportive network."
              },
              {
                title: "Continuous Improvement",
                description: "We're always learning and growing. We regularly update our programs based on new research and member feedback to provide the best possible experience."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">Meet Our Team</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Our diverse team of fitness experts, nutritionists, and technology specialists work together to bring you the best fitness experience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & Head Coach",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop"
              },
              {
                name: "Sarah Johnson",
                role: "Nutrition Expert",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop"
              },
              {
                name: "David Chen",
                role: "Strength Specialist",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
              },
              {
                name: "Lisa Patel",
                role: "Yoga & Mobility Coach",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
              },
              {
                name: "Michael Robinson",
                role: "Cardio Specialist",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop"
              },
              {
                name: "Jennifer Lee",
                role: "Mental Health Coach",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop"
              },
              {
                name: "Robert Taylor",
                role: "Technology Director",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop"
              },
              {
                name: "Emma Wilson",
                role: "Community Manager",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1376&auto=format&fit=crop"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl group"
              >
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-semibold">{member.name}</h4>
                      <p className="text-gray-200 text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
