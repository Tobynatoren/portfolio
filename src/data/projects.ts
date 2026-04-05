import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: "MLBELO",
    slug: "mlbelo",
    summary: "ELO rating engine for MLB teams",
    description:
      "A rating system that tracks and predicts MLB team performance using ELO-based algorithms. Processes historical game data to calculate team strength ratings and project outcomes.",
    tech: ["Java", "Python", "SQL"],
    github: "https://github.com/Tobynatoren/MLBELO",
    featured: true,
    category: "github",
    schema: {
      mermaidDiagram: `erDiagram
    TEAM {
        int team_id PK
        string name
        string abbreviation
        string league
        string division
    }
    GAME {
        int game_id PK
        date game_date
        int home_team_id FK
        int away_team_id FK
        int home_score
        int away_score
    }
    ELO_RATING {
        int rating_id PK
        int team_id FK
        date rating_date
        float elo_score
        int games_played
    }
    TEAM ||--o{ GAME : "plays as home"
    TEAM ||--o{ GAME : "plays as away"
    TEAM ||--o{ ELO_RATING : "has ratings"`,
      sqlSnippets: [
        {
          title: "Current team rankings with win percentage",
          code: `
SELECT
    t.name,
    r.elo_score,
    COUNT(CASE WHEN g.home_score > g.away_score AND g.home_team_id = t.team_id
               OR g.away_score > g.home_score AND g.away_team_id = t.team_id
          THEN 1 END) AS wins,
    COUNT(g.game_id) AS games,
    ROUND(
      COUNT(CASE WHEN g.home_score > g.away_score AND g.home_team_id = t.team_id
                 OR g.away_score > g.home_score AND g.away_team_id = t.team_id
            THEN 1 END)::numeric / NULLIF(COUNT(g.game_id), 0), 3
    ) AS win_pct
FROM team t
JOIN elo_rating r ON r.team_id = t.team_id
LEFT JOIN game g ON g.home_team_id = t.team_id OR g.away_team_id = t.team_id
WHERE r.rating_date = (SELECT MAX(rating_date) FROM elo_rating WHERE team_id = t.team_id)
GROUP BY t.name, r.elo_score
ORDER BY r.elo_score DESC;`,
          annotation:
            "Joins the latest ELO rating with aggregated win/loss data. Uses conditional aggregation instead of subqueries for better performance on large game tables.",
        },
      ],
    },
  },
  {
    title: "JavaQuest",
    slug: "javaquest",
    summary: "Java-based adventure game engine",
    description:
      "A text-based adventure game built in Java demonstrating object-oriented design patterns, game state management, and modular architecture.",
    tech: ["Java"],
    github: "https://github.com/Tobynatoren/javaquest",
    featured: true,
    category: "github",
  },
  {
    title: "Godot Projects",
    slug: "godot-projects",
    summary: "Game development with the Godot engine",
    description:
      "A collection of game projects built with the Godot engine, exploring 2D/3D game mechanics, physics, and procedural generation.",
    tech: ["GDScript", "Godot"],
    github: "https://github.com/Tobynatoren/GODOTProjects",
    featured: true,
    category: "github",
  },
  {
    title: "TruckerBad v2",
    slug: "truckerbadv2",
    summary: "Full-stack trucking application",
    description:
      "A rebuilt version of a trucking logistics application with improved architecture and features.",
    tech: ["Java", "Spring Boot", "React"],
    github: "https://github.com/Tobynatoren/truckerbadv2",
    featured: true,
    category: "github",
  },
];
