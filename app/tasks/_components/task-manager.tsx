'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowDown,
  Bell,
  Calendar as CalendarIcon,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Inbox,
  List,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Repeat,
  ShoppingCart,
  Star,
  Sun,
  Sunset,
  Trash2,
  Zap,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomList {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  dueTime: string | null;
  list: string;
  repeat: string | null;
  reminder: string | null;
}

interface CustomList {
  id: string;
  name: string;
  icon: React.ReactNode;
}

type View = 'today' | 'next7days' | 'inbox' | 'completed' | 'trash' | string;

interface TaskManagerState {
  tasks: Task[];
  customLists: CustomList[];
  currentView: View;
  isSidebarOpen: boolean;
  isListsCollapsed: boolean;
  isAddListModalOpen: boolean;
  newListName: string;
  newTaskTitle: string;
  newTaskDueDate: Date | null;
  newTaskDueTime: string | null;
  newTaskRepeat: string | null;
  newTaskReminder: string | null;

  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: string) => void;
  setCustomLists: (lists: CustomList[]) => void;
  addCustomList: (list: CustomList) => void;
  deleteCustomList: (listId: string) => void;
  setCurrentView: (view: View) => void;
  toggleSidebar: () => void;
  toggleListsCollapsed: () => void;
  setAddListModalOpen: (isOpen: boolean) => void;
  setNewListName: (name: string) => void;
  setNewTaskTitle: (title: string) => void;
  setNewTaskDueDate: (date: Date | null) => void;
  setNewTaskDueTime: (time: string | null) => void;
  setNewTaskRepeat: (repeat: string | null) => void;
  setNewTaskReminder: (reminder: string | null) => void;
}

const useTaskManagerStore = create<TaskManagerState>()(
  persist(
    (set) => ({
      tasks: [],
      customLists: [
        { id: 'tasks', name: 'Tasks', icon: <List className="h-4 w-4" /> },
        { id: 'buy', name: 'Buy', icon: <ShoppingCart className="h-4 w-4" /> },
        { id: 'dailyConstants', name: 'Daily Constants', icon: <Zap className="h-4 w-4" /> },
        { id: 'dreams', name: 'Dreams', icon: <Star className="h-4 w-4" /> },
      ],
      currentView: 'inbox',
      isSidebarOpen: true,
      isListsCollapsed: false,
      isAddListModalOpen: false,
      newListName: '',
      newTaskTitle: '',
      newTaskDueDate: null,
      newTaskDueTime: null,
      newTaskRepeat: null,
      newTaskReminder: null,

      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTaskCompletion: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        })),
      setCustomLists: (lists) => set({ customLists: lists }),
      addCustomList: (list) => set((state) => ({ customLists: [...state.customLists, list] })),
      deleteCustomList: (listId) =>
        set((state) => ({
          customLists: state.customLists.filter((list) => list.id !== listId),
          tasks: state.tasks.filter((task) => task.list !== listId),
        })),
      setCurrentView: (view) => set({ currentView: view }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleListsCollapsed: () => set((state) => ({ isListsCollapsed: !state.isListsCollapsed })),
      setAddListModalOpen: (isOpen) => set({ isAddListModalOpen: isOpen }),
      setNewListName: (name) => set({ newListName: name }),
      setNewTaskTitle: (title) => set({ newTaskTitle: title }),
      setNewTaskDueDate: (date) => set({ newTaskDueDate: date }),
      setNewTaskDueTime: (time) => set({ newTaskDueTime: time }),
      setNewTaskRepeat: (repeat) => set({ newTaskRepeat: repeat }),
      setNewTaskReminder: (reminder) => set({ newTaskReminder: reminder }),
    }),
    {
      name: 'task-manager-storage',
    },
  ),
);

