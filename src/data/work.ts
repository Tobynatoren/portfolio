import type { ShowcaseSection } from "../types";

export interface WorkFeature {
  title: string;
  description: string;
  showcase?: ShowcaseSection;
}

export interface WorkProject {
  company: string;
  product: string;
  role: string;
  summary: string;
  features: WorkFeature[];
}

export const workProjects: WorkProject[] = [
  {
    company: "Dataproces",
    product: "Befolkningsblik V2",
    role: "Backend Developer",
    summary:
      "A population forecasting platform used by Danish municipalities. I was the first backend developer on the project and built most of the core systems from scratch.",
    features: [
      {
        title: "Population Projections",
        description:
          "This is the core of the product. It pulls population data from the Danish CPR system and runs it through a cohort-component model that steps forward year by year, per district. I also built in support for housing programs so municipalities can model how new construction projects will shift their demographics over time. The Covid years were messing up the forecasts pretty badly, so I added outlier detection to handle that, which cut the forecast error roughly in half.",
        showcase: {
          title: "Projection Pipeline",
          diagram: `flowchart LR
    CPR["CPR API\nPopulation data"] --> BASE["Base Population\nby district"]
    DST["StatBank DST\nSocioeconomic data"] --> FERT["Fertility &\nMortality rates"]
    BASE --> ENGINE["Projection Engine\nCohort-component model"]
    FERT --> ENGINE
    HOUSING["Housing Programs\nNew developments"] --> ENGINE
    ENGINE --> OUTLIER["Outlier Detection\nDownweight anomalies"]
    OUTLIER --> RESULT["District Forecasts\nAge × Gender × Year"]`,
          annotation:
            "Runs per district, stepping through births, deaths, and net migration each year. Housing programs feed in as additional population inflows distributed by expected age and gender profiles.",
        },
      },
      {
        title: "StatBank Data Pipeline",
        description:
          "The projections needed socioeconomic data from Denmark's Statistics. I built a sync pipeline that pulls data incrementally, stores it in Parquet files, and runs queries through DuckDB. A daily cron job handles checking for updates so we always have fresh data without anyone having to think about it.",
        showcase: {
          title: "Data Sync Architecture",
          diagram: `flowchart LR
    DST["DST StatBank API"] -->|"incremental delta"| SYNC["Sync Service\nStrategy pattern"]
    SYNC --> PARQUET["Parquet Files\nMerge via DuckDB"]
    PARQUET --> DUCK["DuckDB Queries\nFast analytical reads"]
    CRON["Daily Cron Job"] -->|"check for updates"| SYNC
    DUCK --> API["REST API\nSocioeconomic indicators"]`,
          annotation:
            "Switches between full and incremental refresh depending on the table. Parquet + DuckDB gives fast analytical queries without needing a separate database.",
        },
      },
      {
        title: "Performance Work",
        description:
          "Report generation was taking 15-20 seconds at one point. I got it down to about 7 by caching shared base projections and running the calculations in parallel. GZIP compression on the API responses helped a lot too, cutting payload sizes by around 80-90%. Also cleaned up a bunch of N+1 query patterns that had been slowing things down.",
      },
      {
        title: "Codebase Health",
        description:
          "Some of the service classes had grown past 3,000 lines by the time I got to them. I broke those apart into smaller services using facade and strategy patterns, which made the codebase a lot easier to work with. Also handled the migration from Liquibase to Flyway and set up SpotBugs for static analysis.",
      },
    ],
  },
  {
    company: "Dataproces",
    product: "Skoleprognose",
    role: "Backend Developer",
    summary:
      "A module under Befolkningsblik that forecasts school enrollment and childcare demand for municipalities.",
    features: [
      {
        title: "School Enrollment Forecasting",
        description:
          "I designed and built this whole module. It predicts how many students each school will have per grade, per year. There were a lot of edge cases to handle, like kids going to schools outside their district, private school rates varying between areas, and immigration patterns. One fun problem was fuzzy matching school names across data sources, because Danish has definite suffixes where 'skole' and 'skolen' are the same school. I ended up writing around 180 tests for this module because of how many things could go wrong.",
        showcase: {
          title: "School Projection Flow",
          diagram: `flowchart TD
    POP["Population Forecast\nAge 5-16 by district"] --> INTAKE["BH Intake\nCalculation"]
    UPLOAD["Totaludtrak Upload\nMulti-year student data"] --> RET["Retention Rates\nCohort tracking"]
    INTAKE --> CALC["SchoolProjectionCalculator"]
    RET --> CALC
    CALC --> PRIVATE["Private School\nReduction"]
    CALC --> CROSS["District Crossers\nFuzzy name matching"]
    CALC --> IMM["Immigration\nAdjustments"]
    PRIVATE --> OUT["Enrollment Forecast\nPer school × grade × year"]
    CROSS --> OUT
    IMM --> OUT`,
          annotation:
            "Retention rates come from tracking real student cohorts across years instead of static percentages. Fuzzy matching handles Danish definite suffixes (skole/skolen, park/parken) when matching names across data sources.",
        },
      },
      {
        title: "Childcare & Economy",
        description:
          "I also built the childcare forecasting module, which handles quarterly data uploads with weighted averaging, and the economy transfer system that calculates tax base projections from income data and exports it all to the municipality's finance system.",
      },
    ],
  },
];
