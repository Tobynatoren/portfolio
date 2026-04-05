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
    showcase: {
      sections: [
        {
          title: "Data Pipeline",
          diagram: `flowchart TD
    subgraph "Data Sources"
        MLB["MLB Stats API"]
        SAV["Baseball Savant"]
        OM["Open-Meteo"]
    end

    MLB --> ELO["ELO Engine\nTeam + Pitcher ratings"]
    SAV --> FE["Feature Engineering\n20+ Statcast features"]
    OM --> FE

    ELO --> ML["LightGBM Model\nHome-Away differentials"]
    FE --> ML
    ELO --> MC["Monte Carlo\n10k playoff sims"]

    ML --> CACHE["SQLite Cache"]
    MC --> CACHE
    CACHE --> API["FastAPI"] --> DASH["React Dashboard\nPlotly charts"]`,
          annotation:
            "The entire pipeline runs once on FastAPI startup and caches results in SQLite, so the dashboard serves predictions from memory with zero latency. LightGBM was chosen over Logistic Regression because it handles NaN features natively and discovers feature interactions, meaning every game gets a prediction even with incomplete Statcast data.",
        },
        {
          title: "Schema Design",
          diagram: `erDiagram
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
          annotation:
            "pandas DataFrames serve as the primary in-memory data structure, with SQLite used only for persistent caching between runs. On startup, DataFrames and JSON metadata are loaded from a single .db file, avoiding any repeated API calls to MLB or Baseball Savant.",
        },
      ],
      sqlSnippets: [
        {
          title: "SQLite cache: DataFrames as tables, metadata as JSON key-value pairs",
          code: `-- The cache stores pandas DataFrames as full SQL tables
-- and all scalar data (ratings, Brier scores, Monte Carlo
-- results) as JSON in a key-value metadata table.

-- DataFrame tables (written via pandas to_sql):
--   predictions    -- every ELO + ML prediction for 2024
--   history        -- team ELO after every game (for charts)
--   ml_predictions -- predictions with ML probability column
--   batter_history -- per-game batter ELO for player profiles
--   batter_games   -- per-game wOBA for batter detail pages

-- Metadata table:
CREATE TABLE metadata (
    key   TEXT PRIMARY KEY,  -- 'ratings', 'monte_carlo', etc.
    value TEXT               -- JSON blob
);

-- First run: ~3-5 minutes (API calls + training).
-- Every run after: ~1 second (SQLite load).`,
          annotation:
            "The cache design exploits pandas' native SQLite integration for DataFrames while using a simple key-value table for everything else. This means the full simulation state is recoverable from a single .db file, and clearing the cache forces a fresh recompute on next startup.",
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
    showcase: {
      sections: [
        {
          title: "Code Execution Pipeline",
          diagram: `flowchart TD
    SUB["Player submits code\nvia Monaco Editor"] --> CC["ChallengeController\nPOST /challenges/:id/submit"]
    CC --> CR["CodeRunner.compile()\njavax.tools.JavaCompiler"]
    CR -->|"in-memory .java\nInMemorySource"| JC["JDK Compiler\nDiagnosticCollector"]
    JC -->|"bytecode"| CL["InMemoryFileManager\nCustom ClassLoader"]
    CL -->|"Class object"| GR["Grader\nReflection: findMethod()"]
    GR -->|"invoke per test case"| TC["Test Runner\nParse input, compare output"]
    TC -->|"all passed"| AST["CodeQualityAnalyzer\nJavaParser AST"]
    TC -->|"any failed"| FAIL["Return errors\n+ test case diffs"]
    AST -->|"metrics"| FORGE["ForgeService\nTier: iron/steel/\nmithril/dragonforged"]
    FORGE --> RW["RewardService\nBase XP * bonuses\n+50% first-try\n+25% no hints"]
    RW --> PROG["ProgressService\nSave to SQLite\nUpdate grimoire"]
    PROG --> RES["Response: XP, spell name,\nforge tier, test results"]`,
          annotation:
            "All compilation and execution happens in-process using the JDK's built-in JavaCompiler API with custom in-memory file managers, avoiding any subprocess or sandbox overhead. The Grader invokes the student's method via reflection, parsing test inputs into the correct Java types at runtime. Code quality is evaluated via a separate JavaParser AST pass that counts cyclomatic complexity, nesting depth, and effective line count to determine the forge tier.",
        },
        {
          title: "Schema Design",
          diagram: `erDiagram
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
          annotation:
            "Challenges are loaded from JSON files on the classpath at startup, not stored in the database. Only player state and progress are persisted in SQLite. The challenge_progress table stores the best submitted code so the Grimoire can display collected spells, and the forge_tier column tracks quality for reforging on re-submission.",
        },
      ],
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
    title: "Clashfort",
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
    showcase: {
      sections: [
        {
          title: "Voxel Terrain System",
          diagram: `flowchart TD
    WG["World.gd\nTerrain generation\nNoise + structures"] -->|"set_block(pos, color,\nhealth, layer)"| CM["ChunkManager.gd\nworld-to-chunk coord mapping"]
    CM -->|"get_or_create_chunk()"| CH["Chunk.gd\n16x16x16 per chunk\nGDScript blocks dict"]
    CH -->|"delegates storage"| ND["NativeChunkData (C++)\n64x uint64 bitmask presence\n8-byte BlockData per voxel"]
    ND -->|"generate_mesh_arrays()"| GM["Greedy Meshing (C++)\nMerge coplanar faces\nCross-chunk neighbor culling"]
    GM -->|"vertices, normals, colors"| AM["ArrayMesh\nSingle draw call per chunk"]
    ND -->|"generate_collision_faces()"| CS["ConcavePolygonShape3D\nPhysics collision"]

    CM -->|"damage_block()"| DMG["Block Damage\nServer-authoritative"]
    DMG -->|"health <= 0"| REM["remove_block()\nRPC sync to clients"]
    REM -->|"batch destroyed positions"| SI["StructuralIntegrity.gd\nAutoload singleton"]
    SI -->|"recalculate_integrity_region()"| CW["NativeChunkWorld (C++)\nBFS support propagation\nWeight vs. capacity check"]
    CW -->|"collapsed blocks"| FB["FallingBlock.tscn\nRigidBody3D physics\nCascade chain reaction"]

    subgraph "C++ GDExtension Layer"
        ND
        GM
        CW
    end`,
          annotation:
            "The critical performance boundary is between GDScript (game logic, networking, UI) and C++ (voxel storage, meshing, structural integrity math). A 16x16x16 chunk stores 4,096 blocks as a 64-entry uint64 bitmask for fast presence checks plus an 8-byte BlockData struct per voxel. The C++ layer handles greedy meshing with cross-chunk neighbor awareness, reducing thousands of block faces into merged quads for a single draw call per chunk. Structural integrity uses weight-based BFS propagation where each block type has defined weight and support capacity, causing realistic cascading collapses when load-bearing blocks are destroyed.",
        },
        {
          title: "Multiplayer Architecture",
          diagram: `flowchart TD
    subgraph "Lobby"
        NET["NetworkManager"] --> TEAM["Team Assignment"]
        TEAM --> CLASS["Class Selection"]
        CLASS --> START["Game Start"]
    end

    subgraph "Gameplay (Server Authoritative)"
        INPUT["Client Input"] --> SERVER["Server Validates"]
        SERVER --> DAMAGE["Damage + Kills\nReliable RPC"]
        SERVER --> TERRAIN["Block Destruction\nStructural Collapse"]
        SERVER --> SYNC["Position Sync\nMultiplayerSynchronizer"]
    end

    START --> INPUT`,
          annotation:
            "The server is fully authoritative for all damage, kills, and terrain destruction. Clients send input and render predictions, but the server validates every hit and block modification before broadcasting the result via RPCs. Block damage uses reliable RPCs for destruction events and unreliable RPCs for health updates (acceptable loss). The lobby phase handles team balancing, class selection, and map synchronization before the host triggers game start.",
        },
      ],
      sqlSnippets: [],
    },
  },
];