export default function TaskManager() {
  const {
    tasks,
    customLists,
    currentView,
    isSidebarOpen,
    isListsCollapsed,
    isAddListModalOpen,
    newListName,
    newTaskTitle,
    newTaskDueDate,
    newTaskDueTime,
    newTaskRepeat,
    newTaskReminder,
    setTasks,
    addTask,
    toggleTaskCompletion,
    setCustomLists,
    addCustomList,
    deleteCustomList,
    setCurrentView,
    toggleSidebar,
    toggleListsCollapsed,
    setAddListModalOpen,
    setNewListName,
    setNewTaskTitle,
    setNewTaskDueDate,
    setNewTaskDueTime,
    setNewTaskRepeat,
    setNewTaskReminder,
  } = useTaskManagerStore();

  const filteredTasks = tasks.filter((task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (currentView) {
      case 'today':
        return task.dueDate && task.dueDate.getTime() === today.getTime();
      case 'next7days':
        return task.dueDate && task.dueDate >= today && task.dueDate <= next7Days;
      case 'inbox':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'trash':
        return false;
      default:
        return task.list === currentView;
    }
  });

  const incompleteTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const handleAddTask = useCallback(() => {
    if (newTaskTitle.trim() !== '') {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle,
        completed: false,
        dueDate: newTaskDueDate ? new Date(newTaskDueDate) : null,
        dueTime: newTaskDueTime,
        list: currentView === 'inbox' ? 'tasks' : currentView,
        repeat: newTaskRepeat,
        reminder: newTaskReminder,
      };
      addTask(newTask);
      setNewTaskTitle('');
      setNewTaskDueDate(null);
      setNewTaskDueTime(null);
      setNewTaskRepeat(null);
      setNewTaskReminder(null);
    }
  }, [
    newTaskTitle,
    newTaskDueDate,
    newTaskDueTime,
    newTaskRepeat,
    newTaskReminder,
    currentView,
    addTask,
    setNewTaskTitle,
    setNewTaskDueDate,
    setNewTaskDueTime,
    setNewTaskRepeat,
    setNewTaskReminder,
  ]);
  const handleAddList = useCallback(() => {
    if (newListName.trim()) {
      const newList: CustomList = {
        id: newListName.toLowerCase().replace(/\s+/g, '-'),
        name: newListName,
        icon: <List className="h-4 w-4" />,
      };
      addCustomList(newList);
      setNewListName('');
      setAddListModalOpen(false);
    }
  }, [newListName, addCustomList, setNewListName, setAddListModalOpen]);

  const getTaskCountForView = (view: View) => {
    return tasks.filter((task) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

      switch (view) {
        case 'today':
          return taskDueDate && taskDueDate.getTime() === today.getTime();
        case 'next7days':
          return taskDueDate && taskDueDate >= today && taskDueDate <= next7Days;
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
        {/* Render the icon if it's a valid React element */}
        {React.isValidElement(list.icon) && list.icon}
        <div className="ml-2 flex items-center">{list.name}</div>
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
              <DropdownMenuItem onClick={() => deleteCustomList(list.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="ml-auto flex items-center">
            <span className="mr-1 h-2 w-2 rounded-full bg-primary"></span>
            {getTaskCountForView(list.id)}
          </span>
        )}
      </Button>
    );
  };

  const DatePicker = ({
    onDateSelect,
    onTimeSelect,
    onRepeatSelect,
    onReminderSelect,
  }: {
    onDateSelect: (date: Date) => void;
    onTimeSelect: (time: string) => void;
    onRepeatSelect: (repeat: string) => void;
    onReminderSelect: (reminder: string) => void;
  }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | null>(null);
    const [repeatOption, setRepeatOption] = useState<string>('');
    const [reminder, setReminder] = useState<string | null>(null);

    const handleDateSelect = (selectedDate: Date | undefined) => {
      if (selectedDate) {
        setDate(selectedDate);
        onDateSelect(selectedDate);
      }
    };

    const handleTimeSelect = (selectedTime: string) => {
      setTime(selectedTime);
      onTimeSelect(selectedTime);
    };

    const handleRepeatSelect = (value: string) => {
      setRepeatOption(value);
      onRepeatSelect(value);
    };

    const handleReminderSelect = (value: string) => {
      setReminder(value);
      onReminderSelect(value);
    };

    const TimePicker = ({ onTimeSelect }: { onTimeSelect: (time: string) => void }) => {
      const [selectedTime, setSelectedTime] = useState<string | null>(null);

      const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const time = new Date(2023, 0, 1, hour, minute);
            options.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
        return options;
      };

      const timeOptions = generateTimeOptions();

      const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        onTimeSelect(time);
      };

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{selectedTime || 'Set time'}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {timeOptions.map((time) => (
                  <Button
                    key={time}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleTimeSelect(time)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      );
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Tabs defaultValue="date">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="date">Date</TabsTrigger>
              <TabsTrigger value="duration">Duration</TabsTrigger>
            </TabsList>

            <TabsContent value="date" className="p-0">
              <div className="flex items-center justify-between p-4">
                <Button size="icon" variant="ghost" className="flex-1">
                  <Sun className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="flex-1">
                  <Sunset className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="flex-1">
                  <CalendarIcon className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="flex-1">
                  <Moon className="h-5 w-5" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
              <div className="border-t p-3">
                <TimePicker onTimeSelect={handleTimeSelect} />
              </div>
              <div className="border-t p-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <div className="flex items-center">
                        <Bell className="mr-2 h-4 w-4" />
                        <span>{reminder || 'Reminder'}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleReminderSelect('5 minutes before')}
                      >
                        <Clock className="mr-2 h-4 w-4" />5 minutes before
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleReminderSelect('10 minutes before')}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        10 minutes before
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleReminderSelect('15 minutes before')}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        15 minutes before
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleReminderSelect('30 minutes before')}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        30 minutes before
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleReminderSelect('1 hour before')}
                      >
                        <Clock className="mr-2 h-4 w-4" />1 hour before
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleReminderSelect('Custom')}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Custom
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="border-t p-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <div className="flex items-center">
                        <Repeat className="mr-2 h-4 w-4" />
                        <span>{repeatOption || 'Repeat'}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleRepeatSelect('Daily')}
                      >
                        Daily
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleRepeatSelect('Weekly')}
                      >
                        Weekly (Sunday)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleRepeatSelect('Monthly')}
                      >
                        Monthly (13th)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleRepeatSelect('Yearly')}
                      >
                        Yearly (Oct 13th)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleRepeatSelect('Every Weekday')}
                      >
                        Every Weekday (Mon - Fri)
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleRepeatSelect('Custom')}
                      >
                        Custom
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex justify-between p-3">
                <Button variant="ghost">Clear</Button>
                <Button>OK</Button>
              </div>
            </TabsContent>
            <TabsContent value="duration">
              <div className="p-3">Duration options to be implemented</div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    );
  };

  const getCurrentViewName = () => {
    switch (currentView) {
      case 'today':
        return 'Today';
      case 'next7days':
        return 'Next 7 Days';
      case 'inbox':
        return 'Inbox';
      case 'completed':
        return 'Completed';
      case 'trash':
        return 'Trash';
      default:
        return customLists.find((list) => list.id === currentView)?.name || 'Tasks';
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } flex flex-col overflow-hidden bg-card transition-all duration-300 ease-in-out`}
      >
        <nav className="grow space-y-2 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('today')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Today
            <span className="ml-auto">{getTaskCountForView('today')}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView('next7days')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
              onClick={() => toggleListsCollapsed()}
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
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setAddListModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add List
                </Button>
              </>
            )}
          </div>
        </nav>
        <div className="mt-auto space-y-2 p-4">
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
        <header className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="ml-4 text-xl font-semibold">{getCurrentViewName()}</h1>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </header>

        {/* Task List */}
        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
            <div className="flex items-center space-x-2 rounded-md border border-primary bg-background p-2">
              <Plus className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Add task"
                className="flex-1 border-none bg-transparent text-foreground placeholder-muted-foreground"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask();
                  }
                }}
              />
              <DatePicker
                onDateSelect={(date) => setNewTaskDueDate(date)}
                onTimeSelect={(time) => setNewTaskDueTime(time)}
                onRepeatSelect={(repeat) => setNewTaskRepeat(repeat)}
                onReminderSelect={(reminder) => setNewTaskReminder(reminder)}
              />
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
            {incompleteTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <label className="text-sm">{task.title}</label>
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
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label className="text-sm line-through">{task.title}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <Dialog open={isAddListModalOpen} onOpenChange={setAddListModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New List</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddListModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddList}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
