import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: "MLBELO",
    slug: "mlbelo",
    summary:
      "MLB prediction engine combining ELO ratings with machine learning and Statcast data",
    description:
      "A data-rich prediction engine for Major League Baseball that combines ELO ratings with a LightGBM machine learning model trained on Statcast pitch-level data. Ingests game results from the MLB Stats API, computes team and pitcher ELO ratings across multiple seasons, engineers 20+ features (exit velocity, spin rate, bullpen fatigue, catcher framing, weather, batter-vs-pitcher matchups), and runs 10,000-iteration Monte Carlo simulations for playoff probability estimates. Includes a React dashboard with interactive Plotly charts for ELO history, rolling Brier score accuracy, feature importance ablation, head-to-head heatmaps, and individual player profiles.",
    tech: [
      "Python",
      "FastAPI",
      "LightGBM",
      "scikit-learn",
      "pandas",
      "SQLite",
      "React",
      "TypeScript",
      "Plotly.js",
      "Tailwind CSS",
      "Vite",
    ],

    featured: true,
    category: "github",
    schema: {
      mermaidDiagram: `erDiagram
    GAME_RESULT {
        string date
        string home_team
        string away_team
        int home_score
        int away_score
        string home_pitcher
        string away_pitcher
    }
    ELO_PREDICTION {
        string date
        string home_team
        string away_team
        float home_win_prob
        float ml_prob
        bool home_won
    }
    STATCAST_FEATURES {
        string date
        string team
        float avg_exit_velo
        float avg_launch_angle
        float avg_pitch_speed
        float avg_spin_rate
        float bullpen_fatigue
    }
    BATTER_ELO {
        int batter_id PK
        string name
        float elo
        string team
    }
    PITCHER_ELO {
        string pitcher_name PK
        float elo
    }
    GAME_RESULT ||--|| ELO_PREDICTION : "generates"
    GAME_RESULT }|--|| STATCAST_FEATURES : "enriched by"
    GAME_RESULT }|--o| PITCHER_ELO : "starting pitcher"
    GAME_RESULT }|--o{ BATTER_ELO : "lineup matchups"`,
      sqlSnippets: [
        {
          title: "SQLite schema for game results and ELO tracking",
          code: `-- Games are ingested from the MLB Stats API and stored in-memory
-- via pandas DataFrames, with SQLite used for persistent caching.
-- The ELO engine processes games chronologically:

-- For each game:
--   E_A = 1 / (1 + 10^((R_B - R_A) / 400))    -- win probability
--   R_new = R_old + K * (actual - expected)      -- rating update

-- The ML model adds 20 features per game as differentials:
-- exit_velo_diff, launch_angle_diff, pitch_speed_diff,
-- spin_rate_diff, rest_days_diff, bullpen_fatigue_diff,
-- recent_form_diff, whiff_trend, barrel_rate_diff,
-- catcher_framing, game_temperature, pythag_residual...

-- Monte Carlo: simulate remaining schedule 10,000 times
-- using ELO probabilities to estimate playoff odds.`,
          annotation:
            "The system uses pandas DataFrames as the primary data structure with SQLite for persistent caching between runs. The FastAPI server loads the entire simulation into memory on startup for instant page loads. LightGBM handles missing features natively, so every game gets a prediction even with incomplete Statcast data.",
        },
      ],
    },
  },
  {
    title: "JavaQuest",
    slug: "javaquest",
    summary:
      "A coding RPG where you level up by solving Java challenges, with in-browser code compilation and AI mentoring",
    description:
      "A full-stack coding RPG built with Spring Boot and React where players pick a class (Script Mage, Loop Knight, or Data Paladin), enter themed dungeons, and solve 55 Java coding challenges room by room. The backend compiles and executes user-submitted Java code in-memory using javax.tools.JavaCompiler, runs it against predefined test cases via reflection, and scores solutions using JavaParser AST analysis for code quality metrics (cyclomatic complexity, nesting depth, line count). Each solution earns XP and becomes a spell in the player's Grimoire, with higher-quality code forging rarer spell tiers.",
    tech: [
      "Java 21",
      "Spring Boot 3",
      "Spring Data JPA",
      "SQLite",
      "JavaParser",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Monaco Editor",
      "Vite",
    ],

    featured: true,
    category: "github",
    schema: {
      mermaidDiagram: `erDiagram
    PLAYER {
        int id PK
        string name
        string player_class
        int xp
        string created_at
    }
    CHALLENGE_PROGRESS {
        int id PK
        string challenge_id UK
        string status
        int attempts
        int first_try_solve
        string best_code
        int xp_earned
        string forge_tier
        int help_used
    }
    CHALLENGE {
        string id PK
        string title
        string category
        string difficulty
        bool is_boss
        string method_name
        int xp_reward
        int baseline_lines
    }
    TEST_CASE {
        string input
        string expected
        bool hidden
    }
    PLAYER ||--o{ CHALLENGE_PROGRESS : "tracks"
    CHALLENGE ||--o{ TEST_CASE : "has"
    CHALLENGE ||--o| CHALLENGE_PROGRESS : "solved in"`,
      sqlSnippets: [
        {
          title: "SQLite schema for player progress and challenge tracking",
          code: `CREATE TABLE IF NOT EXISTS player (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT    NOT NULL,
    player_class TEXT    NOT NULL,
    xp           INTEGER NOT NULL DEFAULT 0,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS challenge_progress (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id    TEXT    NOT NULL UNIQUE,
    status          TEXT    NOT NULL DEFAULT 'available',
    attempts        INTEGER NOT NULL DEFAULT 0,
    first_try_solve INTEGER NOT NULL DEFAULT 0,
    best_code       TEXT,
    xp_earned       INTEGER NOT NULL DEFAULT 0,
    forge_tier      TEXT    NOT NULL DEFAULT 'none',
    help_used       INTEGER NOT NULL DEFAULT 0
);`,
          annotation:
            "SQLite database persisted as a single file alongside the JAR. The challenge_progress table tracks each player's best solution code, attempt count, and forge tier (spell quality). Spring Data JPA with Hibernate's SQLite dialect handles all queries. The entire app ships as one JAR file that serves both the API and the bundled React frontend.",
        },
      ],
    },
  },
  {
    title: "Godot Multiplayer FPS",
    slug: "godot-projects",
    summary:
      "A multiplayer voxel-based team FPS with destructible terrain, character classes, and a C++ performance layer",
    description:
      "A multiplayer first-person shooter built in Godot 4 featuring fully destructible voxel terrain with structural integrity simulation, six distinct character classes (Vanguard, Scout, Bombardier, Shotgunner, Demolisher, Miner), team-based game modes (Conquest, CTF), and a custom map editor. The terrain system uses a chunk-based architecture with greedy meshing, where a C++ GDExtension handles the performance-critical voxel storage (bitmask presence arrays, 8-byte compact block data) and mesh generation. Includes a lobby system with team selection, real-time ping tracking, weapon sway/recoil physics, grappling hooks, explosive C4/seismic charges, and data-driven configuration for all weapons, characters, and maps via JSON files.",
    tech: [
      "Godot 4",
      "GDScript",
      "C++",
      "GDExtension",
      "ENet Multiplayer",
      "GDShader",
    ],

    featured: true,
    category: "github",
  },
];
