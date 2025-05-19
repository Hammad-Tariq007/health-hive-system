
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/api';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send request to backend to subscribe email
      await api.post('/newsletter/subscribe', { email });
      
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-muted p-6 md:p-10 rounded-lg">
      <div className="flex flex-col items-center text-center">
        <Mail className="h-12 w-12 text-fitness-primary mb-4" />
        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Get the latest fitness tips, workout plans, nutrition advice, and exclusive offers delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
          <div className="relative w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-4 py-2 h-11"
              disabled={isSubmitting}
            />
          </div>
          <Button 
            type="submit" 
            className="bg-fitness-primary hover:bg-fitness-secondary h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our <a href="/privacy" className="underline hover:text-fitness-primary">Privacy Policy</a> and consent to receive marketing emails.
        </p>
      </div>
    </div>
  );
}

export default Newsletter;
