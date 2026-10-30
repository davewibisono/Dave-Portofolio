import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load the Dataset
df = pd.read_csv("mission_launches.csv")

# Quick overview of the dataset structure
print(f"Dataset Shape: {df.shape}")
print(df.head(3))

# 2. Data Cleaning & Feature Engineering
# Mencari kolom tanggal & status secara otomatis agar kebal typo/perbedaan huruf
date_column = next(col for col in df.columns if 'date' in col.lower() or 'datum' in col.lower())
status_column = next(col for col in df.columns if 'mission' in col.lower() and 'status' in col.lower())

df['Parsed_Date'] = pd.to_datetime(df[date_column], errors='coerce')
df['Year'] = df['Parsed_Date'].dt.year

# Extract Country from Location (Country is typically the last element after comma)
df['Country'] = df['Location'].apply(lambda x: x.split(',')[-1].strip())

# Clean up common country name variations if needed
df['Country'] = df['Country'].replace({
    'Russia': 'Russian Federation',
    'New Mexico': 'USA',
    'Shahrud Missile Test Site': 'Iran',
    'Gran Canaria': 'USA'
})

# 3. Aggregations & Summary Statistics
print("\n--- Summary Statistics ---")
print(f"Total Missions Tracked: {len(df)}")
print(f"Date Range: {df['Year'].min()} - {df['Year'].max()}")
print(f"Total Unique Launch Organisations: {df['Company Name'].nunique()}")
print(f"Total Launch Countries: {df['Country'].nunique()}")

# Mission Status breakdown
status_counts = df[status_column].value_counts()
print("\nMission Status Breakdown:")
print(status_counts)

# Set global plotting style
sns.set_theme(style="darkgrid")
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle("Space Race & Global Space Missions Analysis (1957–Present)", fontsize=18, fontweight='bold', y=0.95)

# --- Visualization 1: Annual Launch Trends Over Time ---
launches_per_year = df.groupby('Year').size()
axes[0, 0].plot(launches_per_year.index, launches_per_year.values, color='dodgerblue', linewidth=2.5)
axes[0, 0].set_title("Global Space Launches per Year", fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel("Year")
axes[0, 0].set_ylabel("Number of Launches")

# --- Visualization 2: Top 10 Launch Organisations ---
top_orgs = df['Company Name'].value_counts().head(10)
sns.barplot(x=top_orgs.values, y=top_orgs.index, ax=axes[0, 1], palette='viridis', hue=top_orgs.index, legend=False)
axes[0, 1].set_title("Top 10 Launch Organisations by Volume", fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel("Total Missions")
axes[0, 1].set_ylabel("Organisation")

# --- Visualization 3: Mission Success vs. Failure Distribution ---
sns.countplot(data=df, x=status_column, ax=axes[1, 0], order=df[status_column].value_counts().index, palette='Set2', hue=status_column, legend=False)
axes[1, 0].set_title("Overall Mission Status Breakdown", fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel("Status")
axes[1, 0].set_ylabel("Count")
axes[1, 0].tick_params(axis='x', rotation=30)

# --- Visualization 4: Top Launch Countries ---
top_countries = df['Country'].value_counts().head(8)
sns.barplot(x=top_countries.values, y=top_countries.index, ax=axes[1, 1], palette='magma', hue=top_countries.index, legend=False)
axes[1, 1].set_title("Top Launch Countries/Regions", fontsize=14, fontweight='bold')
axes[1, 1].set_xlabel("Total Launches")
axes[1, 1].set_ylabel("Country / Region")

plt.tight_layout(rect=[0, 0.03, 1, 0.93])
plt.savefig("space_race_analysis_dashboard.png", dpi=300)
plt.show()