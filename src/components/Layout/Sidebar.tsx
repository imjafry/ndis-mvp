
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, FileText, Settings, 
  ClipboardList, DollarSign, Upload, User, LogOut,
  Menu, X, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'support_worker', 'support_coordinator', 'allied_health'] },
  { path: '/participants', label: 'Participants', icon: Users, roles: ['super_admin', 'support_coordinator', 'allied_health'] },
  { path: '/calendar', label: 'Calendar', icon: Calendar, roles: ['super_admin', 'support_worker', 'support_coordinator', 'allied_health'] },
  { path: '/sessions', label: 'Session Logs', icon: ClipboardList, roles: ['super_admin', 'support_worker', 'allied_health'] },
  { path: '/invoices', label: 'Invoices', icon: DollarSign, roles: ['super_admin', 'support_coordinator'] },
  { path: '/documents', label: 'Documents', icon: Upload, roles: ['super_admin', 'support_coordinator', 'allied_health'] },
  { path: '/staff', label: 'Staff Management', icon: User, roles: ['super_admin'] },
  { path: '/reports', label: 'Reports', icon: FileText, roles: ['super_admin', 'support_coordinator'] },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['super_admin', 'support_worker', 'support_coordinator', 'allied_health'] },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userNavItems = navItems.filter(item => item.roles.includes(user.role));

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'support_worker': return 'Support Worker';
      case 'support_coordinator': return 'Support Coordinator';
      case 'allied_health': return 'Allied Health Professional';
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border shadow-lg z-50 transition-all duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "lg:w-16" : "lg:w-64",
        "lg:static lg:z-auto"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-sidebar-border",
          isCollapsed && "lg:justify-center"
        )}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ND</span>
              </div>
              <span className="font-bold text-xl text-sidebar-foreground">NDISCare</span>
            </div>
          )}
          
          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hidden lg:flex"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto hover:bg-sidebar-accent">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm text-sidebar-foreground">{user.name}</p>
                      <p className="text-xs text-sidebar-foreground/70">{getRoleDisplayName(user.role)}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Collapsed user avatar */}
        {isCollapsed && (
          <div className="hidden lg:flex justify-center p-4 border-b border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56" side="right">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {userNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
                    isCollapsed && "lg:justify-center lg:space-x-0"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};
