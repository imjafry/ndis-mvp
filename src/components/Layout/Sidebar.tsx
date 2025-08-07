
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, FileText, Settings, 
  ClipboardList, DollarSign, Upload, User, LogOut,
  X, ChevronDown, ChevronLeft, ChevronRight, Code, CreditCard,
  Clock, BarChart3
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
  { path: '/participants', label: 'Participant Management', icon: Users, roles: ['super_admin', 'support_coordinator', 'allied_health'] },
  { path: '/staff', label: 'Staff Management', icon: User, roles: ['super_admin'] },
  { path: '/shift-logs', label: 'Shift Logs / Timesheets', icon: Clock, roles: ['super_admin', 'support_worker', 'allied_health'] },
  { path: '/invoice-center', label: 'Invoice Center', icon: CreditCard, roles: ['super_admin', 'support_coordinator'] },
  { path: '/ndis-codes', label: 'NDIS Item Code Manager', icon: Code, roles: ['super_admin'] },
  { path: '/documents', label: 'Document Storage', icon: Upload, roles: ['super_admin', 'support_coordinator', 'allied_health'] },
  { path: '/calendar', label: 'Calendar View', icon: Calendar, roles: ['super_admin', 'support_worker', 'support_coordinator', 'allied_health'] },
  { path: '/reports', label: 'Reports & Analytics', icon: BarChart3, roles: ['super_admin', 'support_coordinator'] },
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
      case 'super_admin': return 'Provider Admin';
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
        "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out flex flex-col",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-16 w-64" : "w-64"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 min-h-[73px]",
          isCollapsed && "lg:justify-center"
        )}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">ND</span>
              </div>
              <span className="font-bold text-xl text-gray-900">NDISCare</span>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">ND</span>
            </div>
          )}

          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hidden lg:flex flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto hover:bg-gray-50">
                  <div className="flex items-center space-x-3 w-full">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{getRoleDisplayName(user.role)}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Collapsed user avatar */}
        {isCollapsed && (
          <div className="hidden lg:flex justify-center p-4 border-b border-gray-200 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
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
                <DropdownMenuItem onClick={logout} className="text-red-600">
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
                    "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-gray-50 hover:text-gray-900",
                    isActive && "bg-blue-50 text-blue-700 shadow-sm border-r-2 border-blue-500",
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
