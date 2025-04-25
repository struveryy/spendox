import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BarChart3, 
  Receipt, 
  Bell, 
  Settings, 
  CreditCard, 
  Lightbulb, 
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: Receipt,
  },
  {
    title: 'Reminders',
    href: '/reminders',
    icon: Bell,
  },
  {
    title: 'Budget',
    href: '/budget',
    icon: CreditCard,
  },
  {
    title: 'Suggestions',
    href: '/suggestions',
    icon: Lightbulb,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  const mobilePosition = mobileOpen ? 'left-0' : '-left-full';

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-primary text-primary-foreground rounded-full shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <aside className={cn(
        'h-screen bg-sidebar fixed top-0 transition-all duration-300 z-40 border-r border-border',
        isMobile ? `${mobilePosition} w-72` : sidebarWidth
      )}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 mt-2">
            {(!collapsed || isMobile) && (
              <div className="flex items-center gap-2">
                <img 
                  src="/public/logospend.png" 
                  alt="SpendoX Logo" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <h1 className="text-xl font-bold">SpendoX</h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                isMobile ? 'block' : 'hidden md:flex',
                'h-8 w-8'
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                    collapsed && !isMobile && "justify-center px-0"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "" : "text-muted-foreground")} />
                  {(!collapsed || isMobile) && (
                    <span className="ml-3 font-medium">{item.title}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {(!collapsed || isMobile) && (
            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center gap-3 px-3">
                <Avatar>
                  <AvatarImage
                    src="/public/suhani.jpeg"
                    alt="Suhani"
                  />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Suhani</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
