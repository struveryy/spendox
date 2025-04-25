
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "min-h-screen w-full pt-8 pb-16 px-4 md:px-8 transition-all duration-300",
        isMobile ? "ml-0" : "ml-64", // Default sidebar width is 64
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
