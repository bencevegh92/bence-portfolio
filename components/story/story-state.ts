export type StoryState = {
  progress: number;
  active: boolean;
  activeStage: number;
  disable?: () => void;
  setProgress: (value: number) => void;
  setActive: (value: boolean) => void;
  setStage: (value: number) => void;
  setDisable: (callback?: () => void) => void;
  subscribe: (listener: () => void) => () => void;
  notify: () => void;
};

export function createStoryState(): StoryState {
  const listeners = new Set<() => void>();
  let progress = 0;
  let active = false;
  let activeStage = 0;
  let disable: (() => void) | undefined;
  return {
    get progress() { return progress; },
    get active() { return active; },
    get activeStage() { return activeStage; },
    get disable() { return disable; },
    setProgress(value) { progress = value; },
    setActive(value) { active = value; },
    setStage(value) { activeStage = value; },
    setDisable(callback) { disable = callback; },
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    notify() { listeners.forEach(listener => listener()); },
  };
}
