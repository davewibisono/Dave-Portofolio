import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load Datasets
# Washington Post database on fatal police shootings
df_shootings = pd.read_csv("fatal-police-shootings-data.csv")
# US Census demographic and population dataset
df_census = pd.read_csv("census_population_by_race.csv")

print(f"Shootings Records: {df_shootings.shape}")
print(f"Census Records: {df_census.shape}")

# 2. Data Cleaning & Feature Engineering
# Extract Year from the shooting date
df_shootings['date'] = pd.to_datetime(df_shootings['date'], errors='coerce')
df_shootings['year'] = df_shootings['date'].dt.year

# Standardize race category labels for merging
race_mapping = {
    'A': 'Asian',
    'B': 'Black',
    'H': 'Hispanic',
    'N': 'Native American',
    'W': 'White',
    'O': 'Other',
    None: 'Unknown'
}
df_shootings['race_expanded'] = df_shootings['race'].map(race_mapping)

# 3. Aggregations & Summary Statistics
print("\n--- Summary Statistics ---")
print(f"Total Recorded Fatal Shootings: {len(df_shootings)}")
print(f"Date Range: {df_shootings['year'].min()} - {df_shootings['year'].max()}")

# Breakdown by Race
fatalities_by_race = df_shootings['race_expanded'].value_counts()
print("\nFatalities by Race (Absolute Counts):")
print(fatalities_by_race)

# 4. Visualisation Dashboard Setup
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle("Analysis of Deaths Involving Police in the US (WaPo & Census Data)", fontsize=18, fontweight='bold', y=0.95)

# --- Visualization 1: Annual Trend of Fatal Shootings ---
shootings_per_year = df_shootings.groupby('year').size()
axes[0, 0].plot(shootings_per_year.index, shootings_per_year.values, color='crimson', linewidth=2.5, marker='o')
axes[0, 0].set_title("Fatal Police Shootings by Year", fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel("Year")
axes[0, 0].set_ylabel("Number of Deaths")

# --- Visualization 2: Fatalities by Race (Absolute Numbers) ---
sns.barplot(x=fatalities_by_race.values, y=fatalities_by_race.index, ax=axes[0, 1], palette='crest', hue=fatalities_by_race.index, legend=False)
axes[0, 1].set_title("Fatal Shootings by Race (Total Count)", fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel("Number of Incidents")
axes[0, 1].set_ylabel("Race / Ethnicity")

# --- Visualization 3: Threat Level Distribution ---
threat_counts = df_shootings['threat_level'].value_counts()
sns.barplot(x=threat_counts.index, y=threat_counts.values, ax=axes[1, 0], palette='muted', hue=threat_counts.index, legend=False)
axes[1, 0].set_title("Subject Threat Level at Time of Incident", fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel("Threat Level")
axes[1, 0].set_ylabel("Count")

# --- Visualization 4: Presence of Mental Illness Indicators ---
mental_illness = df_shootings['signs_of_mental_illness'].value_counts()
axes[1, 1].pie(mental_illness.values, labels=['No Signs', 'Signs of Mental Illness'], autopct='%1.1f%%', colors=['#6baed6', '#fd8d3c'], startangle=90)
axes[1, 1].set_title("Incidents Involving Signs of Mental Illness", fontsize=14, fontweight='bold')

plt.tight_layout(rect=[0, 0.03, 1, 0.93])
plt.savefig("police_shootings_census_analysis.png", dpi=300)
plt.show()