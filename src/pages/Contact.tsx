
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-fitness-dark py-20 md:py-28">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop" 
            alt="Contact us" 
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-300">
              Have a question or need help? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold tracking-tighter text-slate-800 dark:text-white mb-6">Get In Touch</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Whether you're curious about features, a free trial, or need help finding the right plan for you — we're ready to answer any and all questions.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-fitness-primary/10">
                      <MapPin className="h-5 w-5 text-fitness-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white mb-1">Our Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        123 Fitness Avenue<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-fitness-primary/10">
                      <Mail className="h-5 w-5 text-fitness-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white mb-1">Email Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        hello@fitnessfreaks.com<br />
                        support@fitnessfreaks.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-fitness-primary/10">
                      <Phone className="h-5 w-5 text-fitness-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white mb-1">Phone Number</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        +1 (123) 456-7890<br />
                        Mon-Fri, 9am-6pm PT
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-3 bg-gray-50 dark:bg-gray-900 p-8 md:p-10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold tracking-tighter text-slate-800 dark:text-white mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us what you need..."
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-fitness-primary hover:bg-fitness-secondary"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">Visit Our Office</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Feel free to stop by our headquarters for a tour of our facilities and to meet the team.
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden h-[400px] shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1470&auto=format&fit=crop" 
              alt="Map" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Find answers to common questions about our services, subscriptions, and more.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How do I get started with FitnessFreaks?",
                answer: "Getting started is easy! Simply sign up for an account, complete our brief fitness assessment, and we'll recommend personalized workout plans and nutrition guides based on your goals and preferences."
              },
              {
                question: "Can I cancel my subscription at any time?",
                answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your subscription will remain active until the end of your current billing period."
              },
              {
                question: "Do you offer free trials?",
                answer: "Yes, we offer a 7-day free trial that gives you full access to all our features. No credit card is required to start your free trial."
              },
              {
                question: "How personalized are your workout plans?",
                answer: "Our workout plans are highly personalized based on your fitness level, goals, available equipment, time constraints, and physical limitations. We use advanced algorithms and expert knowledge to create plans that work specifically for you."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
