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
  {
    title: "TruckerBad v2",
    slug: "truckerbadv2",
    summary:
      "A mobile-first facility finder for European truck drivers, built as a pnpm monorepo with React Native and tRPC",
    description:
      "A full-stack mobile application helping European truck drivers find rest stops, truck stops, and facilities (showers, food, parking, fuel) while driving. Built as a pnpm/Turborepo monorepo with a React Native (Expo) mobile app, a Fastify + tRPC API server, and a shared Drizzle ORM database package backed by PostGIS-enabled PostgreSQL. Features geospatial queries using PostGIS ST_Distance and ST_DWithin for radius-based POI search, a community-driven review and moderation system with trust levels, and JWT-based authentication via Google/Apple/Facebook. Designed for dashboard-mounted phones with large touch targets, high-contrast dark mode, and arm's-length readability.",
    tech: [
      "TypeScript",
      "React Native",
      "Expo",
      "Fastify",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "PostGIS",
      "Zod",
      "Zustand",
      "Turborepo",
      "pnpm",
      "Docker",
    ],

    featured: true,
    category: "github",
    schema: {
      mermaidDiagram: `erDiagram
    USERS {
        uuid id PK
        varchar display_name
        varchar email
        enum auth_provider
        enum trust_level
        enum user_role
        timestamp created_at
    }
    POIS {
        uuid id PK
        varchar name
        float latitude
        float longitude
        geography location
        enum poi_category
        jsonb opening_hours
        real avg_rating
        int rating_count
        enum poi_status
        uuid created_by FK
    }
    FACILITIES {
        uuid id PK
        uuid poi_id FK
        enum facility_type
        enum cost_type
        decimal cost_amount
        bool requires_membership
        bool available
    }
    REVIEWS {
        uuid id PK
        uuid poi_id FK
        uuid user_id FK
        int rating
        text comment
    }
    POI_EDITS {
        uuid id PK
        uuid poi_id FK
        uuid submitted_by FK
        jsonb changes
        enum edit_status
        uuid reviewed_by FK
    }
    POI_REPORTS {
        uuid id PK
        uuid poi_id FK
        uuid reported_by FK
        enum report_reason
        enum report_status
    }
    USERS ||--o{ POIS : "creates"
    USERS ||--o{ REVIEWS : "writes"
    USERS ||--o{ POI_EDITS : "submits"
    USERS ||--o{ POI_REPORTS : "reports"
    POIS ||--o{ FACILITIES : "has"
    POIS ||--o{ REVIEWS : "receives"
    POIS ||--o{ POI_EDITS : "edited via"
    POIS ||--o{ POI_REPORTS : "reported via"`,
      sqlSnippets: [
        {
          title: "PostGIS-powered geospatial POI search with facility filtering",
          code: `-- Enable PostGIS extension for geographic queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Custom enum types for domain modeling
CREATE TYPE "poi_category" AS ENUM(
  'rest_stop', 'truck_stop', 'gas_station', 'parking', 'other'
);
CREATE TYPE "facility_type" AS ENUM(
  'bathing', 'sleeping', 'food', 'fuel',
  'parking', 'wifi', 'laundry', 'shop'
);
CREATE TYPE "cost_type" AS ENUM(
  'free', 'paid', 'included_with_membership', 'varies'
);

-- POIs with PostGIS geography column for spatial indexing
ALTER TABLE "pois"
  ADD COLUMN "location" geography(Point, 4326);
CREATE INDEX "pois_location_idx"
  ON "pois" USING GIST ("location");

-- Radius search: find active POIs within N km that have
-- specific free facilities, ordered by distance
SELECT p.*, ST_Distance(
    p.location,
    ST_MakePoint(:lng, :lat)::geography
  ) AS distance_meters
FROM pois p
WHERE p.status = 'active'
  AND ST_DWithin(
    p.location,
    ST_MakePoint(:lng, :lat)::geography,
    :radius_meters
  )
  AND EXISTS (
    SELECT 1 FROM facilities f
    WHERE f.poi_id = p.id
      AND f.type = :facility_type
      AND f.cost_type = 'free'
  )
ORDER BY distance_meters;`,
          annotation:
            "Uses PostGIS geography type with GIST indexing for efficient radius queries on the WGS 84 coordinate system. The ST_DWithin function leverages the spatial index to avoid full table scans. Facility filtering uses correlated EXISTS subqueries so each POI must have the requested facility type with the desired cost preference. Drizzle ORM generates the migration SQL and provides type-safe query building in TypeScript.",
        },
      ],
    },
  },
];
