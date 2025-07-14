'use client';

import { Pause, Play, RotateCcw, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const DEFAULT_DURATIONS: TimerSettings = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function Pomodoro() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS[mode]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_DURATIONS);
  const sound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

  useEffect(() => {
    setTimeLeft(settings[mode]);
  }, [mode, settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
            setIsRunning(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(settings[newMode]);
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(settings[mode]);
  };

  const handleSettingsSave = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    setTimeLeft(newSettings[mode]);
    setShowSettings(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const tabs = [
    { id: 'work' as const, label: 'Focus' },
    { id: 'shortBreak' as const, label: 'Short Break' },
    { id: 'longBreak' as const, label: 'Long Break' },
  ];

  return (
    <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-2xl">
      {/* Timer Tabs */}
      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleModeChange(tab.id)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === tab.id
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-secondary text-secondary-foreground opacity-75 hover:opacity-100'
            } `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="my-8 text-center">
        <div className="text-primary font-mono text-7xl font-bold tracking-wider">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleToggle}
          className="bg-primary text-primary-foreground rounded-full p-4 transition-all hover:scale-105"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleReset}
          className="bg-secondary text-secondary-foreground rounded-full p-4 transition-all hover:scale-105"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="bg-secondary text-secondary-foreground rounded-full p-4 transition-all hover:scale-105"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
          <div className="bg-card w-96 rounded-lg p-6 shadow-xl">
            <h2 className="text-card-foreground mb-4 text-xl font-bold">Timer Settings</h2>
            <div className="space-y-4">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-card-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={Math.floor(value / 60)}
                    onChange={(e) => {
                      const newValue = Math.max(
                        1,
                        Math.min(60, Number.parseInt(e.target.value) || 1),
                      );
                      setSettings((prev) => ({
                        ...prev,
                        [key]: newValue * 60,
                      }));
                    }}
                    className="bg-background text-foreground w-20 rounded-sm border px-2 py-1"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="bg-secondary text-secondary-foreground rounded-sm px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSettingsSave(settings)}
                className="bg-primary text-primary-foreground rounded-sm px-4 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
