import styles from "./screens.module.css";

// "Tandem" is a fictional team-planning app that evolves through the story.
// Every screen is decorative; the stage copy carries the meaning.

const columns = [
  { name: "To do", tasks: ["Plan sprint review", "Write onboarding copy"] },
  { name: "In progress", tasks: ["Weekly overview", "Keyboard shortcuts"] },
  { name: "Done", tasks: ["Design tokens", "Task card component"] },
];

const checks = ["Keyboard navigation", "Focus management", "Screen reader labels", "Colour contrast AA", "Responsive layouts", "Unit tests"];

function Idea() {
  return (
    <div className={styles.idea}>
      <p className={styles.ideaMeta}>New project</p>
      <p className={styles.note}>
        What if planning the week took five minutes, not an hour?<span className={styles.caret} />
      </p>
    </div>
  );
}

function Discovery() {
  const notes = [
    ["Who", "Small product teams"],
    ["Need", "One clear view of the week"],
    ["Constraint", "Works by keyboard, on any screen"],
  ];
  return (
    <div className={styles.discovery}>
      {notes.map(([label, text], index) => (
        <div key={label} className={styles.card} style={{ rotate: `${(index - 1) * 1.5}deg` }}>
          <span className={styles.cardLabel}>{label}</span>
          <span className={styles.cardText}>{text}</span>
        </div>
      ))}
      <p className={styles.quote}>“We lose track of who’s doing what.”</p>
    </div>
  );
}

function Plan() {
  return (
    <div className={styles.plan}>
      <span className={styles.node}>App shell</span>
      <span className={styles.branch} />
      <div className={styles.nodeRow}>
        <span className={styles.node}>Board</span>
        <span className={styles.node}>Task detail</span>
        <span className={styles.node}>Settings</span>
      </div>
      <div className={styles.shared}>
        <span className={`${styles.node} ${styles.nodeShared}`}>Shared UI kit</span>
        <span className={`${styles.node} ${styles.nodeApi}`}>api /tasks</span>
      </div>
    </div>
  );
}

function Design() {
  return (
    <div className={styles.design}>
      <div className={styles.wireframe}>
        <span className={styles.wireBar} />
        <div className={styles.wireCols}>
          {[3, 2, 2].map((count, column) => (
            <div key={column}>{Array.from({ length: count }, (_, index) => <span key={index} />)}</div>
          ))}
        </div>
      </div>
      <div className={styles.tokens}>
        <span className={styles.typeSample}>Aa</span>
        <div className={styles.swatches}><i /><i /><i /><i /></div>
        <div className={styles.scale}><i /><i /><i /><i /></div>
      </div>
    </div>
  );
}

function Board({ variant }: { variant: "build" | "quality" | "live" }) {
  return (
    <div className={styles.board} data-variant={variant}>
      <aside className={styles.sidebar}>
        <span className={styles.logo}><i />Tandem</span>
        {["This week", "Backlog", "Team"].map((item, index) => (
          <span key={item} className={styles.navItem} data-active={index === 0 || undefined}>{item}</span>
        ))}
      </aside>
      <div className={styles.main}>
        <div className={styles.boardHead}>
          <span className={styles.boardTitle}>{variant === "live" ? "Good morning, team" : "This week"}</span>
          <span className={styles.newTask}>New task</span>
        </div>
        {variant === "live" && <span className={styles.progress}><i /></span>}
        <div className={styles.columns}>
          {columns.map((column, columnIndex) => (
            <div key={column.name} className={styles.column}>
              <span className={styles.columnName}>{column.name}</span>
              {column.tasks.map((task, taskIndex) => (
                <span
                  key={task}
                  className={styles.task}
                  data-lifted={(variant === "build" && columnIndex === 1 && taskIndex === 0) || undefined}
                  data-focused={(variant === "quality" && columnIndex === 1 && taskIndex === 1) || undefined}
                >
                  {task}
                  <i data-tone={columnIndex} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {variant === "build" && (
        <pre className={styles.code}>
          <code>
            <b>tasks</b> = computed(() =&gt;{"\n"}  this.store.byStatus(this.week()){"\n"});
          </code>
        </pre>
      )}
      {variant === "quality" && (
        <ul className={styles.checklist}>
          {checks.map(check => <li key={check}>{check}</li>)}
        </ul>
      )}
      {variant === "live" && <span className={styles.toast}>Version 1.0 is live</span>}
    </div>
  );
}

const states = [
  <Idea key="idea" />,
  <Discovery key="discovery" />,
  <Plan key="plan" />,
  <Design key="design" />,
  <Board key="build" variant="build" />,
  <Board key="quality" variant="quality" />,
  <Board key="live" variant="live" />,
];

/** One stage of the fictional app inside a browser frame. */
export function Screen({ stage }: { stage: number }) {
  return (
    <div className={styles.screen} aria-hidden="true">
      <Chrome />
      <div className={styles.viewport}><div className={styles.state}>{states[stage]}</div></div>
    </div>
  );
}

/** Every stage stacked, for the scroll-driven laptop. GSAP crossfades them. */
export function ScreenStack() {
  return (
    <div className={styles.screen} aria-hidden="true">
      <Chrome />
      <div className={styles.viewport}>
        {states.map((state, index) => (
          <div key={index} className={styles.state} data-screen-state={index}>{state}</div>
        ))}
      </div>
    </div>
  );
}

function Chrome() {
  return (
    <div className={styles.chrome}>
      <span className={styles.dots}><i /><i /><i /></span>
      <span className={styles.address}>tandem.app</span>
    </div>
  );
}
