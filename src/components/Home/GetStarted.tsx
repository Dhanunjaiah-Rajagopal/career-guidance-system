import { Button } from '@/components/ui/button'
import { Target, Rocket } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/CareerPreference');
  };
  return (
    <section className="container mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 gap-10 items-center relative" >
      <div className="space-y-6">
        <div>
        <div className="bg-primary/10 dark:bg-primary/20 inline-block px-2 py-1 rounded-full">
          <span className="text-primary font-semibold">computer science</span>
        </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Transform <span className="block text-primary">Your Potential</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Discover personalized strategies to unlock your most ambitious goals and navigate your path to success.
        </p>
        
        <div className="flex gap-4">
            <Button
              size="lg" 
              className="shadow-md hover:shadow-lg transition-shadow"
              onClick={handleGetStarted}
            >
                  Start Now
                <Rocket className="ml-2" />
            </Button>
            
          <Button variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            Explore Domains 
          </Button>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Target className="text-primary" size={20} />
            Strategic Guidance
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="flex flex-col gap-4">
          <img 
            src="https://blog.herzing.ca/hs-fs/hubfs/career%20advancement.jpg?width=6000&height=4000&name=career%20advancement.jpg  " 
            alt="Professional Development" 
            className="rounded-xl object-cover h-48 w-full"
          />
          <img 
            src="https://sklc-tinymce-2021.s3.amazonaws.com/comp/2023/01/Coding%20Vs_1673525426.png" 
            alt="Career Strategy" 
            className="rounded-xl object-cover h-88 w-full"
          />
        </div>
        <img 
          src="https://th.bing.com/th/id/OIP.McRVHkUE2fdjAE7-zmyTzQHaE8?rs=1&pid=ImgDetMain" 
          alt="Success Path" 
          className="rounded-xl object-cover h-96 w-full"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[60px] left-0 w-full h-px  bg-gradient-to-r from-transparent via-primary to-transparent animate-dash"></div>
      </div>
    </section>
  )
}

export default GetStarted