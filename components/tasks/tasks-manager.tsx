'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Inbox,
  List,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Trash2,
  Zap,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  list: string;
}

interface CustomList {
  id: string;
  name: string;
  icon: React.ReactNode;
}

type View = 'today' | 'next7days' | 'inbox' | 'completed' | 'trash' | string;

export default function TaskManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<View>('inbox');
  const [isListsCollapsed, setIsListsCollapsed] = useState(false);
  const [customLists, setCustomLists] = useState<CustomList[]>([
    { id: 'tasks', name: 'Tasks', icon: <List className="h-4 w-4" /> },
    { id: 'buy', name: 'Buy', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'dailyConstants', name: 'Daily Constants', icon: <Zap className="h-4 w-4" /> },
    { id: 'search', name: 'Search', icon: <Search className="h-4 w-4" /> },
    { id: 'dreams', name: 'Dreams', icon: <Star className="h-4 w-4" /> },
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Optimize code efficiency',
      completed: false,
      dueDate: new Date(),
      list: 'tasks',
    },
    {
      id: 2,
      title: 'Explore new design patterns',
      completed: false,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      list: 'tasks',
    },
    {
      id: 3,
      title: 'Research emerging technologies',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 4,
      title: 'Implement unit tests for critical components',
      completed: false,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      list: 'tasks',
    },
    {
      id: 5,
      title: 'Refactor legacy code for improved maintainability',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 6,
      title: 'Collaborate with team on project roadmap',
      completed: false,
      dueDate: new Date(),
      list: 'tasks',
    },
    {
      id: 7,
      title: 'Analyze user feedback for product improvements',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 8,
      title: 'Develop documentation for new features',
      completed: false,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      list: 'tasks',
    },
    {
      id: 9,
      title: 'Optimize database performance',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 10,
      title: 'Implement security best practices',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 11,
      title: 'Conduct code reviews for quality assurance',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 12,
      title: 'Prepare for upcoming technical presentation',
      completed: false,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      list: 'tasks',
    },
    {
      id: 13,
      title: 'Explore new frameworks and libraries',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 14,
      title: 'Optimize application performance',
      completed: false,
      dueDate: null,
      list: 'tasks',
    },
    {
      id: 15,
      title: 'Implement accessibility features',
      completed: false,
      dueDate: new Date(),
      list: 'tasks',
    },
    {
      id: 16,
      title: 'Upgrade development environment',
      completed: true,
      dueDate: null,
      list: 'buy',
    },
    {
      id: 17,
      title: 'Attend industry conference',
      completed: true,
      dueDate: null,
      list: 'dailyConstants',
    },
    {
      id: 18,
      title: 'Contribute to open-source project',
      completed: true,
      dueDate: null,
      list: 'dreams',
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentView('search');
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (currentView) {
      case 'today':
        return matchesSearch && task.dueDate && task.dueDate.getTime() === today.getTime();
      case 'next7days':
        return matchesSearch && task.dueDate && task.dueDate >= today && task.dueDate <= next7Days;
      case 'inbox':
        return matchesSearch && !task.completed;
      case 'completed':
        return matchesSearch && task.completed;
      case 'trash':
        return false; // Assuming no tasks in trash for this example
      case 'search':
        return matchesSearch;
      default:
        return matchesSearch && task.list === currentView;
    }
  });

  const incompleteTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const toggleTaskCompletion = useCallback((taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const newTask: Task = {
        id: tasks.length + 1,
        title,
        completed: false,
        dueDate: null,
        list: currentView === 'search' ? 'tasks' : currentView,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [tasks, currentView],
  );

  const getTaskCountForView = (view: View) => {
    return tasks.filter((task) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      switch (view) {
        case 'today':
          return task.dueDate && task.dueDate.getTime() === today.getTime();
        case 'next7days':
          return task.dueDate && task.dueDate >= today && task.dueDate <= next7Days;
        case 'inbox':
          return !task.completed;
        case 'completed':
          return task.completed;
        case 'trash':
          return false; // Assuming no tasks in trash for this example
        default:
          return task.list === view;
      }
    }).length;
  };

  const addList = () => {
    const newListName = prompt('Enter new list name:');
    if (newListName) {
      const newList: CustomList = {
        id: newListName.toLowerCase().replace(/\s+/g, '-'),
        name: newListName,
        icon: <List className="h-4 w-4" />,
      };
      setCustomLists((prevLists) => [...prevLists, newList]);
    }
  };

  const deleteList = (listId: string) => {
    setCustomLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    setTasks((prevTasks) => prevTasks.filter((task) => task.list !== listId));
  };

  const ListItem = ({ list }: { list: CustomList }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Button
        variant="ghost"
        className="relative w-full justify-start"
        onClick={() => setCurrentView(list.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {list.icon}
        <div className="ml-2 flex items-center">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
          {list.name}
        </div>
        {isHovered ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Pin</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteList(list.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="ml-auto">{getTaskCountForView(list.id)}</span>
        )}
      </Button>
    );
  };

  return (
    <div className="flex h-screen bg-[#1f1f1f] text-white">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-0'} flex flex-col overflow-hidden bg-[#282828] p-4 transition-all duration-300 ease-in-out`}
      >
        <nav className="flex-grow space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('today')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Today
            <span className="ml-auto">{getTaskCountForView('today')}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('next7days')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Next 7 Days
            <span className="ml-auto">{getTaskCountForView('next7days')}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('inbox')}
          >
            <Inbox className="mr-2 h-4 w-4" />
            Inbox
            <span className="ml-auto">{getTaskCountForView('inbox')}</span>
          </Button>
          <div className="pt-4">
            <Button
              variant="ghost"
              className="mb-2 w-full justify-start"
              onClick={() => setIsListsCollapsed(!isListsCollapsed)}
            >
              {isListsCollapsed ? (
                <ChevronRight className="mr-2 h-4 w-4" />
              ) : (
                <ChevronDown className="mr-2 h-4 w-4" />
              )}
              LISTS
            </Button>
            {!isListsCollapsed && (
              <>
                {customLists.map((list) => (
                  <ListItem key={list.id} list={list} />
                ))}
                <Button variant="ghost" className="w-full justify-start" onClick={addList}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add List
                </Button>
              </>
            )}
          </div>
        </nav>
        <div className="mt-auto space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('completed')}
          >
            <CheckSquare className="mr-2 h-4 w-4" />
            Completed
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('trash')}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Trash
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-700 p-4">
          <div className="mr-4 flex flex-grow items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-grow items-center space-x-2">
              <Search className="h-5 w-5" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 border-none bg-transparent"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </header>

        {/* Task List */}
        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <Input
                placeholder="Add task"
                className="flex-1 border-none bg-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                    addTask(e.currentTarget.value.trim());
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
            {incompleteTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                />
                <label htmlFor={`task-${task.id}`} className="text-sm">
                  {task.title}
                </label>
              </div>
            ))}
            {completedTasks.length > 0 && (
              <div className="pt-4">
                <h3 className="mb-2 text-sm font-semibold">Completed</h3>
                {completedTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`completed-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label htmlFor={`completed-${task.id}`} className="text-sm line-through">
                      {task.title}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
